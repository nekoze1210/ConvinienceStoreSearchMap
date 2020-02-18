<template>
  <div :style="{ height: modalSize }">
    <h2>{{ heading }}</h2>
    <ul
      v-show="!selectedStore"
      v-for="store in stores"
      :key="store.placeId"
      class="horizontal-list"
    >
      <li class="item">
        <div>
          <p>{{ store.name }}</p>
          <p>{{ store.photos }}</p>
          <p>{{ store.position }}</p>
          <p>{{ store.placeId }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: '近くのコンビニ',
      modalSize: '20%'
    }
  },
  computed: {
    stores() {
      return this.$store.state.stores
    },
    selectedStore() {
      return this.$store.state.selectedStore
    }
  },
  methods: {
    extendModal(percentage) {
      setTimeout(() => {
        this.modalSize = percentage.toString() + '%'
      }, 1000)
    }
  }
}
</script>

<style>
#modal {
  width: 100%;
  height: 20%;
  background: #fff;
}
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.item {
  /* 横スクロール用 */
  display: inline-block;
  /* width: 90%; */

  /* 見た目調整 */
  /* height: 400px;
  margin: 16px; */
  font-size: 15px;
  background: rgba(255, 0, 0, 0.4);
}
</style>
