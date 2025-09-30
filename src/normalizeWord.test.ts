import { describe, it, expect } from 'vitest'
import { normalizeWord } from './normalizeWord'

describe('normalizeWord', () => {
  it('should convert to lowercase and remove accents', () => {
    expect(normalizeWord('hello')).toBe('hello')
    expect(normalizeWord('World')).toBe('world')
    expect(normalizeWord('test')).toBe('test')
  })

  it('should handle already lowercase words', () => {
    expect(normalizeWord('hello')).toBe('hello')
    expect(normalizeWord('world')).toBe('world')
  })

  it('should handle mixed case', () => {
    expect(normalizeWord('HeLLo')).toBe('hello')
    expect(normalizeWord('WoRLd')).toBe('world')
  })

  it('should handle empty string', () => {
    expect(normalizeWord('')).toBe('')
  })

  it('should handle single character', () => {
    expect(normalizeWord('a')).toBe('a')
    expect(normalizeWord('Z')).toBe('z')
  })

  it('should remove accents', () => {
    expect(normalizeWord('café')).toBe('cafe')
    expect(normalizeWord('naïve')).toBe('naive')
    expect(normalizeWord('résumé')).toBe('resume')
  })
})
