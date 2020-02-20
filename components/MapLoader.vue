<template>
  <div>
    <google-maps :mapElement="mapElement" @load-google-maps="onLoadGoogleMaps">
      <template #marker="{map}" v-if="showstores">
        <div v-for="store in stores" :key="store.place_id">
          <marker-overlay
            :map="map"
            :latLng="store.position"
            :placeId="store.placeId"
            @load-marker-overlay="onLoadMarker"
          />
        </div>
      </template>
      <template #polyline="{map}" v-if="steps.length > 1">
        <polyline-overlay :map="map" :steps="steps" />
      </template>
    </google-maps>
    <map-modal id="modal" />
  </div>
</template>

<script>
import MapModal from '~/components/MapModal.vue'
import GoogleMaps from '~/components/GoogleMaps.vue'
import MarkerOverlay from '~/components/googleMaps/overlays/MarkerOverlay.vue'
import PolylineOverlay from '~/components/googleMaps/overlays/PolylineOverlay.vue'

export default {
  components: { GoogleMaps, MarkerOverlay, PolylineOverlay, MapModal },
  props: {
    mapElement: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      steps: [],
      showModal: false,
      libraries: {
        placesService: null,
        directionsService: null
      }
    }
  },
  computed: {
    stores() {
      return this.$store.state.stores
    },
    showstores: {
      get() {
        return this.$store.state.stores.length > 0
      }
    }
  },
  methods: {
    loadPolylineOverlay(steps) {
      this.steps = steps
    },
    onLoadGoogleMaps(map) {
      this.setModal(map)
      this.$store.commit('setCurrentCenter', map.getCenter())
      this.loadLibraries(map)
      this.addIdleListener(map)
      this.$store.dispatch('resetStores', this.libraries.placesService)
    },
    onLoadMarker({ marker, placeId }) {
      marker.addListener('click', () => {
        this.$store.commit('setSelectedStore', placeId)
      })
    },
    loadLibraries(map) {
      this.libraries.directionsService = new this.$google.maps.DirectionsService()
      this.libraries.placesService = new this.$google.maps.places.PlacesService(
        map
      )
    },
    addIdleListener(map) {
      map.addListener('idle', () => {
        this.$store.commit('setCurrentCenter', map.getCenter())
        this.$store.dispatch('resetStores', this.libraries.placesService)
      })
    },
    setModal(map) {
      map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    }
  }
}
</script>
