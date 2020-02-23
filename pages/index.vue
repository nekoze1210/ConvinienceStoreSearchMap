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
        <store-markers :map="map" />
      </template>
      <template #polyline="{map}">
        <selected-store-polyline :map="map" />
      </template>
    </map-loader>
    <stores-modal id="modal" @click-store="onClickStore" />
  </div>
</template>

<script>
import MapLoader from '~/components/MapLoader.vue'
import StoreMarkers from '~/components/StoreMarkers.vue'
import SelectedStorePolyline from '~/components/SelectedStorePolyline.vue'
import StoresModal from '~/components/StoresModal.vue'

import mapStyleJSON from '~/assets/mapStyle.json'

export default {
  components: { MapLoader, StoreMarkers, SelectedStorePolyline, StoresModal },
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
      }
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
      const modalElement = this.$el.querySelector('#modal')
      const bottomCenter = this.$google.maps.ControlPosition.BOTTOM_CENTER
      // カスタムコントロールの設置
      map.controls[bottomCenter].push(modalElement)
    },
    onClickStore(placeId) {
      this.$store.dispatch('estimateRoute', placeId)
    }
  }
}
</script>

<style>
#map {
  position: fixed !important;
  height: 100%;
  width: 100%;
}

#modal {
  width: 100%;
  max-width: 500px;
  height: 0;
  background: #323232;
  box-shadow: 0px -4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  transition: height 0.25s;
}
</style>
