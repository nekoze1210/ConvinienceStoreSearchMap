<!-- eslint-disable-next-line to vue/valid-template-root -->
<template />

<script>
export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      polyline: null
    }
  },
  mounted() {
    this.polyline = new this.$google.maps.Polyline({
      map: this.$props.map,
      path: this.buildMvcArray(),
      draggable: false,
      strokeColor: '#9BC03A',
      strokeWeight: '5'
    })
  },
  beforeDestroy() {
    this.polyline.setMap(null)
  },
  methods: {
    buildMvcArray() {
      return new this.$google.maps.MVCArray(this.$props.steps)
    }
  }
}
</script>
