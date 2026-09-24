import { describe, expect, it } from 'vitest'
import { formatDate, langFromPath, localizePath, stripLang } from './config.ts'

describe('langFromPath', () => {
  it.each([
    ['/', 'it'],
    ['/about', 'it'],
    ['/en', 'en'],
    ['/en/contact', 'en'],
    ['/english', 'it'],
  ])('%s → %s', (path, lang) => {
    expect(langFromPath(path)).toBe(lang)
  })
})

describe('stripLang', () => {
  it('toglie il prefisso inglese', () => {
    expect(stripLang('/en/about')).toBe('/about')
    expect(stripLang('/en')).toBe('/')
  })

  it('lascia invariati gli indirizzi italiani', () => {
    expect(stripLang('/about')).toBe('/about')
    expect(stripLang('/english')).toBe('/english')
  })
})

describe('localizePath', () => {
  it('costruisce l’indirizzo nella lingua richiesta', () => {
    expect(localizePath('/about', 'en')).toBe('/en/about')
    expect(localizePath('/', 'en')).toBe('/en')
    expect(localizePath('/en/about', 'it')).toBe('/about')
    expect(localizePath('/en/about', 'en')).toBe('/en/about')
  })
})

describe('formatDate', () => {
  it('formatta la data nella lingua della pagina', () => {
    expect(formatDate('2025-10-08', 'it')).toBe('8 ottobre 2025')
    expect(formatDate('2025-10-08', 'en')).toBe('October 8, 2025')
  })
})
