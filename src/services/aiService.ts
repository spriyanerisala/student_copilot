export type AiMode = 'explain' | 'explain_simply' | 'mcq' | 'coding' | 'interview' | 'notes';

export interface AiContextData {
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  progressPercent: number;
  quizScorePercent: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  mode?: AiMode;
  timestamp: string;
}

export const aiService = {
  async sendMentorQuery(
    prompt: string,
    mode: AiMode = 'explain',
    context?: AiContextData
  ): Promise<string> {
    const course = context?.courseTitle || 'Database Management Systems';
    const lesson = context?.lessonTitle || 'Relational Model & Normalization';

    // Simulate AI response generation tailored to selected mode
    await new Promise((res) => setTimeout(res, 1200));

    switch (mode) {
      case 'explain_simply':
        return `### 💡 Simplified Explanation (${lesson})
Imagine a database as a digital filing cabinet. Instead of throwing loose papers in drawers:
- **Tables** are folders for specific items (e.g., Customers, Orders).
- **Primary Keys** are unique barcode stickers on each paper so you never confuse two invoices.
- **Normalization** is keeping each folder organized so you never write down the same customer address 10 times!`;

      case 'mcq':
        return `### 🧠 Auto-Generated Practice MCQs for ${lesson}

**Q1. What is the primary purpose of 3rd Normal Form (3NF)?**
- A) Remove repeating groups
- B) Eliminate transitive functional dependencies ✅
- C) Remove partial dependencies
- D) Create foreign keys

*Explanation:* 3NF requires that no non-prime attribute is transitively dependent on the primary key, avoiding update anomalies.`;

      case 'coding':
        return `### 💻 Hands-On Coding Challenge (${lesson})

**Problem:** Write a SQL Query to find all customers who spent more than $500 total in 2026.

\`\`\`sql
SELECT c.customer_id, c.full_name, SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2026-01-01'
GROUP BY c.customer_id, c.full_name
HAVING SUM(o.amount) > 500;
\`\`\`
*Tip:* Use HAVING instead of WHERE when filtering aggregated sums!`;

      case 'interview':
        return `### 🎙️ Senior Technical Interview Q&A (${lesson})

**Interviewer Question:** *"How does a B+ Tree index optimize database search performance compared to a standard binary search tree?"*

**Model Answer:**
1. **Fan-out Ratio:** B+ Trees have large branching factors (high fan-out), keeping tree depth low (usually 3-4 levels for millions of rows), minimizing disk I/O.
2. **Linked Leaf Nodes:** All data pointers reside in leaf nodes connected sequentially as a doubly-linked list, enabling $O(\\log N)$ point lookups AND extremely fast range scans.`;

      case 'notes':
        return `### 📝 Key Revision Notes (${lesson})

- **ACID Properties:** Atomicity (all/none), Consistency (rules kept), Isolation (concurrent safety), Durability (persisted).
- **1NF:** Atomic column values only.
- **2NF:** 1NF + No partial dependencies on composite keys.
- **3NF:** 2NF + No transitive dependencies ($A \\rightarrow B$ and $B \\rightarrow C$).`;

      case 'explain':
      default:
        return `### 🎓 AI Mentor Breakdown: ${prompt}

In the context of **${course}** (${lesson}):

1. **Core Concept:** ${prompt} relates directly to schema optimization and efficient data retrieval.
2. **Key Takeaway:** Always evaluate primary/foreign key relationships and ensure index coverage for frequently queried columns.
3. **Suggested Next Step:** Try generating a 3-question MCQ quiz on this topic to test your understanding!`;
    }
  },
};
