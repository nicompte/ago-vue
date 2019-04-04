<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Products</router-link>&nbsp;|
      <router-link to="/cart">Cart ({{nbOfItemsInCart}})</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #9b4dca;
    }
  }
}
</style>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {default as store} from '@/store';

@Component({
  components: {
  },
  computed: {
    nbOfItemsInCart() {
      return store.state.cart.numberOfItems();
    },
  },
})
export default class App extends Vue {}
</script>