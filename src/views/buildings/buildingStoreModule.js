import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchBuildings(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/building/buildings', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBuilding(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/building/buildings/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addBuilding(ctx, buildingData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/building/buildings', { building: buildingData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
