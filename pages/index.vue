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
      mapElement: null,
      routeSteps: [
        { lat: 35.72946, lng: 139.71243 },
        { lat: 35.72957, lng: 139.71253 },
        { lat: 35.72876, lng: 139.71521 },
        { lat: 35.72939, lng: 139.7162 },
        { lat: 35.72894, lng: 139.71812 },
        { lat: 35.72877, lng: 139.71872 },
        { lat: 35.72874, lng: 139.71877 }
      ]
    }
  },
  mounted() {
    this.mapElement = this.$el.querySelector('#map')
  },
  methods: {
    drawPolyline() {
      this.$refs.mapLoader.loadPolylineOverlay(this.routeSteps)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#map {
  position: fixed !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
