<template>
  <div>
    <div id="map" />
    <div v-if="!!mapElement && !!currentLocation">
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
  computed: {
    currentLocation() {
      return this.$store.state.currentLocation
    }
  },
  mounted() {
    this.$store.dispatch('setCurrentLocation')
    this.mapElement = this.$el.querySelector('#map')
  }
}
</script>

<style>
#map {
  position: fixed !important;
  height: 100%;
  width: 100%;
}
</style>
