import { createClient } from '@supabase/supabase-js';
import { Course } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const MOCK_COURSES: Course[] = [
  {
    id: 'mock-1',
    title: 'Advanced React Patterns',
    progress: 78,
    icon_name: 'Layers',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    title: 'Creative Coding with WebGL',
    progress: 45,
    icon_name: 'Cpu',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    title: 'Next.js Production Architectures',
    progress: 92,
    icon_name: 'Server',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-4',
    title: 'UI/UX Motion Design Principles',
    progress: 60,
    icon_name: 'Sparkles',
    created_at: new Date().toISOString()
  }
];

export async function fetchCourses(): Promise<{ data: Course[]; error: string | null; isFallback: boolean }> {
  // Simulate network delay to demonstrate the elegant skeleton loading animations
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      data: MOCK_COURSES,
      error: 'Supabase URL/Key environment variables are missing.',
      isFallback: true
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error.message);
      return {
        data: MOCK_COURSES,
        error: `Supabase query error: ${error.message}`,
        isFallback: true
      };
    }

    if (!data || data.length === 0) {
      return {
        data: MOCK_COURSES,
        error: null,
        isFallback: true
      };
    }

    return {
      data: data as Course[],
      error: null,
      isFallback: false
    };
  } catch (e) {
    console.error('Supabase connection failed:', e);
    return {
      data: MOCK_COURSES,
      error: `Supabase connection failed: ${e instanceof Error ? e.message : String(e)}`,
      isFallback: true
    };
  }
}
