import {
  LayoutDashboard,
  BookOpen,
  Library,
  Bot,
  FileText,
  FileSearch,
  MessageSquare,
  Briefcase,
  Settings,
  HelpCircle,
} from 'lucide-react';

export const APP_NAME = 'StudyPilot AI';
export const APP_TAGLINE = 'Next-Gen AI-Powered LMS & Career Accelerator';

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  isAi?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', href: '/my-courses', icon: Library },
  { name: 'Course Marketplace', href: '/marketplace', icon: BookOpen },
  { name: 'AI Mentor', href: '/ai-mentor', icon: Bot, isAi: true, badge: 'AI' },
  { name: 'PDF Summarizer', href: '/pdf-summarizer', icon: FileText, isAi: true },
  { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileSearch, isAi: true },
  { name: 'Mock Interview', href: '/mock-interview', icon: MessageSquare, isAi: true },
  { name: 'Job Finder', href: '/job-finder', icon: Briefcase, badge: 'Live' },
  { name: 'Agentic AI Hub', href: '/agentic-ai', icon: Bot, isAi: true, badge: 'New' },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];
