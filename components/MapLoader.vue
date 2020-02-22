<template>
  <div>
    <google-maps
      ref="map"
      :mapElement="mapElement"
      @load-google-maps="onLoadGoogleMaps"
      :mapOptions="mapOptions"
    >
      <template #marker="{map}">
        <marker-overlay
          :map="map"
          :latLng="$store.state.currentLocation"
          :placeId="$store.state.currentLocation.toString()"
          :options="currentLocationMarkerOptions"
        />
        <div v-if="showstores">
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

import currentLocationMarkerImage from '~/assets/currentLocationIcon.png'
import mapStyleJSON from '~/assets/mapStyle.json'

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
      mapOptions: {
        center: {
          lat: this.$store.state.currentLocation.lat(),
          lng: this.$store.state.currentLocation.lng()
        },
        zoom: 15,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'greedy',
        styles: mapStyleJSON
      },
      currentLocationMarkerOptions: {
        icon: {
          url: currentLocationMarkerImage,
          size: new this.$google.maps.Size(71, 71),
          origin: new this.$google.maps.Point(0, 0),
          anchor: new this.$google.maps.Point(17, 34),
          scaledSize: new this.$google.maps.Size(40, 40)
        }
      },
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
      this.dragEndListener = this.$refs.map.addListener('dragend', () => {
        this.$store.commit('setCurrentCenter', map.getCenter())
        this.$store.dispatch('resetStores', this.libraries.placesService)
      })
    },
    removeMapDragEndListener() {
      this.$refs.map.removeListener(this.dragEndListener.listenerId)
    },
    setModal(map) {
      map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    },
    estimateRoute(placeId) {
      this.removeMapDragEndListener()
      this.$store.dispatch('estimateRoute', placeId)
    }
  }
}
</script>
