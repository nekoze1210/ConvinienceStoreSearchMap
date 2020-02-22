<!-- eslint-disable-next-line to vue/valid-template-root -->
<template />

<script>
export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    latLng: {
      type: Object,
      required: true
    },
    placeId: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          animation: this.$google.maps.Animation.DROP
        }
      }
    }
  },
  data() {
    return {
      marker: null
    }
  },
  mounted() {
    this.marker = new this.$google.maps.Marker({
      map: this.$props.map,
      position: this.$props.latLng,
      ...this.$props.options
    })
    this.$emit('load-marker-overlay', {
      marker: this.marker,
      placeId: this.$props.placeId
    })
  },
  beforeDestroy() {
    this.marker.setMap(null)
  }
}
</script>
