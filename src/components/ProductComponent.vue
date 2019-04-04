<template>
  <span class="product">
    <div>
      <img :src="product.picture">
    </div>
    <div>
      <div>{{product.name}}</div>
      <div>Price: €{{product.price}}</div>
    </div>
    <div>
      <button v-on:click="buy(product)">Add to cart</button>
    </div>
  </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Product} from '../services/products.service';
import store from '../store';

@Component
export default class ProductComponent extends Vue {
  @Prop() private product!: Product;
  public buy(product: Product) {
    store.dispatch('ADD_PRODUCT_TO_CART', product);
  }
}
</script>

<style scoped lang="scss">
.product {
  border: solid 1px #eee;
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
  & > div {
    margin: 0.5em;
  }
}
</style>
