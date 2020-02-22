export const state = () => ({
  currentCenterLatLng: null,
  stores: [],
  selectedStore: null,
  storeDirection: null
})

export const mutations = {
  setCurrentCenter(state, latLng) {
    state.currentCenterLatLng = latLng
  },
  setStores(state, array) {
    state.stores = array
  },
  setSelectedStore(state, placeId) {
    state.selectedStore = state.stores.find(
      (store) => (store.placeId = placeId)
    )
  },
  setStoreDirection(state, direction) {
    state.storeDirection = direction
  }
}

export const actions = {
  resetStores({ state, commit }, placesService) {
    commit('setSelectedStore', null)
    commit('setStores', [])
    placesService.textSearch(
      {
        location: state.currentCenterLatLng,
        radius: 300,
        query: 'コンビニ'
      },
      (results, status) => {
        if (status === 'OK') {
          const stores = results.map((result) => {
            return {
              photos: result.photos,
              position: result.geometry.location,
              name: result.name,
              placeId: result.place_id,
              formattedAddress: result.formatted_address
            }
          })
          commit('setStores', stores)
        }
      }
    )
  },
  findStore({ state }, { placeId }) {
    return state.stores.find((store) => store.placeId === placeId)
  },
  estimateRoute({ state, commit }, currentLocation) {
    const request = {
      origin: currentLocation,
      destination: state.selectedStore.position,
      travelMode: 'WALKING',
      optimizeWaypoints: true,
      avoidHighways: false,
      avoidTolls: false
    }
    const directionsService = new this.$google.maps.DirectionsService()
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        commit('setStoreDirection', result)
      }
    })
  }
}
