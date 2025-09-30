import { describe, it, expect } from 'vitest'
import { LetterComponent } from './LetterComponent'

describe('LetterComponent', () => {
  it('should be defined', () => {
    expect(LetterComponent).toBeDefined()
  })

  it('should be a function component', () => {
    expect(typeof LetterComponent).toBe('function')
  })
})
