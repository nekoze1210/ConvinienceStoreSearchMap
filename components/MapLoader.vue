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
      <template #polyline="{map}" v-if="routeSteps.length > 1">
        <polyline-overlay :map="map" :steps="routeSteps" />
      </template>
    </google-maps>
    <map-modal id="modal" @click-store-route="onClickStoreRoute" />
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
    showstores() {
      return this.$store.state.stores.length > 0
    },
    routeSteps() {
      return this.$store.state.routeSteps
    }
  },
  methods: {
    onLoadGoogleMaps(map) {
      this.setModal(map)
      this.$store.commit('setCurrentCenter', map.getCenter())
      this.libraries.placesService = new this.$google.maps.places.PlacesService(
        map
      )
      this.addDragEndListener(map)
      this.$store.dispatch('resetStores', this.libraries.placesService)
    },
    onLoadMarker({ marker, placeId }) {
      marker.addListener('click', () => {
        this.$store.commit('setSelectedStore', placeId)
      })
    },
    addDragEndListener(map) {
      map.addListener('dragend', () => {
        this.$store.commit('setCurrentCenter', map.getCenter())
        this.$store.dispatch('resetStores', this.libraries.placesService)
      })
    },
    setModal(map) {
      map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    },
    onClickStoreRoute() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$store.dispatch(
            'estimateRoute',
            position.coords.latitude + ',' + position.coords.longitude
          )
        },
        () => {
          alert('失敗')
        }
      )
    }
  }
}
</script>
