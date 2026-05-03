/**
 * Compliance Routes
 * 
 * API endpoints for ingredient analysis and search
 */

const express = require('express');
const router = express.Router();
const { analyzeIngredients, searchIngredients } = require('../services/analysisService');

/**
 * POST /api/analyze
 * Analyze ingredients for COFEPRIS compliance
 * 
 * Body: { ingredients: [{ name, concentration, category }] }
 */
router.post('/analyze', (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Please provide an array of ingredients.',
        example: {
          ingredients: [
            { name: 'Niacinamide', concentration: 5, category: 'Active' },
          ],
        },
      });
    }

    // Validate each ingredient
    for (const ing of ingredients) {
      if (!ing.name || typeof ing.name !== 'string') {
        return res.status(400).json({
          error: `Invalid ingredient: missing or invalid name.`,
        });
      }
      if (ing.concentration === undefined || isNaN(Number(ing.concentration))) {
        return res.status(400).json({
          error: `Invalid concentration for "${ing.name}". Must be a number.`,
        });
      }
    }

    const results = analyzeIngredients(ingredients);

    // Add slight delay to simulate real processing (better UX for loading states)
    setTimeout(() => {
      res.json(results);
    }, 800);
  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({
      error: 'Analysis failed. Please try again.',
      details: error.message,
    });
  }
});

/**
 * GET /api/search?q=<query>
 * Search ingredients in the COFEPRIS database
 */
router.get('/search', (req, res) => {
  try {
    const { q, limit } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required. Use ?q=<query>' });
    }

    const results = searchIngredients(q, parseInt(limit) || 10);
    res.json({ results });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: 'Search failed.' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'CosmetiQ Compliance API',
    version: '1.0.0',
    regulation: 'COFEPRIS (Mexico)',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
