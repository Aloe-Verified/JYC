# JYC Note-Taking Frontend

A modern, Notion-like frontend for the JYC note-taking service built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Notion-like UI**: Clean, intuitive interface similar to popular note-taking apps
- **Document Management**: Create, view, and organize pages
- **Real-time API Integration**: Connects to your Spring Boot backend
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Built-in theme switching support
- **Search Functionality**: Find pages quickly with real-time search
- **Grid/List Views**: Toggle between different viewing modes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Your Spring Boot backend running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the landing page
5. Click "Enter App" or go to [http://localhost:3000/app/documents](http://localhost:3000/app/documents) for the main app

## API Integration

The frontend is configured to work with your Spring Boot backend:

- **POST /api/pages**: Creates new pages
- **GET /api/pages**: Retrieves all pages for the authenticated user
- **GET /api/pages/{id}**: Gets a specific page by ID

### Authentication

The app expects JWT authentication. Make sure your backend returns a valid JWT token that gets stored in localStorage as `authToken`.

## Key Components

### Documents Page (`/app/documents`)
- Main page showing all your documents
- "New Document" button that calls your `/api/pages` endpoint
- Search and filtering capabilities
- Grid and list view modes

### New Document Creation
- Click the "New Document" button in the top bar
- Or click the "New Page" card in grid view
- Enter a title and the page will be created via your API

### Navigation
- Sidebar navigation with Documents, Search, Favorites, and Settings
- Clean, modern design with proper active states

## Styling

The app uses Tailwind CSS with a custom design system:
- Consistent color palette
- Proper dark/light mode support
- Responsive breakpoints
- Smooth animations and transitions

## Backend Requirements

Your Spring Boot backend should have:
- CORS enabled for `http://localhost:3000`
- JWT authentication
- The `/api/pages` POST endpoint that accepts:
  ```json
  {
    "title": "Page Title",
    "position": 0,
    "parentId": null
  }
  ```

## Development

- **Hot Reload**: Changes are reflected immediately
- **TypeScript**: Full type safety throughout the codebase
- **ESLint**: Code quality and consistency
- **Component Library**: Reusable UI components

## Next Steps

Consider adding:
- Page editing functionality
- Drag and drop for reordering
- File uploads and attachments
- Real-time collaboration
- Page templates
- Export functionality
