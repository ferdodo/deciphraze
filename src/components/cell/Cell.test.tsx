import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Cell } from './Cell'
import { CellType } from './CellType'

describe('Cell Component', () => {
  it('should render without crashing', () => {
    render(<Cell type={CellType.Letter} character="A" />)
    expect(screen.getByText('A')).toBeDefined()
  })

  it('should render with correct character', () => {
    render(<Cell type={CellType.Letter} character="B" />)
    expect(screen.getByText('B')).toBeDefined()
  })

  it('should handle different cell types', () => {
    render(<Cell type={CellType.Symbol} character="@" />)
    expect(screen.getByText('@')).toBeDefined()
  })

  it('should apply selected class when selected', () => {
    render(<Cell type={CellType.Letter} character="A" selected={true} />)
    const span = screen.getByText('A')
    expect(span.className).toContain('selected')
  })

  it('should apply highlighted class when highlighted', () => {
    render(<Cell type={CellType.Letter} character="A" highlighted={true} />)
    const span = screen.getByText('A')
    expect(span.className).toContain('highlighted')
  })

  it('should apply matched class when matched', () => {
    render(<Cell type={CellType.Letter} character="A" matched={true} />)
    const span = screen.getByText('A')
    expect(span.className).toContain('matched')
  })
})
