<template>
  <div>
    <google-maps :mapElement="mapElement" @load-google-maps="onLoadGoogleMaps">
      <template #marker="{map}" v-if="showstores">
        <div v-for="(store, index) in stores" :key="store.placeId">
          <marker-overlay
            :map="map"
            :latLng="store.position"
            :placeId="store.placeId"
            :options="{ label: (index + 1).toString() }"
            @load-marker-overlay="onLoadMarker"
          />
        </div>
      </template>
      <template #polyline="{map}" v-if="routeSteps.length > 1">
        <polyline-overlay :map="map" :steps="routeSteps" />
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
  components: { GoogleMaps, PolylineOverlay, MarkerOverlay, MapModal },
  props: {
    mapElement: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      steps: [],
      libraries: {
        placesService: null,
        directionsService: null
      },
      dragEndListener: null
    }
  },
  computed: {
    stores() {
      return this.$store.state.stores
    },
    showstores() {
      return this.$store.state.stores.length > 0
    },
    routeSteps() {
      if (this.$store.state.storeDirection != null) {
        return this.$google.maps.geometry.encoding.decodePath(
          this.$store.state.storeDirection.routes[0].overview_polyline
        )
      } else {
        return []
      }
    }
  },
  methods: {
    onLoadGoogleMaps(map) {
      this.setModal(map)
      this.$store.commit('setCurrentCenter', map.getCenter())
      this.libraries.placesService = new this.$google.maps.places.PlacesService(
        map
      )
      this.addMapDragEndListener(map)
      this.$store.dispatch('resetStores', this.libraries.placesService)
    },
    onLoadMarker({ marker, placeId }) {
      marker.addListener('click', () => {
        this.estimateRoute(placeId)
      })
    },
    addMapDragEndListener(map) {
      this.dragEndListener = map.addListener('dragend', () => {
        this.$store.commit('setCurrentCenter', map.getCenter())
        this.$store.dispatch('resetStores', this.libraries.placesService)
      })
    },
    setModal(map) {
      map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    },
    estimateRoute(placeId) {
      this.$store.dispatch('estimateRoute', placeId)
    }
  }
}
</script>
