import mock from '../../product/mocks/default.json'

describe('Products', () => {
  it('should show a list of products', () => {
    cy.visit('/default')
    cy.get("[data-test-id='product-item']").should('have.length', mock.length)
  })

  it('should show a message alert when product list is empty', () => {
    cy.visit('/empty')
    cy.get("[data-test-id='product-item']").should('have.length', 0)
    cy.contains('No hay productos')
  })
})
