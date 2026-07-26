import type { Course } from '@/types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'dbms-101',
    title: 'Database Management Systems (DBMS) Mastery',
    subtitle: 'Master SQL, ER Modeling, Normalization (1NF to BCNF), B+ Trees & ACID Transactions',
    description: 'Comprehensive course covering relational database architecture, query optimization, indexing strategies, transactions, and distributed databases.',
    category: 'Computer Science',
    instructorName: 'Dr. Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Principal Database Architect at TechCorp',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 3420,
    difficulty: 'Intermediate',
    totalDuration: '14 Hours',
    price: 1499,
    discountPrice: 999,
    currency: '₹',
    enrolledCount: 18450,
    isFeatured: true,
    tags: ['DBMS', 'SQL', 'Normalization', 'B+ Trees', 'ACID'],
    modules: [
      {
        id: 'mod-dbms-1',
        courseId: 'dbms-101',
        title: 'Module 1: Database Architecture & Relational Model',
        description: 'Understand 3-schema architecture, relational algebra, and keys.',
        order: 1,
        lessons: [
          {
            id: 'l-dbms-1',
            moduleId: 'mod-dbms-1',
            title: '1.1 What is DBMS & Key Advantages',
            duration: '25 mins',
            order: 1,
            explanation: 'A Database Management System (DBMS) is software designed to store, retrieve, and manage data efficiently while enforcing ACID properties.',
            svgDiagram: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-lg mx-auto">
              <rect x="20" y="20" width="160" height="60" rx="12" fill="#8B5CF6" fill-opacity="0.2" stroke="#8B5CF6" stroke-width="2"/>
              <text x="100" y="55" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle">Application Layer</text>
              <line x1="180" y1="50" x2="240" y2="50" stroke="#A855F7" stroke-width="2" stroke-dasharray="4"/>
              <rect x="240" y="20" width="160" height="60" rx="12" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="2"/>
              <text x="320" y="55" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle">DBMS Engine</text>
              <line x1="400" y1="50" x2="460" y2="50" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4"/>
              <rect x="460" y="20" width="120" height="60" rx="12" fill="#10B981" fill-opacity="0.2" stroke="#10B981" stroke-width="2"/>
              <text x="520" y="55" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle">Disk Storage</text>
            </svg>`,
            examples: ['Banking transaction log systems', 'E-commerce inventory engines'],
            interviewQuestions: [
              { question: 'Difference between DBMS and File System?', answer: 'DBMS provides ACID transactions, concurrency control, and zero data redundancy.' }
            ],
            notes: ['Always select proper data types for primary key columns.'],
            flashcards: [
              { front: 'What does ACID stand for?', back: 'Atomicity, Consistency, Isolation, Durability.' }
            ],
            summary: 'DBMS ensures data integrity, multi-user concurrency control, and zero redundancy.',
            practiceQuestions: [
              { question: 'Which ACID property guarantees all-or-nothing execution?', options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], answerIndex: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cn-102',
    title: 'Computer Networks & Internet Protocols (CN)',
    subtitle: 'Master OSI Model, TCP/IP Stack, Subnetting, HTTP/3 & Socket Programming',
    description: 'Learn computer networking fundamentals from OSI layers, packet switching, DNS, BGP routing, to WebSockets.',
    category: 'Computer Science',
    instructorName: 'Prof. Alex Rivera',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Principal Network Engineer',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 2890,
    difficulty: 'Intermediate',
    totalDuration: '16 Hours',
    price: 1999,
    discountPrice: 1299,
    currency: '₹',
    enrolledCount: 14200,
    isFeatured: true,
    tags: ['Networking', 'TCP/IP', 'OSI Layers', 'DNS', 'HTTP/3'],
    modules: [
      {
        id: 'mod-cn-1',
        courseId: 'cn-102',
        title: 'Module 1: OSI 7-Layer & TCP/IP Architecture',
        description: 'Understand packet encapsulation, MAC addresses, and IP routing.',
        order: 1,
        lessons: [
          {
            id: 'l-cn-1',
            moduleId: 'mod-cn-1',
            title: '1.1 OSI Model vs TCP/IP Protocol Suite',
            duration: '30 mins',
            order: 1,
            explanation: 'The OSI model defines 7 logical networking layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
            examples: ['TCP 3-way handshake in HTTPS connections'],
            interviewQuestions: [
              { question: 'Difference between TCP and UDP?', answer: 'TCP is connection-oriented and reliable; UDP is connectionless and low-latency.' }
            ],
            notes: ['TCP uses sequence numbers to reconstruct out-of-order packets.'],
            flashcards: [
              { front: 'Which OSI layer handles IP routing?', back: 'Network Layer (Layer 3).' }
            ],
            summary: 'Networking protocol suites enable reliable packet transmission across global routers.',
            practiceQuestions: [
              { question: 'What is the default port for HTTPS?', options: ['80', '443', '22', '8080'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'os-103',
    title: 'Operating Systems (OS) & Kernel Architecture',
    subtitle: 'Processes, Threads, CPU Scheduling, Deadlocks, Virtual Memory & Paging',
    description: 'Dive deep into OS internals, process synchronization, POSIX threads, memory paging, and Linux kernel calls.',
    category: 'Computer Science',
    instructorName: 'David K. Miller',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Kernel Systems Architect',
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 4100,
    difficulty: 'Advanced',
    totalDuration: '18 Hours',
    price: 1899,
    discountPrice: 1199,
    currency: '₹',
    enrolledCount: 16800,
    isFeatured: true,
    tags: ['Operating Systems', 'Kernel', 'Processes', 'Threads', 'Memory'],
    modules: [
      {
        id: 'mod-os-1',
        courseId: 'os-103',
        title: 'Module 1: Process Management & CPU Scheduling',
        description: 'Master process creation (fork), context switching, and semaphores.',
        order: 1,
        lessons: [
          {
            id: 'l-os-1',
            moduleId: 'mod-os-1',
            title: '1.1 Process Lifecycle & Context Switching',
            duration: '35 mins',
            order: 1,
            explanation: 'A process is a program in execution containing PCB (Process Control Block), stack, heap, and registers.',
            examples: ['Linux fork() and execve() system calls'],
            interviewQuestions: [
              { question: 'What causes a Deadlock?', answer: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.' }
            ],
            notes: ['Semaphores prevent race conditions in multi-threaded code.'],
            flashcards: [
              { front: 'What is Virtual Memory?', back: 'Hardware abstraction combining RAM and disk storage via page tables.' }
            ],
            summary: 'Operating system kernels schedule tasks and manage memory safely.',
            practiceQuestions: [
              { question: 'Which scheduling algorithm prevents starvation?', options: ['First Come First Serve', 'Round Robin', 'Shortest Job First', 'Priority without aging'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fullstack-104',
    title: 'Full Stack Web Development (MERN & Next.js 15)',
    subtitle: 'Build SaaS Applications with React 19, Node.js, Express, Next.js & Supabase',
    description: 'Learn full-stack web development from scratch to production deployment with TypeScript and Tailwind CSS.',
    category: 'Full-Stack',
    instructorName: 'Ananya Sharma',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Lead SaaS Engineer',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewCount: 5890,
    difficulty: 'Intermediate',
    totalDuration: '32 Hours',
    price: 3999,
    discountPrice: 2499,
    currency: '₹',
    enrolledCount: 24500,
    isFeatured: true,
    tags: ['Full Stack', 'React', 'Next.js', 'Node.js', 'Supabase'],
    modules: [
      {
        id: 'mod-fs-1',
        courseId: 'fullstack-104',
        title: 'Module 1: React 19 Core & Next.js App Router',
        description: 'Master Server Components, Hooks, Context API, and Tailwind CSS.',
        order: 1,
        lessons: [
          {
            id: 'l-fs-1',
            moduleId: 'mod-fs-1',
            title: '1.1 React 19 Architecture & State Management',
            duration: '40 mins',
            order: 1,
            explanation: 'Build reactive component-driven UIs with declarative state and fast hydration.',
            examples: ['Production e-commerce cart and authentication context'],
            interviewQuestions: [
              { question: 'What is Virtual DOM?', answer: 'In-memory representation of real DOM elements for optimized batch diffing.' }
            ],
            notes: ['Use Server Components by default for smaller JS bundle sizes.'],
            flashcards: [
              { front: 'What is useEffect hook used for?', back: 'Handling side effects like data fetching and subscriptions.' }
            ],
            summary: 'Full-stack React empowers developers to build scalable SaaS applications.',
            practiceQuestions: [
              { question: 'Which hook manages local component state?', options: ['useEffect', 'useState', 'useContext', 'useRef'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ai-tools-105',
    title: 'AI Tools & Productivity Masterclass',
    subtitle: 'Master ChatGPT, Claude 3.5, Cursor, Copilot, Midjourney & Automation Workflows',
    description: 'Boost developer productivity 10x using modern generative AI tools and prompt engineering techniques.',
    category: 'AI & Automation',
    instructorName: 'Rohan Mehta',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'AI Productivity Specialist',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewCount: 3120,
    difficulty: 'Beginner',
    totalDuration: '10 Hours',
    price: 2499,
    discountPrice: 1499,
    currency: '₹',
    enrolledCount: 19800,
    isFeatured: false,
    tags: ['AI Tools', 'ChatGPT', 'Cursor', 'Prompt Engineering', 'Automation'],
    modules: [
      {
        id: 'mod-ait-1',
        courseId: 'ai-tools-105',
        title: 'Module 1: Developer AI Tools & Workflows',
        description: 'Use AI coding assistants for instant refactoring, testing, and debugging.',
        order: 1,
        lessons: [
          {
            id: 'l-ait-1',
            moduleId: 'mod-ait-1',
            title: '1.1 Cursor IDE & Copilot Pair Programming',
            duration: '20 mins',
            order: 1,
            explanation: 'Integrate LLMs directly into code editor workflows for automated boilerplate creation.',
            examples: ['Generating Zod schemas and API routes instantly'],
            interviewQuestions: [
              { question: 'What is Prompt Engineering?', answer: 'Designing structured text prompts to guide AI models toward accurate outputs.' }
            ],
            notes: ['Provide context files when querying AI coding assistants.'],
            flashcards: [
              { front: 'What is RAG in AI?', back: 'Retrieval-Augmented Generation using external context docs.' }
            ],
            summary: 'AI tools accelerate coding and automate repetitive software tasks.',
            practiceQuestions: [
              { question: 'Which tool specializes in AI pair programming in IDEs?', options: ['Cursor', 'Figma', 'Postman', 'Docker'], answerIndex: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'agentic-ai-106',
    title: 'AI Agents & Agentic AI Systems Architecture',
    subtitle: 'Build Autonomous AI Agents with LangChain, LlamaIndex, AutoGen & CrewAI',
    description: 'Learn how to build multi-agent autonomous AI systems that reason, plan, execute tool calls, and collaborate.',
    category: 'AI & Automation',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'AI Research Scientist',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewCount: 4890,
    difficulty: 'Advanced',
    totalDuration: '22 Hours',
    price: 4999,
    discountPrice: 2999,
    currency: '₹',
    enrolledCount: 15400,
    isFeatured: true,
    tags: ['AI Agents', 'Agentic AI', 'LangChain', 'CrewAI', 'LLM Tools'],
    modules: [
      {
        id: 'mod-ag-1',
        courseId: 'agentic-ai-106',
        title: 'Module 1: Autonomous Agent Loops & Tool Execution',
        description: 'Build ReAct reasoning loops, memory systems, and tool binding.',
        order: 1,
        lessons: [
          {
            id: 'l-ag-1',
            moduleId: 'mod-ag-1',
            title: '1.1 ReAct Pattern & Autonomous Agent Execution',
            duration: '45 mins',
            order: 1,
            explanation: 'Agentic AI systems combine Reasoning (Thought) and Acting (Tool Calling) in self-correcting execution loops.',
            examples: ['Autonomous web browsing agent researching market data'],
            interviewQuestions: [
              { question: 'What is the ReAct framework in AI Agents?', answer: 'Reasoning and Acting framework interleaving thought steps with tool actions.' }
            ],
            notes: ['Enforce max iterations to prevent infinite agent execution loops.'],
            flashcards: [
              { front: 'What is a Multi-Agent System?', back: 'Architecture where specialized agents collaborate to achieve complex goals.' }
            ],
            summary: 'Agentic AI represents the next wave of autonomous software automation.',
            practiceQuestions: [
              { question: 'Which framework simplifies building multi-agent teams?', options: ['CrewAI', 'Bootstrap', 'Redux', 'Express'], answerIndex: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sys-201',
    title: 'High-Scale System Design (HLD & LLD)',
    subtitle: 'Design Distributed Systems: Microservices, Caching, Load Balancers & Kafka',
    description: 'Learn high-level and low-level system design principles to crack senior engineering interviews at top tech companies.',
    category: 'System Design',
    instructorName: 'Priya Nambiar',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Principal Staff Engineer',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewCount: 6200,
    difficulty: 'Advanced',
    totalDuration: '24 Hours',
    price: 3499,
    discountPrice: 2199,
    currency: '₹',
    enrolledCount: 22100,
    isFeatured: true,
    tags: ['System Design', 'HLD', 'LLD', 'Microservices', 'Kafka', 'Redis'],
    modules: [
      {
        id: 'mod-sd-1',
        courseId: 'sys-201',
        title: 'Module 1: Scalability, Load Balancing & Distributed Caching',
        description: 'Design systems handling 1,000,000 requests per second with Redis and NGINX.',
        order: 1,
        lessons: [
          {
            id: 'l-sys-1',
            moduleId: 'mod-sd-1',
            title: '1.1 Token Bucket Rate Limiting Architecture',
            duration: '35 mins',
            order: 1,
            explanation: 'Rate limiters protect API infrastructure from DDoS attacks and traffic surges using token bucket algorithms.',
            examples: ['Stripe and GitHub API rate limiters'],
            interviewQuestions: [
              { question: 'What is CAP Theorem?', answer: 'A distributed system can only provide 2 out of 3: Consistency, Availability, Partition Tolerance.' }
            ],
            notes: ['Use Redis Lua scripts for atomic rate limiting counter increments.'],
            flashcards: [
              { front: 'What is Consistent Hashing?', back: 'Distributed hashing scheme minimizing key remapping during server additions/removals.' }
            ],
            summary: 'System design principles ensure zero downtime and high availability under load.',
            practiceQuestions: [
              { question: 'Which HTTP status code is returned for rate limiting?', options: ['400', '401', '403', '429'], answerIndex: 3 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-107',
    title: 'Data Structures & Algorithms (DSA) Bootcamp',
    subtitle: 'Master Arrays, Trees, Dynamic Programming, Graphs & LeetCode 75',
    description: 'Crack coding interviews with step-by-step visualizations of core data structures, algorithms, and time complexities.',
    category: 'Computer Science',
    instructorName: 'Karan Kapoor',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Competitive Programming Champion',
    coverImage: 'https://images.unsplash.com/photo-1516116211223-425896887553?w=800&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewCount: 7400,
    difficulty: 'Intermediate',
    totalDuration: '28 Hours',
    price: 2999,
    discountPrice: 1799,
    currency: '₹',
    enrolledCount: 31000,
    isFeatured: true,
    tags: ['DSA', 'Algorithms', 'LeetCode', 'Dynamic Programming', 'Graphs'],
    modules: [
      {
        id: 'mod-dsa-1',
        courseId: 'dsa-107',
        title: 'Module 1: Time Complexity & Advanced Array Techniques',
        description: 'Master Big O notation, two pointers, sliding window, and binary search.',
        order: 1,
        lessons: [
          {
            id: 'l-dsa-1',
            moduleId: 'mod-dsa-1',
            title: '1.1 Sliding Window & Two Pointers Patterns',
            duration: '30 mins',
            order: 1,
            explanation: 'Sliding window converts O(N^2) nested loop algorithms into optimal O(N) linear operations.',
            examples: ['Longest Substring Without Repeating Characters'],
            interviewQuestions: [
              { question: 'Time complexity of Binary Search?', answer: 'O(log N) average and worst-case time complexity.' }
            ],
            notes: ['Always check array boundary bounds to avoid IndexOutOfBounds errors.'],
            flashcards: [
              { front: 'What is Big O notation?', back: 'Mathematical representation of upper bound runtime or memory complexity.' }
            ],
            summary: 'Algorithmic patterns simplify solving hard coding interview problems.',
            practiceQuestions: [
              { question: 'What is the time complexity of QuickSort average case?', options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cyber-108',
    title: 'Cyber Security & Ethical Hacking Essentials',
    subtitle: 'Learn Penetration Testing, OWASP Top 10, Cryptography & Network Defense',
    description: 'Become a certified security analyst learning ethical hacking techniques, vulnerability scanning, and secure coding practices.',
    category: 'Security',
    instructorName: 'Siddharth Varma',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Certified Ethical Hacker (CEH)',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    rating: 4.87,
    reviewCount: 2980,
    difficulty: 'Intermediate',
    totalDuration: '20 Hours',
    price: 3299,
    discountPrice: 1999,
    currency: '₹',
    enrolledCount: 12800,
    isFeatured: false,
    tags: ['Cyber Security', 'OWASP Top 10', 'Penetration Testing', 'Cryptography'],
    modules: [
      {
        id: 'mod-cy-1',
        courseId: 'cyber-108',
        title: 'Module 1: OWASP Top 10 Web Vulnerabilities',
        description: 'Identify and patch SQL Injection, Cross-Site Scripting (XSS), and CSRF.',
        order: 1,
        lessons: [
          {
            id: 'l-cy-1',
            moduleId: 'mod-cy-1',
            title: '1.1 Preventing SQL Injection & XSS Vulnerabilities',
            duration: '35 mins',
            order: 1,
            explanation: 'Use parameterized queries and sanitization to block malicious payload injections.',
            examples: ['Parameterized prepared SQL statements'],
            interviewQuestions: [
              { question: 'What is XSS?', answer: 'Cross-Site Scripting allows attackers to inject malicious scripts into trusted websites.' }
            ],
            notes: ['Never concatenate raw user input into database SQL queries.'],
            flashcards: [
              { front: 'What is CSRF?', back: 'Cross-Site Request Forgery tricks authenticated users into executing unintended web actions.' }
            ],
            summary: 'Defensive security practices protect web applications from cyber exploits.',
            practiceQuestions: [
              { question: 'Which header prevents clickjacking attacks?', options: ['X-Frame-Options', 'Content-Type', 'Cache-Control', 'Accept-Encoding'], answerIndex: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-109',
    title: 'Cloud Computing & DevOps Architecture (AWS/GCP)',
    subtitle: 'Docker, Kubernetes, Terraform, AWS EC2, S3, ECS, Lambda & CI/CD Pipelines',
    description: 'Master cloud infrastructure, container orchestration with Kubernetes, and automated CI/CD deployments.',
    category: 'Cloud & DevOps',
    instructorName: 'Vikram Choudhury',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'AWS Solutions Architect',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    rating: 4.91,
    reviewCount: 3950,
    difficulty: 'Advanced',
    totalDuration: '26 Hours',
    price: 3799,
    discountPrice: 2299,
    currency: '₹',
    enrolledCount: 17900,
    isFeatured: true,
    tags: ['Cloud', 'AWS', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
    modules: [
      {
        id: 'mod-cc-1',
        courseId: 'cloud-109',
        title: 'Module 1: Docker Containerization & Kubernetes Orchestration',
        description: 'Package microservices into containers and manage clusters.',
        order: 1,
        lessons: [
          {
            id: 'l-cc-1',
            moduleId: 'mod-cc-1',
            title: '1.1 Building Production Docker Images & K8s Pods',
            duration: '40 mins',
            order: 1,
            explanation: 'Containers bundle application code with dependencies for consistent execution across environments.',
            examples: ['Multi-stage Dockerfiles for minimal production images'],
            interviewQuestions: [
              { question: 'Difference between Docker Container and VM?', answer: 'Containers share host OS kernel and are lightweight; VMs virtualize entire hardware.' }
            ],
            notes: ['Use non-root user instructions in production Dockerfiles.'],
            flashcards: [
              { front: 'What is a Kubernetes Pod?', back: 'The smallest deployable computing unit in Kubernetes containing one or more containers.' }
            ],
            summary: 'Cloud containerization simplifies automated continuous deployment pipelines.',
            practiceQuestions: [
              { question: 'Which command builds a Docker image from Dockerfile?', options: ['docker build', 'docker run', 'docker pull', 'docker exec'], answerIndex: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'aiml-110',
    title: 'AI & Machine Learning (AIML) Engineering',
    subtitle: 'Python, PyTorch, Scikit-Learn, Neural Networks, Computer Vision & NLP',
    description: 'Learn foundational and advanced Machine Learning algorithms, deep learning neural networks, and model deployment.',
    category: 'AI & Machine Learning',
    instructorName: 'Dr. Meera Nambiar',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'AI Research Lead',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    rating: 4.94,
    reviewCount: 4600,
    difficulty: 'Advanced',
    totalDuration: '30 Hours',
    price: 4499,
    discountPrice: 2799,
    currency: '₹',
    enrolledCount: 20500,
    isFeatured: true,
    tags: ['AIML', 'Python', 'PyTorch', 'Neural Networks', 'Machine Learning'],
    modules: [
      {
        id: 'mod-ml-1',
        courseId: 'aiml-110',
        title: 'Module 1: Supervised Learning & Neural Network Backpropagation',
        description: 'Understand regression, classification, gradient descent, and loss optimization.',
        order: 1,
        lessons: [
          {
            id: 'l-ml-1',
            moduleId: 'mod-ml-1',
            title: '1.1 Gradient Descent & Backpropagation Architecture',
            duration: '45 mins',
            order: 1,
            explanation: 'Gradient descent minimizes loss function weights via backpropagation chain rule partial derivatives.',
            examples: ['Image classification using Convolutional Neural Networks (CNN)'],
            interviewQuestions: [
              { question: 'What is Overfitting?', answer: 'When a model learns training noise instead of generalizing to new unseen data.' }
            ],
            notes: ['Use Dropout layers and L2 regularization to combat overfitting.'],
            flashcards: [
              { front: 'What is a Loss Function?', back: 'Mathematical function measuring discrepancy between model predictions and true labels.' }
            ],
            summary: 'Machine learning algorithms optimize model weights from data patterns.',
            practiceQuestions: [
              { question: 'Which activation function is most common in hidden neural network layers?', options: ['Sigmoid', 'ReLU', 'Linear', 'Binary Step'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'qa-111',
    title: 'QA Engineer & Automation Testing Mastery',
    subtitle: 'Selenium, Cypress, Playwright, JUnit, API Testing with Postman & CI Integration',
    description: 'Become a certified QA Automation Engineer mastering E2E web testing, API test suites, and bug tracking.',
    category: 'QA & Testing',
    instructorName: 'Rajesh Iyer',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Lead QA Automation Architect',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    rating: 4.86,
    reviewCount: 2450,
    difficulty: 'Beginner',
    totalDuration: '14 Hours',
    price: 2199,
    discountPrice: 1399,
    currency: '₹',
    enrolledCount: 11200,
    isFeatured: false,
    tags: ['QA Engineer', 'Testing', 'Cypress', 'Playwright', 'Selenium', 'Postman'],
    modules: [
      {
        id: 'mod-qa-1',
        courseId: 'qa-111',
        title: 'Module 1: Automated E2E Testing with Playwright & Cypress',
        description: 'Write robust automation test scripts for web applications and REST APIs.',
        order: 1,
        lessons: [
          {
            id: 'l-qa-1',
            moduleId: 'mod-qa-1',
            title: '1.1 Writing E2E Automated Tests & Assertions',
            duration: '25 mins',
            order: 1,
            explanation: 'Automated software testing verifies functionality, catches regression bugs early, and speeds release cycles.',
            examples: ['E-commerce user checkout end-to-end automation test suite'],
            interviewQuestions: [
              { question: 'Difference between Regression and Smoke Testing?', answer: 'Smoke testing checks basic core sanity; regression testing verifies deep features after changes.' }
            ],
            notes: ['Use unique data-testid attributes for reliable element selectors.'],
            flashcards: [
              { front: 'What is Page Object Model (POM)?', back: 'Design pattern structuring web page UI elements as object repositories for cleaner test code.' }
            ],
            summary: 'QA automation testing guarantees software reliability across browsers.',
            practiceQuestions: [
              { question: 'Which HTTP method is used to create new server resources?', options: ['GET', 'POST', 'DELETE', 'HEAD'], answerIndex: 1 }
            ]
          }
        ]
      }
    ]
  }
];
