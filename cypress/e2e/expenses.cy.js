describe('Expense tracker', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('button', 'Add Expense List').click()
  })

  function addExpense(title, amount, category) {
    cy.get('[data-cy="title"]').type(title)
    cy.get('[data-cy="amount"]').type(String(amount))
    cy.get('[data-cy="category"]').select(category)
    cy.get('[data-cy="add-expense"]').click()
  }

  it('adds expenses and filters by category with updated count and total', () => {
    addExpense('Lunch', 250, 'Food')
    addExpense('Cab', 400, 'Travel')

    cy.get('[data-cy="total"]').should('contain', '650.00')
    cy.get('[data-cy="filter"]').select('Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').should('contain', 'Lunch')
    cy.get('[data-cy="count"]').should('contain', '1 item')
    cy.get('[data-cy="total"]').should('contain', '250.00')
  })

  it('rejects an empty title and a negative amount', () => {
    cy.get('[data-cy="amount"]').type('250')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[role="alert"]').should('contain', 'Enter an expense title.')
    cy.get('[data-cy="expense-item"]').should('not.exist')

    cy.get('[data-cy="title"]').type('Invalid expense')
    cy.get('[data-cy="amount"]').clear().type('-10')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[role="alert"]').should('contain', 'greater than zero')
    cy.get('[data-cy="expense-item"]').should('not.exist')
  })

  it('deletes an expense and updates the total', () => {
    addExpense('Lunch', 250, 'Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="delete-expense"]').click()
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="count"]').should('contain', '0 items')
    cy.get('[data-cy="total"]').should('contain', '0.00')
  })
})
