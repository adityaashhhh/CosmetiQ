import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import StatsSection from './components/sections/StatsSection';
import IngredientInput from './components/checker/IngredientInput';
import ResultsDashboard from './components/checker/ResultsDashboard';

/**
 * App — Root component
 * Single-page application with smooth scroll between sections
 */
function App() {
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (ingredients) => {
    setIsAnalyzing(true);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResults({
        overallStatus: 'error',
        error: 'Failed to connect to the analysis server. Please ensure the backend is running on port 3001.',
        ingredients: [],
        summary: { total: 0, compliant: 0, flagged: 0, restricted: 0, banned: 0 },
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Stats Section */}
        <section id="stats">
          <StatsSection />
        </section>

        {/* Features Section */}
        <section id="features" className="overflow-hidden">
          <FeaturesSection />
        </section>

        {/* Checker Section */}
        <section id="checker" className="py-24 px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[var(--color-accent)] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                Compliance Engine
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Analyze Your <span className="gradient-text">Formulation</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                Input your cosmetic ingredients below and our engine will cross-reference
                them against the latest COFEPRIS regulatory database.
              </p>
            </div>

            {!results ? (
              <IngredientInput
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            ) : (
              <ResultsDashboard
                results={results}
                onReset={handleReset}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
