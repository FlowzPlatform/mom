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
    selectedTodo: {},
    parentIdArr: [],
    progress_count: ''

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
    set_selected_todo (state, todoObject) {
      state.selectedTodo = todoObject
    },
    SHOW_DIV(state, payload){
      console.log('showDiv :: Mutations::', payload)
      var parentTaskId = payload.id ? payload.id : '';
      // console.log('parentTaskId===>',payload);
      if(parentTaskId)
      {
        var parentIdArrObj = payload
        var tempParentIds =_.chain([]).union(state.parentIdArr).sortBy([function(o) { return o.level; }]).value();
        if(state.parentIdArr.length > 0)
        {
          state.parentIdArr.splice(0,state.parentIdArr.length);
              
          for (var i = 0; i < tempParentIds.length; i++) {
            if(tempParentIds[i].level < parentIdArrObj.level)
              {
                state.parentIdArr.push(tempParentIds[i]);
              } 
          }
          state.parentIdArr.push(parentIdArrObj);  
        }
        else
        {
           state.parentIdArr.push(parentIdArrObj);   
        }
        console.log('parentIdArr', state.parentIdArr)
      }
    },
    REMOVE_PARENT_ID_ARRAY(state){
      state.parentIdArr.splice(0,state.parentIdArr.length)
    },
    addTodo (state, todoObject) {
      console.log('todoObject', todoObject)
      let temp_id = todoObject.data.generated_keys[0]
      let todoElement = todoObject.todo
            state.todolist.push({
              id: temp_id,
              parentId: todoElement.parentId,
              taskName: todoElement.taskName,
              taskDesc: '',
              level: todoElement.level,
              completed: false, 
              index: todoElement.index,
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
          })
          console.log(state.todolist)
    },
    deleteTodo(state, todoObject){
        state.todolist.splice(state.todolist.indexOf(todoObject.todo), 1)
    },
    toggleTodo(state, todoObject){
        todoObject.todo.completed = !todoObject.todo.completed
    },
    load_prgress_bar(state, todoObject){
      var totalSubtask= todoObject.subtask_count ? todoObject.subtask_count : 0
      var completedSubtask = todoObject.completed_subtask_count ? todoObject.completed_subtask_count : 0
      state.progress_count = completedSubtask + " / " + totalSubtask;
      if (totalSubtask > 0) {
          var percentage = (completedSubtask / totalSubtask) * 100
          // this.progress = percentage
      }
    }
  },
  actions: {
    getAllTodos({commit}) {
        Vue.http.get('/tasks_parentId').then(function(response) {
            commit('GET_TODO', response.data)
        });
    },
    removeParentIdArray({commit}) {
      commit('REMOVE_PARENT_ID_ARRAY')
    },
    insertTodo({ commit }, insertElement) {
      let dbId = insertElement.todo.id
      let todo = insertElement.todo
      let eventIndex = insertElement.eventIndexR
      if(!(todo.taskName && todo.taskName.trim()))
        return
      if(dbId){
        Vue.http.post('/updatetasks', {
                id: dbId,
                taskName: todo.taskName,
                taskDesc: '',
            }).then(response => {
              // console.log('task update', response.data)
          })
      }else{
        Vue.http.post('/tasks', {
                parentId: todo.parentId,
                taskName: todo.taskName,
                taskDesc: '',
                level: todo.level,
                completed: false, 
                index: eventIndex,
                createdAt: new Date().toJSON(),
                updatedAt: new Date().toJSON()
            })
            .then(function(response) {
              commit('addTodo', {"data":response.data, "todo": todo})
              // console.log("Response:", response)
        })
      }
    },
    deleteTodo({ commit }, deleteElement){
      console.log(deleteElement)
      let dbId = deleteElement.id
      if(dbId){
        Vue.http.delete('/deteletask/'+ dbId, {
        }).then(response => {
              commit('deleteTodo', {"data":response.data, "todo": deleteElement})
              console.log('task deleted', response.data)
              // if(this.filteredTodos.length-1 > 0)
              // {
              //   console.log('ID-Level:', this.filteredTodos[0].parentId, "===", this.filteredTodos[0].level);
              //   var todoList = store.state.todo1(this.filteredTodos[0].parentId, (this.filteredTodos[0].level-1)); 
              //   console.log('todoList:', todoList);
              //   for(var i=0; i < todoList.length-1 ; i++)
              //   {
              //     if(todoList[i].id)
              //       {
              //         this.$http.post('/updatetasks', {
              //         id: todoList[i].id,
              //         index: i
              //         }).then(response => {
              //           console.log('index updated after remove task', response.data)
              //       })
              //       }
              //   }
              // }
          })
        }
    },
    toggleTodo({ commit }, changeTodo) {
      console.log(changeTodo)
      let dbId = changeTodo.todo.id
      if(dbId){
      Vue.http.post('/updatetasks', {
                  id: dbId,
                  completed: changeTodo.todo.completed
              }).then(response => {
                commit('toggleTodo', {"todo": changeTodo})
                console.log('task updated', response.data)
            })
      }
    },
    // load_prgress_bar({ commit }, todo_progressBar){
    //     console.log("todo_progressBar",todo_progressBar)
    //     commit('load_prgress_bar', todo_progressBar)
    // }
  },
  getters: {
    getTodoById: (state, getters) => {
      return function(id, level){
        return state.todolist.filter(todo => todo.parentId === id, todo => todo.level === level)
      }
    },
    selectedTodo: state => state.selectedTodo,
    parentIdArr: state => state.parentIdArr
  },
  plugins: [createPersistedState()]
})

