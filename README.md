# 🚀 StudyPilot AI - AI-Powered Learning Management System (LMS)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)](https://stripe.com/)

**StudyPilot AI** is a production-ready, large-scale AI-powered Learning Management System (LMS) and Career Acceleration SaaS platform designed for computer science students and software engineers. Built with React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, Recharts, and Supabase PostgreSQL.

---

## 🌟 Key Features & Module Overview

StudyPilot AI is structured across **22 Production Modules**:

1. **Project Setup & Core Foundation**: Vite + React 19 + TypeScript 5.7 configured with Tailwind CSS v4 and `@/*` path aliasing.
2. **Modular Architecture & Layouts**: Glassmorphic UI shells (`MainLayout`, `DashboardLayout`, `AuthLayout`) with desktop sidebar, mobile navigation drawer, and top navbar.
3. **Design System & Component Library**: Custom accessible UI primitives (`Button`, `Card`, `Badge`, `Input`, `Modal`, `Tabs`, `ProgressBar`, `Avatar`, `Skeleton`, `Tooltip`).
4. **Supabase PostgreSQL & Security**: Database DDL schema containing 21 PostgreSQL tables with Row Level Security (RLS) policies, triggers, and fallback offline mock handlers.
5. **Authentication System**: Email/Password login, Signup, Reset Password, Google OAuth triggers, Zod form validation, and Protected Route guards.
6. **Conversion Landing Page**: Hero section with interactive dashboard preview, AI features grid, popular courses preview, pricing tiers, testimonials, and FAQ accordion.
7. **Interactive Dashboard**: Real-time widgets including Recharts Time Spending Area Chart, Consistency Ring, Mentors list, Schedule calendar, and AI Readiness recommendations.
8. **Course Marketplace**: Full course catalog with live search, category tabs, difficulty filtering (*Beginner*, *Intermediate*, *Advanced*), price/rating sorting, and checkout modals.
9. **Course Details Page**: Hero banner, learning outcome checkmarks, expandable syllabus accordion with lesson durations, instructor bio card, and sticky enrollment sidebar.
10. **Lesson Viewer & Interactive Tools**: Collapsible lesson tree, interactive SVG architectural diagrams, technical interview Q&As, 3D flip revision flashcards, practice MCQs, and floating *Ask AI Mentor* drawer.
11. **Timed Quiz System**: Quiz engine with real-time countdown timer, question selector grid, automated score calculation (passing threshold ≥ 80%), weak topic detection, and answer explanations.
12. **Progress Tracking & Spaced Repetition**: 13 core progress metrics tracked with an automated **Spaced Repetition Schedule Engine** (Day 1, 3, 7, 15, 30 intervals) and weak topic review recommendations.
13. **Context-Aware AI Mentor**: 24/7 AI tutor page with 6 action prompt modes (*Explain Simply*, *Generate 3 MCQs*, *Coding Challenge*, *Interview Qs*, *Revision Notes*, *Deep Explanation*).
14. **PDF Summarizer**: Drag & drop PDF uploader extracting Executive Summaries, Key Points, Notes, Flashcards, and MCQs stored in Supabase Storage.
15. **Resume ATS Analyzer**: Resume upload analysis calculating overall ATS score (0-100), missing keywords, formatting checks, recommended portfolio projects, and course learning paths.
16. **AI Mock Interview Simulator**: Configurable mock interview simulator for HR, Technical SDE, and System Design rounds with instant AI feedback scores and model answers.
17. **Deep Learning Analytics**: Recharts AreaChart for weekly/monthly study hours, BarChart for subject quiz performance, Subject Mastery Heatmap Matrix, and exportable PDF report modal.
18. **Placement Readiness Engine**: Placement score gauge, core pillar radar, tier-1 company match index (*Stripe 94%*, *Google 92%*, *Microsoft 90%*, *Amazon 88%*), and milestone action checklist.
19. **Stripe Integration**: Production Stripe payment gateway checkout, promo code discount calculator (`STUDENT50`), and payment logging to Supabase `payments` table.
20. **Certificate Generation & Verification**: High-resolution SVG certificate canvas with gold seals, QR code validation, 1-click PDF download/print, and public digital verification portal (`/verify-certificate/:hash`).
21. **Testing & Verification**: Automated verification suite (`runFullAppVerification()`) validating all services and datasets.
22. **Deployment Preparation**: Vercel SPA rewrite rules (`vercel.json`), security headers, `.env.example`, and production build bundle optimization.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript 5.7, Vite 6
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System, Framer Motion, Lucide Icons
- **State & Router**: React Router DOM v7, React Context API
- **Charts & Data Viz**: Recharts (Area, Bar, Donut, Radial)
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Auth, Storage)
- **Payments**: Stripe API
- **Forms & Validation**: React Hook Form, Zod

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/spriyanerisala/student_copilot.git
cd student_copilot
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 3. Database Initialization (Supabase)
Run the SQL DDL script in `supabase/schema.sql` in your Supabase SQL Editor to create all 21 tables, indexes, triggers, and RLS policies.

### 4. Run Development Server
```bash
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License.
