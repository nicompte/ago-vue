import {mount, Wrapper} from '@vue/test-utils';
import ProductComponent from '@/components/ProductComponent.vue';

import store from '@/store';
store.dispatch = jest.fn();

describe('ProductComponent', () => {
  let wrapper: Wrapper<ProductComponent>;
  const product = {id: 1, name: 'Test', price: 12, picture: ''};

  beforeEach(() => {
    wrapper = mount(ProductComponent, {
      propsData: {product},
    });
  });

  it('renders a product', () => {
    expect(wrapper.text()).toMatch(product.name);
    expect(wrapper.text()).toMatch(product.price.toString());
  });

  it('adds a product to cart', () => {
    wrapper.find('button').trigger('click');
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('ADD_PRODUCT_TO_CART', product);
  });
});
