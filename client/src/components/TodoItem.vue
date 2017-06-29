<template id="items">
  <li v-bind:key="todo" class="todo">
    <div :id="getLevelClass(todo.level,todo.id)" style="padding-bottom: 5px;"> 
      <div class="view" style="margin-left: 10px;">
        <span class="dreg-move"></span>
        <input :id="todo.id" type="checkbox" checked="" v-model="todo.completed" class="toggle" @change="toggleTodo(todo)">
        <label for="checkbox8"></label>
        <!--v-bind:class= "[ ''+todo.level, todo.id ]"-->
        <input class="new-todo" autofocus autocomplete="off" :placeholder="pholder" v-bind:class="getLevelClass(todo.level,todo.id)"
          v-model="todo.taskName" 
          @click="SHOW_DIV(todo)"
          @keyup.enter="addTodo(nextIndex)" 
          @focus="onFocusClick(todo.id, todo.level)"
          @blur=onBlurCall(todo.id,todo.level)
          @keyup="performAction">
        <span class=""><i>
          <b class="glyphicon glyphicon-option-vertical"></b>
          <b class="glyphicon glyphicon-option-vertical"></b>
          </i>
        </span>
        <div class="task-row-overlay grid-tags-and-date">
          <a class="taskRow">
            <span class="grid_due_date ">{{todo.dueDate | formatDate}}</span>
          </a>
        </div>
        <!--<button class="destroy" @click="deleteTodo({todo : todo})">
            <a class="fa fa-close"/>
            <i class="fa fa-trash-o"></i>
        </button>-->
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
<script>
  /* eslint-disable*/
  import txtDesc from './TextDescription.vue'
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
  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(String(value)).format('MMM DD')
    }
  })

  export default {
    props: ['todo', 'pholder', 'nextIndex', 'prevIndex'],
    data: function () {
      return {
        progress: 0,
        progress_count: '',
        isDate: this.todo.dueDate,
        prgress_count: '',
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
        // 'addTodo',
        // 'deleteTodo',
        'SHOW_DIV'
      ]),
      ...mapActions([
        'toggleTodo',
      ]),
      getLevelClass(level, id) {
        return id + "_" + String(level)
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
        this.changeFocus(todoId)
        this.$store.dispatch('insertTodo', this.todo)
      },
       setFocus: function(todoId)
       {
        //  setTimeout(function () {
        //   console.log("input", "Timeout-->" + todoId)
        //   var el = $('.' + todoId);
        //   if (el) {
        //     el.focus();
        //   }
        // }, 400);
       },
      onFocusClick(id,level){
      $("#"+id+"_"+level).addClass("lifocus")
    },
       onBlurCall(id,level){
      $("#"+id+"_"+level).removeClass("lifocus")
    },
    performAction(e)
    {
      if (e.keyCode == 40) {
          $('.' + this.nextIndex).focus();
            this.changeFocus(this.nextIndex)
        } else if (e.keyCode == 38) {
          $('.' + this.prevIndex).focus();
            this.changeFocus(this.prevIndex)
        } else if(e.keyCode == 13) {
          this.$store.state.currentModified = false
          return
        }
      this.$store.state.currentTodoObj = this.todo
      this.$store.state.currentModified = (this.todo.id == -1) ? true :false
    },
    changeFocus(indexId){
       var self=this;
       setTimeout(function () {
          var el = $('.' + indexId);
          if (el) {
            el.focus();
          }
          console.log('Index', indexId)
          var todoid = indexId.split("_")
          let showTodoIndex = _.findIndex(self.$store.state.todolist, function (d) { return d.id == todoid[0] })
          if(showTodoIndex != -1)
            self.$store.commit('SHOW_DIV', self.$store.state.todolist[showTodoIndex])
        }, 100);
    }

    },
    component: {
      txtDesc
    },
    mounted() {
      var totalSubtask = this.todo.subtask_count ? this.todo.subtask_count : 0
      var completedSubtask = this.todo.completed_subtask_count ? this.todo.completed_subtask_count : 0
      this.todo.progress_count = completedSubtask + " / " + totalSubtask;
      if (totalSubtask > 0) {
        var percentage = (completedSubtask / totalSubtask) * 100
        this.todo.progress = percentage
      }
    //   console.log('check_settings', this.$store.state.settingsObject)
    // if(this.$store.state.settingsObject && this.$store.state.settingsObject.length > 0){
    //   var checkSetting = this.$store.state.settingsObject.find(setting => setting.type === "duedate")
    //   console.log('check_settings', checkSetting)
      if( this.$store.state.isDueDate)
        {
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
    // }
  }

</script>