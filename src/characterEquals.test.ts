import { describe, it, expect } from 'vitest'
import { characterEquals } from './characterEquals'

describe('characterEquals', () => {
  it('should return true for identical characters', () => {
    expect(characterEquals('A', 'A')).toBe(true)
    expect(characterEquals('a', 'a')).toBe(true)
    expect(characterEquals('1', '1')).toBe(true)
  })

  it('should return false for different characters', () => {
    expect(characterEquals('A', 'B')).toBe(false)
    expect(characterEquals('a', 'b')).toBe(false)
    expect(characterEquals('1', '2')).toBe(false)
  })

  it('should handle case insensitivity', () => {
    expect(characterEquals('A', 'a')).toBe(true)
    expect(characterEquals('a', 'A')).toBe(true)
  })

  it('should handle special characters', () => {
    expect(characterEquals('!', '!')).toBe(true)
    expect(characterEquals('!', '@')).toBe(false)
    expect(characterEquals(' ', ' ')).toBe(true)
  })
})
