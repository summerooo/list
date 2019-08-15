import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: null
  },
  mutations: {
    setInfo (state, data) {
      sessionStorage.setItem('info', JSON.stringify(data))
      state.info = data
    },
    getInfo (state) {
      let info = sessionStorage.getItem('info')
      if (info) state.info = JSON.parse(info)
    }
  },
  actions: {

  }
})
