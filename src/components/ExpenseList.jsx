import CategoryFilter from './CategoryFilter'
import DeleteExpenseButton from './DeleteExpenseButton'

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
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
          <span className="entry-count" data-cy="count" data-testid="count">
            {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
          </span>
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
              <DeleteExpenseButton
                description={expense.description}
                onClick={() => onDeleteExpense(expense.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="total-row">
        <span>Total expenses</span>
        <strong data-cy="total" data-testid="total">
          {formatCurrency(total)}
        </strong>
      </div>
    </div>
  )
}

export default ExpenseList
