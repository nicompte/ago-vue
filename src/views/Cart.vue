<template>
  <div class="cart">
    <div v-if="numberOfItems === 0">Your cart is empty</div>
    <div class="cart-product" v-for="item in cart" :key="item.product.id">
      <span>
        <img :src="item.product.picture">
      </span>
      <span>{{ item.product.name }}</span>
      <span class="number">
        <span class="change-quantity">
          <button class="lower" v-on:click="lowerQuantity(item.product.id)">-</button>
          <button class="increase" v-on:click="increaseQuantity(item.product)">+</button>
        </span>
        <span>x{{ item.number }}</span>
      </span>
      <button class="remove" v-on:click="removeFromCart(item.product.id)">Remove</button>
    </div>
    <div class="total" v-if="numberOfItems > 0">
      Total: €{{totalPrice}}
      <a
        class="reset"
        href="javascript:void(0)"
        v-on:click="resetCart()"
      >Reset cart</a>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProductComponent from '@/components/ProductComponent.vue'; // @ is an alias to /src
import {default as store} from '@/store';
import {Product} from '../services/products.service';

@Component({
  components: {
    ProductComponent,
  },
  computed: {
    cart() {
      return store.state.cart.getCart();
    },
    numberOfItems() {
      return store.state.cart.numberOfItems();
    },
    totalPrice() {
      return store.state.cart.totalPrice();
    },
  },
})
export default class Cart extends Vue {
  public removeFromCart(productId: number) {
    store.dispatch('REMOVE_FROM_CART', productId);
  }
  public resetCart() {
    store.dispatch('REMOVE_ALL_FROM_CART');
  }
  public increaseQuantity(product: Product) {
    store.dispatch('INCREASE_QUANTITY', product);
  }
  public lowerQuantity(productId: number) {
    store.dispatch('LOWER_QUANTITY', productId);
  }
}
</script>
<style scoped lang="scss">
img {
  height: 50px;
  width: 50px;
}
.cart {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.cart-product {
  display: flex;
  justify-content: space-evenly;
  border-bottom: solid 1px #eee;
  align-items: center;

  .number {
    display: inline-block;
  }
  .change-quantity {
    display: inline-flex;
    button {
      display: block;
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0.1em;
      line-height: inherit;
    }
  }
}
.total {
  position: relative;
  right: 0;
}
</style>