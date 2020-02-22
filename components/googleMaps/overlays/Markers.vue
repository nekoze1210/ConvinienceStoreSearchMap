<!-- eslint-disable-next-line to vue/valid-template-root -->
<template />

<script>
export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    places: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      markers: []
    }
  },
  mounted() {
    this.markers = this.$props.places.map((place) => {
      return {
        placeId: place.placeId,
        overlay: new this.$google.maps.Marker({
          map: this.$props.map,
          position: place.position,
          animation: this.$google.maps.Animation.DROP
        })
      }
    })
    this.$emit('load-markers', this.markers)
  },
  methods: {
    resetMarkers(placeId = null) {
      console.log(this.markers)
      this.markers.forEach((marker) => {
        if (placeId !== marker.placeId) {
          this.destroyMarkerOverlay(marker)
        }
      })
    },
    destroyMarkerOverlay(marker) {
      console.log('destroy')
      marker.overlay.setMap(null)
    }
  }
}
</script>
