import { useState } from 'react'
import { EXPENSE_CATEGORIES, validateExpense } from '../utils/expenses'

function ExpenseListForm({ onAddExpense, onError }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])

  const handleSubmit = (event) => {
    event.preventDefault()
    const expense = {
      description,
      amount: Number(amount),
      category,
      date: new Date().toISOString().slice(0, 10),
    }
    const validationMessage = validateExpense(expense)

    if (validationMessage) {
      onError(validationMessage)
      return
    }

    onAddExpense(expense)
    setDescription('')
    setAmount('')
  }

  return (
    <form className="expense-form-card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="eyebrow">NEW ENTRY</p>
        <h2>Add an expense</h2>
      </div>

      <div className="form-fields">
        <label className="form-field form-field-description">
          What was it for?
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Lunch with friends"
            aria-label="What was it for?"
            data-cy="title"
          />
        </label>

        <label className="form-field">
          Amount
          <span className="amount-input">
            <span aria-hidden="true">₹</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              aria-label="Amount"
              data-cy="amount"
            />
          </span>
        </label>

        <label className="form-field">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Category"
            data-cy="category"
          >
            {EXPENSE_CATEGORIES.map((expenseCategory) => (
              <option key={expenseCategory}>{expenseCategory}</option>
            ))}
          </select>
        </label>

        <button className="primary-button form-submit" type="submit" data-cy="add-expense">
          Add expense
        </button>
      </div>
    </form>
  )
}

export default ExpenseListForm
