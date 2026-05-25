# NeuraLrn: Next-Gen Student Dashboard

A high-fidelity, hardware-accelerated learning dashboard built with **Next.js 14**, **Supabase**, **Framer Motion**, and **Tailwind CSS**. This prototype demonstrates modern web architecture with server-side rendering, real-time data fetching, and buttery-smooth micro-interactions.

## 🎯 Project Overview

**NeuraLrn** showcases professional-grade frontend engineering with:

- **Dark Mode Design**: Premium UI with deep backgrounds, subtle glowing gradients, and high-contrast accents
- **Bento Grid Layout**: Responsive layout that adapts seamlessly from desktop (3-column) → tablet (2-column) → mobile (single-column)
- **Real-time Data Integration**: Courses fetched from Supabase PostgreSQL database
- **Spring Physics Animations**: Framer Motion with natural, non-linear motion (stiffness, damping tuning)
- **Zero Layout Shifts**: Hardware-accelerated animations using `transform` and `opacity` only
- **Semantic HTML**: Proper structure with `<nav>`, `<main>`, `<article>`, `<section>` elements
- **TypeScript First**: Full type safety across the application
- **Server Components**: Secure data fetching via Next.js RSC pattern

## 🚀 Key Features

- ✅ **Premium Dark Bento Grid**: Beautifully arranged grid that scales from desktop to mobile
- ✅ **Next.js Server Components (RSC)**: Live course data fetched securely on the server
- ✅ **Zero CLS**: Custom skeleton matching loaded states; animations use GPU-friendly transforms
- ✅ **Staggered Entrance**: Grid tiles fade and translate upward sequentially
- ✅ **Micro-Interactions**: Navigation states animate with Framer Motion `layoutId`
- ✅ **Graceful Fallbacks**: Missing environment keys show warning; app still works with mock data
- ✅ **Error Boundaries**: User-friendly error handling with recovery actions
- ✅ **Responsive Design**: Mobile bottom nav, tablet collapsed sidebar, desktop full layout

## 🛠️ Tech Stack & Constraints

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
