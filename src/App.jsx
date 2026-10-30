import { useState } from 'react'
import ExpenseListForm from './components/ExpenseListForm'
import ExpenseList from './components/ExpenseList'
import { calculateTotal, filterExpenses } from './utils/expenses'
import './App.css'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

function App() {
  const [page, setPage] = useState('home')
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const total = calculateTotal(expenses)
  const visibleExpenses = filterExpenses(expenses, selectedCategory)
  const visibleTotal = calculateTotal(visibleExpenses)

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
          <ExpenseList
            expenses={visibleExpenses}
            total={visibleTotal}
            formatCurrency={(amount) => currency.format(amount)}
            onDeleteExpense={handleDeleteExpense}
            hasExpenses={expenses.length > 0}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
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
