<template>
  <div :style="{ height: modalSize }">
    <h2>{{ heading }}</h2>
    <div v-show="!selectedStore" v-for="store in stores" :key="store.placeId">
      <p>{{ store.name }}</p>
      <p>{{ store.photos }}</p>
      <p>{{ store.position }}</p>
      <p>{{ store.placeId }}</p>
    </div>
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
</style>
