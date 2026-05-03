import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Shield, Sparkles } from 'lucide-react';

/**
 * Navbar — Premium sticky navigation bar
 * Inspired by Vercel's minimal, glassmorphic header
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Checker', href: '#checker' },
    { label: 'Docs', href: '#' },
    { label: 'API', href: '#' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,10,15,0.8)] backdrop-blur-2xl border-b border-[var(--color-border)] shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-8 md:px-12 py-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <Shield size={16} className="text-white" />
          </div>
          <span
            className="text-xl font-extrabold tracking-tighter text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            CosmetiQ
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#checker"
            className="btn-primary px-5 py-2.5 rounded-full text-sm flex items-center gap-2"
          >
            <Sparkles size={14} />
            Start Scanning
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[rgba(10,10,15,0.95)] backdrop-blur-2xl border-b border-[var(--color-border)] px-6 pb-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-[var(--color-text-secondary)] hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#checker"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4 px-5 py-3 rounded-xl text-sm text-center block"
          >
            Start Scanning
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

export default Navbar;
