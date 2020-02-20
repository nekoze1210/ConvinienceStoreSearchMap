<template>
  <div :style="{ height: modalSize }">
    <h2 id="title">{{ heading }}</h2>
    <div class="stores">
      <div v-if="!selectedStore">
        <div
          v-show="!selectedStore"
          v-for="store in stores"
          :key="store.placeId"
          @click="$store.commit('setSelectedStore', store.placeId)"
        >
          <div class="store-items">
            <img
              :src="storePhoto(store)"
              :alt="store.name"
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
      <div v-else>
        <div class="selected-store">
          <img
            :src="storePhoto(selectedStore)"
            :alt="selectedStore.name"
            class="selected-store-image"
          />
          <button @click="onClickButton" class="selected-store-button">
            ここに行く
          </button>
        </div>
      </div>
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
        ? this.selectedStore.name
        : '近くのコンビニ'
    }
  },
  methods: {
    extendModal(percentage) {
      setTimeout(() => {
        this.modalSize = percentage.toString() + '%'
      }, 1000)
    },
    storePhoto(store) {
      return store.photos === undefined ? '' : store.photos[0].getUrl()
    },
    onClickButton() {
      this.$emit('click-store-route')
    }
  }
}
</script>

<style>
h2#title {
  text-align: center;
  font-size: 20px;
  margin: 10px 0px;
}

#modal {
  width: 100%;
  height: 0;
  background: #fff;
  box-shadow: 0px -4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
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

.selected-store-image {
  width: 300px;
  height: 150px;
  display: block;
  margin: 0 auto;
}

.selected-store-button {
  width: 100%;
  color: #fff;
  background: #db4437;
  border-radius: 20px;
  height: 34px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  margin-top: 30px;
}
</style>
