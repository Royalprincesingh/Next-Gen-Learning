'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Course } from '@/lib/types';

export default function AdminPanel() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', progress: 50, icon_name: 'BookOpen' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const iconOptions = [
    'Layers', 'Cpu', 'Server', 'Sparkles', 'BookOpen', 'Code', 'Zap', 'Target'
  ];

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      await fetchCourses();
    };
    
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch {
      showMessage('error', 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('courses')
          .update({
            title: formData.title,
            progress: formData.progress,
            icon_name: formData.icon_name,
          })
          .eq('id', editingId);

        if (error) throw error;
        showMessage('success', 'Course updated successfully!');
      } else {
        const { error } = await supabase.from('courses').insert([formData]);
        if (error) throw error;
        showMessage('success', 'Course created successfully!');
      }

      setFormData({ title: '', progress: 50, icon_name: 'BookOpen' });
      setEditingId(null);
      setIsOpen(false);
      fetchCourses();
    } catch (err) {
      showMessage('error', err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) throw error;
      showMessage('success', 'Course deleted successfully!');
      fetchCourses();
    } catch {
      showMessage('error', 'Failed to delete course');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      progress: course.progress,
      icon_name: course.icon_name,
    });
    setIsOpen(true);
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ title: '', progress: 50, icon_name: 'BookOpen' });
    setIsOpen(true);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen dark bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Course Management
              </h1>
              <p className="text-zinc-400 mt-2">Create, edit, and manage learning courses</p>
            </div>
            <motion.button
              onClick={handleOpenNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 font-semibold text-white transition-all"
            >
              <Plus className="w-5 h-5" />
              New Course
            </motion.button>
          </div>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-500/20 border-red-500/50 text-red-300'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel p-6 rounded-xl hover:border-violet-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white flex-1 pr-2">
                      {course.title}
                    </h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(course)}
                        className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-zinc-400">Progress</span>
                        <span className="text-sm font-semibold text-cyan-400">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>Icon: {course.icon_name}</span>
                      <span className="text-xs text-zinc-500">
                        {new Date(course.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setIsOpen(false)}
            >
              <motion.div
                className="glass-panel p-8 rounded-xl w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingId ? 'Edit Course' : 'Create Course'}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    disabled={submitting}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                      placeholder="e.g., Advanced React Patterns"
                    />
                  </div>

                  {/* Progress */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Progress: {formData.progress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) =>
                        setFormData({ ...formData, progress: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Icon
                    </label>
                    <select
                      value={formData.icon_name}
                      onChange={(e) =>
                        setFormData({ ...formData, icon_name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      disabled={submitting}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-white hover:border-zinc-600 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
