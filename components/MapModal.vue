<template>
  <div :style="{ height: modalSize }" class="container-fluid">
    <h2 class="title is-5">{{ heading }}</h2>
    <div v-if="!selectedStore" class="columns scrollable">
      <div
        v-for="store in stores"
        :key="store.placeId"
        @click="onClickButton(store)"
        class="column is-full"
      >
        <div class="columns is-mobile is-gapless">
          <div class="column">
            <img
              :src="storePhoto(store)"
              :alt="store.name"
              class="image store-image is-128x128"
            />
          </div>
          <div class="column">
            <h3 class="store-name subtitle is-6">{{ store.name }}</h3>
            <p>{{ store.formattedAddress }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalSize: '40%'
    }
  },
  computed: {
    stores() {
      return this.$store.state.stores
    },
    selectedStore() {
      return this.$store.state.selectedStore
    },
    heading() {
      return this.selectedStore !== undefined && this.selectedStore !== null
        ? '「' + this.selectedStore.name + '」' + 'までのルート'
        : '近くのコンビニ'
    }
  },
  methods: {
    extendModal(percentage) {
      this.modalSize = percentage.toString() + '%'
    },
    storePhoto(store) {
      return store.photos === undefined ? '' : store.photos[0].getUrl()
    },
    onClickButton(store) {
      this.extendModal(20)
      this.$store.commit('setSelectedStore', store.placeId)
      this.$emit('click-store-route')
    }
  }
}
</script>

<style>
h2.title {
  text-align: center;
  margin-top: 1.5rem;
}

#modal {
  width: 100%;
  height: 0;
  background: #fff;
  box-shadow: 0px -4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  transition: height 0.5s;
}

.stores {
  height: 100%;
  overflow-y: scroll;
}

.store-image {
  margin: 0 auto;
  border-radius: 5px;
}

.scrollable {
  height: 100%;
  overflow-y: auto;
  margin: 0 10px;
}
</style>
