<template>
  <div v-if="stepsExists">
    <polyline-overlay :map="map" :steps="routeSteps" />
  </div>
</template>

<script>
import PolylineOverlay from '~/components/googleMaps/overlays/PolylineOverlay.vue'

export default {
  components: { PolylineOverlay },
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  computed: {
    routeSteps() {
      if (this.$store.state.storeDirection != null) {
        return this.$google.maps.geometry.encoding.decodePath(
          this.$store.state.storeDirection.routes[0].overview_polyline
        )
      } else {
        return []
      }
    },
    stepsExists() {
      if (this.routeSteps.length > 0) {
        this.$google.maps.event.clearListeners(this.$props.map, 'dragend')
        return true
      }
      return false
    }
  }
}
</script>
