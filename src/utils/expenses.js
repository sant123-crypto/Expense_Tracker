export const EXPENSE_CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

export function validateExpense(expense) {
  const title = expense.description?.trim() ?? ''
  const amount = Number(expense.amount)

  if (!title) {
    return 'Enter an expense title.'
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Enter an amount greater than zero.'
  }
  if (amount > 100000) {
    return 'The amount cannot exceed ₹100,000.'
  }

  return ''
}

export function calculateTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

export function filterExpenses(expenses, category) {
  return category === 'All'
    ? expenses
    : expenses.filter((expense) => expense.category === category)
}
