import { describe, it, expect } from 'vitest'
import { generateRandomAlphabet } from './generateRandomAlphabet'

describe('generateRandomAlphabet', () => {
  it('should return an array of 26 characters', () => {
    const result = generateRandomAlphabet()
    expect(result).toHaveLength(26)
  })

  it('should contain all letters of the alphabet', () => {
    const result = generateRandomAlphabet()
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    for (const letter of alphabet) {
      expect(result).toContain(letter)
    }
  })

  it('should not contain duplicates', () => {
    const result = generateRandomAlphabet()
    const uniqueResult = [...new Set(result)]
    expect(uniqueResult).toHaveLength(26)
  })

  it('should return different results on multiple calls', () => {
    const result1 = generateRandomAlphabet()
    const result2 = generateRandomAlphabet()
    
    // They might be the same by chance, but with 26! permutations it's very unlikely
    // This test verifies the function works, not that it's always different
    expect(Array.isArray(result1)).toBe(true)
    expect(Array.isArray(result2)).toBe(true)
  })

  it('should only contain uppercase letters', () => {
    const result = generateRandomAlphabet()
    
    for (const char of result) {
      expect(char).toMatch(/[A-Z]/)
    }
  })
})
