<template>
  <div
    id="modal"
    :style="{ height: modalSize, display: showModal ? 'block' : 'none' }"
  >
    <h2>{{ heading }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: '近くのコンビニ',
      showModal: false,
      modalSize: '20%'
    }
  },
  mounted() {
    this.showModal = true
  },
  methods: {
    extendModal(percentage) {
      setTimeout(() => {
        this.modalSize = percentage.toString() + '%'
      }, 1000)
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
