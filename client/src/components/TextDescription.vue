<template id="desc">
    <div class="task">
          <div class="view">
            <input type="checkbox" class="toggleTask" v-model="filteredTodo.completed">
            <input class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            autofocus autocomplete="off"
            @keyup.enter="updateTaskName(eventIndex, filteredTodo.id)"
            v-model="filteredTodo.taskName"
            />
          </div>
          <br>
        <div class="property description taskDetailsView-description">
        <div class="multiline">
          <span class="autogrow-textarea">
              <textarea rows="3" cols="50"
              v-model="filteredTodo.taskDesc"
              @keyup="updateDescription(eventIndex, filteredTodo.id)"
                contenteditable="true" disable_highlighting_for_diagnostics="true" tabindex="10" class="field-description generic-input hypertext-input notranslate" id="property_sheet:details_property_sheet_field:description"
                placeholder="Description">
            </textarea><br> 
            </span>
          </div>
      </div>
  </div>
</template>
<script>
  /* eslint-disable*/
import store from './store.js'
import TodoItem from './TodoItem.vue'
export default {
  props: ['eventIndex', 'filteredTodo'],
  data: function () {
    return {
      newTodo: '',
      description: '',
      initialIndex: 0,
    }
  },
  methods: {
    updateTaskName: function(eventIndex, parentTaskId) {
      var value = this.filteredTodo.taskName
      if (parentTaskId) {
        this.$http.post('/updatetasks', {
                  id: parentTaskId,
                  taskName: value
              }).then(response => {
                console.log('task updated', response.data)
            })
        } 
    },
    updateDescription: function(eventIndex, parentTaskId) {
      var value = this.filteredTodo.taskDesc
      console.log('ID', parentTaskId);
      console.log('Desc', value);
      if (parentTaskId) {
          this.$http.post('/updatetasks', {
                    id: parentTaskId,
                    taskDesc: value,
                }).then(response => {
                  //console.log('task update', response.data)
              })
      }

    }
  },
  component: {
    TodoItem
  }
}
</script>
