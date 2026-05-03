import React from 'react';
import { motion } from 'framer-motion';

/**
 * StatsSection — Impressive numbers bar
 */
const stats = [
  { value: '500+', label: 'Ingredients Tracked' },
  { value: '99.8%', label: 'Accuracy Rate' },
  { value: '<2s', label: 'Analysis Speed' },
  { value: '24/7', label: 'Database Monitoring' },
];

function StatsSection() {
  return (
    <section className="py-20 px-8 md:px-12 border-y border-[var(--color-border)] bg-[rgba(0,0,0,0.3)]">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p
              className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {stat.value}
            </p>
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-[0.15em]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
