import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Upload, FileDown, Database, Search, ShieldCheck } from 'lucide-react';

/**
 * FeaturesSection — Bento-style feature cards
 */
const features = [
  {
    icon: Zap,
    title: 'Real-time Validation',
    description:
      'Ingredients are validated as you type, with instant feedback on compliance status and concentration limits.',
    color: 'var(--color-accent)',
    colorDim: 'var(--color-accent-glow)',
  },
  {
    icon: Upload,
    title: 'CSV Bulk Upload',
    description:
      'Upload entire formulations via CSV. Our parser handles standard INCI naming and auto-maps concentrations.',
    color: 'var(--color-success)',
    colorDim: 'var(--color-success-dim)',
  },
  {
    icon: FileDown,
    title: 'PDF Export',
    description:
      'Generate professional compliance reports as PDF documents, ready for regulatory submission or archival.',
    color: '#60a5fa',
    colorDim: 'rgba(96, 165, 250, 0.1)',
  },
  {
    icon: Database,
    title: 'COFEPRIS Database',
    description:
      'Our mock regulatory dataset includes 500+ ingredients with detailed status, limits, and regulatory notes.',
    color: 'var(--color-warning)',
    colorDim: 'var(--color-warning-dim)',
  },
  {
    icon: Search,
    title: 'Smart Autocomplete',
    description:
      'Fuzzy search and autocomplete for ingredient names. Find INCI names quickly as you type.',
    color: 'var(--color-orange)',
    colorDim: 'var(--color-orange-dim)',
  },
  {
    icon: ShieldCheck,
    title: 'Detailed Reports',
    description:
      'Each flagged ingredient comes with regulatory notes, safe concentration limits, and clear violation reasons.',
    color: 'var(--color-danger)',
    colorDim: 'var(--color-danger-dim)',
  },
];

function FeaturesSection() {
  return (
    <section className="pt-24 pb-32 px-8 md:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--color-accent)] font-semibold text-sm tracking-[0.2em] uppercase mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Everything You Need for{' '}
            <span className="gradient-text">Compliance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            From ingredient input to compliance report — our tools cover every step
            of the COFEPRIS verification process.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-2xl group relative overflow-hidden transition-all duration-300"
            >
              {/* Glow on hover */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: feature.colorDim }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: feature.colorDim }}
              >
                <feature.icon size={22} style={{ color: feature.color }} />
              </div>

              {/* Content */}
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
