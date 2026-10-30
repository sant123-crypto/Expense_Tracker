const defaultCurrency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

// Props:
//   - total (number): The running total amount of expenses to display.
//   - formatCurrency (function, optional): Formatter function to format amount with currency symbol and 2 decimal places.
// State:
//   - None (stateless presentation component).
function RunningTotal({ total = 0, formatCurrency }) {
  const numericTotal = Number(total) || 0
  const formattedTotal =
    typeof formatCurrency === 'function'
      ? formatCurrency(numericTotal)
      : defaultCurrency.format(numericTotal)

  return (
    <div className="total-row">
      <span>Total expenses</span>
      <strong data-cy="total" data-testid="total">
        {formattedTotal}
      </strong>
    </div>
  )
}

export default RunningTotal

