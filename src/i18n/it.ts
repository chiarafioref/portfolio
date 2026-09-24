import type { ScreenId } from '../data/projects.ts'
import type { ContactErrorCode, ContactLimits } from '../lib/contact.ts'
import type { SendErrorKind } from '../lib/sendContact.ts'

/**
 * Testi in italiano, fonte di verità per il tipo `Dictionary`: en.ts deve avere la stessa struttura.
 * Le frasi con parti variabili sono funzioni.
 */

type ScreenCopy = { label: string; alt: string }

type ProjectCopy = {
  tagline: string
  description: string
  features: string[]
  screens: Record<ScreenId, ScreenCopy>
}

type PillarCopy = { title: string; text: string; tags: string[] }

type SkillCopy = { title: string; text: string; items: string[] }

export const it = {
  common: {
    newTab: 'si apre in una nuova scheda',
    opensInNewTab: '(si apre in una nuova scheda)',
    errorTitle: 'Qualcosa è andato storto',
    errorText: 'Non è stato possibile caricare la pagina. Probabilmente il sito è stato aggiornato: ricarica per vedere la versione più recente.',
    reload: 'Ricarica la pagina',
  },

  nav: {
    label: 'Principale',
    home: 'Home',
    about: 'Profilo',
    portfolio: 'Portfolio',
    contact: 'Contatti',
    skip: 'Vai al contenuto',
    tabs: 'Sezioni del sito',
    themeToLight: 'Passa al tema chiaro',
    themeToDark: 'Passa al tema scuro',
    language: 'Lingua',
    languageIt: 'Italiano',
    languageEn: 'English',
  },

  footer: { label: 'Piè di pagina' },

  home: {
    title: 'Chiara Fiore | Junior Full-Stack Developer',
    headline: ['Applicazioni full-stack', "con l'IA integrata."],
    intro:
      "Costruisco applicazioni complete: React sul front-end, Node.js, Express e Supabase sul back-end. Curo la solidità e la sicurezza del codice, e uso l'IA per lavorare più in fretta, senza dipenderne.",
    seeProjects: 'Vedi i miei progetti',
    downloadCv: 'Scarica il CV',
    location: 'Milano, Italia',
    stackFrontend: 'Front-end, AI e strumenti',
    stackBackend: 'Back-end e database',
    frontendSkills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React',
      'Tailwind CSS',
      'Bootstrap',
      'Integrazione LLM',
      'Prompting',
      'Output strutturati (JSON Schema)',
      'Sviluppo assistito da AI',
      'Git',
      'GitHub',
    ],
    backendSkills: [
      'JavaScript (Node.js)',
      'Express',
      'Sviluppo di API',
      'Logica applicativa lato server',
      'SQL',
      'MySQL',
      'Supabase (PostgreSQL)',
      'Autenticazione',
    ],
    pillarsKicker: 'Competenze tecniche',
    pillarsTitle: "Il mio stack, dall'interfaccia al database",
    pillars: [
      {
        title: 'Front-end con React',
        text: 'Interfacce reattive e componenti riutilizzabili con React e JavaScript moderno, tra stato e routing.',
        tags: ['React', 'JavaScript', 'Tailwind CSS'],
      },
      {
        title: 'Back-end e API',
        text: 'API con Node.js ed Express e logica lato server, con autenticazione: solide e sicure.',
        tags: ['Node.js', 'Express', 'API', 'Autenticazione'],
      },
      {
        title: 'Database e Supabase',
        text: 'Progettazione e gestione di database: SQL, MySQL e Supabase (PostgreSQL) collegati a front-end e API.',
        tags: ['SQL', 'MySQL', 'Supabase'],
      },
      {
        title: "Integrazione dell'IA",
        text: 'Modelli linguistici (LLM) inseriti nelle applicazioni web, con prompt mirati e output strutturati.',
        tags: ['LLM', 'Prompting', 'JSON Schema'],
      },
    ] as PillarCopy[],
  },

  about: {
    bio: "Sono sempre stata affascinata dalla tecnologia, in particolare dall'intelligenza artificiale, che cerco di integrare nei miei progetti quando aggiunge reale valore. Mi piace costruire un'applicazione dalle fondamenta, curandone le interazioni e il design partendo da ricerche di mercato e dai bisogni di chi la userà, mettendo da parte il gusto personale; al tempo stesso, gestisco il back-end e i database con un'attenzione rigorosa alla sicurezza dei dati. Sono una persona precisa, organizzata e metodica: se trovo un'anomalia in fase di controllo, preferisco fermarmi e risolverla alla radice anziché applicare soluzioni affrettate. Apprezzo l'impatto visivo di un'animazione curata, ma per me la priorità assoluta resta un'architettura performante, fluida e priva di compromessi tecnici.",

    skillsKicker: 'Competenze tecniche',
    skillsTitle: "Il mio stack, dall'interfaccia al database",
    skillsIntro: 'Le quattro aree in cui lavoro, tutte dimostrabili con i progetti del Portfolio.',
    skills: [
      {
        title: 'Front-end con React',
        text: 'Interfacce reattive con componenti riutilizzabili, gestione dello stato e routing.',
        items: [
          'React: componenti, stato e routing',
          'JavaScript moderno (ES6+)',
          'Tailwind CSS e Bootstrap',
          'Interfacce responsive e accessibili',
        ],
      },
      {
        title: 'Back-end e API',
        text: 'Logica lato server solida e sicura, esposta attraverso API chiare.',
        items: [
          'Sviluppo di API con Node.js ed Express',
          'Logica applicativa lato server',
          'Autenticazione degli utenti',
          'Attenzione a solidità e sicurezza del codice',
        ],
      },
      {
        title: 'Database e Supabase',
        text: 'Dati progettati per durare, collegati a front-end e API.',
        items: [
          'Progettazione e creazione di database',
          'SQL e MySQL',
          'Supabase (PostgreSQL)',
          'Database collegati a front-end e API',
        ],
      },
      {
        title: "Integrazione dell'IA",
        text: 'Modelli linguistici inseriti nelle applicazioni web come funzioni del prodotto.',
        items: [
          'Integrazione di modelli linguistici (LLM)',
          'Prompt mirati e ben strutturati',
          'Output strutturati con JSON Schema',
          'Sviluppo assistito da AI',
        ],
      },
    ] as SkillCopy[],

    ai: {
      kicker: "Come lavoro con l'IA",
      title: 'Uno strumento che mi accelera, non una stampella',
      intro:
        "So scrivere prompt efficaci e sfruttare l'IA al meglio, ma non ne dipendo: quello che costruisco lo capisco, lo controllo e so rifarlo da sola.",
      withTitle: "Con l'IA",
      withCaption: 'Più veloce, con metodo',
      with: [
        'Prompt mirati per generare, rifattorizzare e documentare codice',
        'Sviluppo assistito da AI nel lavoro di tutti i giorni',
        'Verifica e revisione del codice generato prima di usarlo',
        "Le scelte di architettura restano mie: l'IA propone, io decido",
      ],
      withoutTitle: "Senza l'IA",
      withoutCaption: 'Autonoma, quando serve',
      without: [
        'Scrivo codice JavaScript, React e Node.js in autonomia',
        'Progetto database e scrivo query SQL',
        'Faccio debug leggendo e ragionando sul codice',
        'Costruisco interfacce responsive partendo dal foglio bianco',
      ],
    },

    education: {
      kicker: 'Formazione e certificazioni',
      title: 'Master e certificazioni',
    },

    master: {
      inProgress: 'In corso',
      done: 'Concluso',
      period: 'Periodo',
      programme: 'Programma',
      topics: [
        'Front-end con React e JavaScript moderno',
        'Back-end con Node.js ed Express: API e autenticazione',
        'Database SQL e Supabase (PostgreSQL)',
        'Integrazione di modelli linguistici (LLM): prompt e output strutturati',
        "Sviluppo assistito dall'IA fin dal primo giorno",
      ],
    },

    certification: {
      issuedLabel: 'Conseguita il',
      issued: (date: string) => `Conseguita il ${date}`,
      validLabel: 'Valida fino al',
      valid: (date: string) => `Valida fino al ${date}`,
      verify: 'Verifica il badge su Oracle',
      topicsTitle: 'Argomenti',
      topics: [
        'Machine Learning e Deep Learning',
        'Large Language Models e Generative AI',
        'OCI AI Services e Machine Learning Services',
        'Oracle 23ai (Select AI)',
      ],
    },

    languages: {
      title: 'Lingue',
      list: [
        { name: 'Italiano', level: 'Madrelingua' },
        { name: 'Inglese', level: 'B2' },
      ],
    },

    cta: {
      title: 'Lavoriamo insieme?',
      text: 'Sto cercando un team in cui crescere come Junior Full-Stack Developer. Guarda cosa ho costruito o scrivimi direttamente.',
      projects: 'Vedi i progetti',
      write: 'Scrivimi',
    },
  },

  portfolio: {
    title: 'Progetti Full-Stack, dal codice alla produzione',
    intro:
      "Applicazioni complete sviluppate end-to-end, dal database all'interfaccia utente. Esplora le demo live o naviga tra i dettagli architetturali.",
    featured: 'Progetto in evidenza',
    online: 'Online',
    technologies: 'Tecnologie',
    roleLabel: 'Il mio ruolo:',
    role: 'Sviluppo end-to-end: ideazione, design, codice e database realizzati interamente in autonomia.',
    open: (name: string) => `Apri ${name}`,
    code: 'Codice su GitHub',
    screensOf: (name: string) => `Schermate di ${name}`,
    browseScreens: (name: string) => `Sfoglia le schermate di ${name}`,
    caption: "Screenshot reali dell'app, con dati dimostrativi",
  },

  projects: {
    mywallet: {
      tagline: 'Gestore di finanze personali',
      description:
        "Un'applicazione web mobile-first per tenere sotto controllo entrate e uscite, con budget mensili, statistiche in tempo reale, spese di gruppo e un assistente AI.",
      features: [
        'Entrate e uscite con dashboard e statistiche',
        'Budget mensili, risparmi e spese future',
        'Abbonamenti e spese ricorrenti',
        'Spese di gruppo per i viaggi',
        'Assistente AI per analizzare budget e spese',
        'Accesso con account, tema chiaro e scuro',
      ],
      screens: {
        budget: { label: 'Budget', alt: 'MyWallet: budget mensili con limite per categoria' },
        statistiche: {
          label: 'Statistiche',
          alt: 'MyWallet in tema scuro: statistiche delle spese per categoria',
        },
        dashboard: {
          label: 'Dashboard',
          alt: 'MyWallet: dashboard con saldo, entrate, uscite e disponibilità',
        },
        assistente: { label: 'Assistente AI', alt: "MyWallet: l'assistente AI suggerisce dove risparmiare" },
        gruppo: {
          label: 'Spese di gruppo',
          alt: 'MyWallet: spese di gruppo di un viaggio con il bilancio tra i partecipanti',
        },
        report: { label: 'Report mensile', alt: 'MyWallet: report mensile con estratto conto' },
        scuro: { label: 'Tema scuro', alt: 'MyWallet: dashboard in tema scuro' },
      },
    } as ProjectCopy,
  },

  contact: {
    title: 'Parliamone',
    intro:
      'Sono aperta a nuove sfide come Full-Stack Developer. Scrivimi per un colloquio, per un progetto o anche solo per fare due chiacchiere di tecnologia.',
    responseTime: 'entro 48 ore',
    replyLine: (time: string) => `Rispondo ${time}`,

    form: {
      title: 'Scrivimi un messaggio',
      name: 'Nome',
      email: 'Email',
      company: 'Azienda',
      optional: '(facoltativo)',
      message: 'Messaggio',
      send: 'Invia messaggio',
      sending: 'Invio in corso…',
      fallbackIntro: 'Se il problema continua, scrivimi direttamente a',
      trapLabel: 'Non compilare questo campo',
      successTitle: 'Messaggio inviato con successo',
      successText: (time: string) =>
        `Ti risponderò al più presto: di solito rispondo ${time}, all'indirizzo che hai indicato.`,
      another: 'Scrivi un altro messaggio',
    },

    errors: {
      nameRequired: () => 'Scrivi il tuo nome.',
      nameTooShort: (limits: ContactLimits) => `Il nome deve avere almeno ${limits.nameMin} caratteri.`,
      nameInvalid: () => 'Il nome non è valido.',
      emailRequired: () => 'Scrivi la tua email.',
      emailInvalid: () => "Controlla l'indirizzo email: sembra incompleto.",
      companyTooLong: (limits: ContactLimits) =>
        `Il nome dell'azienda può avere al massimo ${limits.companyMax} caratteri.`,
      messageRequired: () => 'Scrivi un messaggio.',
      messageTooShort: (limits: ContactLimits) =>
        `Scrivi almeno ${limits.messageMin} caratteri, così posso risponderti meglio.`,
      messageTooLong: (limits: ContactLimits) => `Il messaggio può avere al massimo ${limits.messageMax} caratteri.`,
    } satisfies Record<ContactErrorCode, (limits: ContactLimits) => string>,

    sendErrors: {
      validation: 'Controlla i campi evidenziati e riprova.',
      rateLimited: 'Hai inviato troppi messaggi in poco tempo. Riprova tra qualche minuto.',
      timeout: 'Il server sta impiegando troppo tempo a rispondere. Riprova tra un momento.',
      offline: 'Non riesco a collegarmi: controlla la connessione a internet e riprova.',
      generic: 'Qualcosa è andato storto durante l’invio. Riprova tra un momento.',
    } satisfies Record<SendErrorKind, string>,

    direct: {
      title: 'Contatti diretti',
      text: 'Preferisci scrivermi da solo? Questi sono i canali più rapidi.',
      email: { label: 'Email', action: 'Scrivimi', hint: 'si apre il programma di posta con un messaggio già impostato' },
      linkedin: { label: 'LinkedIn', action: 'Collegati' },
      github: { label: 'GitHub', action: 'Esplora' },
      cv: { label: 'Curriculum vitae', value: 'Formato PDF', action: 'Scarica', hint: 'scarica il file PDF' },
      location: 'Zona',
      responseTime: 'Tempi di risposta',
    },

    /** Testo precompilato del link mailto "Scrivimi". */
    mail: {
      subject: '💼 Contatto / Opportunità lavorativa',
      // Spazi finali voluti: il cursore è pronto dopo i due punti.
      body: [
        'Ciao Chiara, ho visto il tuo portfolio e ti contatto perché ',
        '',
        'I miei riferimenti: ',
        '- Nome / Azienda: ',
        '- Contatto (Email / Telefono): ',
      ].join('\n'),
    },
  },

  notFound: {
    title: 'Pagina non trovata',
    heading: 'Questa pagina non esiste',
    text: 'Il link potrebbe essere errato o la pagina è stata spostata. Il resto del sito, invece, funziona benissimo.',
    back: 'Torna alla home',
    projects: 'Vedi i progetti',
  },
}

export type Dictionary = typeof it
