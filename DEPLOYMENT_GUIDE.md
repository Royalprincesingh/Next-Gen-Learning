# 🚀 NeuraLrn Production Deployment Guide

## Phase 1: Local Setup

### 1.1 Clone & Install

```bash
git clone <your-github-repo>
cd newprojectassignment
npm install
```

### 1.2 Supabase Project Setup

1. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your preferred region
   - Wait for database initialization (~2 minutes)

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy `Project URL`
   - Copy `Anon Public Key`

3. **Setup Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Create Database Schema**
   - In Supabase dashboard → SQL Editor
   - Click "New Query"
   - Copy contents of `src/db/schema-v2.sql`
   - Paste and execute
   - ✅ Tables, RLS policies, and seed data created

5. **Enable Email Auth**
   - Go to Authentication → Providers
   - Enable "Email" provider
   - Set email templates (optional but recommended)

### 1.3 Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`

**Test Flow:**
- Homepage redirects to `/auth` (not logged in)
- Sign up with email: `dev@neurairn.com` / `password123`
- Check email for confirmation link (Supabase free tier uses magic links)
- Click link to confirm
- Redirect to `/dashboard`
- Click "Admin" button to access course management
- Create/edit/delete courses

---

## Phase 2: Vercel Deployment

### 2.1 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/neurairn
git branch -M main
git push -u origin main
```

### 2.2 Deploy to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import from GitHub**
   - Select your `neurairn` repository
   - Click "Import"

3. **Configure Environment Variables**

   In "Environment Variables" section, add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**
   - Framework Preset: `Next.js` (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Click "Deploy"
   - ⏳ Wait ~3-5 minutes for first deployment

5. **Configure Supabase Auth Redirect**
   - Get your Vercel URL (e.g., `neurairn.vercel.app`)
   - In Supabase → Authentication → URL Configuration
   - Add to "Redirect URLs":
     ```
     https://neurairn.vercel.app/auth/callback
     http://localhost:3000/auth/callback
     ```

---

## Phase 3: Production Checklist

- [ ] Supabase project created and configured
- [ ] Schema migrations run successfully
- [ ] Email authentication working
- [ ] GitHub repository public/private (your choice)
- [ ] Environment variables set in Vercel
- [ ] Vercel deployment successful
- [ ] Auth callback URL configured in Supabase
- [ ] Login/signup tested on production URL
- [ ] Admin panel accessible and functional
- [ ] CORS configured (if needed)

---

## Phase 4: Optional Enhancements

### 4.1 Custom Domain
```
Vercel Dashboard → Settings → Domains → Add Domain
```

### 4.2 Email Verification
```
Supabase → Authentication → Email Templates
Customize confirmation and recovery emails
```

### 4.3 Profile Picture
```
Add avatar_url to user_profiles
Integrate with Gravatar or Cloudinary
```

### 4.4 Course Certificates
```
Create certificates table
Generate PDFs on course completion
```

---

## Troubleshooting

### "Authentication Required" on `/dashboard`
- ✅ User not logged in → Redirect to `/auth` is working correctly
- Sign up or login first

### "Failed to connect to Supabase"
- Check `.env.local` variables are correct
- Verify Supabase project is active
- Check network connectivity

### "Email confirmation not received"
- Free tier uses "magic links" (not email passwords)
- Check spam folder
- Resend confirmation in Auth settings

### Deployment fails with "Missing environment variable"
- Verify `NEXT_PUBLIC_SUPABASE_URL` in Vercel settings
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel settings
- Redeploy after adding variables

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  Login/Signup → Dashboard → Admin Panel → Course Details    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 (Vercel)                      │
│  ├─ /auth/page.tsx          → Login/Signup UI             │
│  ├─ /dashboard/page.tsx      → Main dashboard             │
│  ├─ /admin/page.tsx          → Course management          │
│  ├─ /api/auth/logout/route   → Logout handler             │
│  └─ middleware.ts            → Auth protection            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL + Auth                      │
│  ├─ Tables:  users, courses, user_profiles, user_progress  │
│  ├─ Auth:    Email/Password, Magic Links                   │
│  └─ RLS:     Row-level security policies                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Tables
- `auth.users` - Managed by Supabase Auth
- `public.user_profiles` - User profile data
- `public.courses` - Course catalog
- `public.user_progress` - User course progress

### Key Features
- Row Level Security (RLS) enabled
- Automatic `updated_at` timestamps
- Foreign key relationships
- Indexes for performance
- Seed data included

---

## API Endpoints

### Authentication
- `POST /api/auth/callback` - Handle auth redirect
- `POST /api/auth/logout` - Sign out user

### Database Queries (Server Components)
- Fetch courses via Supabase client
- Update user progress via RLS policies
- Create/update user profiles via auth triggers

---

## Support

For issues or questions:
1. Check [Supabase Docs](https://supabase.com/docs)
2. Check [Next.js Docs](https://nextjs.org/docs)
3. Open GitHub issue

---

**Version**: 1.0.0  
**Last Updated**: May 25, 2026  
**Status**: Production Ready ✅
