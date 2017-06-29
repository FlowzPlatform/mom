/* eslint-disable*/
import { store } from '../VuexSession'
export default {
    // Check validations
  checkBlankField: function (text) {
    if (text.length === 0) {
      return false
    } else {
      return true
    }
  },
  checkValidEmail: function (emailId) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (filter.test(emailId)) {
        return true
    } else {
        return false
    }
  },
  matchPassword: function (pwd, confPwd) {
      if (pwd == confPwd) {
          return true
      }
      return false
  },
    deleteAutheticationDetail: function () {
      store.commit('DELETE_USERTOKEN')
      store.commit('DELETE_ATTACHMENTS')
      store.commit('DELETE_ALLUSERSLIST')
      store.state.userObject = {}
      store.state.isAuthorized = false
      store.commit('userData')
      store.commit('authorize')
  }
}
