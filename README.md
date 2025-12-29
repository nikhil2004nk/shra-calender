# Shra Calendar

A modern, responsive calendar application for tracking Shraddha Kapoor's movies, events, and upcoming releases. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📅 **Interactive Calendar View** - Navigate through months and years to view events
- 🎬 **Movie Tracking** - Browse and filter movies by year and type
- 🎯 **Event Management** - View detailed information about upcoming events
- 🔍 **Global Search** - Search across all movies and events
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast builds

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Powerful data synchronization
- **Date-fns** - Modern date utility library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nikhil2004nk/shra-calendar.git
cd shra-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect the Vite configuration and deploy

The project includes a `vercel.json` configuration file for optimal deployment settings.

### GitHub Pages

For GitHub Pages deployment, use:

```bash
npm run deploy
```

Note: Make sure to set the `VITE_BASE_URL` environment variable to match your repository path (e.g., `/shra-calendar/`).

## Project Structure

```
shra-calendar/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── data/           # Static data and JSON files
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles
├── public/             # Static assets
└── dist/               # Production build output
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Author

Built with ❤️ by [nikhil2004nk](https://github.com/nikhil2004nk)
