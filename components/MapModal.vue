<template>
  <div :style="{ height: modalSize }">
    <h2 id="title">{{ heading }}</h2>
    <div class="stores">
      <div v-show="!selectedStore" v-for="store in stores" :key="store.placeId">
        <div class="store-items">
          <img
            :src="store.photos[0].getUrl()"
            v-if="store.hasOwnProperty('photos')"
            class="store-image"
          />
          <div>
            <h3 class="store-name">{{ store.name }}</h3>
            <p>{{ store.position }}</p>
            <p>{{ store.placeId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: '近くのコンビニ',
      modalSize: '30%'
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
h2#title {
  font-size: 20px;
  margin: 10px 0px;
}

#modal {
  width: 100%;
  height: 20%;
  background: #fff;
}

.stores {
  height: 100%;
  overflow-y: scroll;
}

.store-items {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.store-image {
  width: 150px;
  height: 100px;
}

.store-name {
}
</style>
