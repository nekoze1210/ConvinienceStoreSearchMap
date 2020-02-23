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
    placesService.nearbySearch(
      {
        location: state.currentCenterLatLng,
        radius: 500,
        openNow: true,
        type: 'convenience_store'
      },
      (results, status) => {
        if (status === 'OK') {
          const stores = results.map((result) => {
            return {
              photos: result.photos,
              position: result.geometry.location,
              name: result.name,
              vicinity: result.vicinity,
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
      origin: state.currentLocation.lat() + ',' + state.currentLocation.lng(),
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
        const latLng = new this.$google.maps.LatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        commit('setCurrentLocation', latLng)
      },
      () => {
        alert('現在地の取得に失敗しました。')
      }
    )
  }
}
