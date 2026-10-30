// Props:
//   - count (number | Array): The number of visible expenses or the array of visible expenses.
// State:
//   - None (stateless presentation component).
function VisibleExpenseCount({ count = 0 }) {
  const resolvedCount = Array.isArray(count)
    ? count.length
    : Number(count) || 0

  return (
    <span className="entry-count" data-cy="count" data-testid="count">
      {resolvedCount} {resolvedCount === 1 ? 'item' : 'items'}
    </span>
  )
}

export default VisibleExpenseCount

