import DashboardShell from '@/components/DashboardShell';
import { fetchCourses } from '@/lib/supabase';

// Force dynamic rendering to ensure DB requests are fetched live
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { data, error, isFallback } = await fetchCourses();

  return (
    <DashboardShell 
      courses={data} 
      isFallback={isFallback} 
      error={error} 
    />
  );
}
