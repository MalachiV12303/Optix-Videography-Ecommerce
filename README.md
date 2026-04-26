Live Demo: https://optixstore.vercel.app  
Started: October 2024

## Overview
A full-stack mock ecommerce platform for cameras, lenses, and drones. Built to practice database design, API development, and integrating dynamic data into a modern frontend.

## Key Features
- Product listings backed by PostgreSQL and managed with Drizzle ORM  
- Debounced search to efficiently filter products  [See File](/app/ui/SearchBar.tsx)
- Shopping cart state management using react-use-cart  [See File](/app/Cart.tsx)
- Interactive 3D landing elements built with Three.js  [See File](/app/ui/LandingDrei.tsx)

## Tech Stack
**Frontend:**
- Next.js
- TypeScript
- Tailwind CSS
- Three.js

**Backend:**
- Next.js API routes
- PostgreSQL
- Drizzle ORM
- Vercel Blob (asset storage)

## Architecture & Implementation
- Designed a relational schema for product and asset data  [See File](/app/lib/db/schema.ts)
- Built a REST API route for search and data retrieval  [See File](/app/api/search/route.ts)
- Structured the frontend with reusable components and hooks  
- Integrated 3D elements alongside live data without blocking UI performance  

## Notable Technical Challenges
- **Search Performance**  
  Implemented debounced input to reduce unnecessary API calls and improve responsiveness.

- **Coordinating Blob Storage with Database Records**  
  Structured the system so product metadata lives in PostgreSQL while media assets are stored in Vercel Blob, requiring consistent mapping between stored URLs and database entries.

- **3D Rendering vs Performance**  
  Integrated Three.js in a way that didn’t interfere with core UI rendering or load times.

## Performance & Optimization
- Reduced API load with debounced requests  
- Minimized unnecessary re-renders through component structure  
- Controlled asset loading for smoother interactions  

## What I Learned
- Designing relational data models for real applications  
- Structuring API routes for clean data flow  
- Balancing visual features with performance constraints  
