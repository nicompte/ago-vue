// https://docs.cypress.io/api/introduction/api.html

describe( 'On the products page', () => {
  it( 'See available products', () => {
    cy.visit( '/' );
    cy.get( '.product-container > .product' ).should( 'have.length', 12 )
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (0)' );
  } );
  it( 'Add a product to the cart', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (1)' );
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 10 );
  } );
  it( 'Add the same product to the cart twice', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (2)' );
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 20 );
  } );
  it( 'Add two products to the cart', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( ':nth-child(2) > .product > :nth-child(3) > button' ).click();
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (2)' );
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 2 );
    cy.get( '.total' ).should( 'contain', 243 );
  } );
  it( 'Visit the cart page', () => {
    cy.visit( '/' );
    cy.get( '[href="#/cart"]' ).click();
    cy.url().should( 'include', '#/cart' )
  } );
} );

describe( 'On the cart page', () => {
  it( 'Load the products in cart', () => {
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 0 );
    cy.get( '.cart' ).should( 'contain', 'Your cart is empty' );
  } );
  it( 'Save the cart on page reload', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( ':nth-child(2) > .product > :nth-child(3) > button' ).click();
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (2)' );
    cy.reload();
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 2 );
  } );
  it( 'Remove a product from the cart', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.cart-product > :nth-child(4)' ).click();
    cy.get( '.cart-product' ).should( 'have.length', 0 );
    cy.get( '[href="#/cart"]' ).should( 'have.text', 'Cart (0)' );
  } );
  it( 'Increase a product quantity', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 10 );
    cy.get( '.change-quantity > :nth-child(2)' ).click();
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 20 );
  } );
  it( 'Decrease a product quantity', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 20 );
    cy.get( '.change-quantity > :nth-child(1)' ).click();
    cy.get( '.cart-product' ).should( 'have.length', 1 );
    cy.get( '.total' ).should( 'contain', 10 );
    cy.get( '.change-quantity > :nth-child(1)' ).click();
    cy.get( '.cart-product' ).should( 'have.length', 0 );
    cy.get( '.cart' ).should( 'contain', 'Your cart is empty' );
  } );
  it( 'Reset the cart', () => {
    cy.visit( '/' );
    cy.get( ':nth-child(1) > .product > :nth-child(3) > button' ).click();
    cy.get( ':nth-child(2) > .product > :nth-child(3) > button' ).click();
    cy.visit( '#/cart' );
    cy.get( '.cart-product' ).should( 'have.length', 2 );
    cy.get( '.total' ).should( 'contain', 243 );
    cy.get( '.total > a' ).click();
    cy.get( '.cart-product' ).should( 'have.length', 0 );
    cy.get( '.cart' ).should( 'contain', 'Your cart is empty' );
  } );
} );

