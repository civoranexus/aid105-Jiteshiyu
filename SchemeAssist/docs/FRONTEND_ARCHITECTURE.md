# Frontend Architecture

The frontend is built using React with a modular, scalable structure.

## Folder Structure

client/
├── components/     # Reusable UI components
├── pages/          # Route-level pages
├── services/       # API interaction layer
├── App.jsx         # Route composition
├── main.jsx        # Application bootstrap
└── index.css       # Global styles

## Architectural Decisions
- React Router is used for client-side navigation
- Global styles are defined in index.css
- Page-specific styles are scoped to individual CSS files
- Layout components (Navbar, Footer) are reusable and extensible

## Routing Strategy
- Routes are defined centrally
- Legal and informational pages are first-class routes
