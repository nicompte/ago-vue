<template>
  <div class="home">
    <div class="product-container">
      <div class="product" v-for="product in products" :key="product.id">
        <ProductComponent v-bind:product="product"></ProductComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProductComponent from '@/components/ProductComponent.vue'; // @ is an alias to /src
import {default as store} from '@/store';

@Component({
  components: {
    ProductComponent,
  },
  computed: {
    products() {
      return store.state.products;
    },
  },
})
export default class Home extends Vue {}

store.dispatch('LOAD_PRODUCTS');

</script>
<style lang="scss" scoped>
.product-container {
  display: flex;
  padding: 1em;
  flex-wrap: wrap;
  & > div {
    margin: 0.5em;
  }
}
</style>