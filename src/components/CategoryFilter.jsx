import { EXPENSE_CATEGORIES } from '../utils/expenses'

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <label className="category-filter">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5h16l-6.2 7.1v5.1l-3.6 1.8v-6.9L4 5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
      <span className="visually-hidden">Filter expenses by category</span>
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
  )
}

export default CategoryFilter
