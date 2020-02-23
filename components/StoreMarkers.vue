<template>
  <div>
    <marker-overlay
      :map="map"
      :latLng="$store.state.currentLocation"
      :placeId="$store.state.currentLocation.toString()"
      :options="currentLocationMarkerOptions"
    />
    <div v-if="showStores">
      <div v-for="(store, index) in stores" :key="store.placeId">
        <marker-overlay
          :map="map"
          :latLng="store.position"
          :placeId="store.placeId"
          :options="{
            label: (index + 1).toString(),
            animation: $google.maps.Animation.DROP
          }"
          @load-marker-overlay="onLoadMarker"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MarkerOverlay from '~/components/googleMaps/overlays/MarkerOverlay.vue'
import currentLocationMarkerImage from '~/assets/currentLocationIcon.png'

export default {
  components: { MarkerOverlay },
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placesService: null,
      dragEndListener: null,
      currentLocationMarkerOptions: {
        icon: {
          url: currentLocationMarkerImage,
          size: new this.$google.maps.Size(71, 71),
          origin: new this.$google.maps.Point(0, 0),
          anchor: new this.$google.maps.Point(17, 34),
          scaledSize: new this.$google.maps.Size(40, 40)
        }
      }
    }
  },
  computed: {
    stores() {
      return this.$store.state.stores
    },
    showStores() {
      return this.$store.state.stores.length > 0
    }
  },
  mounted() {
    this.placesService = new this.$google.maps.places.PlacesService(
      this.$props.map
    )
    this.addMapDragEndListener()
    this.$store.dispatch('resetStores', this.placesService)
  },
  methods: {
    onLoadMarker({ marker, placeId }) {
      marker.addListener('click', () => {
        this.$store.dispatch('estimateRoute', placeId)
      })
    },
    addMapDragEndListener() {
      this.$props.map.addListener('dragend', () => {
        this.$store.commit('setCurrentCenter', this.$props.map.getCenter())
        this.$store.dispatch('resetStores', this.placesService)
      })
    }
  }
}
</script>
