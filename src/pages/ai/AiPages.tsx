import React, { useState } from 'react';
import { Send, Loader2, RefreshCw, Sparkles, FileSearch, Bot, MessageSquare } from 'lucide-react';
import { aiService, type ChatMessage } from '@/services/aiService';
import { pdfService, type PdfSummaryOutput } from '@/services/pdfService';
import { resumeService, type ResumeAnalysisResult } from '@/services/resumeService';
import { interviewService, type InterviewType, type TargetRole, type InterviewQuestionItem, type InterviewFeedbackResult } from '@/services/interviewService';
import { AiChatMessage } from '@/components/ai/AiChatMessage';
import { PdfUploader } from '@/components/pdf/PdfUploader';
import { PdfOutputViewer } from '@/components/pdf/PdfOutputViewer';
import { PdfHistoryList } from '@/components/pdf/PdfHistoryList';
import { ResumeUploader } from '@/components/resume/ResumeUploader';
import { AtsScorecard } from '@/components/resume/AtsScorecard';
import { ResumeRecommendations } from '@/components/resume/ResumeRecommendations';
import { InterviewSetupCard } from '@/components/interview/InterviewSetupCard';
import { LiveInterviewViewport } from '@/components/interview/LiveInterviewViewport';
import { InterviewFeedbackReport } from '@/components/interview/InterviewFeedbackReport';
import { Button, Input, Card } from '@/components/ui';

// --- AI MENTOR PAGE ---
export const AiMentorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your AI Chatbot. Ask me anything, and I will help you out!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSubmitPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userText = prompt;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const responseText = await aiService.sendMentorQuery(userText);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I am having trouble connecting to the n8n backend right now.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'Chat history cleared. What would you like to talk about?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 select-none max-w-5xl mx-auto flex flex-col h-[calc(100vh-120px)]">
      
      <div className="flex items-center gap-3 pb-2 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Mentor Chat</h2>
          <p className="text-xs text-slate-400">Powered by your custom n8n AI Agent</p>
        </div>
      </div>

      <Card className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/60 border border-white/10 flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((m) => (
            <AiChatMessage key={m.id} message={m} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-purple-300 text-xs w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-2">
        <form onSubmit={handleSubmitPrompt} className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
            className="text-xs py-3"
          />
          <Button type="submit" isLoading={isLoading} className="px-6" rightIcon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>

        <div className="flex justify-between items-center text-[10px] text-slate-500 px-2">
          <span>AI will respond based on your n8n workflow logic.</span>
          <button onClick={handleClearHistory} className="hover:text-slate-300 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PDF SUMMARIZER PAGE ---
export const PdfSummarizerPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeOutput, setActiveOutput] = useState<PdfSummaryOutput | null>(null);
  const [savedDocs] = useState<PdfSummaryOutput[]>(pdfService.getSavedPdfs());

  const handleProcessPdf = async (file: File) => {
    setIsProcessing(true);
    try {
      const output = await pdfService.uploadAndProcessPdf(file);
      setActiveOutput(output);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Document Summarizer
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          PDF Summarizer & Note Generator
        </h1>
        <p className="text-xs text-slate-400">
          Upload textbooks or slides to extract summaries, key points, notes, flashcards, and practice MCQs.
        </p>
      </div>

      <PdfUploader onProcessPdf={handleProcessPdf} isProcessing={isProcessing} />
      {activeOutput && <PdfOutputViewer output={activeOutput} />}
      <PdfHistoryList documents={savedDocs} onSelect={setActiveOutput} />
    </div>
  );
};

// --- RESUME ANALYZER PAGE ---
export const ResumeAnalyzerPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  const handleAnalyzeResume = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const result = await resumeService.analyzeResume(file);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto">
      <div className="space-y-1">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 inline-flex items-center gap-1.5">
          <FileSearch className="w-3.5 h-3.5 text-purple-400" /> AI Resume ATS Checker
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Resume ATS Analyzer & Course Recommendations
        </h1>
        <p className="text-xs text-slate-400">
          Upload your resume to calculate ATS score, detect missing skills, get improvement tips, and receive recommended portfolio projects.
        </p>
      </div>

      <ResumeUploader onAnalyze={handleAnalyzeResume} isAnalyzing={isAnalyzing} />
      {analysisResult && (
        <div className="space-y-8">
          <AtsScorecard result={analysisResult} />
          <ResumeRecommendations result={analysisResult} />
        </div>
      )}
    </div>
  );
};

// --- MOCK INTERVIEW PAGE ---
export const MockInterviewPage: React.FC = () => {
  const [sessionState, setSessionState] = useState<'setup' | 'live' | 'feedback'>('setup');
  const [selectedType, setSelectedType] = useState<InterviewType>('technical');
  const [selectedRole, setSelectedRole] = useState<TargetRole>('fullstack');
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState<InterviewFeedbackResult | null>(null);

  const handleStartInterview = (type: InterviewType, role: TargetRole) => {
    setSelectedType(type);
    setSelectedRole(role);
    const qSet = interviewService.getQuestionSet(type, role);
    setQuestions(qSet);
    setSessionState('live');
  };

  const handleSubmitAllAnswers = async (answers: { [qId: string]: string }) => {
    setIsEvaluating(true);
    try {
      const fb = await interviewService.evaluateInterview(selectedType, selectedRole, answers);
      setFeedbackResult(fb);
      setSessionState('feedback');
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 inline-flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-purple-400" /> AI Mock Interview Simulator
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Interactive AI Interview Practice & Evaluation
        </h1>
        <p className="text-xs text-slate-400">
          Simulate real HR, Technical SDE, and System Design rounds with instant AI feedback scores and model answers.
        </p>
      </div>

      {sessionState === 'setup' && (
        <InterviewSetupCard onStartInterview={handleStartInterview} />
      )}

      {sessionState === 'live' && (
        <LiveInterviewViewport
          questions={questions}
          onSubmitAllAnswers={handleSubmitAllAnswers}
          isEvaluating={isEvaluating}
        />
      )}

      {sessionState === 'feedback' && feedbackResult && (
        <InterviewFeedbackReport
          feedback={feedbackResult}
          onRestart={() => setSessionState('setup')}
        />
      )}
    </div>
  );
};
