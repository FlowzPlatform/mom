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
  props: ['todo', 'eventIndexR', 'pholder'],
  data: function () {
    return {
      progress: 0,
      progress_count:'',
      isDate: this.todo.dueDate,
    }
  },
  computed: {
    // ...mapGetters([
    //     'selectedTodo'
    //   ])
  },
  methods: {
    ...mapMutations([
      'set_selected_todo',
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
      this.$store.dispatch('insertTodo', this.todo)
    }
  },
  component: {
    txtDesc
  },
  mounted() {
      var totalSubtask= this.todo.subtask_count ? this.todo.subtask_count : 0
      var completedSubtask = this.todo.completed_subtask_count ? this.todo.completed_subtask_count : 0
        this.progress_count = completedSubtask + " / " + totalSubtask;
        if (totalSubtask > 0) {
          var percentage = (completedSubtask / totalSubtask) * 100
          this.progress = percentage
        }
  }
}
</script>
