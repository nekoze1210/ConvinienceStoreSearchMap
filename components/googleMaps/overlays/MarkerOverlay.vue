<!-- eslint-disable-next-line to vue/valid-template-root -->
<template />

<script>
export default {
  props: {
    map: {
      type: Object,
      required: true
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
      position: new this.$google.maps.LatLng(35.7329854, 139.7128128),
      draggable: true
    })
  }
}
</script>
