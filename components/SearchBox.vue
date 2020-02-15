<template>
  <input
    id="search-box"
    :style="{ display: showSearchBox ? 'block' : 'none' }"
    v-model="keyword"
    type="text"
    placeholder="近くのコンビニを検索"
  />
</template>

<script>
export default {
  data() {
    return {
      showSearchBox: false,
      keyword: ''
    }
  },
  mounted() {
    this.showSearchBox = true
  },
  methods: {
    hideSearchBox() {
      this.showSearchBox = false
    }
  }
}
</script>

<style>
#search-box {
  width: 80%;
  height: 40px;
  font-size: 16px;
  margin-top: 20px;
  display: none;
  border: 1px solid #ddd;
  border-radius: 3px;
}
</style>
