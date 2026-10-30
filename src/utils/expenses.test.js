import { describe, expect, it } from 'vitest'
import {
  calculateTotal,
  filterExpenses,
  validateExpense,
} from './expenses'

describe('validateExpense', () => {
  it('accepts a valid expense', () => {
    expect(validateExpense({ description: 'Lunch', amount: 250 })).toBe('')
  })

  it('rejects an empty or whitespace-only title', () => {
    expect(validateExpense({ description: '  ', amount: 250 })).toBe(
      'Enter an expense title.'
    )
  })

  it.each(['not a number', 0, -1])('rejects invalid amount %s', (amount) => {
    expect(validateExpense({ description: 'Lunch', amount })).toBe(
      'Enter an amount greater than zero.'
    )
  })

  it('rejects amounts above 100,000', () => {
    expect(validateExpense({ description: 'Laptop', amount: 100001 })).toBe(
      'The amount cannot exceed ₹100,000.'
    )
  })

  it('accepts the maximum amount of 100,000', () => {
    expect(validateExpense({ description: 'Laptop', amount: 100000 })).toBe('')
  })
})

describe('calculateTotal', () => {
  it('sums expense amounts', () => {
    expect(calculateTotal([{ amount: 250 }, { amount: 400 }])).toBe(650)
  })

  it('returns zero for no expenses', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

describe('filterExpenses', () => {
  const expenses = [
    { id: '1', category: 'Food' },
    { id: '2', category: 'Travel' },
  ]

  it('returns every expense for the All category', () => {
    expect(filterExpenses(expenses, 'All')).toEqual(expenses)
  })

  it('returns only expenses in the selected category', () => {
    expect(filterExpenses(expenses, 'Food')).toEqual([expenses[0]])
  })
})
