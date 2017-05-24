import Vue from 'vue'
/* eslint-disable*/
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userObject: {},
    isAuthorized: false,
    todolist: [],
    // selectedTodo: {},
    parentIdArr: []
  },
  mutations: {
    userData: state => state.userObject,
    authorize: state => state.isAuthorized,
    // GET_TODO(state, todoArray){
    //   state.todoslist=todoArray;
    // }
    GET_TODO (state, data) {
      state.todolist = data
    },
    // SET_SELECTED_TODO (state, todoObject) {
    //   state.selectedTodo = todoObject
    // },
    ADD_PARENTID(state, parentIdObject){
      state.parentIdArr.push = parentIdObject
    },
    addTodo (state, { text }) {
      state.todolist.push({
        text,
        done: false
      })
    }
  },
  // actions: {
  //   getTodo({commit}, param){
  //     console.log('parentId', param.parentId)
  //     console.log('currentLevel', param.currentLevel)
  //     var todoArray = new Array();
  //     var ppid = param.parentId ? param.parentId : ''
  //     var pId = {'parentId': ppid}
  //     $.ajax({
  //         url:'/tasks_parentId',
  //         type:'post',
  //         data: pId,
  //         async: false,
  //         success:function(res){
  //             todoArray = res;
  //         },
  //         dataType: "json",
  //     }); 
  //     var tempTodo = {
  //         parentId:ppid,
  //         taskName: '',
  //         taskDesc: '',
  //         level: param.currentLevel+1,
  //         completed: false,
  //         createdAt: new Date().toJSON(),
  //         updatedAt: new Date().toJSON()
  //       }
  //         todoArray.push(tempTodo)
  //         //console.log('GET_TODO', todoArray)
  //         commit('GET_TODO', todoArray)
  //     // return todoArray
  //   }
  // },
  // getters: {
  //     todoslist: state => state.todoslist.filter((todo) => {return todo.parentId === ''})
  // },
  actions: {
    getAllTodos({commit}) {
        Vue.http.get('/tasks_parentId').then(function(response) {
            commit('GET_TODO', response.data)
        });
    },
     addParentId({commit}, parentIdObject) {
      console.log('addParentIdArr', parentIdObject)
      commit('ADD_PARENTID', parentIdObject)
    },
  },
  getters: {
    getTodoById: (state, getters) => {
      return function(id, level){
        return state.todolist.filter(todo => todo.parentId === id, todo => todo.level === level)
      }
    },
    // selectedTodo: state => state.selectedTodo
  },
  plugins: [createPersistedState()]
})

