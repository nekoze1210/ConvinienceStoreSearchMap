<template>
  <div>
    <div v-if="!!map">
      <slot :map="map" name="marker" />
      <slot :map="map" name="polyline" />
    </div>
  </div>
</template>

<script>
export default {
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
        clickableIcons: false,
        gestureHandling: 'greedy'
      })
    },
    mapElement: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    const { Map } = this.$google.maps
    this.map = new Map(this.$props.mapElement, this.$props.mapOptions)
    this.$emit('load-google-maps', this.map)
  }
}
</script>
