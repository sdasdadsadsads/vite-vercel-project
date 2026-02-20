# Vite + React + Vercel

This is a modern web development setup using Vite, React, and ready for deployment on Vercel.

## Features

- ⚡️ **Vite** - Next generation frontend tooling
- ⚛️ **React 18** - UI library
- 🚀 **Vercel Ready** - Optimized for Vercel deployment
- 🔥 **Fast Refresh** - Instant feedback during development

## Getting Started

### Prerequisites
- Node.js 16+ and npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview production build locally
npm run preview
```

## Deployment on Vercel

This project is configured to deploy on Vercel with the `vercel.json` file.

### Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Deploy with GitHub

1. Push your code to GitHub
2. Import the repository in Vercel dashboard
3. Vercel will automatically detect Vite and configure the build settings

## Project Structure

```
project-root/
├── src/
│   ├── main.jsx          # Application entry point
│   ├── App.jsx           # Root React component
│   ├── App.css           # App styles
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Vercel Documentation](https://vercel.com/docs)