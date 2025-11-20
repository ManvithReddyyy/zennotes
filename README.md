# ZenNotes

<div align="center">

**A modern, minimalist note-taking application built for productivity**

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#features) • [Demo](#demo) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## Overview

ZenNotes is a production-ready, offline-first note-taking application designed for teams and individuals who value simplicity and performance. Built with modern web technologies, it offers seamless synchronization, robust offline capabilities, and an intuitive user experience.

### Key Highlights

- 🚀 **Blazing Fast** - Built on Next.js 15 with optimized performance
- 📱 **Progressive Web App** - Install on any device, works offline
- 🔒 **Secure by Default** - Row-level security with Supabase
- 🎨 **Beautiful UI** - Minimal design with dark mode support
- ⚡ **Real-time Sync** - Automatic synchronization across devices
- 🔍 **Powerful Search** - Find notes instantly with full-text search

---

## Features

### Core Functionality

- **Rich Note Management**
  - Create, edit, and organize notes with ease
  - Tag-based categorization (Personal, Work, Ideas)
  - Favorite important notes for quick access
  - Soft delete with trash recovery

- **Offline-First Architecture**
  - Full functionality without internet connection
  - Automatic background synchronization
  - Conflict resolution with server-wins strategy
  - IndexedDB for local persistence

- **Modern User Experience**
  - Responsive design for all screen sizes
  - Mobile-optimized with sliding sidebar
  - Smooth animations with Framer Motion
  - Light and dark theme support

- **Enterprise Security**
  - Supabase authentication
  - Row-level security (RLS) policies
  - Secure session management
  - Protected API routes

---

## Demo

**Live Application:** https://vercel.com/manvithreddyaddula-8636s-projects/zennotes/deployments

### Screenshots

*Coming soon - Add screenshots of your application*

---

## Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Supabase Account** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zennotes.git
   cd zennotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Run the SQL migration in your Supabase SQL Editor:
   ```bash
   # Copy contents of supabase-migration.sql
   # Paste and execute in Supabase Dashboard > SQL Editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Documentation

### Project Structure

```
zennotes/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── notes/             # Notes pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── supabase.ts       # Supabase client
│   ├── idb.ts            # IndexedDB wrapper
│   └── sync-engine.ts    # Offline sync logic
├── store/                 # Zustand state management
├── public/                # Static assets
└── supabase-migration.sql # Database schema
```

### Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **State Management** | Zustand |
| **Animations** | Framer Motion |
| **Offline Storage** | IndexedDB |
| **PWA** | @ducanh2912/next-pwa |

### Configuration

#### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to **Settings** > **API**
3. Copy your **Project URL** and **anon/public key**
4. Run the migration script in **SQL Editor**

#### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Add environment variables
   - Deploy

3. **Configure Environment Variables**
   
   In Vercel Dashboard > Settings > Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Other Platforms

ZenNotes can be deployed to any platform that supports Next.js:
- **Netlify** - Full Next.js support
- **Azure Static Web Apps** - With Node.js runtime
- **AWS Amplify** - Serverless deployment
- **Self-hosted** - Docker or Node.js server

---

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality

- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Git Hooks** - Pre-commit checks (optional)

---

## Contributing

We welcome contributions from the community! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## Roadmap

- [ ] Markdown support for rich text editing
- [ ] Custom tags and categories
- [ ] Note sharing and collaboration
- [ ] Export notes (PDF, Markdown)
- [ ] Browser extensions
- [ ] Mobile apps (iOS/Android)
- [ ] API for third-party integrations

---

## Support

### Getting Help

- **Documentation** - Check this README and inline code comments
- **Issues** - [GitHub Issues](https://github.com/yourusername/zennotes/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/zennotes/discussions)

### Reporting Bugs

Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, etc.)

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built with ❤️ using:
- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<div align="center">

**Made with precision and care**

[Website](https://zennotes.app) • [Twitter](https://twitter.com/zennotes) • [LinkedIn](https://linkedin.com/company/zennotes)

</div>
