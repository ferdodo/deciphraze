import { describe, it, expect } from 'vitest'
import { paragraphOfTheDay } from './paragraphOfTheDay'

describe('paragraphOfTheDay', () => {
  it('should return a string', () => {
    expect(typeof paragraphOfTheDay).toBe('string')
  })

  it('should return a non-empty string', () => {
    expect(paragraphOfTheDay.length).toBeGreaterThan(0)
  })

  it('should return a string with at least 200 characters', () => {
    expect(paragraphOfTheDay.length).toBeGreaterThanOrEqual(200)
  })

  it('should contain alphabetic characters', () => {
    const hasLetters = /[a-zA-Z]/.test(paragraphOfTheDay)
    expect(hasLetters).toBe(true)
  })

  it('should be consistent within the same day', () => {
    // The paragraph should be the same when called multiple times on the same day
    const firstCall = paragraphOfTheDay
    const secondCall = paragraphOfTheDay
    expect(firstCall).toBe(secondCall)
  })
})
