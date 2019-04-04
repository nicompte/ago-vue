import {mount, Wrapper} from '@vue/test-utils';
import Cart from '@/views/Cart.vue';

import store from '@/store';
store.dispatch = jest.fn();
const product = {id: 1, name: 'Test', price: 12, picture: ''};

describe('ProductComponent', () => {
  let wrapper: Wrapper<Cart>;

  beforeEach(() => {
    wrapper = mount(Cart, {
      propsData: {},
    });
  });

  it('render data from the cart', () => {
    store.state.cart.addProduct(product);
    const products = wrapper.findAll('.cart-product');
    expect(products.length).toEqual(1);
    expect(wrapper.find('.total').text()).toContain(12..toString());
  });

  it('remove an element from the cart', () => {
    store.state.cart.addProduct(product);
    wrapper.find('.cart-product button.remove').trigger('click');
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('REMOVE_FROM_CART', product.id);
  });

});
