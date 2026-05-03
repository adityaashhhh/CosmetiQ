/**
 * CosmetiQ — Express Server
 * 
 * Backend API for COFEPRIS cosmetic compliance checking.
 * Provides ingredient analysis, search, and health endpoints.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const complianceRoutes = require('./routes/complianceRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// Middleware
// ==========================================

// Security headers
app.use(helmet());

// CORS — allow frontend dev server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Request logging
app.use(morgan('dev'));

// JSON body parsing
app.use(express.json({ limit: '1mb' }));

// ==========================================
// Routes
// ==========================================

app.use('/api', complianceRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'CosmetiQ Compliance API',
    version: '1.0.0',
    description: 'COFEPRIS cosmetic ingredient compliance checker',
    endpoints: {
      'POST /api/analyze': 'Analyze ingredients for compliance',
      'GET /api/search?q=': 'Search ingredient database',
      'GET /api/health': 'Health check',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   🧪 CosmetiQ Compliance API                ║
  ║   ─────────────────────────────              ║
  ║   Server:     http://localhost:${PORT}          ║
  ║   Regulation: COFEPRIS (Mexico)              ║
  ║   Status:     Ready                          ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
