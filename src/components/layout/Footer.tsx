import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Share2, MessageCircle } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '@/utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-white/10 pt-12 pb-8 px-4 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & Tagline */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="font-bold text-lg text-white">{APP_NAME}</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            {APP_TAGLINE}. Empowering modern learners with dynamic course paths, interactive AI mentors, and placement readiness tools.
          </p>
        </div>

        {/* Col 2: Product & Features */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/marketplace" className="hover:text-purple-400 transition-colors">Course Marketplace</Link></li>
            <li><Link to="/ai-mentor" className="hover:text-purple-400 transition-colors">AI Mentor & Tutor</Link></li>
            <li><Link to="/pdf-summarizer" className="hover:text-purple-400 transition-colors">PDF Summarizer</Link></li>
            <li><Link to="/resume-analyzer" className="hover:text-purple-400 transition-colors">Resume ATS Analyzer</Link></li>
            <li><Link to="/mock-interview" className="hover:text-purple-400 transition-colors">AI Mock Interviews</Link></li>
          </ul>
        </div>

        {/* Col 3: Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#features" className="hover:text-purple-400 transition-colors">Platform Features</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing Plans</a></li>
            <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ & Support</a></li>
            <li><Link to="/placement-readiness" className="hover:text-purple-400 transition-colors">Placement Scorecard</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Connected</h4>
          <p className="text-xs text-slate-400">Get latest course releases and AI features.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 w-full"
            />
            <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-xl font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 {APP_NAME}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors" title="Website"><Globe className="w-4 h-4" /></a>
          <a href="#" className="hover:text-white transition-colors" title="Community"><MessageCircle className="w-4 h-4" /></a>
          <a href="#" className="hover:text-white transition-colors" title="Share"><Share2 className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
};
