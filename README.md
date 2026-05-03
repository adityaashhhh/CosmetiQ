<p align="center">
  <img src="https://img.shields.io/badge/🧪_CosmetiQ-COFEPRIS_Compliance-7C3AED?style=for-the-badge&labelColor=0a0a0f" alt="CosmetiQ" />
</p>

<h1 align="center">CosmetiQ</h1>

<p align="center">
  <strong>AI-Powered Cosmetic Compliance Checker for COFEPRIS Regulations</strong>
</p>

<p align="center">
  Analyze cosmetic formulations against Mexico's COFEPRIS regulatory database.<br/>
  Identify banned, restricted, and non-compliant ingredients in seconds.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

##  Features

| Feature | Description |
|---------|-------------|
|  **Smart Autocomplete** | Fuzzy search across 60+ INCI ingredient names as you type |
|  **Manual Input** | Add ingredients with name, concentration (%), and category |
|  **CSV Bulk Upload** | Drag & drop or browse to upload entire formulations at once |
|  **Real-time Analysis** | Instant COFEPRIS compliance validation per ingredient |
|  **Results Dashboard** | Visual breakdown with status badges, concentration bars, and notes |
|  **PDF Export** | Generate professional compliance reports ready for submission |
|  **Premium UI** | Dark glassmorphic theme inspired by Vercel, with smooth animations |
|  **Responsive** | Desktop-first design that works beautifully on all screen sizes |

---

## Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/cosmetiq.git
cd cosmetiq

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Start the Backend Server

```bash
cd server
npm run dev
```

The API will start at **http://localhost:3001**

### 3. Start the Frontend

Open a **new terminal**:

```bash
npm run dev
```

The app will open at **http://localhost:5173**

---

##  How to Use

1. **Navigate** to the Checker section on the homepage
2. **Add ingredients** manually using the smart autocomplete, or **upload a CSV** file
3. Click **"Analyze Compliance"** to run the formulation against COFEPRIS regulations
4. **Review results** — each ingredient gets a compliance status:
   -  **Compliant** — within safe limits
   -  **Restricted** — allowed but concentration-limited
   -  **Banned** — prohibited in cosmetics
   -  **Exceeds Limit** — concentration above safe threshold
5. **Export as PDF** for documentation or regulatory submission

### CSV Format

Your CSV file should have these columns:

```csv
name,concentration,category
Niacinamide,5,Active
Phenoxyethanol,0.9,Preservative
Hydroquinone,2,Active
```

A sample file is included at `public/sample-formulation.csv`.

---

##  Project Structure

```
cosmetiq/
├── index.html                     # Entry HTML
├── vite.config.js                 # Vite + Tailwind + API proxy
├── package.json                   # Frontend dependencies
│
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Root component + state management
│   ├── index.css                  # Design system + Tailwind v4 theme
│   │
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx         # Glassmorphic sticky navigation
│       │   └── Footer.jsx         # Premium footer with links
│       │
│       ├── sections/
│       │   ├── HeroSection.jsx    # Landing hero with animated CTA
│       │   ├── StatsSection.jsx   # Metrics bar (500+, 99.8%, etc.)
│       │   └── FeaturesSection.jsx# Bento-style feature cards
│       │
│       └── checker/
│           ├── IngredientInput.jsx    # Input form + autocomplete + CSV
│           └── ResultsDashboard.jsx   # Results view + PDF export
│
├── public/
│   └── sample-formulation.csv     # Sample CSV for testing
│
└── server/
    ├── index.js                   # Express server entry
    ├── package.json               # Backend dependencies
    ├── data/
    │   └── cofepris-database.js   # Mock COFEPRIS regulatory dataset (500+ ingredients)
    ├── services/
    │   └── analysisService.js     # Compliance analysis logic
    └── routes/
        └── complianceRoutes.js    # REST API route handlers
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Analyze a list of ingredients for COFEPRIS compliance |
| `GET` | `/api/search?q=` | Search the ingredient database by name |
| `GET` | `/api/health` | Server health check |

### Example: Analyze Ingredients

```bash
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": [
      { "name": "Niacinamide", "concentration": 5, "category": "Active" },
      { "name": "Hydroquinone", "concentration": 2, "category": "Active" },
      { "name": "Phenoxyethanol", "concentration": 0.9, "category": "Preservative" }
    ]
  }'
```

### Example Response

```json
{
  "overallStatus": "non_compliant",
  "summary": {
    "total": 3,
    "compliant": 1,
    "flagged": 2,
    "restricted": 1,
    "banned": 1
  },
  "ingredients": [
    {
      "name": "Niacinamide",
      "concentration": 5,
      "status": "compliant",
      "safeLimit": 10,
      "reason": "Within safe concentration limits"
    }
  ]
}
```

---

##  Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 | UI components & state management |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with custom design tokens |
| **Animations** | Framer Motion | Smooth page transitions & micro-interactions |
| **Bundler** | Vite 8 | Fast HMR & build tooling |
| **Backend** | Express 5 | REST API server |
| **PDF** | jsPDF + AutoTable | Client-side PDF report generation |
| **CSV** | PapaParse | CSV parsing for bulk uploads |
| **Icons** | Lucide React | Clean, consistent iconography |

---

##  Design System

The app uses a custom dark theme with these design tokens:

- **Surface colors**: Deep blacks with subtle elevation (`#0a0a0f`, `#111118`)
- **Accent**: Purple gradient (`#a78bfa` → `#7c3aed`)
- **Status colors**: Green (compliant), Orange (restricted), Red (banned), Yellow (exceeds)
- **Typography**: Plus Jakarta Sans (headings) + Inter (body)
- **Effects**: Glassmorphism cards, radial glow backgrounds, floating orb animations

---

##  License

MIT — Built for educational and portfolio purposes. Not affiliated with COFEPRIS.
