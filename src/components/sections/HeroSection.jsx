import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, ShieldCheck } from 'lucide-react';

/**
 * HeroSection — Stunning landing hero
 * Radial gradient background, floating orbs, premium CTA
 */
function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden hero-gradient pt-32 pb-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[160px]"
          style={{ animationDelay: '2s', animation: 'float 8s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[200px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-8 md:px-12">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-[0.1em]">
            COFEPRIS Regulation Database • Live
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tighter leading-[1.05] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Verify Cosmetic{' '}
          <span className="gradient-text">Compliance</span>{' '}
          Instantly
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Scan your cosmetic formulations against Mexico's COFEPRIS regulatory database.
          Identify banned, restricted, and non-compliant ingredients in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#checker"
            className="btn-primary px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 group"
          >
            <Zap size={18} />
            Start Checking
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="btn-secondary px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 group"
          >
            <Play size={16} />
            Learn More
          </a>
        </motion.div>

        {/* Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass-card rounded-2xl p-1.5 max-w-3xl mx-auto glow-accent"
        >
          <div className="bg-[var(--color-surface-elevated)] rounded-xl overflow-hidden border border-[var(--color-border)]">
            {/* Mock Dashboard UI */}
            <div className="p-6">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    cosmetiq.app/analysis
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[var(--color-success)]" />
                  <span className="text-xs font-semibold text-[var(--color-success)]">COMPLIANT</span>
                </div>
              </div>

              {/* Mock Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'Niacinamide', conc: '5%', limit: '10%', status: 'Compliant', color: 'var(--color-success)' },
                  { name: 'Phenoxyethanol', conc: '0.9%', limit: '1%', status: 'Restricted', color: 'var(--color-orange)' },
                  { name: 'Hydroquinone', conc: '2%', limit: '0%', status: 'Banned', color: 'var(--color-danger)' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-[rgba(255,255,255,0.02)] rounded-lg p-4 border border-[var(--color-border)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">{item.name}</span>
                      <span
                        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: item.color,
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {item.conc} / {item.limit} limit
                    </div>
                    <div className="concentration-bar mt-2">
                      <div
                        className="concentration-fill"
                        style={{
                          width: `${(parseFloat(item.conc) / parseFloat(item.limit || '1')) * 100}%`,
                          background: item.color,
                          maxWidth: '100%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
