# IT-vate Solutions Portfolio Website

A modern, responsive portfolio website for IT-vate Solutions, a company specializing in embedded systems, IoT development, and professional training services.


## Features

- 📱 Fully responsive design optimized for all screen sizes
- 🎨 Modern UI with Tailwind CSS and Shadcn UI components
- 📄 Comprehensive content pages (Home, About, Services, Blog, Careers, Contact)
- 📝 Blog system with reading time calculation
- 📊 Dynamic content rendering
- 📬 Contact form with validation
- 🔍 SEO optimized metadata
- 🌐 Easy navigation with smooth scrolling

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: Wouter (lightweight router)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Shadcn UI
- **State Management**: React Query
- **API Integration**: Custom API client
- **Backend**: Express.js
- **Build Tool**: Vite

## Project Structure

```
/
├── client/ # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/ # Custom React hooks
│   │   ├── lib/ # Utility functions, API clients
│   │   ├── pages/ # Page components
│   │   └── utils/ # Helper functions
│   ├── index.html # HTML entry point
│   └── ...
├── server/ # Backend Express application
│   ├── index.ts # Server entry point
│   ├── routes.ts # API routes
│   ├── storage.ts # Data storage interface
│   └── ...
├── shared/ # Shared code between client and server
│   └── schema/ # Data schemas
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/itvate-portfolio.git
cd itvate-portfolio

npm install
# or
yarn install

npm run dev
# or
yarn dev
```
