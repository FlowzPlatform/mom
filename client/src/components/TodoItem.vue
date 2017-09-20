<template id="items">
  <li v-bind:key="todo.id" class="todo">
    <!-- {{todo.completed}} -->
    <div :id="getLevelClass(todo.level,todo.id)" style="padding-bottom: 5px;">
      <div class="view" style="margin-left: 10px;">
        <span class="dreg-move"></span>
        <span class="dropdown">
        <input v-if="!$store.state.deleteItemsSelected && id !== 'taskTypes' && id !== 'taskState' && id !== 'roleTypes'" :id="todo.id" type="checkbox" checked="" v-model="todo.completed" class="toggle"
          @change="toggleTodo(todo)">
        <input v-else="!$store.state.deleteItemsSelected && id === 'RolesTypes'" :id="todo.id" type="checkbox" checked="" v-model="todo.is_checked" class="toggle" :disabled="!todo.is_editable" @change="roleCheckChange(todo)">
        <label for="checkbox8"></label>
        </span>
        <div v-if="$store.state.deleteItemsSelected" class="trash" :id="todo.id">
          <span class="trashcan">
            <span class="hover-glyph ">
              <span class="fa fa-trash-o svgIcon hover-glyph-default"/>
              <span class="fa fa-undo svgIcon hover-glyph-hover" @click="undelete(todo)"/>
            </span>
          </span>
        </div>
        <input v-if="id !== 'taskTypes' && id !== 'taskState' && id !== 'roleTypes'" 
          class="new-todo"
          autofocus autocomplete="off" 
          :placeholder="pholder"
          v-bind:class="getLevelClass(todo.level,todo.id)"
          v-model="todo.taskName" 
          @click="SHOW_DIV(todo)"
          @keyup.enter="addTodo(nextIndex)"
          @focus="onFocusClick(todo.id, todo.level,todo.created_by,todo.type_id)"
          @blur=onBlurCall(todo.id,todo.level)
          @keyup="performAction"
          @change="changeValue(nextIndex)">
        <input  v-if="id === 'taskTypes'" class="new-todo" autofocus autocomplete="off" :placeholder="pholder" v-bind:class="getLevelClass(todo.level,todo.id)"
            v-model="todo.type" @keyup.enter="addTodo(nextIndex)" @click="SHOW_DIV(todo)">
        <input v-if="id === 'taskState'" class="new-todo" autofocus autocomplete="off" :placeholder="pholder" v-bind:class="getLevelClass(todo.level,todo.id)"
            v-model="todo.taskState" @keyup.enter="addTodo(nextIndex)" @click="SHOW_DIV(todo)">
            <input v-if="id === 'roleTypes'" class="new-todo" autofocus autocomplete="off" :placeholder="pholder" v-bind:class="getLevelClass(todo.level,todo.id)"
            v-model="todo.name" @keyup.enter="addRole(nextIndex)" :readonly="!todo.is_editable">
        <span class=""><i>
          <b class="glyphicon glyphicon-option-vertical"></b>
          <b class="glyphicon glyphicon-option-vertical"></b>
          </i>
        </span>
        <div class="task-row-overlay grid-tags-and-date">
          <a class="taskRow">
            <span v-if="todo.isTaskUpdate" style="color: red">&#x25cf;</span><span v-else></span>
            <span class="grid_due_date">{{todo.dueDate | formatDate_todo}}</span>
          </a>
          <div v-if="todo.type_id" class="stateCircle Avatar--small"  @click="showStatusList" data-toggle="dropdown" :style="{'box-shadow' : 'inset 0 0 0 3px'+ selectedObject.color }">
            <span>{{selectedObject.taskState | fistLatter}}</span></div>
            <ul class='dropdown-menu statusList' style="right: 0; left:-20px;">
                <li v-for="state in taskState"><a @click="selectStatus(state)">{{state.taskState}}</a>
                  <hr>
                </li>
              </ul>
          </div>
        <div v-if="$store.state.deleteItemsSelected" class="delete-view">
          <div class="react-mount-node photoView-reactMount">
            <div data-reactroot="" class="Avatar Avatar--small Avatar--color4">
              <span v-if="todo.image_url"><img v-bind:src="todo.image_url" /></span>
              <span v-else>{{ todo.email | capitalizeLetters }}</span>
            </div>
          </div>
        </div>
        <!--<button class="destroy" @click="deleteTodo({todo : todo})">
            <a class="fa fa-close"/>
            <i class="fa fa-trash-o"></i>
        </button>-->
        <button class="destroy" v-if="id === 'taskTypes' || id === 'taskState'" @click="deleteTaskType(todo)">
            <a class="fa fa-close"/>
        </button>
      </div>
      <!--{{todo.progress > 50 ? Math.round(255 * (100 - todo.progress) / 100) : 255}} {{ todo.progress > 50 ? 255 : Math.round(todo.progress / 100 * 255)}}{{ 0}}-->
      <!--backgroundColor: 'rgb('+Math.round(255*(100-todo.progress)/100)+', '+Math.round(todo.progress / 100 * 255)+', 0)'-->
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="todo.progress" aria-valuemin="0" aria-valuemax="100" :style="{ 'width': todo.progress + '%', backgroundColor: 'rgb('+(todo.progress > 70 ? Math.round(255 * (todo.progress-50) / 100) : 255)+', '+(todo.progress > 30 ? 255 : Math.round(todo.progress*2 / 100 * 255))+', 0)' }"
          v-if="this.$store.state.isProgress">
        </div>
      </div>
      <div class="task-text">{{todo.progress_count}}</div>
    </div>
  </li>
</template>
<style>
col-md-2.border-right:after {
content: "";
border-right: solid 1px #ccc;
top: 0;
left: 16.55%;
height: 100%;
bottom: 0;
position: fixed;
}
.ui.vertical.segment {
  border-bottom: 0px;
}
.taskRow {
  margin-right: 10px;
}
.stateCircle {
  -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    /* background: center/cover #cdcfd2; */
    border-radius: 50%;
    box-shadow: inset 0 0 0 3px rgba(10,10,10,1.2);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    vertical-align: top;
    overflow: hidden;
}
</style>
<script>
  /* eslint-disable*/
  import txtDesc from './TextDescription.vue'
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import KeenUI from 'keen-ui';
  import Resource from 'vue-resource'
  import lodash from 'lodash'
  import * as services from '../services'
  import VueLodash from 'vue-lodash/dist/vue-lodash.min'
  import CmnFunc from './CommonFunc.js'
  import * as Constant from './Constants.js'
  import moment from 'moment'
  Vue.use(VueLodash, lodash)
  Vue.use(BootstrapVue)
  Vue.use(KeenUI);
  Vue.use(Resource)
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  Vue.filter('formatDate_todo', function (value) {
    if (value) {
      return moment(String(value)).format('MMM DD')
    }
  })
  Vue.filter('fistLatter', function(str){
    if (str) {
      var firstLetters = str.substr(0, 1)
      return firstLetters.toUpperCase()
    }
  })
  export default {
    props: ['todo', 'pholder', 'nextIndex', 'prevIndex', 'id'],
    data: function () {
      return {
        isDate: this.todo.dueDate,
        prgress_count: '',
        prevSelectedItem:'',
        curSelectedItem: '',
        selectedObject: {}
      }
    },
    created(){    
    },
    computed: {
       ...mapGetters({
            statusList: 'getTask_types_state',
            allState :'getTaskStausList'
        }),
        taskState() {
          let stateList = this.statusList
          this.taskStateList(stateList)
          return stateList
        }
    },
    methods: {
      ...mapMutations([
        'SHOW_DIV'
      ]),
      ...mapActions([
        'toggleTodo',
        'roleCheckChange'
      ]),
      getLevelClass(level, id) {
        return id + "_" + String(level)
      },
      undelete: function () {
        this.$store.dispatch('undelete', this.todo)
      },
      showStatusList() {
        this.$store.dispatch('getTypeState', this.todo.type_id)
      },
      selectStatus: function(objStatus) {  
        console.log('State changed', objStatus) 
        this.$store.dispatch('editTaskName', { "todo": this.todo, "selectedState": objStatus.state_id })
        this.selectedObject = this.taskState.find(state => state.state_id === objStatus.state_id)
      },
      // deleteTodo: function () {
      //   this.$store.dispatch('deleteTodo', this.todo)
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
      // },
      addTodo: function (todoId) {
        if (this.id !== 'taskTypes' && this.id !== 'taskState') {
          this.$store.dispatch('insertTodo', this.todo)
          
        } else if (this.id === "taskTypes") {
          this.$store.dispatch('addTask_Type', this.todo)
        } else if(this.id === "taskState"){
          this.$store.dispatch('addTask_State', {"state":this.todo})
        }
      },
      addRole:function(){
        console.log("this.todo-->",this.todo)
        if(this.todo && this.todo.name.length>0)
          this.$store.dispatch('insertRole', this.todo)
      },
      deleteTaskType: function (todo) {
        if (this.id === 'taskTypes') {
          this.$store.dispatch('getCountofTaskType', this.todo)
        } else if (this.id === 'taskState') {
          this.$store.dispatch('getCountofTypeState', this.todo)
        }
      },
      async onFocusClick(id,level,created_by,typeId){
        console.log('onFoucusclick',typeId)
     
        $("#" + id + "_" + level).addClass("lifocus")
        if (this.todo.isTaskUpdate) {
          this.todo.isTaskUpdate = false
        }
       
        let inutTodo = $("#" + id + "_" + level + " .view .new-todo." + id + "_" + level);   // Get the first <inutTodo> element in the document        
        let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.TASK,Constant.PERMISSION_ACTION.UPDATE)
        console.log("permisionResult-->",permisionResult)
        // if (!updatePermssion && id != -1 && this.$store.state.userObject._id != created_by) {
        if (!permisionResult && id != -1) {
          inutTodo.prop("readonly", true);
        } else {
          inutTodo.prop("readonly", false);
        }  
      },
      onBlurCall(id, level) {
        $("#" + id + "_" + level).removeClass("lifocus")
      },
      performAction(e) {
        if (e.keyCode == 40) {
          $('.' + this.nextIndex).focus();
          this.changeFocus(this.nextIndex)
        } else if (e.keyCode == 38) {
          $('.' + this.prevIndex).focus();
          this.changeFocus(this.prevIndex)
        } else if (e.keyCode == 13) {
          this.$store.state.currentModified = false
          return
        }
        this.$store.state.currentTodoObj = this.todo
        this.$store.state.currentModified = (this.todo.id == -1) ? true : false
      },
      changeValue: function(todoId){
        this.$store.dispatch('insertTodo', this.todo)
        var nextTaskIndex = todoId.split('_')[0];
        if(nextTaskIndex == -1)
        {
          this.changeFocus(todoId)
        }
      },
      changeFocus(indexId) {
        var self = this;
        setTimeout(function () {
          var el = $('.' + indexId);
          if (el) {
            el.focus();
          }
          var todoid = indexId.split("_")
          let showTodoIndex = _.findIndex(self.$store.state.todolist, function (d) { return d.id == todoid[0] })
          if (showTodoIndex != -1)
            self.$store.commit('SHOW_DIV', self.$store.state.todolist[showTodoIndex])
        }, 100);
      },
      taskStateList: function (state) {
        state.forEach(function (c) {
          let stateId = c.state_id
          let stateIndex = _.findIndex(this.$store.state.task_state_list, function (m) {
            return m.id === stateId
          })
          if (stateIndex < 0) {
          } else {
            c.color = this.$store.state.task_state_list[stateIndex].color
            c.taskState = this.$store.state.task_state_list[stateIndex].taskState
          }
        }, this)
      }
    },
    component: {
      txtDesc
    },
    mounted() {
      if (this.id !== 'taskTypes' && this.id !== 'taskState') {
        if (this.todo.state_id) {
          this.selectedObject = this.allState.find(state => state.id === this.todo.state_id)
        }
        var totalSubtask = this.todo.subtask_count ? this.todo.subtask_count : 0
        var completedSubtask = this.todo.completed_subtask_count ? this.todo.completed_subtask_count : 0
        this.todo.progress_count = completedSubtask + " / " + totalSubtask;
        if (totalSubtask > 0) {
          var percentage = (completedSubtask / totalSubtask) * 100
          this.todo.progress = percentage
        }
        if (this.$store.state.isDueDate) {
          var d = new Date()
          d.setDate(d.getDate() + 2)
          if (this.todo.dueDate) {
            if (moment(this.todo.dueDate).isBetween(new Date(), d)) {
              $('#' + this.todo.id).addClass('DueDate--soon')
            } else if (moment(this.todo.dueDate).isBefore(new Date())) {
              $('#' + this.todo.id).addClass('DueDate--overdue')
            } else if (moment(this.todo.dueDate).isAfter(new Date())) {
              $('#' + this.todo.id).addClass('DueDate--future')
            }
          }
        }
      }
    }
  }

</script>