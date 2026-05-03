import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldX, AlertTriangle, Ban, Info,
  FileDown, ArrowLeft, CheckCircle, XCircle, AlertCircle,
  ListChecks,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * ResultsDashboard — Premium compliance results view
 * Shows overall status, summary stats, and per-ingredient breakdown
 */

const STATUS_CONFIG = {
  compliant: {
    label: 'Compliant',
    icon: CheckCircle,
    badgeClass: 'badge-compliant',
    color: 'var(--color-success)',
    barColor: '#34d399',
  },
  banned: {
    label: 'Banned',
    icon: XCircle,
    badgeClass: 'badge-banned',
    color: 'var(--color-danger)',
    barColor: '#f87171',
  },
  restricted: {
    label: 'Restricted',
    icon: AlertCircle,
    badgeClass: 'badge-restricted',
    color: 'var(--color-orange)',
    barColor: '#fb923c',
  },
  exceeds_limit: {
    label: 'Exceeds Limit',
    icon: AlertTriangle,
    badgeClass: 'badge-exceeds',
    color: 'var(--color-warning)',
    barColor: '#fbbf24',
  },
};

function ResultsDashboard({ results, onReset }) {
  if (!results) return null;

  const isError = results.overallStatus === 'error';
  const isCompliant = results.overallStatus === 'compliant';

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CosmetiQ Compliance Report', 20, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Generated: ${now}`, 20, 33);
    doc.text('Regulation: COFEPRIS (Mexico)', 20, 39);

    // Overall Status
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isCompliant ? 34 : 220, isCompliant ? 197 : 38, isCompliant ? 94 : 38);
    doc.text(
      `Overall Status: ${isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`,
      20,
      52
    );

    // Summary
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Ingredients: ${results.summary.total}`, 20, 62);
    doc.text(`Compliant: ${results.summary.compliant}`, 20, 68);
    doc.text(`Flagged: ${results.summary.flagged}`, 20, 74);
    doc.text(`Restricted: ${results.summary.restricted}`, 20, 80);
    doc.text(`Banned: ${results.summary.banned}`, 20, 86);

    // Table
    const tableData = results.ingredients.map((ing) => [
      ing.name,
      `${ing.concentration}%`,
      ing.safeLimit !== null && ing.safeLimit !== undefined ? `${ing.safeLimit}%` : 'N/A',
      ing.status.replace('_', ' ').toUpperCase(),
      ing.reason || '-',
    ]);

    autoTable(doc, {
      startY: 95,
      head: [['Ingredient', 'Conc.', 'Safe Limit', 'Status', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [124, 58, 237] },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 40 },
        4: { cellWidth: 50 },
      },
    });

    doc.save('cosmetiq-compliance-report.pdf');
  };

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card rounded-2xl p-10 text-center glow-danger">
          <XCircle size={48} className="text-[var(--color-danger)] mx-auto mb-4" />
          <h3
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Analysis Failed
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">{results.error}</p>
          <button
            onClick={onReset}
            className="btn-secondary px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ${
          isCompliant ? 'glow-success' : 'glow-danger'
        }`}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -mr-20 -mt-20"
          style={{
            background: isCompliant
              ? 'rgba(52, 211, 153, 0.1)'
              : 'rgba(248, 113, 113, 0.1)',
          }}
        />

        <div className="relative z-10">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: isCompliant ? 'var(--color-success)' : 'var(--color-danger)' }}
          >
            Overall Compliance Status
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isCompliant ? 'var(--color-success)' : 'var(--color-danger)',
              textShadow: isCompliant
                ? '0 0 30px rgba(52, 211, 153, 0.3)'
                : '0 0 30px rgba(248, 113, 113, 0.3)',
            }}
          >
            {isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
          </h2>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {isCompliant ? (
            <ShieldCheck size={56} className="text-[var(--color-success)]" />
          ) : (
            <ShieldX size={56} className="text-[var(--color-danger)]" />
          )}
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: results.summary.total, icon: ListChecks, color: 'var(--color-accent)' },
          { label: 'Compliant', value: results.summary.compliant, icon: CheckCircle, color: 'var(--color-success)' },
          { label: 'Flagged', value: results.summary.flagged, icon: AlertTriangle, color: 'var(--color-warning)' },
          { label: 'Banned', value: results.summary.banned, icon: Ban, color: 'var(--color-danger)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card rounded-xl p-5"
          >
            <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ingredient Results List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ingredient Analysis
          </h3>
        </div>

        <div className="space-y-3">
          {results.ingredients.map((ing, i) => {
            const config = STATUS_CONFIG[ing.status] || STATUS_CONFIG.compliant;
            const StatusIcon = config.icon;
            const percentage =
              ing.safeLimit > 0
                ? Math.min((ing.concentration / ing.safeLimit) * 100, 100)
                : ing.status === 'banned'
                ? 100
                : 0;

            return (
              <motion.div
                key={`${ing.name}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                className={`glass-card rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 transition-all hover:bg-white/[0.04] ${
                  ing.status === 'banned'
                    ? 'border-l-4 border-l-[var(--color-danger)]'
                    : ing.status === 'restricted'
                    ? 'border-l-4 border-l-[var(--color-orange)]'
                    : ing.status === 'exceeds_limit'
                    ? 'border-l-4 border-l-[var(--color-warning)]'
                    : ''
                }`}
              >
                {/* Name + Badge */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-lg">{ing.name}</span>
                    <span className={`${config.badgeClass} px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {ing.category || 'General'}
                  </p>
                </div>

                {/* Concentration Bar */}
                <div className="w-full md:w-56">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[var(--color-text-muted)]">Concentration</span>
                    <span
                      className="font-semibold"
                      style={{ color: config.color }}
                    >
                      {ing.concentration}% / {ing.safeLimit !== null && ing.safeLimit !== undefined ? `${ing.safeLimit}%` : 'N/A'} limit
                    </span>
                  </div>
                  <div className="concentration-bar">
                    <div
                      className="concentration-fill"
                      style={{
                        width: `${percentage}%`,
                        background: config.barColor,
                      }}
                    />
                  </div>
                </div>

                {/* Reason / Notes */}
                <div className="flex items-center gap-2 min-w-[160px] md:justify-end">
                  <Info size={14} style={{ color: config.color }} />
                  <span className="text-xs" style={{ color: config.color }}>
                    {ing.reason || 'Within safe limits'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
        <button
          onClick={onReset}
          className="btn-secondary px-8 py-3.5 rounded-xl flex items-center justify-center gap-2"
          id="reset-btn"
        >
          <ArrowLeft size={16} />
          New Analysis
        </button>
        <button
          onClick={exportPDF}
          className="btn-primary px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 group"
          id="export-pdf-btn"
        >
          <FileDown size={16} className="group-hover:rotate-12 transition-transform" />
          Export as PDF
        </button>
      </div>
    </motion.div>
  );
}

export default ResultsDashboard;
