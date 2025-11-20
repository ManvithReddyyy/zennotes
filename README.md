# 🧘‍♂️ ZenNotes

A **production-ready**, ultra-minimal note-taking application built with Next.js 15, featuring offline-first architecture, real-time sync, and full PWA support.

## ✨ Features

### 🔐 Authentication
- Email/password authentication via Supabase
- Secure session management with cookies
- Protected routes with middleware
- Password reset functionality

### 📝 Note Management
- Create, read, update, delete notes
- Auto-save with 1-second debounce
- Rich text editing with auto-resizing textarea
- Soft delete with restore from trash
- Favorite notes for quick access
- Color-coded tags (personal, work, ideas, todo, archive)
- Server-side search across titles and content

### 🌐 Offline Support
- Full offline read/write capabilities
- IndexedDB for local storage
- Automatic sync when online
- Conflict resolution (server wins)
- Sync queue for pending changes
- Visual offline indicator

### 📱 Progressive Web App
- Fully installable on mobile & desktop
- Service worker with Workbox
- Cached static assets and pages
- Offline fallback support
- App manifest for native-like experience

### 🎨 Design
- Ultra-minimal aesthetic (Notion/Linear/Apple Notes inspired)
- Light & dark mode support
- Inter font family
- Extensive whitespace
- Soft shadows, no borders
- Smooth Framer Motion animations

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Offline**: IndexedDB (idb)
- **PWA**: @ducanh2912/next-pwa
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([supabase.com](https://supabase.com))

### 1. Clone & Install

```bash
cd zennotes
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** → **API**
3. Copy your **Project URL** and **anon/public key**

### 3. Create Database Schema

1. Open your Supabase project
2. Go to **SQL Editor**
3. Run the migration script from `supabase-migration.sql`

This will create:
- `notes` table with proper indexes
- Row Level Security (RLS) policies
- Auto-update trigger for `updated_at`

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### Creating Notes

1. Click **"New note"** button
2. Enter title and content
3. Add optional tag and favorite
4. Notes auto-save after 1 second

### Organizing Notes

- **Favorite**: Click star icon to add to favorites
- **Tag**: Select from 5 color-coded tags
- **Search**: Use search bar for instant filtering
- **Delete**: Move to trash (soft delete)
- **Restore**: Restore from trash

### Offline Mode

- Works fully offline after initial load
- Creates/edits notes locally
- Syncs automatically when online
- Shows offline indicator banner

### Installing as PWA

**Desktop (Chrome/Edge)**:
1. Click install icon in address bar
2. Click "Install"

**Mobile (iOS)**:
1. Safari → Share → Add to Home Screen

**Mobile (Android)**:
1. Chrome → Menu → Install App

## 🔧 Development

### Code Quality

```bash
# Lint
npm run lint

# Format (if using Prettier CLI)
npx prettier --write .
```

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own notes
- Secure cookie-based sessions
- Environment variables for sensitive data

## 📝 License

MIT License - feel free to use this project as you wish!

---

**Built with ❤️ using Next.js 15 and Supabase**
