import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function openExpensesPage(user) {
  await user.click(screen.getByRole('button', { name: /add expense list/i }))
}

async function addExpense(user, { title, amount, category }) {
  await user.type(screen.getByLabelText(/what was it for/i), title)
  await user.type(screen.getByLabelText(/amount/i), String(amount))
  await user.selectOptions(screen.getByLabelText(/^category$/i), category)
  await user.click(screen.getByRole('button', { name: /add expense/i }))
}

describe('expense tracker', () => {
  it('adds and displays a valid expense', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openExpensesPage(user)
    await addExpense(user, { title: 'Lunch', amount: 250, category: 'Food' })

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('1 item')
    expect(screen.getByTestId('total')).toHaveTextContent('250.00')
  })

  it('rejects an empty expense title', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openExpensesPage(user)
    await user.type(screen.getByLabelText(/amount/i), '250')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an expense title.')
    expect(screen.getByTestId('count')).toHaveTextContent('0 items')
  })

  it('rejects an amount above 100,000', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openExpensesPage(user)
    await user.type(screen.getByLabelText(/what was it for/i), 'Laptop')
    await user.type(screen.getByLabelText(/amount/i), '100001')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('cannot exceed ₹100,000')
    expect(screen.getByTestId('count')).toHaveTextContent('0 items')
  })

  it('filters expenses and updates the displayed count and total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openExpensesPage(user)
    await addExpense(user, { title: 'Cab', amount: 400, category: 'Travel' })
    await addExpense(user, { title: 'Lunch', amount: 250, category: 'Food' })

    await user.selectOptions(
      screen.getByLabelText(/filter expenses by category/i),
      'Food'
    )

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('1 item')
    expect(screen.getByTestId('total')).toHaveTextContent('250.00')

    await user.selectOptions(
      screen.getByLabelText(/filter expenses by category/i),
      'Bills'
    )
    expect(screen.getByText('No matching expenses')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0 items')
    expect(screen.getByTestId('total')).toHaveTextContent('0.00')
  })

  it('deletes an expense and updates the total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openExpensesPage(user)
    await addExpense(user, { title: 'Lunch', amount: 250, category: 'Food' })
    const expenseItem = screen.getByTestId('expense-item')

    await user.click(within(expenseItem).getByRole('button', { name: /delete lunch/i }))

    expect(screen.queryByText('Lunch')).not.toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0 items')
    expect(screen.getByTestId('total')).toHaveTextContent('0.00')
  })
})
