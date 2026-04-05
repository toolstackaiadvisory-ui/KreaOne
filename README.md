# KreaOne — Market Research Ops Platform

A high-fidelity SaaS demo prototype for pitch presentations.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** for data visualisation
- **Lucide React** for icons

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Folder Structure

```
kreaone/
├── app/
│   ├── globals.css          # Global styles + animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Entry point
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx     # Main shell with routing
│   │   └── Sidebar.tsx      # Navigation sidebar
│   ├── ui/
│   │   └── index.tsx        # Shared UI primitives
│   ├── dashboard/
│   │   └── Dashboard.tsx    # Main dashboard
│   ├── projects/
│   │   ├── Projects.tsx     # Project list
│   │   └── ProjectDetail.tsx# Project drill-down
│   ├── vendors/
│   │   └── Vendors.tsx      # Vendor management
│   ├── panel/
│   │   └── Panel.tsx        # Panel management
│   ├── cati/
│   │   └── CatiDashboard.tsx# CATI operations
│   └── finance/
│       └── Finance.tsx      # Finance P&L
└── lib/
    └── data.ts              # All mock data
```

## Screens

| Screen | Description |
|--------|-------------|
| **Dashboard** | KPI cards, IR trend, revenue vs cost, project progress, alerts |
| **Projects** | Full project list with status, progress, risk badges |
| **Project Detail** | 4 tabs: Overview, Vendors, Panel, CATI |
| **Vendors** | Tier system (Gold/Silver/Bronze), fraud rate, performance chart |
| **Panel** | Panelist cards with quality scores, filters |
| **CATI** | Live interviewer status, hourly call volume, shift tracker |
| **Finance** | P&L table, margin trend, revenue mix by methodology |

## Design System

- **Background**: `#0b0e15` (deep dark)
- **Cards**: `#131c2e` (dark navy)
- **Accent**: `#e8651a` (dark orange)
- **Font Display**: Syne (headings)
- **Font Body**: DM Sans
- **Status**: Green (on track) · Amber (at risk) · Red (delayed)

## Notes

- All data is mock — no backend or database required
- Navigation is client-side only
- Charts use Recharts with custom dark-themed tooltips
- Insight boxes provide AI-style narrative commentary on each screen
- Animations use CSS keyframes with staggered delays for a polished feel
