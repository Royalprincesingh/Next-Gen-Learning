import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import DashboardShell from '@/components/DashboardShell';
import { fetchCourses } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
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
