<template id="items">
			<li v-bind:key="todo" class="todo list-complete-item">
				<div class="view" style="margin-left: 10px;">
          <span class="dreg-move"></span>
                <!--<input id="checkbox8" type="checkbox" checked="" v-model="todo.completed" class="toggle" @change="checkboxToggle">-->
              <input id="checkbox8" type="checkbox" checked="" v-model="todo.completed" class="toggle" @change="toggleTodo({ todo : todo})">
<label for="checkbox8"></label>
               <!--{{todo}}-->
						    <input  class="new-todo" autofocus autocomplete="off" 
                 :placeholder="pholder" 
                  v-model="todo.taskName"
                  @click="SHOW_DIV(todo)"
                  @focus="getIndex(eventIndexR)"
                  @keyup.enter="addTodo">
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
                    <span class="grid_due_date " v-if="isDate">{{todo.dueDate | formatDate}}</span>
                  </a>
                </div>
					      <button class="destroy" @click="deleteTodo({todo : todo})">
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
import { mapMutations, mapGetters, mapActions } from 'vuex'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM DD')
  }
})

export default {
  props: ['todo', 'eventIndexR', 'index', 'filteredTodos','pholder'],
  data: function () {
    return {
      progress: 0,
      progressInterval: null,
      newTodo: '',
      tasks : [],
      dbId: this.filteredTodos[this.eventIndexR].id,
      progress_count:'',
      isDate: this.filteredTodos[this.eventIndexR].DueDate,
    }
  },
  computed: {
    // ...mapGetters([
    //     'selectedTodo'
    //   ])
  },
  methods: {
    ...mapMutations([
      // 'set_selected_todo',
      'addTodo',
      'deleteTodo',
      'load_prgress_bar',
      'SHOW_DIV'
    ]),
    ...mapActions([
      'insertTodo',
      'deleteTodo',
      'toggleTodo',
      'load_prgress_bar'
    ]),
    deleteTodo: function () {
      this.$store.dispatch('deleteTodo', this.todo)
      // console.log('Remove TODO:', this.filteredTodos);
      // if(this.dbId)
      // {
      // this.$http.delete('/deteletask/'+ this.dbId, {
      //   }).then(response => {
      //       console.log('task deleted', response.data)
      //       if(this.filteredTodos.length-1 > 0)
      //       {
      //         console.log('ID-Level:', this.filteredTodos[0].parentId, "===", this.filteredTodos[0].level);
      //         var todoList = store.state.todo1(this.filteredTodos[0].parentId, (this.filteredTodos[0].level-1)); 
      //         console.log('todoList:', todoList);
      //         for(var i=0; i < todoList.length-1 ; i++)
      //         {
      //           if(todoList[i].id)
      //             {
      //               this.$http.post('/updatetasks', {
      //               id: todoList[i].id,
      //               index: i
      //               }).then(response => {
      //                 console.log('index updated after remove task', response.data)
      //             })
      //             }
      //         }
      //       }
      //   })
      //   }
    },
    addTodo: function () {
      this.$store.dispatch('insertTodo', {"todo":this.todo, "eventIndexR":this.eventIndexR})
      //   let self = this
      //   var value = this.filteredTodos[this.eventIndexR].taskName && this.filteredTodos[this.eventIndexR].taskName.trim()
      //   if (!value) {
      //     return
      //   }
       
      //   if (this.dbId){
      //       this.$http.post('/updatetasks', {
      //           id: this.dbId,
      //           taskName: value,
      //           taskDesc: '',
      //       }).then(response => {
      //         console.log('task update', response.data)
      //     })
      //   } else {
      //     var parent_id = this.filteredTodos[this.eventIndexR].parentId ? this.filteredTodos[this.eventIndexR].parentId : '';
      //     var currentLevel = this.todo.level
          
      //     // console.log('current todo level==>', this.filteredTodos[this.eventIndexR].level)
      //     console.log('current index==>', this.eventIndexR)
      //     // insert task into rethink db
      //      this.$http.post('/tasks', {
      //         parentId: parent_id,
      //         taskName: value,
      //         taskDesc: '',
      //         level: currentLevel,
      //         completed: false, 
      //         index: this.eventIndexR,
      //         createdAt: new Date().toJSON(),
      //         updatedAt: new Date().toJSON()
      //     })
      //     .then(response => {
      //       console.log('Inserted', response)
      //       let temp_id = JSON.parse(response.bodyText).generated_keys[0]
      //       self.$store.state.todolist.push({
      //         id: temp_id,
      //         parentId: parent_id,
      //         taskName: value,
      //         taskDesc: '',
      //         level: currentLevel,
      //         completed: false, 
      //         index: this.eventIndexR,
      //         createdAt: new Date().toJSON(),
      //         updatedAt: new Date().toJSON()
      //       })
      //   })
      // }
    },
    getIndex (ind) {
        this.$emit('eventUpdatedIndex', ind)
    },
    showDiv: function(level, parentIdArr){

        //this.$store.dispatch('showDiv', this.todo);
        // console.log('filteredTodos=====>', this.filteredTodos[this.eventIndexR]);
        // var parentTaskId = this.filteredTodos[this.eventIndexR].id ? this.filteredTodos[this.eventIndexR].id : '';
        // var parentTaskName = this.filteredTodos[this.eventIndexR].taskName
        // var parentTaskDesc = this.filteredTodos[this.eventIndexR].taskDesc
        // var parentTaskComment = this.filteredTodos[this.eventIndexR].taskComment
        // var parentDueDate = this.filteredTodos[this.eventIndexR].dueDate
        // var parentTaskId = this.todo.id ? this.todo.id : '';
        // var parentTaskName = this.todo.taskName
        // var parentTaskDesc = this.todo.taskDesc
        // var parentTaskComment = this.todo.taskComment
        // var parentDueDate = this.todo.dueDate
    
        // console.log('parentTaskId===>',this.todo);
        // if(parentTaskId)
        // {
        //     var parentIdArrObj = {"id": parentTaskId, "level":level, "parentTaskName": parentTaskName, "parentTaskDesc" : parentTaskDesc, "parentTaskComment" : parentTaskComment, "parentDueDate" : parentDueDate, "todoArr": this.todo}
        //     var tempParentIds =_.chain([]).union(this.parentIdArr).sortBy([function(o) { return o.level; }]).value();
        //     // console.log('parentIdArrObj::', parentIdArrObj);
        //     if(this.parentIdArr.length > 0)
        //     {
        //       this.parentIdArr.splice(0,this.parentIdArr.length);
              
        //       for (var i = 0; i < tempParentIds.length; i++) {
        //         if(tempParentIds[i].level < parentIdArrObj.level)
        //           {
        //             this.parentIdArr.push(tempParentIds[i]);
        //           } 
        //       }
        //       this.parentIdArr.push(parentIdArrObj);  
        //     }
        //     else
        //     {
        //       this.parentIdArr.push(parentIdArrObj);   
        //     }
        //  }  
        // this.$emit('eventUpdateRange', this.parentIdArr)
    }
    // checkboxToggle: function() {
    //     this.$http.post('/updatetasks', {
    //               id: this.dbId,
    //               completed: this.filteredTodos[this.eventIndexR].completed
    //           }).then(response => {
    //             console.log('task updated', response.data)
    //         })
    // }
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
      // this.$store.dispatch('load_prgress_bar', this.todo)
    },
    beforeDestroy() {
        clearInterval(this.progressInterval);
    }
}
</script>
