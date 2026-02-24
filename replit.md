# OptiGest - Inventory Management System

## Overview
OptiGest is a product and supplier management system (Sistema de Gestão de Estoque). It provides CRUD operations for products and suppliers, with the ability to associate products with suppliers.

## Project Architecture
- **Frontend**: Next.js 15 (React 19) with Tailwind CSS 4, running on port 5000
- **Backend**: Express.js REST API, running on port 3001
- **Database**: SQLite via better-sqlite3 (file: `backend/database.db`)
- **File Uploads**: Multer for product image uploads (stored in `backend/uploads/`)

## Structure
```
frontend/           - Next.js frontend application
  app/              - Next.js App Router pages and components
    components/     - Reusable React components
    lib/            - Utility libraries (Chart.js registration)
    products/       - Products page
    suppliers/      - Suppliers page
    associations/   - Product-Supplier associations page
  public/           - Static assets
backend/            - Express.js API server
  controllers/      - Route handlers (Product, Supplier, ProductsSuppliers)
  database/         - Database initialization (better-sqlite3)
  uploads/          - Uploaded product images
  routes.js         - API route definitions
  server.js         - Server entry point
```

## Key Configuration
- Frontend proxies API requests via Next.js rewrites: `/api/*` -> `http://localhost:3001/*`
- Image uploads are proxied via: `/uploads/*` -> `http://localhost:3001/uploads/*`
- Backend uses better-sqlite3 (synchronous API) for SQLite database access
- Next.js downgraded from v16 to v15 for Node.js 20 compatibility

## Recent Changes
- 2026-02-24: Initial Replit setup
  - Switched from sqlite3 to better-sqlite3 (native module compatibility)
  - Replaced all hardcoded `http://localhost:3001` URLs with relative paths (`/api/` prefix)
  - Added Next.js rewrites for API proxying
  - Configured Next.js to run on port 5000 with 0.0.0.0 binding
  - Downgraded Next.js from 16.1.6 to 15.3.3 for Node.js 20 compatibility
