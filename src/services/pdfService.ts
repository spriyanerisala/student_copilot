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
    const fileName = file.name || 'document.pdf';
    const fileSize = file.size > 0 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '< 0.1 MB';
    const pdfId = `pdf-${Date.now()}`;

    let n8nSummary = '';
    
    // 1. Send the file to n8n Webhook
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
          const parsedData = JSON.parse(textData);
          const data = Array.isArray(parsedData) ? parsedData[0] : parsedData;
          
          if (data && data.summary) {
            n8nSummary = data.summary.trim();
          } else if (data && data.output) {
            n8nSummary = data.output.trim();
          } else {
            n8nSummary = textData.trim(); 
          }
        } catch (e) {
          n8nSummary = textData.trim();
        }
      } else {
        const errorText = await res.text();
        console.error("n8n responded with an error:", res.status, res.statusText, errorText);
        throw new Error(`n8n webhook failed with status: ${res.status}`);
      }
    } catch (err) {
      console.warn('n8n webhook request failed:', err);
      throw new Error('Failed to connect to n8n workflow. Ensure the webhook is active.');
    }

    if (!n8nSummary) {
      throw new Error('n8n workflow did not return a valid summary.');
    }

    return {
      id: pdfId,
      fileName,
      fileSize,
      uploadDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: n8nSummary,
      keyPoints: [],
      notes: [],
      flashcards: [],
      mcqs: [],
    };
  },

  getSavedPdfs(): PdfSummaryOutput[] {
    // Return empty — each user's history is now dynamically built from uploaded files
    return [];
  },
};
