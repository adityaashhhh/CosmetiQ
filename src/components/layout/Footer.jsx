import React from 'react';
import { Shield } from 'lucide-react';

/**
 * Footer — Minimal premium footer
 */
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[rgba(0,0,0,0.3)]">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-blue-500 flex items-center justify-center">
                <Shield size={14} className="text-white" />
              </div>
              <span
                className="text-lg font-extrabold tracking-tighter text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                CosmetiQ
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              AI-powered cosmetic compliance verification for COFEPRIS and global regulatory standards.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: ['Compliance Checker', 'Ingredient Database', 'API Access', 'Pricing'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'COFEPRIS Guide', 'Blog', 'Changelog'],
            },
            {
              title: 'Legal',
              links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4
                className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.15em] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} CosmetiQ. All rights reserved. Not affiliated with COFEPRIS.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="text-xs text-[var(--color-text-muted)]">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
