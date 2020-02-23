<template>
  <div :style="{ height: modalHeight }" class="container-fluid">
    <h2 class="title is-5">{{ heading }}</h2>
    <div v-if="!selectedStore" class="columns scrollable">
      <div
        v-for="(store, index) in stores"
        :key="store.placeId"
        @click="onClickButton(store)"
        class="column is-full"
      >
        <div class="columns is-mobile is-gapless">
          <div class="column">
            <img
              :src="storePhoto(store)"
              :alt="store.name"
              class="image store-image is-128x128 is-rounded"
            />
          </div>
          <div class="column store-info">
            <h3 class="title is-6">
              {{ (index + 1).toString() + '. ' + store.name }}
            </h3>
            <p>{{ store.formattedAddress }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    modalHeight: {
      get() {
        return this.$store.state.modalHeight
      },
      set(height) {
        this.$store.dispatch('changeModalHeightPercentage', height)
      }
    }
  },
  methods: {
    storePhoto(store) {
      return store.photos === undefined ? '' : store.photos[0].getUrl()
    },
    onClickButton(store) {
      this.$emit('click-store', store.placeId)
    }
  }
}
</script>

<style>
h2.title {
  color: #f7f7f7;
  text-align: center;
  margin-top: 1.5rem;
}

#modal {
  width: 100%;
  max-width: 500px;
  height: 0;
  background: #323232;
  box-shadow: 0px -4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  transition: height 0.25s;
}

.stores {
  height: 100%;
  overflow-y: scroll;
}

.is-rounded {
  border-radius: 5px;
}

.scrollable {
  height: 100%;
  overflow-y: auto;
  margin: 0 10px;
}

.store-info,
.title.is-6 {
  color: #f7f7f7;
}
</style>
