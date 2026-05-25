import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DashboardShell from '@/components/DashboardShell';
import { fetchCourses } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  const { data, error, isFallback } = await fetchCourses();

  return (
    <DashboardShell 
      courses={data} 
      isFallback={isFallback} 
      error={error} 
    />
  );
}
