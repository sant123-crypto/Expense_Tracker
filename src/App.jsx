import { useState } from 'react'
import ExpenseList from './components/ExpenseList'
import ExpenseListForm from './components/ExpenseListForm'
import { calculateTotal, filterExpenses } from './utils/expenses'
import './App.css'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
})

function App() {
  const [isExpensesOpen, setIsExpensesOpen] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [error, setError] = useState('')

  const visibleExpenses = filterExpenses(expenses, selectedCategory)

  const handleAddExpense = (expense) => {
    setExpenses((currentExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...currentExpenses,
    ])
    setError('')
  }

  const handleDeleteExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    )
  }

  const formatCurrency = (amount) => currencyFormatter.format(amount)

  if (!isExpensesOpen) {
    return (
      <main className="welcome-page">
        <section className="welcome-card">
          <span className="welcome-icon" aria-hidden="true">
            ₹
          </span>
          <p className="eyebrow">POCKET LEDGER</p>
          <h1>Keep your spending in check.</h1>
          <p className="welcome-copy">
            A simple place to record and review your everyday expenses.
          </p>
          <button
            className="primary-button"
            type="button"
            onClick={() => setIsExpensesOpen(true)}
          >
            Add Expense List
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">POCKET LEDGER</p>
          <h1>Expense tracker</h1>
          <p className="header-copy">
            Record your spending and see where your money goes.
          </p>
        </div>
        <button
          className="back-button"
          type="button"
          onClick={() => setIsExpensesOpen(false)}
        >
          Back
        </button>
      </header>

      <div className="expense-dashboard">
        <ExpenseListForm onAddExpense={handleAddExpense} onError={setError} />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <ExpenseList
          expenses={visibleExpenses}
          total={calculateTotal(visibleExpenses)}
          formatCurrency={formatCurrency}
          onDeleteExpense={handleDeleteExpense}
          hasExpenses={expenses.length > 0}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    </main>
  )
}

export default App
