<template>
  <div>
    <!-- <search-box @input-keyword="searchConvinieneStores" /> -->
    <div v-if="!!map">
      <slot :map="map" name="marker" />
      <slot :map="map" name="polyline" />
    </div>
    <modal />
  </div>
</template>

<script>
// import SearchBox from '~/components/SearchBox.vue'
import Modal from '~/components/Modal.vue'

export default {
  components: { Modal },
  props: {
    mapOptions: {
      type: Object,
      default: () => ({
        center: {
          lat: 35.7329854,
          lng: 139.7128128
        },
        zoom: 15,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        clickableIcons: false
      })
    },
    mapElement: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      map: null,
      libraries: {
        autocompleteService: null,
        geocoder: null,
        directionsService: null
      }
    }
  },
  mounted() {
    const { Map } = this.$google.maps
    this.map = new Map(this.$props.mapElement, this.$props.mapOptions)
    this.setModal()
    // this.setSeachBox()
    this.$store.commit('setCurrentCenter', this.map.getCenter())
    this.addDragEndListener()
    this.loadLibraries()
  },
  methods: {
    // setSeachBox() {
    //   this.map.controls[this.$google.maps.ControlPosition.TOP_CENTER].push(
    //     this.$el.querySelector('#search-box')
    //   )
    // },
    hideSearchBox() {
      this.showSearchBox = false
    },
    setModal() {
      this.map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    },
    addDragEndListener() {
      this.addListener('dragend', () => {
        this.$store.commit('setCurrentCenter', this.map.getCenter())
        this.searchConvinieneStores('コンビニエンスストア')
      })
    },
    addListener(event, callback) {
      this.map.addListener(event, callback)
    },
    loadLibraries(map) {
      this.libraries.autocompleteService = new this.$google.maps.places.AutocompleteService()
      this.libraries.geocoder = new this.$google.maps.Geocoder()
      this.libraries.directionsService = new this.$google.maps.DirectionsService()
    },
    async searchConvinieneStores(keyword) {
      const placePredictionRequest = {
        input: keyword,
        location: this.$store.state.currentCenterLatLng,
        radius: 500
      }
      const placePredictions = await this.getPlacePredictions(
        placePredictionRequest
      )

      const predictionLatLngArray = []

      for (let i = 0; i < placePredictions.length; i++) {
        const geocodeRequest = {
          placeId: placePredictions[i].place_id
        }
        const geocode = await this.geocodePlace(geocodeRequest)

        predictionLatLngArray.push(geocode[0].geometry.location)
      }
      this.$store.commit('setMarkerLatLngArray', predictionLatLngArray)
    },
    getPlacePredictions(request) {
      return new Promise((resolve, reject) => {
        this.libraries.autocompleteService.getPlacePredictions(
          request,
          (results, status) => {
            if (status === 'OK') {
              resolve(results)
            }
          }
        )
      })
    },
    geocodePlace(request) {
      return new Promise((resolve, reject) => {
        this.libraries.geocoder.geocode(request, (results, status) => {
          if (status === 'OK') {
            resolve(results)
          }
        })
      })
    }
  }
}
</script>
