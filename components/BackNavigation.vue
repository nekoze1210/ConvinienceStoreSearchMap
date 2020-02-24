<template>
  <div>
    <fa
      id="arrow-left"
      :icon="faArrowLeft"
      @click="$emit('click-back-navigation')"
    />
  </div>
</template>

<script>
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default {
  computed: {
    faArrowLeft() {
      return faArrowLeft
    }
  }
}
</script>

<style>
#arrow-left {
  font-size: 30px;
  color: white;
  margin: 10px;
}
</style>
