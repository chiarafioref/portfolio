import type { Dictionary } from './it.ts'

/** English texts. Same structure as it.ts (checked by the `Dictionary` type). */
export const en: Dictionary = {
  common: {
    newTab: 'opens in a new tab',
    opensInNewTab: '(opens in a new tab)',
  },

  nav: {
    label: 'Main',
    home: 'Home',
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    skip: 'Skip to content',
    tabs: 'Site sections',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    language: 'Language',
    languageIt: 'Italiano',
    languageEn: 'English',
  },

  footer: { label: 'Footer' },

  home: {
    title: 'Chiara Fiore | Junior Full-Stack Developer',
    headline: ['Full-stack applications', 'with AI built in.'],
    intro:
      'I build complete applications: React on the front end, Node.js, Express and Supabase on the back end. I care about the robustness and security of my code, and I use AI to work faster without depending on it.',
    seeProjects: 'See my projects',
    downloadCv: 'Download CV',
    location: 'Milan, Italy',
    stackFrontend: 'Front end, AI and tools',
    stackBackend: 'Back end and databases',
    frontendSkills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React',
      'Tailwind CSS',
      'Bootstrap',
      'LLM integration',
      'Prompting',
      'Structured outputs (JSON Schema)',
      'AI-assisted development',
      'Git',
      'GitHub',
    ],
    backendSkills: [
      'JavaScript (Node.js)',
      'Express',
      'API development',
      'Server-side application logic',
      'SQL',
      'MySQL',
      'Supabase (PostgreSQL)',
      'Authentication',
    ],
    pillarsKicker: 'Technical skills',
    pillarsTitle: 'My stack, from the interface to the database',
    pillars: [
      {
        title: 'Front end with React',
        text: 'Responsive interfaces and reusable components with React and modern JavaScript, including state and routing.',
        tags: ['React', 'JavaScript', 'Tailwind CSS'],
      },
      {
        title: 'Back end and APIs',
        text: 'APIs with Node.js and Express and server-side logic, with authentication: solid and secure.',
        tags: ['Node.js', 'Express', 'API', 'Authentication'],
      },
      {
        title: 'Databases and Supabase',
        text: 'Database design and management: SQL, MySQL and Supabase (PostgreSQL) connected to the front end and APIs.',
        tags: ['SQL', 'MySQL', 'Supabase'],
      },
      {
        title: 'AI integration',
        text: 'Language models (LLMs) built into web applications, with focused prompts and structured outputs.',
        tags: ['LLM', 'Prompting', 'JSON Schema'],
      },
    ],
  },

  about: {
    bio: "I have always been fascinated by technology, especially artificial intelligence, which I try to bring into my projects when it adds real value. I like building an application from the ground up, shaping its interactions and design around market research and the needs of the people who will use it, setting personal taste aside; at the same time, I handle the back end and databases with rigorous attention to data security. I am a precise, organized and methodical person: if I find an anomaly during testing, I prefer to stop and fix it at the root rather than apply a rushed patch. I appreciate the visual impact of a well-crafted animation, but for me the absolute priority remains a performant, smooth architecture with no technical compromises.",

    skillsKicker: 'Technical skills',
    skillsTitle: 'My stack, from the interface to the database',
    skillsIntro: 'The four areas I work on, all backed by the projects in my Portfolio.',
    skills: [
      {
        title: 'Front end with React',
        text: 'Responsive interfaces with reusable components, state management and routing.',
        items: [
          'React: components, state and routing',
          'Modern JavaScript (ES6+)',
          'Tailwind CSS and Bootstrap',
          'Responsive, accessible interfaces',
        ],
      },
      {
        title: 'Back end and APIs',
        text: 'Solid, secure server-side logic exposed through clear APIs.',
        items: [
          'API development with Node.js and Express',
          'Server-side application logic',
          'User authentication',
          'Attention to code robustness and security',
        ],
      },
      {
        title: 'Databases and Supabase',
        text: 'Data designed to last, connected to front ends and APIs.',
        items: [
          'Database design and creation',
          'SQL and MySQL',
          'Supabase (PostgreSQL)',
          'Databases connected to front ends and APIs',
        ],
      },
      {
        title: 'AI integration',
        text: 'Language models built into web applications as product features.',
        items: [
          'Language model (LLM) integration',
          'Focused, well-structured prompts',
          'Structured outputs with JSON Schema',
          'AI-assisted development',
        ],
      },
    ],

    ai: {
      kicker: 'How I work with AI',
      title: 'A tool that speeds me up, not a crutch',
      intro:
        "I know how to write effective prompts and get the most out of AI, but I don't depend on it: I understand and review what I build, and I can rebuild on my own.",
      withTitle: 'With AI',
      withCaption: 'Faster, with method',
      with: [
        'Focused prompts to generate, refactor and document code',
        'AI-assisted development in my everyday work',
        'Checking and reviewing generated code before using it',
        'Architecture decisions stay mine: AI proposes, I decide',
      ],
      withoutTitle: 'Without AI',
      withoutCaption: 'Independent, when it matters',
      without: [
        'I write JavaScript, React and Node.js code on my own',
        'I design databases and write SQL queries',
        'I debug by reading and reasoning about the code',
        'I build responsive interfaces starting from a blank page',
      ],
    },

    education: {
      kicker: 'Education and certifications',
      title: 'Master and certifications',
    },

    master: {
      inProgress: 'In progress',
      done: 'Completed',
      period: 'Period',
      programme: 'Curriculum',
      topics: [
        'Front end with React and modern JavaScript',
        'Back end with Node.js and Express: APIs and authentication',
        'SQL databases and Supabase (PostgreSQL)',
        'Language model (LLM) integration: prompts and structured outputs',
        'AI-assisted development from day one',
      ],
    },

    certification: {
      issuedLabel: 'Earned on',
      issued: (date: string) => `Earned on ${date}`,
      validLabel: 'Valid until',
      valid: (date: string) => `Valid until ${date}`,
      verify: 'Verify the badge on Oracle',
      topicsTitle: 'Topics',
      topics: [
        'Machine Learning and Deep Learning',
        'Large Language Models and Generative AI',
        'OCI AI Services and Machine Learning Services',
        'Oracle 23ai (Select AI)',
      ],
    },

    languages: {
      title: 'Languages',
      list: [
        { name: 'Italian', level: 'Native' },
        { name: 'English', level: 'B2' },
      ],
    },

    cta: {
      title: 'Shall we work together?',
      text: "I'm looking for a team where I can grow as a Junior Full-Stack Developer. See what I've built or write to me directly.",
      projects: 'See the projects',
      write: 'Email me',
    },
  },

  portfolio: {
    title: 'Full-Stack projects, from code to production',
    intro:
      'Complete applications built end to end, from the database to the user interface. Explore the live demos or browse the architecture details.',
    featured: 'Featured project',
    online: 'Live',
    technologies: 'Technologies',
    roleLabel: 'My role:',
    role: 'End-to-end development: ideation, design, code and database, all built entirely on my own.',
    open: (name: string) => `Open ${name}`,
    code: 'Code on GitHub',
    screensOf: (name: string) => `${name} screens`,
    browseScreens: (name: string) => `Browse the ${name} screens`,
    caption: 'Real screenshots of the app, with demo data (the app interface is in Italian)',
  },

  projects: {
    mywallet: {
      tagline: 'Personal finance manager',
      description:
        'A mobile-first web application to keep income and expenses under control, with monthly budgets, real-time statistics, group expenses and an AI assistant.',
      features: [
        'Income and expenses with dashboard and statistics',
        'Monthly budgets, savings and upcoming expenses',
        'Subscriptions and recurring expenses',
        'Group expenses for trips',
        'AI assistant to analyze budgets and expenses',
        'Sign-in with an account, light and dark theme',
      ],
      screens: {
        budget: { label: 'Budget', alt: 'MyWallet: monthly budgets with a limit per category' },
        statistiche: {
          label: 'Statistics',
          alt: 'MyWallet in dark theme: expense statistics by category',
        },
        dashboard: {
          label: 'Dashboard',
          alt: 'MyWallet: dashboard with balance, income, expenses and available funds',
        },
        assistente: { label: 'AI assistant', alt: 'MyWallet: the AI assistant suggests where to save' },
        gruppo: {
          label: 'Group expenses',
          alt: 'MyWallet: group expenses for a trip with the balance between participants',
        },
        report: { label: 'Monthly report', alt: 'MyWallet: monthly report with account statement' },
        scuro: { label: 'Dark theme', alt: 'MyWallet: dashboard in dark theme' },
      },
    },
  },

  contact: {
    title: "Let's talk",
    intro:
      "I'm open to new challenges as a Full-Stack Developer. Get in touch about an interview, a project, or just to chat about tech.",
    responseTime: 'within 48 hours',
    replyLine: (time: string) => `I reply ${time}`,

    form: {
      title: 'Send me a message',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      optional: '(optional)',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      fallbackIntro: 'If the problem persists, email me directly at',
      trapLabel: 'Do not fill in this field',
      successTitle: 'Message sent successfully',
      successText: (time: string) =>
        `I'll get back to you as soon as possible: I usually reply ${time}, at the address you provided.`,
      another: 'Write another message',
    },

    errors: {
      nameRequired: () => 'Please enter your name.',
      nameTooShort: (limits) => `Your name must be at least ${limits.nameMin} characters.`,
      nameInvalid: () => 'This name is not valid.',
      emailRequired: () => 'Please enter your email.',
      emailInvalid: () => 'Check the email address: it looks incomplete.',
      companyTooLong: (limits) => `The company name can be at most ${limits.companyMax} characters.`,
      messageRequired: () => 'Please write a message.',
      messageTooShort: (limits) => `Please write at least ${limits.messageMin} characters, so I can reply properly.`,
      messageTooLong: (limits) => `The message can be at most ${limits.messageMax} characters.`,
    },

    sendErrors: {
      validation: 'Check the highlighted fields and try again.',
      rateLimited: "You've sent too many messages in a short time. Please try again in a few minutes.",
      timeout: 'The server is taking too long to respond. Please try again in a moment.',
      offline: "I can't connect: check your internet connection and try again.",
      generic: 'Something went wrong while sending. Please try again in a moment.',
    },

    direct: {
      title: 'Direct contact',
      text: 'Prefer to reach out on your own? These are the fastest ways.',
      email: { label: 'Email', action: 'Email me', hint: 'opens your email app with a message ready to send' },
      linkedin: { label: 'LinkedIn', action: 'Connect' },
      github: { label: 'GitHub', action: 'Explore' },
      cv: { label: 'Curriculum vitae', value: 'PDF format', action: 'Download', hint: 'downloads the PDF file' },
      location: 'Location',
      responseTime: 'Response time',
    },

    mail: {
      subject: '💼 Contact / Job opportunity',
      // Trailing spaces are intentional: the sender keeps typing right after each colon.
      body: [
        "Hi Chiara, I saw your portfolio and I'm reaching out because ",
        '',
        'My details: ',
        '- Name / Company: ',
        '- Contact (Email / Phone): ',
      ].join('\n'),
    },
  },

  notFound: {
    title: 'Page not found',
    heading: "This page doesn't exist",
    text: 'The link may be wrong, or the page may have been moved. The rest of the site, on the other hand, works just fine.',
    back: 'Back to home',
    projects: 'See the projects',
  },
}
