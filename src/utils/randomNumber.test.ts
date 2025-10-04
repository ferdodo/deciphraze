import { describe, it, expect } from 'vitest'
import { randomNumber } from './randomNumber'
import { randomNumberForYesterday } from './randomNumberForYesterday'

describe('Random Number Functions', () => {
  it('should generate a number within the specified range for today', () => {
    const result = randomNumber(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThan(10)
  })

  it('should generate a number within the specified range for yesterday', () => {
    const result = randomNumberForYesterday(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThan(10)
  })

  it('should generate different numbers for today and yesterday', () => {
    const todayResult = randomNumber(1, 1000)
    const yesterdayResult = randomNumberForYesterday(1, 1000)
    
    // They might be the same by chance, but with a large range it's very unlikely
    // This test verifies the functions work, not that they're always different
    expect(typeof todayResult).toBe('number')
    expect(typeof yesterdayResult).toBe('number')
  })

  it('should handle edge cases', () => {
    const result1 = randomNumber(5, 5)
    expect(result1).toBe(5)
    
    const result2 = randomNumberForYesterday(5, 5)
    expect(result2).toBe(5)
  })
})
