import { EXPENSE_CATEGORIES } from '../utils/expenses'
import RunningTotal from './RunningTotal'
import VisibleExpenseCount from './VisibleExpenseCount'

// Props provide the filtered expenses, display values, filter state, and delete callback.
function ExpenseList({
  expenses,
  total,
  formatCurrency,
  onDeleteExpense,
  hasExpenses,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="expense-list-card">
      <div className="list-heading">
        <div>
          <p className="eyebrow">YOUR ENTRIES</p>
          <h2>Recent expenses</h2>
        </div>
        <div className="list-controls">
          <label className="category-filter">
            Filter
            <select
              aria-label="Filter expenses by category"
              data-cy="filter"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <option>All</option>
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <VisibleExpenseCount count={expenses.length} />
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">＋</span>
          <h3>{hasExpenses ? 'No matching expenses' : 'No expenses yet'}</h3>
          <p>
            {hasExpenses
              ? 'Try selecting a different category.'
              : 'Add your first expense using the form.'}
          </p>
        </div>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li
              className="expense-item"
              data-cy="expense-item"
              data-testid="expense-item"
              key={expense.id}
            >
              <span className="expense-icon" aria-hidden="true">
                {expense.category === 'Food' ? '🍽' :
                  expense.category === 'Travel' ? '↗' :
                    expense.category === 'Bills' ? '⌂' : '•'}
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
                {formatCurrency(expense.amount)}
              </strong>
              <button
                className="delete-expense"
                type="button"
                aria-label={`Delete ${expense.description}`}
                data-cy="delete-expense"
                onClick={() => onDeleteExpense(expense.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <RunningTotal total={total} formatCurrency={formatCurrency} />
    </div>
  )
}

export default ExpenseList
