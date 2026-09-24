/**
 * Dati personali del sito che non dipendono dalla lingua.
 * Sono informazioni pubbliche per natura: tenerle qui (invece che in .env)
 * evita il rischio che in produzione compaiano come `undefined`.
 * I testi tradotti (luogo, competenze, programma del Master, ...) stanno in src/i18n.
 */
export const profile = {
  name: 'Chiara',
  surname: 'Fiore',
  role: 'Junior Full-Stack Developer',
  email: 'chiarafioref@gmail.com',
  education: 'Master in AI Web Development · Boolean',
  cv: {
    href: '/Curriculum_Fiore%20Chiara.pdf',
    downloadName: 'Chiara-Fiore-CV.pdf',
  },
  socials: {
    github: 'https://github.com/chiarafioref',
    linkedin: 'https://www.linkedin.com/in/chiara-fioref',
  },
} as const

export const fullName = `${profile.name} ${profile.surname}`

/** Voci del menu: `to` è l'indirizzo italiano (localizePath lo adatta alla lingua), `key` sceglie l'etichetta in t.nav. */
export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/contact', key: 'contact' },
] as const

/** Certificazione Oracle: dati verificati sul badge pubblico (link di verifica incluso). Date in formato ISO. */
export const certification = {
  name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
  issuer: 'Oracle',
  issued: '2025-10-08',
  expires: '2027-10-08',
  verifyUrl:
    'https://catalog-education.oracle.com/ords/certview/sharebadge?id=0D51172C24852A91CFFC78A233678C4E2EA4755393219CCAAE950A8A2DEBD129',
} as const

/**
 * Master in AI Web Development (Boolean). Le date (ISO) servono per lo stato "In corso" / "Concluso" e per il periodo mostrato: il Master finisce a fine giornata.
 * Nessun titolo finale indicato: il certificato dipende dall'esame, si aggiunge solo quando viene ottenuto.
 */
export const master = {
  name: 'Master in AI Web Development',
  issuer: 'Boolean',
  start: '2026-05-04',
  end: '2026-10-31',
} as const
