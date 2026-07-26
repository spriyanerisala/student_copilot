import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

export const CoursesPreviewSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Computer Science', 'System Design', 'Full-Stack', 'AI & Machine Learning'];

  const sampleCourses = [
    {
      id: 'dbms-101',
      title: 'Database Management Systems (DBMS) Mastery',
      subtitle: 'From ER Modeling to Advanced Query Optimization & Sharding',
      category: 'Computer Science',
      instructorName: 'Dr. Arian Adil',
      instructorTitle: 'Principal Database Architect',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewCount: 3420,
      difficulty: 'Intermediate' as const,
      totalDuration: '18.5 hrs',
      price: 49.99,
      discountPrice: 29.99,
      enrolledCount: 14200,
      tags: ['SQL', 'ER Model', 'Indexing', 'Transactions'],
    },
    {
      id: 'sys-201',
      title: 'High-Scale System Design & Architecture',
      subtitle: 'Build Rate Limiters, Distributed Caches & Microservices',
      category: 'System Design',
      instructorName: 'Bil Rhab',
      instructorTitle: 'Ex-Meta Staff Engineer',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      rating: 4.95,
      reviewCount: 5120,
      difficulty: 'Advanced' as const,
      totalDuration: '24.0 hrs',
      price: 69.99,
      discountPrice: 39.99,
      enrolledCount: 22400,
      tags: ['Kafka', 'Redis', 'Load Balancing', 'Scalability'],
    },
    {
      id: 'fullstack-301',
      title: 'Full-Stack React, Node.js & Supabase SaaS',
      subtitle: 'Production-Ready Web Applications with TypeScript',
      category: 'Full-Stack',
      instructorName: 'Abd Fahad',
      instructorTitle: 'Senior Full Stack Lead',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      rating: 4.88,
      reviewCount: 2890,
      difficulty: 'Beginner' as const,
      totalDuration: '32.0 hrs',
      price: 59.99,
      discountPrice: 34.99,
      enrolledCount: 18900,
      tags: ['React', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    },
  ];

  const filteredCourses =
    selectedCategory === 'All'
      ? sampleCourses
      : sampleCourses.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-20 px-4 lg:px-8 relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" /> Curated Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Popular <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Industry Courses</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Comprehensive modules written by senior engineering leads with interactive AI tutors.
            </p>
          </div>

          <Link to="/marketplace">
            <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Courses
            </Button>
          </Link>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col h-full overflow-hidden group">
                {/* Cover Image & Difficulty Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={course.difficulty === 'Advanced' ? 'danger' : course.difficulty === 'Intermediate' ? 'warning' : 'success'}>
                      {course.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.reviewCount.toLocaleString()} reviews)</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Instructor Metadata */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{course.instructorName}</p>
                      <p className="text-[10px] text-slate-400">{course.instructorTitle}</p>
                    </div>
                  </div>

                  {/* Meta Stats & Price Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {course.totalDuration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-400" /> {(course.enrolledCount / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="text-right">
                      {course.discountPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 line-through text-[11px]">${course.price}</span>
                          <span className="text-sm font-bold text-emerald-400">${course.discountPrice}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-white">${course.price}</span>
                      )}
                    </div>
                  </div>

                  <Link to={`/course/${course.id}`} className="w-full">
                    <Button variant="glass" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      View Syllabus & Enroll
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
