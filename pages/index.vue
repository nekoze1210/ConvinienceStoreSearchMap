<template>
  <div>
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
#map {
  position: fixed !important;
  height: 100%;
  width: 100%;
}
</style>
