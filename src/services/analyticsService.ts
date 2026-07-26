export interface SubjectMastery {
  subject: string;
  category: string;
  masteryPercent: number;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Novice';
  statusColor: string;
}

export const analyticsService = {
  getStudyTimeData(range: 'weekly' | 'monthly' = 'weekly') {
    if (range === 'weekly') {
      return [
        { name: 'Mon', hours: 4.2, goal: 4.0 },
        { name: 'Tue', hours: 6.5, goal: 4.0 },
        { name: 'Wed', hours: 5.0, goal: 4.0 },
        { name: 'Thu', hours: 7.8, goal: 4.0 },
        { name: 'Fri', hours: 6.0, goal: 4.0 },
        { name: 'Sat', hours: 8.5, goal: 4.0 },
        { name: 'Sun', hours: 10.2, goal: 4.0 },
      ];
    }
    return [
      { name: 'Week 1', hours: 28.5, goal: 25.0 },
      { name: 'Week 2', hours: 34.0, goal: 25.0 },
      { name: 'Week 3', hours: 41.2, goal: 25.0 },
      { name: 'Week 4', hours: 48.5, goal: 25.0 },
    ];
  },

  getQuizPerformanceData() {
    return [
      { subject: 'DBMS Mastery', averageScore: 92, target: 85 },
      { subject: 'System Design', averageScore: 84, target: 85 },
      { subject: 'Full-Stack SaaS', averageScore: 95, target: 85 },
      { subject: 'Data Structures', averageScore: 78, target: 85 },
      { subject: 'AI & Machine Learning', averageScore: 88, target: 85 },
    ];
  },

  getSubjectMasteryData(): SubjectMastery[] {
    return [
      { subject: 'DBMS & Relational Architecture', category: 'Database Systems', masteryPercent: 94, level: 'Expert', statusColor: '#10B981' },
      { subject: 'Full-Stack SaaS Development', category: 'Software Engineering', masteryPercent: 95, level: 'Expert', statusColor: '#10B981' },
      { subject: 'System Design & Distributed Caching', category: 'Architecture', masteryPercent: 84, level: 'Advanced', statusColor: '#A855F7' },
      { subject: 'AI & Large Language Models', category: 'AI Engineering', masteryPercent: 88, level: 'Advanced', statusColor: '#A855F7' },
      { subject: 'Data Structures & Algorithms', category: 'Computer Science', masteryPercent: 78, level: 'Intermediate', statusColor: '#F59E0B' },
    ];
  },
};
