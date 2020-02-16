<template>
  <div>
    <google-maps
      :mapElement="mapElement"
      @change-store-results="changeMarkersPosition"
    >
      <template #marker="{map}" v-if="showMarkers">
        <div v-for="marker in markers" :key="marker.place_id">
          <marker-overlay
            :map="map"
            :latLng="marker.geometry.location"
            :key="NaN"
          />
        </div>
      </template>
      <template #polyline="{map}" v-if="steps.length > 1">
        <polyline-overlay :map="map" :steps="steps" />
      </template>
    </google-maps>
  </div>
</template>

<script>
import GoogleMaps from '~/components/GoogleMaps.vue'
import MarkerOverlay from '~/components/googleMaps/overlays/MarkerOverlay.vue'
import PolylineOverlay from '~/components/googleMaps/overlays/PolylineOverlay.vue'

export default {
  components: { GoogleMaps, MarkerOverlay, PolylineOverlay },
  props: {
    mapElement: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      steps: []
      // showMarkers: false
    }
  },
  computed: {
    markers: {
      get() {
        return this.$store.state.currentMarkers
      },
      set(value) {
        this.$store.commit('setMarkerLatLngArray', value)
      }
    },
    showMarkers: {
      get() {
        return this.$store.state.currentMarkers.length > 0
      }
    }
  },
  methods: {
    loadPolylineOverlay(steps) {
      this.steps = steps
    },
    changeMarkersPosition(markers) {
      this.markers = markers
    }
  }
}
</script>
