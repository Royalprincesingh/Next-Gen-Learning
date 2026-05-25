import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AuthForm from '@/components/AuthForm';
import { createClient } from '@/utils/supabase/server';

export default async function AuthPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen dark flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid-pattern" />

      {/* Content */}
      <div className="relative z-10">
        <AuthForm />
      </div>
    </div>
  );
}
