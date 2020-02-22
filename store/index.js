export const state = () => ({
  currentCenterLatLng: null,
  stores: [],
  selectedStore: null,
  storeDirection: null,
  modalHeight: '40%'
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
              placeId: result.place_id,
              formattedAddress: result.formatted_address
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
    dispatch('changeModalHeightPercentage', 10)
    // 現在地取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const request = {
          origin: position.coords.latitude + ',' + position.coords.longitude,
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
      () => {
        alert('失敗')
      }
    )
  }
}
