<template>
  <div>
    <div id="map" />
    <map-loader
      :mapElement="mapElement"
      :mapOptions="mapOptions"
      v-if="!!mapElement && !!currentLocation"
      @load-google-maps="onLoadGoogleMaps"
    >
      <template #marker="{map}">
        <store-markers
          ref="storeMarkers"
          :map="map"
          :key="storeMarkersComponentKey"
        />
      </template>
      <template #polyline="{map}">
        <selected-store-polyline :map="map" />
      </template>
    </map-loader>
    <stores-modal id="modal" @click-store="onClickStore" />
    <back-navigation
      id="back-navigation"
      v-show="$store.state.storeDirection"
      @click-back-navigation="forceRenderSroreMarkers"
    />
  </div>
</template>

<script>
import MapLoader from '~/components/MapLoader.vue'
import StoreMarkers from '~/components/StoreMarkers.vue'
import SelectedStorePolyline from '~/components/SelectedStorePolyline.vue'
import StoresModal from '~/components/StoresModal.vue'
import BackNavigation from '~/components/BackNavigation.vue'

import mapStyleJSON from '~/assets/json/mapStyle.json'

export default {
  components: {
    MapLoader,
    StoreMarkers,
    SelectedStorePolyline,
    StoresModal,
    BackNavigation
  },
  data() {
    return {
      mapElement: null,
      mapOptions: {
        center: {
          lat: null,
          lng: null
        },
        zoom: 15,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'greedy',
        styles: mapStyleJSON
      },
      storeMarkersComponentKey: 0
    }
  },
  computed: {
    currentLocation() {
      return this.$store.state.currentLocation
    }
  },
  async mounted() {
    await this.$store.dispatch('setCurrentLocation')
    this.mapOptions.center.lat = this.$store.state.currentLocation.lat()
    this.mapOptions.center.lng = this.$store.state.currentLocation.lng()
    this.mapElement = this.$el.querySelector('#map')
  },
  methods: {
    onLoadGoogleMaps(map) {
      // カスタムコントロールの設置: BOTTOM_CENTER
      this.addCustomControl(
        map,
        this.$google.maps.ControlPosition.BOTTOM_CENTER,
        this.$el.querySelector('#modal')
      )
      // カスタムコントロールの設置: TOP_LEFT
      this.addCustomControl(
        map,
        this.$google.maps.ControlPosition.TOP_LEFT,
        this.$el.querySelector('#back-navigation')
      )
    },
    onClickStore(placeId) {
      this.$store.dispatch('estimateRoute', placeId)
    },
    addCustomControl(map, position, element) {
      map.controls[position].push(element)
    },
    forceRenderSroreMarkers() {
      this.storeMarkersComponentKey++
    }
  }
}
</script>
