<template id="items">
			<li :class="{completed: todo.completed }" v-bind:key="todo" class="todo list-complete-item">
				<div class="view" style="margin-left: 10px;">
          <span class="dreg-move"></span>
                <input id="checkbox8" type="checkbox" checked="" v-model="todo.completed" class="toggle" @change="checkboxToggle">
<label for="checkbox8"></label>
                {{todo.taskName}}
						    <input  class="new-todo" autofocus autocomplete="off" :placeholder="pholder" v-model="todo.taskName"
                  @click="showDiv(todo.level, parentIdArr)"
                  @focus="getIndex(eventIndexR)"
                  @keyup.enter="handleAddTodo">
                <span class=""><i>
                  <b class="glyphicon glyphicon-option-vertical"></b>
                  <b class="glyphicon glyphicon-option-vertical"></b>
                </i></span>
                <div class="task-row-overlay grid-tags-and-date">
                  <!--<div class="itemRowView-heartsView">
                    <div class="loading-boundary hidden miniHeartButtonView-loadingBoundary">
                      <a class="miniHeartButtonView is-hearted has-hearts miniHeartButtonView--withHearts ">
                        <span class="miniHeartButtonView-heartNumber">1</span>  
                        </a>
                    </div>
                  </div>-->
                  <a class="taskRow">
                    <span class="grid_due_date " v-if="isDate">{{duedate_display}}</span>
                  </a>
                </div>
					      <button class="destroy" @click="removeTodo()">
						      <a class="fa fa-close"/>
					    </button>
				  </div>				
          </div>

        <ui-progress-linear
                    color="primary"
                    type="determinate"
                    :progress="progress">
            </ui-progress-linear>
            <div class="task-text">{{progress_count}}</div>
			</li>
</template>
<script>
/* eslint-disable*/
import txtDesc from './TextDescription.vue'
import store from './store.js'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import KeenUI from 'keen-ui';
import Resource from 'vue-resource'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import moment from 'moment'
Vue.use(VueLodash, lodash)
Vue.use(BootstrapVue)
Vue.use(KeenUI);
Vue.use(Resource)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { getMessages } from '../vuex/getters'
// import { fetchMessages, addMessage } from '../vuex/actions'

export default {
  props: ['todo', 'eventIndexR', 'index', 'filteredTodos','pholder','parentIdArr'],
  data: function () {
    return {
      progress: 0,
      progressInterval: null,
      newTodo: '',
      tasks : [],
      dbId: this.filteredTodos[this.eventIndexR].id,
      progress_count:'',
      isDate: this.filteredTodos[this.eventIndexR].DueDate,
      duedate_display: moment(this.filteredTodos[this.eventIndexR].DueDate, 'YYYY-MM-DD').format('MMM DD')
      // newMessage: this.todo.taskName
    }
  },
  // ready () {
  //     this.fetchMessages()
  // },
  // vuex: {
  //     getters: {
  //       messages: getMessages
  //     },
  //     actions: {
  //       fetchMessages,
  //       addMessage
  //     }
  // },
  methods: {
    // tryAddMessage () {
    //     var text = this.newMessage
    //     console.log('message', text)
    //     if (text.trim()) {
    //       this.addMessage(text)
    //     }
    // },
    removeTodo: function () {
      console.log('Remove TODO:', this.filteredTodos);
      if(this.dbId)
      {
      this.$http.delete('/deteletask/'+ this.dbId, {
        }).then(response => {
            console.log('task deleted', response.data)
            if(this.filteredTodos.length-1 > 0)
            {
              console.log('ID-Level:', this.filteredTodos[0].parentId, "===", this.filteredTodos[0].level);
              var todoList = store.state.todo1(this.filteredTodos[0].parentId, (this.filteredTodos[0].level-1)); 
              console.log('todoList:', todoList);
              for(var i=0; i < todoList.length-1 ; i++)
              {
                if(todoList[i].id)
                  {
                    this.$http.post('/updatetasks', {
                    id: todoList[i].id,
                    index: i
                    }).then(response => {
                      console.log('index updated after remove task', response.data)
                  })
                  }
              }
            }
        })
        }
    },
    handleAddTodo: function () {
        var value = this.filteredTodos[this.eventIndexR].taskName && this.filteredTodos[this.eventIndexR].taskName.trim()
        if (!value) {
          return
        }
        // if (this.eventIndexR < this.filteredTodos.length - 1) {
        //     return
        // }
        if (this.dbId){
            this.$http.post('/updatetasks', {
                id: this.dbId,
                taskName: value,
                taskDesc: '',
            }).then(response => {
              console.log('task update', response.data)
          })
        } else {
          var parent_id = this.filteredTodos[this.eventIndexR].parentId ? this.filteredTodos[this.eventIndexR].parentId : '';
          //store.addTodo(this.filteredTodos[this.eventIndexR].level, parent_id)
          
          // console.log('current todo level==>', this.filteredTodos[this.eventIndexR].level)
          console.log('current index==>', this.eventIndexR)
          // insert task into rethink db
           this.$http.post('/tasks', {
              parentId: parent_id,
              taskName: value,
              taskDesc: '',
              level: this.filteredTodos[this.eventIndexR].level,
              completed: false, 
              index: this.eventIndexR,
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON()
          })
          .then(response => {
            // var todoObj = {
            //   parentId: parent_id,
            //   taskName: '',
            //   taskDesc: '',
            //   level: this.filteredTodos[this.eventIndexR].level,
            //   completed: false, 
            //   createdAt: new Date().toJSON(),
            //   updatedAt: new Date().toJSON()
            // }
            // this.filteredTodos.push(todoObj)
            console.log('Inserted', response)
        })
      }
    },
    getIndex (ind) {
        this.$emit('eventUpdatedIndex', ind)
    },
    showDiv: function(level, parentIdArr){
        // console.log('filteredTodos=====>', this.filteredTodos[this.eventIndexR]);
        var parentTaskId = this.filteredTodos[this.eventIndexR].id ? this.filteredTodos[this.eventIndexR].id : '';
        var parentTaskName = this.filteredTodos[this.eventIndexR].taskName
        var parentTaskDesc = this.filteredTodos[this.eventIndexR].taskDesc
        var parentTaskComment = this.filteredTodos[this.eventIndexR].taskComment
        var parentDueDate = this.filteredTodos[this.eventIndexR].dueDate
    
        // console.log('parentTaskId===>', parentTaskId);
        if(parentTaskId)
        {
            var parentIdArrObj = {"id": parentTaskId, "level":level, "parentTaskName": parentTaskName, "parentTaskDesc" : parentTaskDesc, "parentTaskComment" : parentTaskComment, "parentDueDate" : parentDueDate, "todoArr": this.filteredTodos[this.eventIndexR]}
            var tempParentIds =_.chain([]).union(this.parentIdArr).sortBy([function(o) { return o.level; }]).value();
            // console.log('parentIdArrObj::', parentIdArrObj);
            if(this.parentIdArr.length > 0)
            {
              this.parentIdArr.splice(0,this.parentIdArr.length);
              
              for (var i = 0; i < tempParentIds.length; i++) {
                if(tempParentIds[i].level < parentIdArrObj.level)
                  {
                    this.parentIdArr.push(tempParentIds[i]);
                  } 
              }
              this.parentIdArr.push(parentIdArrObj);  
            }
            else
            {
              this.parentIdArr.push(parentIdArrObj);   
            }
         }  
        this.$emit('eventUpdateRange', this.parentIdArr)

    },
    checkboxToggle: function() {
        this.$http.post('/updatetasks', {
                  id: this.dbId,
                  completed: this.filteredTodos[this.eventIndexR].completed
              }).then(response => {
                console.log('task updated', response.data)
            })
    }
  },
  computed: {
    totalLength: function(){
    }
  },
  component: {
    txtDesc
  },
  mounted() {
      // console.log('Filter Todo', this.filteredTodos[this.eventIndexR])
      var totalSubtask= this.filteredTodos[this.eventIndexR].subtask_count ? this.filteredTodos[this.eventIndexR].subtask_count : 0
      var completedSubtask = this.filteredTodos[this.eventIndexR].completed_subtask_count ? this.filteredTodos[this.eventIndexR].completed_subtask_count : 0
      //this.progressInterval = setInterval(() => {
        this.progress_count = completedSubtask + " / " + totalSubtask;
        if (totalSubtask > 0) {
          var percentage = (completedSubtask / totalSubtask) * 100
          this.progress = percentage
        }
      // }, 400);
    },
    beforeDestroy() {
        clearInterval(this.progressInterval);
    }
}
</script>
