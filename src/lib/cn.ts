type ClassValue = string | false | null | undefined

/** Unisce classi CSS ignorando i valori "falsy". */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
