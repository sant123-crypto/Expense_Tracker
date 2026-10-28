import { useState } from 'react'

function getToday() {
  const today = new Date()
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

function ExpenseListForm({ onAddExpense }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(getToday)

  const handleSubmit = (event) => {
    event.preventDefault()
    const parsedAmount = Number(amount)

    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return
    }

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

      <form className="expense-form" onSubmit={handleSubmit}>
        <label className="form-field form-field-wide">
          <span>What was it for?</span>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Lunch with friends"
            maxLength={80}
            required
          />
        </label>

        <label className="form-field">
          <span>Amount</span>
          <div className="amount-input">
            <span aria-hidden="true">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </div>
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Shopping</option>
            <option>Other</option>
          </select>
        </label>

        <label className="form-field form-field-wide">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>

        <button className="button button-primary form-submit" type="submit">
          Add expense <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className="form-footnote">Your expense details stay in this session.</p>
    </section>
  )
}

export default ExpenseListForm
