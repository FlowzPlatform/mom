/* eslint-disable*/
import { store } from '../VuexSession'
import * as services from '../services'
import * as Constant from './Constants.js'
import axios from 'axios'


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
  },
  checkActionPermision:async function(context,taskTypeId,userAction,permisisonAction)
  {
      var self = context;
<<<<<<< HEAD
      let selfRoleId = this.getSelfRoleId(context);

=======
      let selfRoleId = await this.getSelfRoleId(context);
>>>>>>> draggable menu
      if(selfRoleId)
        {
          let permisisonId = this.getPermissionId(context,userAction)
          console.log("permisisonId--->", permisisonId)

          //  await services.roleAccessService.find({ query: { task_type: taskTypeId, rId: selfRoleId } }).then(response => {
          //   console.log("Res--->", response)
            let accessRight =await this.callRoleAccessService(taskTypeId,selfRoleId);
            // let accessRight =response;
            console.log("accessRight--->", accessRight)
            let accessValue = this.getAccessValue(context,accessRight,permisisonId,taskTypeId)
            console.log("accessValue--->", accessValue)
            
            if(permisisonAction===Constant.PERMISSION_ACTION.CREATE)
                return this.isCreatePermission(accessValue);
            else if(permisisonAction===Constant.PERMISSION_ACTION.READ)
                return this.isReadPermission(accessValue);
            else if(permisisonAction===Constant.PERMISSION_ACTION.UPDATE)
                return this.isUpdatePermision(accessValue);
            else
                return this.isDeletePermision(accessValue);
          // });
        }
        else{
          return true;
        }


  },
  callRoleAccessService:function(taskTypeId,selfRoleId)
  {
    return services.roleAccessService.find({ query: { task_type: taskTypeId, rId: selfRoleId } }).then(response => {
      console.log("Res--->", response)
      return response;
      
    });
  },
  getSelfRoleId:function(context)
  {
<<<<<<< HEAD
=======
    // console.log("context.$store.state.currentProjectMember",context.$store.state.currentProjectMember)
    // console.log("context.$store.state.userObject._id",context.$store.state.userObject._id)
    
>>>>>>> draggable menu
    return _.result(_.find(context.$store.state.currentProjectMember, function (obj) {
      return obj.user_id === context.$store.state.userObject._id;
    }), 'user_role_id');
  },
  getPermissionId:function(context,user_action)
  {
    return _.result(_.find(context.$store.state.permissions, function (obj) {
      return obj.index === user_action;
    }), 'id');
  },
  getAccessValue:function(context,accessRight,permissionId,taskTypeId){
    return _.result(_.find(accessRight, function (obj) {
      return obj.pId === permissionId && obj.task_type === taskTypeId;
    }), 'access_value');
  }
}
