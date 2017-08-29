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
      
  },
  resetProjectDefault: function () {
   store.commit('CLEAR_PROJECT_DEFAULT')
  },
  isCreatePermission: function(accessValue){
    return accessValue >= 8
  },
  isReadPermission: function(accessValue){
    const readValue = [4, 5, 6, 7, 12, 13, 14, 15];
    return readValue.includes(accessValue)
  },
  isUpdatePermision: function(accessValue){
    const updatevalue = [2, 3, 6, 7, 10, 11, 14, 15]
    return updatevalue.includes(accessValue)
  },
  isDeletePermision: function(accessValue){
    const deletevalue = [1, 3, 5, 7, 9, 11, 13, 15]
    return deletevalue.includes(accessValue)
  }
}
