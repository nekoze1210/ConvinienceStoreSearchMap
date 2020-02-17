export const state = () => ({
  currentCenterLatLng: null,
  stores: [],
  selectedStore: null
})

export const mutations = {
  setCurrentCenter(state, latLng) {
    state.currentCenterLatLng = latLng
  },
  setStores(state, array) {
    state.stores = array
  },
  setSelectedStore(state, placeId) {
    state.selectedStore = placeId
  }
}

export const actions = {
  resetStores({ state, commit }, placesService) {
    commit('setSelectedStore', null)
    commit('setStores', [])
    placesService.textSearch(
      {
        location: state.currentCenterLatLng,
        radius: 100,
        query: 'コンビニ'
      },
      (results, status) => {
        if (status === 'OK') {
          const stores = results.map((result) => {
            return {
              photos: result.photos,
              position: result.geometry.location,
              name: result.name,
              placeId: result.place_id
            }
          })
          commit('setStores', stores)
        }
      }
    )
  }
}
