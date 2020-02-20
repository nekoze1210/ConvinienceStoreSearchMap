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
      strokeColor: '#4F83F0',
      strokeWeight: '7'
    })
  },
  methods: {
    buildMvcArray() {
      return new this.$google.maps.MVCArray(this.$props.steps)
    }
  }
}
</script>
