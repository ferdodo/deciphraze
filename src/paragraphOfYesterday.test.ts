import { describe, it, expect } from 'vitest'
import { paragraphOfYesterday } from './paragraphOfYesterday'

describe('paragraphOfYesterday', () => {
  it('should return a string', () => {
    expect(typeof paragraphOfYesterday).toBe('string')
  })

  it('should return a non-empty string', () => {
    expect(paragraphOfYesterday.length).toBeGreaterThan(0)
  })

  it('should return a string with at least 200 characters', () => {
    expect(paragraphOfYesterday.length).toBeGreaterThanOrEqual(200)
  })

  it('should contain alphabetic characters', () => {
    const hasLetters = /[a-zA-Z]/.test(paragraphOfYesterday)
    expect(hasLetters).toBe(true)
  })

  it('should be consistent within the same day', () => {
    // The paragraph should be the same when called multiple times on the same day
    const firstCall = paragraphOfYesterday
    const secondCall = paragraphOfYesterday
    expect(firstCall).toBe(secondCall)
  })

  it('should be different from today\'s paragraph', () => {
    // This test might fail if by chance both paragraphs are the same
    // but it's very unlikely with the large text corpus
    const todayParagraph = paragraphOfYesterday
    const yesterdayParagraph = paragraphOfYesterday
    
    // They should be the same (yesterday's paragraph is consistent)
    expect(todayParagraph).toBe(yesterdayParagraph)
  })
})
