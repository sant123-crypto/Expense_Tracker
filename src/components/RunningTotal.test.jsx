import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import RunningTotal from './RunningTotal'

describe('RunningTotal component', () => {
  it('renders with formatCurrency function', () => {
    const formatCurrency = (val) => `INR ${val.toFixed(2)}`
    render(<RunningTotal total={450.5} formatCurrency={formatCurrency} />)

    const totalElement = screen.getByTestId('total')
    expect(totalElement).toBeInTheDocument()
    expect(totalElement).toHaveTextContent('INR 450.50')
    expect(totalElement).toHaveAttribute('data-cy', 'total')
  })

  it('formats total with 2 decimal places when no formatter is provided', () => {
    render(<RunningTotal total={250} />)

    const totalElement = screen.getByTestId('total')
    expect(totalElement).toHaveTextContent('250.00')
  })

  it('renders default zero amount when total is missing', () => {
    render(<RunningTotal />)

    const totalElement = screen.getByTestId('total')
    expect(totalElement).toHaveTextContent('0.00')
  })
})

