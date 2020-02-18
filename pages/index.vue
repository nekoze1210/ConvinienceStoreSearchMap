<template>
  <div class="container">
    <div id="map" />
    <div v-if="!!mapElement">
      <map-loader ref="mapLoader" :mapElement="mapElement" />
    </div>
  </div>
</template>

<script>
import MapLoader from '~/components/MapLoader.vue'

export default {
  components: { MapLoader },
  data() {
    return {
      mapElement: null
    }
  },
  mounted() {
    this.mapElement = this.$el.querySelector('#map')
  }
}
</script>

<style>
.container {
  top: 0;
  left: 0;
  /* margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}

#map {
  position: fixed !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
