import { describe, expect, it } from 'vitest'
import { CONTACT_LIMITS, sanitizeContact, validateContact, type ContactValues } from './contact.ts'

const valid: ContactValues = {
  name: 'Mario Rossi',
  email: 'mario.rossi@example.com',
  company: 'Acme',
  message: 'Buongiorno, vorrei proporle un colloquio conoscitivo.',
}

describe('sanitizeContact', () => {
  it('rimuove caratteri invisibili e di controllo', () => {
    const result = sanitizeContact({ ...valid, name: 'Ma​rio\u0007 Rossi' })
    expect(result.name).toBe('Mario Rossi')
  })

  it('nei campi a riga singola trasforma gli a capo in spazi', () => {
    const result = sanitizeContact({ ...valid, name: 'Mario\r\nRossi', company: 'Acme\tSpA' })
    expect(result.name).toBe('Mario Rossi')
    expect(result.company).toBe('Acme SpA')
  })

  it('nel messaggio mantiene gli a capo ma ne riduce le ripetizioni', () => {
    const result = sanitizeContact({ ...valid, message: 'Riga uno\r\n\r\n\r\n\r\nRiga due' })
    expect(result.message).toBe('Riga uno\n\nRiga due')
  })

  it('elimina gli spazi ai bordi e quelli doppi', () => {
    expect(sanitizeContact({ ...valid, name: '  Mario   Rossi  ' }).name).toBe('Mario Rossi')
  })

  it('normalizza Unicode in forma NFC', () => {
    const decomposed = 'Nicolà'
    expect(sanitizeContact({ ...valid, name: decomposed }).name).toBe('Nicolà')
  })
})

describe('validateContact', () => {
  it('accetta un messaggio valido', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('accetta l’azienda vuota, perché è facoltativa', () => {
    expect(validateContact({ ...valid, company: '' })).toEqual({})
  })

  it('segnala i campi obbligatori mancanti', () => {
    expect(validateContact({ name: '', email: '', company: '', message: '' })).toEqual({
      name: 'nameRequired',
      email: 'emailRequired',
      message: 'messageRequired',
    })
  })

  it.each(['mario', 'mario@', 'mario@example', 'mario rossi@example.com', 'mario@example.c'])(
    'rifiuta l’email non valida "%s"',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe('emailInvalid')
    },
  )

  it('rifiuta un a capo nell’email (header injection)', () => {
    expect(validateContact({ ...valid, email: 'a@example.com\nBcc: b@example.com' }).email).toBe('emailInvalid')
  })

  it('applica i limiti di lunghezza', () => {
    expect(validateContact({ ...valid, name: 'M' }).name).toBe('nameTooShort')
    expect(validateContact({ ...valid, name: 'M'.repeat(CONTACT_LIMITS.nameMax + 1) }).name).toBe('nameInvalid')
    expect(validateContact({ ...valid, company: 'A'.repeat(CONTACT_LIMITS.companyMax + 1) }).company).toBe('companyTooLong')
    expect(validateContact({ ...valid, message: 'Troppo breve' }).message).toBe('messageTooShort')
    expect(validateContact({ ...valid, message: 'x'.repeat(CONTACT_LIMITS.messageMax + 1) }).message).toBe('messageTooLong')
  })

  it('accetta i valori esattamente al limite', () => {
    const atLimit = {
      name: 'M'.repeat(CONTACT_LIMITS.nameMax),
      email: valid.email,
      company: 'A'.repeat(CONTACT_LIMITS.companyMax),
      message: 'x'.repeat(CONTACT_LIMITS.messageMax),
    }
    expect(validateContact(atLimit)).toEqual({})
  })
})
