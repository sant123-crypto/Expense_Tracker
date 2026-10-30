import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import VisibleExpenseCount from './VisibleExpenseCount'

describe('VisibleExpenseCount component', () => {
  it('renders "0 items" when count is 0 or default', () => {
    render(<VisibleExpenseCount />)

    const countElement = screen.getByTestId('count')
    expect(countElement).toBeInTheDocument()
    expect(countElement).toHaveTextContent('0 items')
    expect(countElement).toHaveAttribute('data-cy', 'count')
  })

  it('renders "1 item" for singular count', () => {
    render(<VisibleExpenseCount count={1} />)

    expect(screen.getByTestId('count')).toHaveTextContent('1 item')
  })

  it('renders plural "items" for count greater than 1', () => {
    render(<VisibleExpenseCount count={5} />)

    expect(screen.getByTestId('count')).toHaveTextContent('5 items')
  })

  it('handles an array passed as count', () => {
    render(<VisibleExpenseCount count={[{ id: 1 }, { id: 2 }]} />)

    expect(screen.getByTestId('count')).toHaveTextContent('2 items')
  })
})

