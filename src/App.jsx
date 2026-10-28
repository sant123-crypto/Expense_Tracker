import { useState } from 'react'
import ExpenseListForm from './components/ExpenseListForm'
import './App.css'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

function App() {
  const [page, setPage] = useState('home')
  const [expenses, setExpenses] = useState([])

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleAddExpense = (expense) => {
    setExpenses((currentExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...currentExpenses,
    ])
  }

  const handleDeleteExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    )
  }

  if (page === 'expenses') {
    return (
      <main className="app-shell">
        <header className="topbar">
          <a className="brand" href="#" onClick={(event) => {
            event.preventDefault()
            setPage('home')
          }}>
            <span className="brand-mark" aria-hidden="true">$</span>
            <span>Pocket Ledger</span>
          </a>
          <button
            className="button button-quiet"
            type="button"
            onClick={() => setPage('home')}
          >
            <span aria-hidden="true">←</span> Back to home
          </button>
        </header>

        <section className="page-heading">
          <p className="eyebrow">YOUR MONEY, IN ONE PLACE</p>
          <h1>Expense list</h1>
          <p className="page-description">
            Add your spending as you go. You can review your entries and running
            total here.
          </p>
        </section>

        <section className="expense-layout" aria-label="Manage expenses">
          <ExpenseListForm onAddExpense={handleAddExpense} />

          <div className="expense-list-card">
            <div className="list-heading">
              <div>
                <p className="eyebrow">YOUR ENTRIES</p>
                <h2>Recent expenses</h2>
              </div>
              <span className="entry-count">
                {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {expenses.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">＋</span>
                <h3>No expenses yet</h3>
                <p>Add your first expense using the form.</p>
              </div>
            ) : (
              <ul className="expense-list">
                {expenses.map((expense) => (
                  <li className="expense-item" key={expense.id}>
                    <span className="expense-icon" aria-hidden="true">
                      {expense.category === 'Food' ? '🍽' :
                        expense.category === 'Transport' ? '↗' :
                          expense.category === 'Bills' ? '⌂' :
                            expense.category === 'Shopping' ? '▣' : '•'}
                    </span>
                    <div className="expense-info">
                      <strong>{expense.description}</strong>
                      <span>
                        {expense.category} <span aria-hidden="true">·</span>{' '}
                        {new Date(`${expense.date}T00:00:00`).toLocaleDateString(
                          'en-IN',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                      </span>
                    </div>
                    <strong className="expense-amount">
                      {currency.format(expense.amount)}
                    </strong>
                    <button
                      className="delete-expense"
                      type="button"
                      aria-label={`Delete ${expense.description}`}
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="total-row">
              <span>Total expenses</span>
              <strong>{currency.format(total)}</strong>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">$</span>
          <span>Pocket Ledger</span>
        </a>
        <span className="topbar-note">A clearer view of your spending</span>
      </header>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL FINANCE, MADE SIMPLE</p>
          <h1>Make every expense<br />make sense.</h1>
          <p className="page-description">
            Keep your spending organized and see where your money goes, one
            expense at a time.
          </p>
          <button
            className="button button-primary hero-button"
            type="button"
            onClick={() => setPage('expenses')}
          >
            <span className="button-plus" aria-hidden="true">＋</span>
            Add Expense List
            <span className="button-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card">
            <span className="art-card-label">TOTAL SPENDING</span>
            <strong>{currency.format(total)}</strong>
            <span className="art-card-caption">
              {expenses.length === 0
                ? 'Your expenses will show here'
                : `${expenses.length} recorded ${
                    expenses.length === 1 ? 'expense' : 'expenses'
                  }`}
            </span>
            <span className="art-card-chart">
              <i /><i /><i /><i /><i /><i /><i />
            </span>
          </div>
          <span className="art-sparkle sparkle-one">✦</span>
          <span className="art-sparkle sparkle-two">✳</span>
        </div>
      </section>

      <section className="home-summary" aria-label="Expense summary">
        <div className="summary-card">
          <span className="summary-icon summary-icon-purple" aria-hidden="true">↗</span>
          <div>
            <span className="summary-label">Total recorded</span>
            <strong>{currency.format(total)}</strong>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon summary-icon-green" aria-hidden="true">▤</span>
          <div>
            <span className="summary-label">Expenses added</span>
            <strong>{expenses.length}</strong>
          </div>
        </div>
        <div className="summary-card summary-tip">
          <span className="summary-icon summary-icon-yellow" aria-hidden="true">✦</span>
          <div>
            <span className="summary-label">A small habit</span>
            <strong>Track it as you spend</strong>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <span>Small steps toward smarter spending.</span>
        <button
          className="footer-link"
          type="button"
          onClick={() => setPage('expenses')}
        >
          View expense list <span aria-hidden="true">→</span>
        </button>
      </footer>
    </main>
  )
}

export default App
