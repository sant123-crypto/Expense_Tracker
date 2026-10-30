import { useState } from 'react'
import { EXPENSE_CATEGORIES, validateExpense } from '../utils/expenses'

function getToday() {
  const today = new Date()
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

// Props provide the add callback; local state controls the form fields and validation feedback.
function ExpenseListForm({ onAddExpense }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(getToday)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const parsedAmount = Number(amount)
    const validationError = validateExpense({ description, amount: parsedAmount })
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    onAddExpense({
      description: description.trim(),
      amount: parsedAmount,
      category,
      date,
    })
    setDescription('')
    setAmount('')
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <span className="form-icon" aria-hidden="true">＋</span>
        <div>
          <p className="eyebrow">NEW ENTRY</p>
          <h2>Add an expense</h2>
        </div>
      </div>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field form-field-wide">
          <span>What was it for?</span>
          <input
            type="text"
            data-cy="title"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
              setError('')
            }}
            placeholder="e.g. Lunch with friends"
            maxLength={80}
          />
        </label>

        <label className="form-field">
          <span>Amount</span>
          <div className="amount-input">
            <span aria-hidden="true">₹</span>
            <input
              type="number"
              data-cy="amount"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value)
                setError('')
              }}
              placeholder="0.00"
              min="0.01"
              max="100000"
              step="0.01"
            />
          </div>
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            data-cy="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {EXPENSE_CATEGORIES.map((expenseCategory) => (
              <option key={expenseCategory}>{expenseCategory}</option>
            ))}
          </select>
        </label>

        <label className="form-field form-field-wide">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button
          className="button button-primary form-submit"
          data-cy="add-expense"
          type="submit"
        >
          Add expense <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className="form-footnote">Your expense details stay in this session.</p>
    </section>
  )
}

export default ExpenseListForm
