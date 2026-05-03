/**
 * Compliance Analysis Service
 * 
 * Analyzes ingredients against the COFEPRIS database
 * and returns detailed compliance results.
 */

const cofeprisDatabase = require('../data/cofepris-database');

/**
 * Normalize ingredient name for fuzzy matching
 */
function normalize(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s()-]/g, '');
}

/**
 * Find a matching ingredient in the database
 * Uses case-insensitive matching with some fuzzy logic
 */
function findIngredient(name) {
  const normalized = normalize(name);

  // Exact match first
  let match = cofeprisDatabase.find(
    (entry) => normalize(entry.name) === normalized
  );
  if (match) return match;

  // Partial match (input contains database name or vice versa)
  match = cofeprisDatabase.find(
    (entry) =>
      normalized.includes(normalize(entry.name)) ||
      normalize(entry.name).includes(normalized)
  );
  return match || null;
}

/**
 * Analyze a list of ingredients for COFEPRIS compliance
 * 
 * @param {Array} ingredients - Array of { name, concentration, category }
 * @returns {Object} Analysis results
 */
function analyzeIngredients(ingredients) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new Error('No ingredients provided for analysis');
  }

  const results = ingredients.map((ingredient) => {
    const { name, concentration, category } = ingredient;
    const dbEntry = findIngredient(name);

    // If not found in database, mark as unknown but compliant
    if (!dbEntry) {
      return {
        name,
        concentration,
        category: category || 'Unknown',
        status: 'compliant',
        safeLimit: null,
        reason: 'Not found in restricted/banned lists. No known restrictions.',
        notes: 'This ingredient is not in the COFEPRIS restricted or banned lists. It may still require notification.',
        reference: 'N/A',
        casNumber: 'N/A',
      };
    }

    // Banned ingredients
    if (dbEntry.status === 'banned') {
      return {
        name: dbEntry.name,
        concentration,
        category: dbEntry.category,
        status: 'banned',
        safeLimit: 0,
        reason: `Banned substance — ${dbEntry.notes}`,
        notes: dbEntry.notes,
        reference: dbEntry.reference,
        casNumber: dbEntry.casNumber,
      };
    }

    // Restricted ingredients — check concentration
    if (dbEntry.status === 'restricted') {
      if (concentration > dbEntry.maxConcentration) {
        return {
          name: dbEntry.name,
          concentration,
          category: dbEntry.category,
          status: 'exceeds_limit',
          safeLimit: dbEntry.maxConcentration,
          reason: `Exceeds maximum of ${dbEntry.maxConcentration}% (used: ${concentration}%)`,
          notes: dbEntry.notes,
          reference: dbEntry.reference,
          casNumber: dbEntry.casNumber,
        };
      }

      return {
        name: dbEntry.name,
        concentration,
        category: dbEntry.category,
        status: 'restricted',
        safeLimit: dbEntry.maxConcentration,
        reason: `Restricted ingredient — within limit (${concentration}% / ${dbEntry.maxConcentration}% max)`,
        notes: dbEntry.notes,
        reference: dbEntry.reference,
        casNumber: dbEntry.casNumber,
      };
    }

    // Allowed ingredients — check if max is defined
    if (dbEntry.maxConcentration !== null && concentration > dbEntry.maxConcentration) {
      return {
        name: dbEntry.name,
        concentration,
        category: dbEntry.category,
        status: 'exceeds_limit',
        safeLimit: dbEntry.maxConcentration,
        reason: `Exceeds recommended maximum of ${dbEntry.maxConcentration}% (used: ${concentration}%)`,
        notes: dbEntry.notes,
        reference: dbEntry.reference,
        casNumber: dbEntry.casNumber,
      };
    }

    // Fully compliant
    return {
      name: dbEntry.name,
      concentration,
      category: dbEntry.category,
      status: 'compliant',
      safeLimit: dbEntry.maxConcentration,
      reason: dbEntry.maxConcentration
        ? `Within safe limits (${concentration}% / ${dbEntry.maxConcentration}% max)`
        : 'No concentration restrictions',
      notes: dbEntry.notes,
      reference: dbEntry.reference,
      casNumber: dbEntry.casNumber,
    };
  });

  // Calculate summary
  const summary = {
    total: results.length,
    compliant: results.filter((r) => r.status === 'compliant').length,
    restricted: results.filter((r) => r.status === 'restricted').length,
    flagged: results.filter((r) => r.status === 'exceeds_limit').length,
    banned: results.filter((r) => r.status === 'banned').length,
  };

  // Determine overall status
  const hasViolations = summary.banned > 0 || summary.flagged > 0;
  const overallStatus = hasViolations ? 'non-compliant' : 'compliant';

  return {
    overallStatus,
    summary,
    ingredients: results,
    analyzedAt: new Date().toISOString(),
    regulation: 'COFEPRIS (Mexico)',
  };
}

/**
 * Search ingredients in the database
 */
function searchIngredients(query, limit = 10) {
  if (!query || query.length < 1) return [];

  const normalized = normalize(query);
  return cofeprisDatabase
    .filter((entry) => normalize(entry.name).includes(normalized))
    .slice(0, limit)
    .map((entry) => ({
      name: entry.name,
      status: entry.status,
      maxConcentration: entry.maxConcentration,
      category: entry.category,
    }));
}

module.exports = { analyzeIngredients, searchIngredients };
