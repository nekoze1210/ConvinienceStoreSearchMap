<template>
  <div>
    <google-maps :mapElement="mapElement">
      <template #marker="{map}">
        <div v-for="(markerLatLng, index) in markers" :key="index">
          <marker-overlay :map="map" :latLng="markerLatLng" />
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
    }
  },
  computed: {
    markers: {
      get() {
        console.log(this.$store.state.storeMarkerLatLngArray)
        return this.$store.state.storeMarkerLatLngArray
      }
    }
  },
  methods: {
    loadPolylineOverlay(steps) {
      this.steps = steps
    }
  }
}
</script>
