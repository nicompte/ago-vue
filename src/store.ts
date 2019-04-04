import {Cart} from './services/cart.service';
import {Product, ProductService} from './services/products.service';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: new Cart(),
    products: [] as Product[],
  },
  mutations: {
    SET_PRODUCTS: (state, products: Product[]) => {
      state.products = products;
    },
    ADD_PRODUCT_TO_CART: (state, product: Product) => {
      state.cart.addProduct(product);
    },
    REMOVE_FROM_CART: (state, productId) => {
      state.cart.removeProduct(productId);
    },
    LOWER_QUANTITY: (state, productId) => {
      state.cart.removeOne(productId);
    },
    REMOVE_ALL_FROM_CART: (state) => {
      state.cart.reset();
    },
  },
  actions: {
    LOAD_PRODUCTS: async ({commit}) => {
      const products = await ProductService.getAllProducts();
      commit('SET_PRODUCTS', products);
    },
    ADD_PRODUCT_TO_CART: ({commit}, product: Product) => {
      commit('ADD_PRODUCT_TO_CART', product);
    },
    INCREASE_QUANTITY: ({commit}, product: Product) => {
      commit('ADD_PRODUCT_TO_CART', product);
    },
    LOWER_QUANTITY: ({commit}, productId: number) => {
      commit('LOWER_QUANTITY', productId);
    },
    REMOVE_FROM_CART: ({commit}, productId: number) => {
      commit('REMOVE_FROM_CART', productId);
    },
    REMOVE_ALL_FROM_CART: ({commit}) => {
      commit('REMOVE_ALL_FROM_CART');
    },
  },
});
