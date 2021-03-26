import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUnits(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/unit/units', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUnit(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/unit/units/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUnit(ctx, unitData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/unit/units', { unit: unitData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
