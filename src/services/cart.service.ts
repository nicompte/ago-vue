import {Product} from './products.service';

interface InCartProduct {
  number: number;
  product: Product;
}

export class Cart {

  private cart: InCartProduct[] = [];

  constructor() {
    this.initialize();
  }

  public getCart(): InCartProduct[] {
    return this.cart;
  }

  public addProduct(product: Product) {
    const inCartProduct = this.cart.filter((el) => el.product.id === product.id);
    if(inCartProduct && inCartProduct.length) {
      inCartProduct[0].number += 1;
    } else {
      this.cart.push({number: 1, product});
    }
    this.setState();
  }

  public numberOfItems() {
    return this.cart.reduce((acc, el) => {
      return acc + el.number;
    }, 0);
  }

  public totalPrice() {
    return this.cart.reduce((acc, el) => {
      return acc + el.number * el.product.price;
    }, 0);
  }

  public removeProduct(productId: number) {
    this.cart = this.cart.filter((el) => el.product.id !== productId);
    this.setState();
  }

  public removeOne(productId: number) {
    const inCartProduct = this.cart.filter((el) => el.product.id === productId);
    if(inCartProduct && inCartProduct.length) {
      inCartProduct[0].number -= 1;
      if(inCartProduct[0].number === 0) {
        this.cart = this.cart.filter((el) => el.product.id !== productId);
      }
    }
    this.setState();
  }

  public reset() {
    this.cart = [];
    this.setState();
  }

  private setState() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private getState() {
    const state = localStorage.getItem('cart');
    if(state) {
      this.cart = JSON.parse(state);
    } else {
      this.cart = [];
    }
  }

  private initialize() {
    this.getState();
  }
}
