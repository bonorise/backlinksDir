# Backlinks Directory Project Requirements

## Overview
A directory website for sharing free and paid backlink opportunities, with data stored in markdown files on GitHub and deployed to Vercel.

## Core Features

### 1. Data Structure
- **Table Fields:**
  - Website Name
  - Description
  - Categories/Tags
  - Pricing Type (Free/Paid)
  - Domain Authority
  - Monthly Traffic
  - URL
  - Click Count (for analytics)

### 2. UI/UX Features
- **View Options:**
  - Table View (default)
  - Card View (alternative)
- **Theme:**
  - Light/Dark mode support
  - Responsive design for all devices
- **Loading:**
  - Initial load: 200 items
  - "Show More" button for additional 200 items
  - Progressive loading for better performance

### 3. Navigation & Search
- **Hero Section:**
  - Search bar
  - Category/Tag filters
- **Sorting:**
  - Sortable columns (especially numeric fields)
  - Default sort by Domain Authority
- **Filtering:**
  - By categories/tags
  - By pricing type (free/paid)
- **Tags:**
  - Multiple tags per website
  - Tag-based filtering

### 4. Analytics
- **Click Tracking:**
  - Track outbound link clicks
  - Store click counts per URL
  - Display popularity metrics

### 5. Submission System
- **GitHub-based Submissions:**
  - Direct PR submissions
  - Required field: Backlink URL
  - Optional fields: All other metadata

### 6. Visual Indicators
- **Status Indicators:**
  - Popular/Hot item indicators
  - Free/Paid badges
  - Domain Authority strength

## Technical Architecture

### 1. Frontend
- Next.js
- Tailwind CSS
- shadcn/ui components
- Responsive design
- Dark mode support

### 2. Data Management
- Markdown files in GitHub
- JSON schema for structured data
- Git-based version control

### 3. Deployment
- Vercel hosting
- GitHub repository (public)
- Automated deployments

## Future Features (Phase 2)
- User registration system
- Rating system
- RSS feeds
- Submission guidelines
- Comment system

## Project Structure
```
/
├── app/
│   ├── page.tsx (main listing)
│   ├── layout.tsx
│   └── [category]/
│       └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── listing/
│   │   ├── table-view.tsx
│   │   └── card-view.tsx
│   └── shared/
│       ├── search.tsx
│       └── tags.tsx
├── lib/
│   ├── utils.ts
│   └── types.ts
├── data/
│   └── backlinks/ (markdown files)
└── docs/
    └── REQUIREMENTS.md
```

## Data Schema (Markdown Frontmatter)
```yaml
---
title: "Website Name"
description: "Site description"
url: "https://example.com"
categories: ["seo", "directories"]
isPaid: false
domainAuthority: 50
monthlyTraffic: 100000
featured: false
---
```