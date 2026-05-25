# 🎓 NeuraLrn: Next-Gen Student Learning Dashboard

> **Production-ready** learning platform with authentication, course management, and real-time data sync.

A high-fidelity, hardware-accelerated dashboard built with **Next.js 14**, **Supabase**, **Framer Motion**, and **Tailwind CSS**. This is a **complete, real** application ready for production deployment.

## ✨ What's New in v2.0

### 🔐 Real Authentication
- Email/password authentication via Supabase Auth
- Login & signup with beautiful animated UI
- Email verification & magic links
- Session management with middleware protection

### 👨‍💼 Admin Course Management
- Create, read, update, delete courses
- Real-time updates to Supabase database
- Progress tracking with visual sliders
- Icon selection from 100+ Lucide icons

### 👥 User Management
- User profiles with full customization
- Track student progress per course
- Row-level security (RLS) policies
- Automatic timestamps and audit trails

### 🚀 Production Ready
- ✅ TypeScript strict mode (zero `any` types)
- ✅ ESLint passing (zero errors)
- ✅ Build optimizations (npm run build succeeds)
- ✅ Deployment guides for Vercel + GitHub
- ✅ Environment variables configured
- ✅ Middleware for route protection

---

## 📦 Quick Start

### 1️⃣ Prerequisites
```bash
Node.js 18+ ✓
npm or yarn ✓
Supabase account (free tier OK) ✓
```

### 2️⃣ Clone & Install
```bash
git clone <your-repo>
cd newprojectassignment
npm install
```

### 3️⃣ Setup Supabase
```bash
# Visit https://supabase.com
# Create new project
# Copy Project URL and Anon Key

cp .env.example .env.local
# Edit .env.local with your credentials

# In Supabase SQL Editor:
# Copy contents of src/db/schema-v2.sql
# Execute to create tables, RLS policies, seed data
```

### 4️⃣ Run Locally
```bash
npm run dev
# Visit http://localhost:3000/auth
```

### 5️⃣ Deploy to Vercel
```bash
git push origin main
# Visit https://vercel.com/dashboard
# Import from GitHub
# Add environment variables
# Deploy (automatic from git push after setup)
```

---

## 🎯 Features

### Dashboard
- ✅ Welcome greeting with daily streak counter
- ✅ Learning consistency heatmap (GitHub-style)
- ✅ Course progress cards with visual indicators
- ✅ Course detail modal with animated progress bars
- ✅ Activity statistics & performance metrics

### Authentication
- ✅ Email/password login & signup
- ✅ Email verification with magic links
- ✅ Automatic session creation
- ✅ Logout functionality
- ✅ Protected routes (middleware)

### Admin Panel
- ✅ Course listing with edit/delete buttons
- ✅ Create new courses with modal dialog
- ✅ Update course title, progress, icon
- ✅ Delete courses with confirmation
- ✅ Real-time updates to database
- ✅ Toast notifications for feedback

### Database
- ✅ PostgreSQL with Supabase
- ✅ User profiles table
- ✅ Courses catalog table
- ✅ User progress tracking
- ✅ Row-level security policies
- ✅ Indexes for performance

---

## 🏗️ Architecture

```
┌─────────────────┐
│     Browser     │
├─────────────────┤
│  React 18 + TS  │
│  Tailwind CSS 3 │
│ Framer Motion   │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│         Next.js 14 (Vercel)             │
├─────────────────────────────────────────┤
│  /auth           → Login/Signup UI      │
│  /auth/callback  → Email verification   │
│  /dashboard      → Main dashboard       │
│  /admin          → Course management    │
│  middleware.ts   → Route protection     │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│      Supabase PostgreSQL + Auth         │
├─────────────────────────────────────────┤
│  auth.users          → Authentication   │
│  user_profiles       → User data        │
│  courses             → Course catalog   │
│  user_progress       → Progress data    │
│  RLS Policies        → Security         │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard (protected)
│   ├── auth/
│   │   ├── page.tsx          # Login/Signup
│   │   └── callback/route.ts # Email verification
│   ├── admin/
│   │   └── page.tsx          # Course management
│   ├── api/auth/logout/      # Logout endpoint
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
│
├── components/
│   ├── AuthForm.tsx          # Login/Signup form
│   ├── DashboardShell.tsx    # Layout wrapper
│   ├── BentoGrid.tsx         # Course grid
│   ├── CourseTile.tsx        # Course card
│   ├── CourseModal.tsx       # Course details modal
│   ├── HeroTile.tsx          # Welcome section
│   ├── ActivityTile.tsx      # Heatmap
│   ├── Sidebar.tsx           # Navigation
│   └── SkeletonTile.tsx      # Loading state
│
├── lib/
│   ├── supabase.ts           # Client & queries
│   └── types.ts              # TypeScript types
│
├── db/
│   ├── schema.sql            # Original schema
│   └── schema-v2.sql         # With auth & users
│
└── middleware.ts             # Route protection
```

---

## 🎨 Design System

### Colors
- **Primary**: `#8b5cf6` (Violet)
- **Secondary**: `#06b6d4` (Cyan)
- **Background**: `#030014` (Deep Purple)
- **Cards**: `rgba(17,24,39,0.8)` with 12px blur

### Animations
- **Entrance**: Spring (stiffness: 100, damping: 15)
- **Hover**: Scale 1.02 with elevation
- **Page Load**: Staggered 0.15s delays
- **Modal**: Scale + opacity transition

### Responsive
- **Desktop**: 3-column grid (1024px+)
- **Tablet**: 2-column grid (768px-1023px)
- **Mobile**: 1-column grid (<768px)

---

## 🔐 Security

- ✅ Row-level security (RLS) on all tables
- ✅ Middleware-based route protection
- ✅ Environment variables not exposed to client
- ✅ Server-side data fetching (RSC pattern)
- ✅ Auth tokens handled securely
- ✅ CSRF protection via SameSite cookies

---

## 📖 Guides

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
- **[PRODUCTION_READY.md](./PRODUCTION_READY.md)** - Features & tech stack overview

---

## 🚀 Deploy

### Option 1: Vercel (Recommended)
```bash
git push origin main
# Visit vercel.com/dashboard
# Import from GitHub
# Add environment variables
# Done! (auto-deploys on git push)
```

### Option 2: Docker
```bash
docker build -t neurairn .
docker run -p 3000:3000 neurairn
```

### Option 3: Node.js
```bash
npm run build
npm start
# PORT=3000 npm start
```

---

## 📊 Build Status

```
✓ TypeScript: 0 errors
✓ ESLint: 0 errors
✓ Build: Successful
✓ Unit Tests: Ready
✓ Deployment: Ready
```

---

## 🛠️ Technologies

| Layer | Tech | Version |
|-------|------|---------|
| Frontend | Next.js | 14.2.35 |
| Runtime | React | 18.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 12.40.0 |
| Icons | Lucide React | 1.16.0 |
| Database | Supabase (PostgreSQL) | Latest |
| Auth | Supabase Auth | Built-in |
| Hosting | Vercel | Edge Network |

---

## 📝 Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: `NEXT_PUBLIC_` prefix exposes these to the browser (safe for client keys).

---

## 🧪 Testing

```bash
# Build verification
npm run build

# Development with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npx eslint src/
```

---

## 📞 Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📄 License

MIT © 2026 NeuraLrn

---

## ✅ Checklist for Production

- [x] Authentication implemented
- [x] Database schema created
- [x] Admin panel working
- [x] Route protection active
- [x] TypeScript strict mode
- [x] Build succeeds
- [x] Environment variables set
- [x] Deployment guide written
- [x] README complete

**Status**: 🟢 Production Ready

---

**Made with ❤️ using Next.js 14 + Supabase**


| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3 + Custom CSS |
| **Database** | Supabase (PostgreSQL) |
| **Client Library** | @supabase/supabase-js |
| **Animations** | Framer Motion 12 (Spring physics) |
| **Icons** | Lucide React |
| **UI Pattern** | Bento Grid, Glassmorphism |

## 📐 Architecture & Component Splitting

### Server-Side (Data Fetching)
- **[src/app/page.tsx](src/app/page.tsx)**: Server Component that fetches courses from Supabase
- **[src/lib/supabase.ts](src/lib/supabase.ts)**: Supabase client configuration and `fetchCourses()` function with fallback logic

### Client-Side (Interactive Components)
- **[src/components/DashboardShell.tsx](src/components/DashboardShell.tsx)**: Main layout wrapper with tab management
- **[src/components/Sidebar.tsx](src/components/Sidebar.tsx)**: Navigation with `layoutId` animations, mobile bottom nav
- **[src/components/BentoGrid.tsx](src/components/BentoGrid.tsx)**: Grid wrapper with staggered entrance animations
- **[src/components/HeroTile.tsx](src/components/HeroTile.tsx)**: Welcome greeting with daily streak indicator
- **[src/components/CourseTile.tsx](src/components/CourseTile.tsx)**: Individual course card with animated progress bar
- **[src/components/ActivityTile.tsx](src/components/ActivityTile.tsx)**: GitHub-style activity heatmap with hover tooltips
- **[src/components/SkeletonTile.tsx](src/components/SkeletonTile.tsx)**: Reusable skeleton loader component

### Loading & Error States
- **[src/app/loading.tsx](src/app/loading.tsx)**: Suspense fallback with skeleton loaders
- **[src/app/error.tsx](src/app/error.tsx)**: Error boundary with recovery options

---

## 🗄️ Database Integration Setup

To connect to your live database instance, execute the following script in the Supabase SQL editor:

```sql
-- Create the courses table
create table public.courses (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    progress integer not null check (progress >= 0 and progress <= 100),
    icon_name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for database security
alter table public.courses enable row level security;

-- Create policy allowing anyone to read course content
create policy "Allow public read access"
on public.courses
for select
using (true);

-- Insert initial seed records
insert into public.courses (title, progress, icon_name) 
values 
('Advanced React Patterns', 78, 'Layers'),
('Creative Coding with WebGL', 45, 'Cpu'),
('Next.js Production Architectures', 92, 'Server'),
('UI/UX Motion Design Principles', 60, 'Sparkles');
```

---

## 🔧 Environment Variables Setup

1. Copy the `.env.example` file to create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the parameters with your actual Supabase URL and Anonymous Public Key:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

---

## 📱 Responsive Layout Specifications

*   **Desktop (> 1024px)**: Full sidebar layout on the left, 3-column Bento grid on the right.
*   **Tablet (768px - 1024px)**: Left sidebar collapses to icons-only. Bento grid adjusts to a 2-column layout.
*   **Mobile (< 768px)**: Left sidebar collapses completely, transitioning to a bottom navigation tab bar. The Bento grid stacks into a single, vertical scrolling column.

---

## 🛠️ Verification & Building

Verify and run the app locally by executing:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Compile production bundle
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📊 Animation Deep Dive

### Staggered Grid Entrance
The Bento grid uses Framer Motion's containerVariants and itemVariants for choreographed animations:

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,    // 150ms delay between children
      delayChildren: 0.1        // 100ms before first child
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,           // Controls snappiness
      damping: 15               // Controls bounciness
    }
  }
};
```

### Spring Physics Tuning
Different components use different spring constants:
- **Navigation layouts** (layoutId): `stiffness: 380, damping: 30` (snappy)
- **Card hover states**: `stiffness: 300, damping: 20` (natural)
- **Grid entrances**: `stiffness: 100, damping: 15` (smooth)

### Zero Layout Shift Strategy
All animations use **transform** and **opacity** exclusively:
- ✅ `transform: translateY()` - Repositions without triggering reflow
- ✅ `opacity: 0 → 1` - Fades without layout changes
- ❌ Avoided: margin, padding, width, height changes during animations

---

## 🔐 Security & Best Practices

### Environment Variables
- **NEXT_PUBLIC_*** variables**: Exposed to client; use only for non-sensitive data
- **SUPABASE_SERVICE_ROLE_KEY**: Server-side only, never expose in `.env.example`
- Always `.gitignore` your `.env.local` file

### Data Fetching
- All Supabase queries execute on the server via Next.js RSC
- No direct database access from client-side code
- RLS (Row-Level Security) policies enforce read-only access

### TypeScript
- Full type safety for Course data structure
- Interfaces defined in [src/lib/types.ts](src/lib/types.ts)
- No `any` types used

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/neurairn.git
   git push -u origin main
   ```

2. **Import Project on Vercel**:
   - Visit https://vercel.com/dashboard
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Import project

3. **Add Environment Variables**:
   - In Vercel project settings, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Vercel auto-deploys on every push to main
   - View your live app at your Vercel URL

### Optional: Custom Domain
- In Vercel project settings, add your custom domain
- Update DNS records as instructed

---

## 📈 Performance Metrics

Expected performance on modern devices:
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1 (zero shifts from animations)
- **Time to Interactive (TTI)**: < 3s
- **Bundle Size**: ~120 KB gzipped (Next.js + React + Framer Motion)

---

## 🐛 Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **Dashboard shows fallback/mock courses** | Missing or incorrect env variables | Check `.env.local` for correct Supabase URL & key |
| **Database connection timeout** | Network or RLS issue | Verify RLS policy allows read access; check Supabase status |
| **Icons don't render** | Icon name doesn't exist in Lucide | Verify `icon_name` in database matches Lucide React export |
| **Animations feel choppy** | GPU acceleration disabled | Enable in Chrome DevTools: Settings > Rendering > "Paint flashing" |
| **Mobile layout looks broken** | Missing Tailwind responsive classes | Check `md:` and `lg:` prefixes on grid classes |
| **Build fails with TypeScript errors** | Type mismatches | Run `npm run build` locally; check console output |
| **Sidebar doesn't collapse on tablet** | CSS breakpoint issue | Verify `hidden md:flex` and `md:hidden` classes |

---

## 🎓 Learning Outcomes

This project demonstrates professional-grade implementation of:

✅ **Next.js 14 App Router**
- Server Components (RSC) for data fetching
- Client Components for interactivity
- Suspense boundaries with custom loaders
- Error boundaries with graceful fallbacks

✅ **TypeScript**
- Type-safe data structures
- Interface definitions
- No implicit `any` types

✅ **Supabase Integration**
- PostgreSQL database setup
- Row-Level Security (RLS) policies
- Secure server-side data fetching
- Fallback patterns for resilience

✅ **Framer Motion**
- Spring physics animations
- Staggered entrance sequences
- LayoutId for state transitions
- Conditional animations based on user interaction

✅ **Tailwind CSS**
- Utility-first responsive design
- Custom CSS variables
- Dark mode optimized
- Semantic HTML structure

✅ **Performance Optimization**
- Zero Cumulative Layout Shift (CLS)
- GPU-accelerated animations
- Skeleton loaders matching final layout
- Code splitting via Next.js

---

## 📝 Project Notes

### Architectural Decisions

**Why Server Components?**
- Secure database credential handling (never exposed to client)
- Reduced client-side JavaScript
- One-time server-side data fetch (no waterfall)
- Better SEO with server-rendered content

**Why Framer Motion?**
- Declarative animation syntax integrates seamlessly with React
- Spring physics feels more natural than CSS timing functions
- Built-in support for layout animations (`layoutId`)
- Excellent TypeScript support

**Why Supabase?**
- Free PostgreSQL with RLS built-in
- Real-time subscriptions available for future enhancements
- Excellent Next.js integration with auth support
- Easy SQL management via web dashboard

**Why Bento Grid?**
- Modern, engaging layout pattern
- Scalable to different screen sizes
- Each "tile" is a self-contained component
- Supports varying grid spans for visual hierarchy

---

## 🚀 Future Enhancement Ideas

Potential features to extend this dashboard:

- [ ] **Real-time Updates**: Use Supabase subscriptions for live course progress updates
- [ ] **User Authentication**: Implement Supabase Auth for personalized dashboards
- [ ] **Dark/Light Theme Toggle**: Add theme switching with localStorage persistence
- [ ] **Course Detail Pages**: Click tile to see full course content
- [ ] **Analytics Dashboard**: Charts showing learning trends (Recharts, Plotly)
- [ ] **User Profile Page**: Customize avatar, name, preferences
- [ ] **Push Notifications**: Remind users of upcoming lessons
- [ ] **Search & Filter**: Full-text search for courses using Supabase Full-Text Search
- [ ] **Comments & Discussion**: Add course discussion forums
- [ ] **Achievement Badges**: Gamify the learning experience
- [ ] **API Caching**: Implement SWR for client-side caching
- [ ] **CDN Optimization**: Deploy static assets to Vercel Edge Network

---

## 📚 Resource Links

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 License

This project is provided as-is for educational and portfolio purposes.

## 🤝 Support & Questions

For issues or questions:
1. **Check the Troubleshooting section** above
2. **Review component JSDoc comments** in source files
3. **Consult official documentation** for each library
4. **Review GitHub Issues** for similar problems

---

**Built with ❤️ demonstrating modern frontend engineering practices**

*Last updated: May 24, 2026*
