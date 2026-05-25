# 🚀 Quick Start Guide - NeuraLrn Dashboard

## Get Started in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# (Instructions in .env.example)
```

### 3. Run Development Server
```bash
npm run dev
```

Your dashboard is now live at **http://localhost:3000** 🎉

---

## 📝 Setup Your Supabase Database

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (or email)
4. Create a new project (pick your region)
5. Wait ~2 minutes for the database to be ready

### Step 2: Create the Database Table
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy & paste the contents of `src/db/schema.sql`
4. Click **Run**

✅ Your courses table is now created with sample data!

### Step 3: Get Your Credentials
1. Go to **Settings** > **API** (left sidebar)
2. Copy your **Project URL** (it looks like `https://xxxxx.supabase.co`)
3. Copy your **anon public** API key

### Step 4: Configure the App
1. Open `.env.local` in your editor
2. Paste your Supabase URL and key:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-key-here...
   ```
3. Save the file
4. Restart your dev server (`Ctrl+C`, then `npm run dev`)

✅ Your app is now connected to your live Supabase database!

---

## 📱 View the Dashboard

- **Desktop**: http://localhost:3000 (3-column Bento grid)
- **Tablet**: Resize to 768px-1024px (2-column grid, sidebar icons)
- **Mobile**: Resize to <768px (1-column stack, bottom nav)

---

## 🧪 Test the Features

### ✅ Animations
- [ ] Page loads with staggered tile entrance
- [ ] Tiles fade + slide upward sequentially
- [ ] Hover over cards → they scale + glow

### ✅ Data Display
- [ ] Course cards show titles from database
- [ ] Progress bars animate on load
- [ ] Icons render dynamically from database

### ✅ Navigation
- [ ] Click sidebar items → they highlight smoothly
- [ ] Mobile: Bottom nav appears (no sidebar)
- [ ] Tabs switch content properly

### ✅ Loading States
- [ ] Refresh the page
- [ ] See skeleton loaders while data loads
- [ ] Skeletons have pulsing animation

### ✅ Error Handling
- [ ] Remove env variables from `.env.local`
- [ ] Restart dev server
- [ ] See warning banner + fallback mock data
- [ ] App still works!

---

## 🎬 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main dashboard (fetches data)
│   ├── loading.tsx        # Loading skeleton UI
│   ├── error.tsx          # Error boundary
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── DashboardShell     # Main layout
│   ├── Sidebar            # Navigation
│   ├── BentoGrid          # Grid layout
│   ├── HeroTile           # Greeting
│   ├── CourseTile         # Course cards
│   ├── ActivityTile       # Heatmap
│   └── SkeletonTile       # Loader
├── lib/
│   ├── supabase.ts        # Database client
│   └── types.ts           # TypeScript types
└── db/
    └── schema.sql         # Database schema
```

---

## 🐛 Troubleshooting

### Dashboard shows "Offline Demo Mode"
→ Check your `.env.local` file
→ Verify Supabase URL and key are correct
→ Restart the dev server

### Icons aren't showing
→ Make sure the database has icon names like "Layers", "Cpu", "Server"
→ Icon names must match Lucide React exports

### Animations feel choppy
→ Enable GPU acceleration in Chrome DevTools
→ Chrome: Settings > Rendering > check "Paint flashing"

### Build fails
→ Run `npm install` to ensure all dependencies are installed
→ Delete `.next` folder and try again: `rm -rf .next && npm run build`

---

## 🚀 Deploy to Vercel

### 1. Push to GitHub
```bash
git remote add origin https://github.com/yourusername/neurairn.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New" > "Project"
3. Select your GitHub repository
4. Click "Import"
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

✅ Your dashboard is now live on the internet!

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## ❓ Questions?

Refer to the comprehensive [README.md](README.md) for detailed explanations of:
- Architecture decisions
- Animation implementation
- Security best practices
- Performance optimizations
- Component communication flow

---

**Happy coding! 🎉**
