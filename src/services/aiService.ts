export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const aiService = {
  async sendMentorQuery(prompt: string): Promise<string> {
    try {
      const res = await fetch('https://n8n-x6q1.srv1854989.hstgr.cloud/webhook/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const textData = await res.text();
        try {
          const parsedData = JSON.parse(textData);
          const data = Array.isArray(parsedData) ? parsedData[0] : parsedData;
          
          if (data && data.output) {
            return data.output.trim();
          } else if (data && data.response) {
            return data.response.trim();
          } else {
            return textData.trim();
          }
        } catch (e) {
          return textData.trim();
        }
      } else {
        const errorText = await res.text();
        console.error("n8n AI Mentor responded with an error:", res.status, res.statusText, errorText);
        throw new Error(`n8n webhook failed with status: ${res.status}`);
      }
    } catch (err) {
      console.warn('n8n AI Mentor webhook request failed:', err);
      throw new Error('Failed to connect to n8n workflow. Ensure the webhook is active.');
    }
  },
};
