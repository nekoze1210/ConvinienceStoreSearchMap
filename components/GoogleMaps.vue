<template>
  <div>
    <search-box />
    <div v-if="!!map">
      <slot :map="map" name="marker" />
      <slot :map="map" name="polyline" />
    </div>
    <modal />
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox.vue'
import Modal from '~/components/Modal.vue'

export default {
  components: { SearchBox, Modal },
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
      showModal: false,
      modalSize: '20%'
    }
  },
  mounted() {
    const { Map } = this.$google.maps
    this.map = new Map(this.$props.mapElement, this.$props.mapOptions)
    this.setModal()
    this.setSeachBox()
  },
  methods: {
    setSeachBox() {
      this.map.controls[this.$google.maps.ControlPosition.TOP_CENTER].push(
        this.$el.querySelector('#search-box')
      )
    },
    hideSearchBox() {
      this.showSearchBox = false
    },
    setModal() {
      this.map.controls[this.$google.maps.ControlPosition.BOTTOM_CENTER].push(
        this.$el.querySelector('#modal')
      )
    }
  }
}
</script>

<style>
#modal {
  width: 100%;
  height: 20%;
  background: #fff;
  display: none;
}
</style>
