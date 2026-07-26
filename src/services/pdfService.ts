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

export const pdfService = {
  async uploadAndProcessPdf(file: File): Promise<PdfSummaryOutput> {
    // Simulate Supabase Storage upload and AI document processing pipeline
    await new Promise((res) => setTimeout(res, 1800));

    const fileName = file.name || 'DBMS_Advanced_Indexing_Chapter_4.pdf';
    const fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    return {
      id: `pdf-${Date.now()}`,
      fileName,
      fileSize,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary:
        'This document covers advanced Relational Database Management concepts, focusing on B+ Tree Indexing algorithms, BCNF Normalization trade-offs, and ACID transaction isolation levels in distributed database systems.',
      keyPoints: [
        'B+ Trees maintain balanced heights O(log N) for both point lookups and range scans.',
        'Third Normal Form (3NF) eliminates transitive functional dependencies.',
        'BCNF is stricter than 3NF and requires every determinant to be a candidate key.',
        'Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) prevent dirty reads and phantom reads.',
      ],
      notes: [
        'Always create secondary indexes on frequently filtered foreign key columns.',
        'Serializable isolation level provides maximum consistency but incurs heavy lock contention.',
        'WAL (Write-Ahead Logging) ensures durability before writing data pages to disk.',
      ],
      flashcards: [
        { front: 'What is the main difference between B-Tree and B+ Tree?', back: 'In B+ Trees, all data records are stored in leaf nodes, connected sequentially as a linked list.' },
        { front: 'What anomaly does Repeatable Read isolation level prevent?', back: 'Prevents Non-Repeatable Reads (unrepeatable row values during same transaction).' },
        { front: 'What defines BCNF compliance?', back: 'For every functional dependency X -> Y, X must be a super key.' },
      ],
      mcqs: [
        {
          id: 'pdf-q1',
          quizId: 'pdf-quiz-1',
          questionText: 'What is the primary advantage of B+ Tree leaf node linked lists?',
          options: ['Fast single point lookups', 'Extremely fast sequential range scans', 'Zero memory overhead', 'Automatic encryption'],
          correctOption: 1,
          explanation: 'Leaf nodes form a doubly-linked list, allowing sequential range queries without tree re-traversal.',
        },
        {
          id: 'pdf-q2',
          quizId: 'pdf-quiz-1',
          questionText: 'Which isolation level completely prevents Phantom Reads?',
          options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
          correctOption: 3,
          explanation: 'Serializable uses range locks or multiversion concurrency control (MVCC) to prevent phantom insertions.',
        },
      ],
    };
  },

  getSavedPdfs(): PdfSummaryOutput[] {
    return [
      {
        id: 'pdf-1',
        fileName: 'DBMS_Advanced_Indexing_Chapter_4.pdf',
        fileSize: '3.4 MB',
        uploadDate: 'Jul 24, 2026',
        summary: 'Deep dive into B+ Trees, Indexing Strategies, and Query Performance Optimization.',
        keyPoints: ['B+ Tree O(log N) operations', 'Index selectivity guidelines'],
        notes: ['Avoid indexing low cardinality boolean columns'],
        flashcards: [{ front: 'What is Index Selectivity?', back: 'Ratio of distinct values to total table rows' }],
        mcqs: [],
      },
      {
        id: 'pdf-2',
        fileName: 'System_Design_Rate_Limiting_Whitepaper.pdf',
        fileSize: '5.1 MB',
        uploadDate: 'Jul 20, 2026',
        summary: 'Architecture paper on Token Bucket and Leaky Bucket API rate limiters with Redis.',
        keyPoints: ['Token bucket burst handling', 'Distributed Redis Lua atomic operations'],
        notes: ['Use HTTP 429 status code for throttled requests'],
        flashcards: [{ front: 'Why use Lua scripts in Redis?', back: 'Ensures atomic execution without concurrency race conditions' }],
        mcqs: [],
      },
    ];
  },
};
