# Pocket Ledger Expense Tracker

## Development

```sh
npm install
npm run dev
```

The expense page supports adding, filtering, and deleting expenses. Amounts must
be greater than zero and no more than ₹100,000.

## Validation

```sh
npm run lint
npm run build
npx vitest run
npx vitest run --coverage
```

To run the Cypress end-to-end tests, start the Vite server with `npm run dev`,
then run `npm run cy:run`. Use `npm run cy:open` to open the Cypress UI.
