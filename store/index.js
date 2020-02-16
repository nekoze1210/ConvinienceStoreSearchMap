// import { Client } from '@google/maps'

export const state = () => ({
  searchFormKeyword: '',
  currentCenterLatLng: null,
  storeMarkerLatLngArray: []
})

export const mutations = {
  setCurrentCenter(state, latLng) {
    state.currentCenterLatLng = latLng
  },
  setSearchFormKeyword(state, value) {
    state.searchFormKeyword = value
  },
  setMarkerLatLngArray(state, array) {
    state.storeMarkerLatLngArray = array
  }
}
