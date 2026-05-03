import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Trash2, FlaskConical, Loader2, Search, X, AlertCircle, Zap } from 'lucide-react';
import Papa from 'papaparse';

/**
 * IngredientInput — Premium ingredient entry panel
 * Supports manual input with autocomplete + CSV upload
 */

// COFEPRIS ingredient database (for autocomplete)
const INGREDIENT_DATABASE = [
  'Niacinamide', 'Retinol', 'Salicylic Acid', 'Glycolic Acid', 'Hyaluronic Acid',
  'Vitamin C (Ascorbic Acid)', 'Benzoyl Peroxide', 'Hydroquinone', 'Kojic Acid',
  'Azelaic Acid', 'Phenoxyethanol', 'Methylparaben', 'Propylparaben', 'Butylparaben',
  'Triclosan', 'Formaldehyde', 'Toluene', 'Lead Acetate', 'Mercury',
  'Glycerin', 'Sodium Hyaluronate', 'Panthenol', 'Allantoin', 'Tocopherol',
  'Cetearyl Alcohol', 'Stearic Acid', 'Dimethicone', 'Cyclopentasiloxane',
  'Titanium Dioxide', 'Zinc Oxide', 'Octinoxate', 'Oxybenzone', 'Avobenzone',
  'Retinyl Palmitate', 'Lactic Acid', 'Mandelic Acid', 'Citric Acid',
  'Sodium Lauryl Sulfate', 'Sodium Laureth Sulfate', 'Cocamidopropyl Betaine',
  'Benzalkonium Chloride', 'Chlorhexidine', 'Hydrogen Peroxide',
  'Coal Tar', 'Diethylhexyl Phthalate', 'Bithionol', 'Chloroform',
  'Methylene Chloride', 'Vinyl Chloride', 'Zirconium', 'Isobutyl Paraben',
  'Isopropyl Paraben', 'BHA (Butylated Hydroxyanisole)', 'BHT',
  'Arbutin', 'Alpha-Arbutin', 'Tranexamic Acid', 'Ferulic Acid',
  'Resveratrol', 'Bakuchiol', 'Centella Asiatica', 'Tea Tree Oil',
  'Witch Hazel', 'Aloe Vera', 'Chamomile Extract', 'Green Tea Extract',
];

const CATEGORIES = ['Active', 'Preservative', 'Surfactant', 'Emollient', 'Humectant', 'UV Filter', 'Colorant', 'Fragrance', 'Other'];

function IngredientInput({ onAnalyze, isAnalyzing }) {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [concentration, setConcentration] = useState('');
  const [category, setCategory] = useState('Active');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
          nameInputRef.current && !nameInputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Autocomplete logic
  const handleNameChange = (value) => {
    setName(value);
    setError('');
    if (value.length > 0) {
      const filtered = INGREDIENT_DATABASE.filter((ing) =>
        ing.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setName(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Add ingredient
  const addIngredient = useCallback(() => {
    if (!name.trim()) {
      setError('Please enter an ingredient name');
      return;
    }
    const concNum = parseFloat(concentration);
    if (isNaN(concNum) || concNum <= 0 || concNum > 100) {
      setError('Concentration must be between 0 and 100%');
      return;
    }
    if (ingredients.some((ing) => ing.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('This ingredient has already been added');
      return;
    }

    setIngredients((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        concentration: concNum,
        category,
      },
    ]);
    setName('');
    setConcentration('');
    setError('');
    nameInputRef.current?.focus();
  }, [name, concentration, category, ingredients]);

  // Remove ingredient
  const removeIngredient = (id) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  // CSV upload handler
  const handleCSVUpload = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data
          .filter((row) => row.name || row.ingredient || row.Name || row.Ingredient)
          .map((row, i) => ({
            id: Date.now() + i,
            name: (row.name || row.ingredient || row.Name || row.Ingredient || '').trim(),
            concentration: parseFloat(row.concentration || row.Concentration || row['%'] || '0'),
            category: row.category || row.Category || 'Other',
          }))
          .filter((ing) => ing.name && !isNaN(ing.concentration) && ing.concentration > 0);

        if (parsed.length === 0) {
          setError('No valid ingredients found. CSV must have columns: name, concentration');
          return;
        }

        setIngredients((prev) => [...prev, ...parsed]);
        setError('');
      },
      error: () => {
        setError('Failed to parse CSV file');
      },
    });
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleCSVUpload(file);
  };

  // Key press handler for Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const totalConcentration = ingredients.reduce((sum, ing) => sum + ing.concentration, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column — Input Form */}
      <div className="space-y-6">
        {/* Manual Input Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />

          <h3
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Plus size={18} className="text-[var(--color-accent)]" />
            Add Ingredient
          </h3>

          <div className="space-y-4">
            {/* Ingredient Name with Autocomplete */}
            <div className="relative">
              <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-1.5 block">
                Ingredient Name
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => name.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Start typing INCI name..."
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--color-text-muted)]"
                  id="ingredient-name-input"
                />
              </div>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    ref={suggestionsRef}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden z-30 shadow-2xl"
                  >
                    <div className="px-4 py-2 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider bg-white/[0.02] border-b border-[var(--color-border)]">
                      Suggestions
                    </div>
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => selectSuggestion(s)}
                        className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-accent-glow)] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Concentration + Category Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-1.5 block">
                  Concentration (%)
                </label>
                <input
                  type="number"
                  value={concentration}
                  onChange={(e) => { setConcentration(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="0.00"
                  min="0"
                  max="100"
                  step="0.01"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--color-text-muted)]"
                  id="concentration-input"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-1.5 block">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm text-[var(--color-text-secondary)] appearance-none cursor-pointer"
                  id="category-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[var(--color-surface)] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-[var(--color-danger)] text-sm"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add Button */}
            <button
              onClick={addIngredient}
              className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-white/5 border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-white/10 hover:border-[var(--color-border-hover)] transition-all active:scale-[0.98]"
              id="add-ingredient-btn"
            >
              <Plus size={16} />
              Add Ingredient
            </button>
          </div>
        </motion.div>

        {/* CSV Upload Zone */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`drop-zone p-8 rounded-2xl cursor-pointer group transition-all ${
            dragOver ? 'drag-over' : ''
          }`}
          id="csv-upload-zone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={(e) => handleCSVUpload(e.target.files[0])}
            className="hidden"
          />
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload size={22} className="text-[var(--color-accent)]" />
            </div>
            <h4
              className="text-base font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CSV Formulation Upload
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Drag & drop or{' '}
              <span className="text-[var(--color-accent)] font-semibold underline underline-offset-4 decoration-[var(--color-accent)]/30">
                click to browse
              </span>
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.1em] mt-4">
              Columns: name, concentration, category
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Column — Ingredient Table + CTA */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col h-full glow-accent"
        >
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-[var(--color-border)] flex justify-between items-center bg-white/[0.02]">
            <div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Current Formulation
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} •{' '}
                Total: {totalConcentration.toFixed(2)}%
              </p>
            </div>
            {ingredients.length > 0 && (
              <button
                onClick={() => setIngredients([])}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} />
                Clear All
              </button>
            )}
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto min-h-[300px] max-h-[450px]">
            {ingredients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                <FlaskConical size={40} className="text-[var(--color-text-muted)] mb-4 opacity-30" />
                <p className="text-[var(--color-text-muted)] text-sm">
                  No ingredients added yet.
                </p>
                <p className="text-[var(--color-text-muted)] text-xs mt-1">
                  Add ingredients manually or upload a CSV file.
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-[rgba(10,10,15,0.9)] backdrop-blur-md z-10 border-b border-[var(--color-border)]">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
                      Ingredient
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
                      Conc (%)
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em] hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em] text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  <AnimatePresence>
                    {ingredients.map((ing) => (
                      <motion.tr
                        key={ing.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-white text-sm">{ing.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-white">
                            {ing.concentration.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                            {ing.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => removeIngredient(ing.id)}
                            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>

          {/* Analyze CTA */}
          <div className="p-6 border-t border-[var(--color-border)] bg-white/[0.02] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--color-success-dim)]">
                <FlaskConical size={18} className="text-[var(--color-success)]" />
              </div>
              <div>
                <p className="text-sm text-white font-semibold">COFEPRIS Compliance Engine</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Cross-references against Mexican cosmetic regulations
                </p>
              </div>
            </div>
            <button
              onClick={() => onAnalyze(ingredients)}
              disabled={ingredients.length === 0 || isAnalyzing}
              className="btn-primary px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              id="analyze-btn"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Analyze Compliance
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default IngredientInput;
