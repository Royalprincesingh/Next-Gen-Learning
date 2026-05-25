-- Create the courses table
create table if not exists public.courses (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    progress integer not null check (progress >= 0 and progress <= 100),
    icon_name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) for Supabase security best practices
alter table public.courses enable row level security;

-- Create policy allowing anyone to read course content (RSC fetches)
create policy "Allow public read access"
on public.courses
for select
using (true);

-- Insert initial mock seed rows (optional, run if table is empty)
insert into public.courses (title, progress, icon_name) 
values 
('Advanced React Patterns', 78, 'Layers'),
('Creative Coding with WebGL', 45, 'Cpu'),
('Next.js Production Architectures', 92, 'Server'),
('UI/UX Motion Design Principles', 60, 'Sparkles')
on conflict do nothing;
