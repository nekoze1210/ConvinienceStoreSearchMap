// import { Client } from '@google/maps'

export const state = () => ({
  currentCenterLatLng: null,
  storeMarkerLatLngArray: []
})

export const mutations = {
  setCurrentCenter(state, latLng) {
    state.currentCenterLatLng = latLng
  },
  setMarkerLatLngArray(state, array) {
    state.storeMarkerLatLngArray = array
  }
}
