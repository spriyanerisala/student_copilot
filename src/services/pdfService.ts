import type { QuizQuestion } from '@/types';

export interface PdfSummaryOutput {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  summary: string;
  keyPoints: string[];
  notes: string[];
  flashcards: { front: string; back: string }[];
  mcqs: QuizQuestion[];
}

// Read file text content
async function readFileText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve((e.target?.result as string) || '');
    };
    reader.onerror = () => resolve('');
    reader.readAsText(file);
  });
}

// Extract sentences from text
function extractSentences(text: string, maxCount: number = 5): string[] {
  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 300);
  return sentences.slice(0, maxCount);
}

// Extract keywords/topic from file name and text
function detectTopic(fileName: string, text: string): string {
  const lower = (fileName + ' ' + text).toLowerCase();
  if (lower.includes('dbms') || lower.includes('database') || lower.includes('sql')) return 'Database Management Systems (DBMS)';
  if (lower.includes('machine learning') || lower.includes('neural') || lower.includes('deep learning')) return 'Machine Learning & Deep Learning';
  if (lower.includes('system design') || lower.includes('microservice') || lower.includes('distributed')) return 'System Design & Architecture';
  if (lower.includes('data structure') || lower.includes('algorithm') || lower.includes('dsa')) return 'Data Structures & Algorithms';
  if (lower.includes('network') || lower.includes('tcp') || lower.includes('osi')) return 'Computer Networks';
  if (lower.includes('operating system') || lower.includes('process') || lower.includes('memory management')) return 'Operating Systems';
  if (lower.includes('cyber') || lower.includes('security') || lower.includes('encryption')) return 'Cybersecurity';
  if (lower.includes('cloud') || lower.includes('aws') || lower.includes('kubernetes')) return 'Cloud Computing & DevOps';
  if (lower.includes('python') || lower.includes('ai') || lower.includes('nlp')) return 'Artificial Intelligence & Python';
  return fileName.replace(/\.(pdf|txt|doc|docx)$/i, '').replace(/[-_]/g, ' ');
}

// Generate dynamic flashcards from text content
function generateFlashcards(topic: string, text: string, count: number = 5): { front: string; back: string }[] {
  const sentences = extractSentences(text, 20);
  const pairs: { front: string; back: string }[] = [];

  // Try to extract definition-like patterns
  const defPatterns = text.match(/([A-Z][^.!?]{10,80})\s+(?:is|are|refers to|means|defined as)\s+([^.!?]{20,200})[.!?]/g);
  if (defPatterns) {
    for (const match of defPatterns.slice(0, 3)) {
      const parts = match.split(/\s+(?:is|are|refers to|means|defined as)\s+/);
      if (parts.length === 2) {
        pairs.push({ front: `What ${parts[0].toLowerCase()}?`, back: parts[1].replace(/[.!?]$/, '').trim() });
      }
    }
  }

  // Fill with topic-based generic flashcards
  const topicCards: { front: string; back: string }[] = [
    { front: `What is the main concept covered in this ${topic} document?`, back: sentences[0] || `This document covers core principles of ${topic}.` },
    { front: `Name 3 key points from this ${topic} material.`, back: sentences.slice(1, 4).join('; ') || `Key points include definitions, mechanisms, and applications of ${topic}.` },
    { front: `What is the practical application of ${topic}?`, back: `${topic} is applied in real-world systems to improve efficiency, reliability, and performance.` },
    { front: `What are the advantages of ${topic}?`, back: `${topic} provides structured approaches to solving complex engineering and computational problems.` },
    { front: `How does ${topic} relate to software engineering?`, back: `${topic} forms the foundation for building scalable, maintainable, and efficient software systems.` },
  ];

  for (const card of topicCards) {
    if (pairs.length < count) pairs.push(card);
  }

  return pairs.slice(0, count);
}

// Generate dynamic MCQs
function generateMCQs(topic: string, pdfId: string): QuizQuestion[] {
  return [
    {
      id: `${pdfId}-q1`,
      quizId: `${pdfId}-quiz`,
      questionText: `Which of the following best describes the primary purpose of ${topic}?`,
      options: [
        `To provide theoretical understanding of abstract concepts`,
        `To enable structured, efficient, and scalable solutions to real-world problems`,
        `To memorize formulas without practical application`,
        `To replace manual processes entirely`,
      ],
      correctOption: 1,
      explanation: `${topic} exists to solve real-world engineering problems in a structured and scalable manner.`,
    },
    {
      id: `${pdfId}-q2`,
      quizId: `${pdfId}-quiz`,
      questionText: `Which skill area does ${topic} strengthen the most for engineering interviews?`,
      options: [
        'UI/UX Design patterns',
        'Database schema modeling',
        'Problem-solving, optimization & system reasoning',
        'Business analytics',
      ],
      correctOption: 2,
      explanation: `${topic} improves technical problem-solving and reasoning which are core skills tested in SDE interviews.`,
    },
  ];
}

export const pdfService = {
  async uploadAndProcessPdf(file: File): Promise<PdfSummaryOutput> {
    const fileName = file.name || 'document.pdf';
    const fileSize = file.size > 0 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '< 0.1 MB';
    const pdfId = `pdf-${Date.now()}`;

    // 1. Send the file to n8n Webhook
    let n8nSummary = '';
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('https://n8n-x6q1.srv1854989.hstgr.cloud/webhook/summarize-pdf', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const textData = await res.text();
        try {
          // Try to parse as JSON first
          const data = JSON.parse(textData);
          // Check if n8n returned it under "summary" OR "output"
          if (data && data.summary) {
            n8nSummary = data.summary.trim();
          } else if (data && data.output) {
            n8nSummary = data.output.trim();
          } else {
            n8nSummary = textData.trim(); // Fallback to raw text if neither field exists
          }
        } catch (e) {
          // If JSON parsing fails, use the raw text safely (which matches your 'Text' setting exactly)
          n8nSummary = textData.trim();
        }
      }
    } catch (err) {
      console.warn('n8n webhook failed or timed out:', err);
    }

    // 2. Read local text for fallback & generating mock flashcards/MCQs
    const fileText = await readFileText(file);
    const hasContent = fileText.trim().length > 50;
    const topic = detectTopic(fileName, fileText);
    const sentences = extractSentences(fileText, 5);

    // Build summary from n8n if available, else fallback to local
    const finalSummary = n8nSummary 
      ? n8nSummary 
      : (hasContent && sentences.length > 0
          ? `This document on "${topic}" covers: ${sentences.slice(0, 2).join('. ')}.`
          : `This document covers core concepts, principles, and applications of ${topic} with practical examples and theoretical foundations.`);

    // DEBUG LOGS FOR n8n WEBHOOK
    console.log("n8nSummary =", n8nSummary);
    console.log("finalSummary =", finalSummary);

    // Key points from extracted sentences
    const keyPoints = hasContent && sentences.length > 2
      ? sentences.slice(0, 5).map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      : [
          `Understanding the fundamental principles of ${topic}.`,
          `Practical applications of ${topic} in real-world engineering scenarios.`,
          `Performance optimization strategies related to ${topic}.`,
          `Common pitfalls and best practices when working with ${topic}.`,
          `Interview-level depth questions and model answers on ${topic}.`,
        ];

    // Study notes
    const notes = [
      `Always review both theoretical definitions and practical implementations of ${topic}.`,
      `Cross-reference this material with your enrolled course modules for maximum retention.`,
      `Practice MCQs below to test your understanding of key concepts from this document.`,
    ];

    const flashcards = generateFlashcards(topic, fileText, 5);
    const mcqs = generateMCQs(topic, pdfId);

    return {
      id: pdfId,
      fileName,
      fileSize,
      uploadDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: finalSummary,
      keyPoints,
      notes,
      flashcards,
      mcqs,
    };
  },

  getSavedPdfs(): PdfSummaryOutput[] {
    // Return empty — each user's history is now dynamically built from uploaded files
    return [];
  },
};
