import { describe, it, expect } from 'vitest'
import { isAlphabetic } from './isAlphabetic'

describe('isAlphabetic', () => {
  it('should return true for alphabetic characters', () => {
    expect(isAlphabetic('A')).toBe(true)
    expect(isAlphabetic('Z')).toBe(true)
    expect(isAlphabetic('a')).toBe(true)
    expect(isAlphabetic('z')).toBe(true)
    expect(isAlphabetic('M')).toBe(true)
  })

  it('should return false for non-alphabetic characters', () => {
    expect(isAlphabetic('1')).toBe(false)
    expect(isAlphabetic('0')).toBe(false)
    expect(isAlphabetic('!')).toBe(false)
    expect(isAlphabetic('@')).toBe(false)
    expect(isAlphabetic(' ')).toBe(false)
    expect(isAlphabetic('.')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isAlphabetic('')).toBe(false)
    expect(isAlphabetic('AB')).toBe(true) // Multiple characters are normalized and checked
  })
})
