import {Cart} from './../../src/services/cart.service';

// TODO: mock localStorage and test

describe('CartService', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('initializes an empty cart', () => {
    expect(cart.getCart()).toEqual([]);
  });
  it('add a product to the cart', () => {
    const product = {id: 1, name: 'name', price: 1, picture: ''};
    cart.addProduct(product);
    expect(cart.getCart()).toEqual([{product, number: 1}]);
    cart.addProduct(product);
    expect(cart.getCart()).toEqual([{product, number: 2}]);
  });
  it('reset the cart', () => {
    const product = {id: 1, name: 'name', price: 1, picture: ''};
    cart.addProduct(product);
    cart.reset();
    expect(cart.getCart()).toEqual([]);
  });
});
