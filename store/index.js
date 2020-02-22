export const state = () => ({
  currentCenterLatLng: null,
  stores: [],
  selectedStore: null,
  storeDirection: null,
  modalHeight: '40%',
  currentLocation: null
})

export const mutations = {
  setCurrentCenter(state, latLng) {
    state.currentCenterLatLng = latLng
  },
  setStores(state, array) {
    state.stores = array
  },
  setSelectedStore(state, store) {
    state.selectedStore = store
  },
  setStoreDirection(state, direction) {
    state.storeDirection = direction
  },
  setModalHeight(state, modalHeight) {
    state.modalHeight = modalHeight
  },
  setCurrentLocation(state, location) {
    state.currentLocation = location
  }
}

export const actions = {
  changeModalHeightPercentage({ commit }, heightInt) {
    commit('setModalHeight', heightInt.toString() + '%')
  },
  resetStores({ state, commit, dispatch }, placesService) {
    commit('setSelectedStore', null)
    commit('setStoreDirection', null)
    dispatch('changeModalHeightPercentage', 40)
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
              formattedAddress: result.formatted_address,
              placeId: result.place_id
            }
          })
          commit('setStores', stores)
        }
      }
    )
  },
  selectStore({ commit, state }, placeId) {
    const store = state.stores.find((store) => {
      return store.placeId === placeId
    })
    commit('setSelectedStore', store)
    commit('setStores', [store])
  },
  estimateRoute({ state, commit, dispatch }, placeId) {
    dispatch('selectStore', placeId)
    dispatch('changeModalHeightPercentage', 15)
    const request = {
      origin:
        state.currentLocation.coords.latitude +
        ',' +
        state.currentLocation.coords.longitude,
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
  },
  setCurrentLocation({ commit }) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        commit('setCurrentLocation', position)
      },
      () => {
        alert('現在地の取得に失敗しました。')
      }
    )
  }
}
