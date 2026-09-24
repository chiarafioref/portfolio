import type { Lang } from './config.ts'
import { en } from './en.ts'
import { it, type Dictionary } from './it.ts'

export const dictionaries: Record<Lang, Dictionary> = { it, en }
