import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userObject: {},
    isAuthorized: false
  },
  mutations: {
    userData: state => state.userObject,
    authorize: state => state.isAuthorized
  },
  // actions: {
  //   setUsername (uname) {
  //     alert(uname) // this is always undefined
  //     store.state.uname = 'Parvezkhan'
  //     store.commit('username', store.state.uname)
  //   }
  // },
  plugins: [createPersistedState()]
})

