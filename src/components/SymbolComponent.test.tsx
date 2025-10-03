import { describe, it, expect } from 'vitest'
import { SymbolComponent } from './SymbolComponent'

describe('SymbolComponent', () => {
  it('should be defined', () => {
    expect(SymbolComponent).toBeDefined()
  })

  it('should be a function component', () => {
    expect(typeof SymbolComponent).toBe('function')
  })
})
