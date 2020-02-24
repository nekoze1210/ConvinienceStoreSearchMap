<template>
  <div>
    <template v-if="!!map">
      <slot :map="map" name="marker" />
      <slot :map="map" name="polyline" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    mapElement: {
      type: HTMLDivElement,
      required: true
    },
    mapOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initializeMap()
    this.$store.commit('setCurrentCenter', this.map.getCenter())
    this.$emit('load-google-maps', this.map)
  },
  methods: {
    initializeMap() {
      const { Map } = this.$google.maps
      this.map = new Map(this.$props.mapElement, this.$props.mapOptions)
    }
  }
}
</script>
