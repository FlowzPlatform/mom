<template id="desc">
    <div class="task">
          <div class="view">
            <input type="checkbox" class="toggleTask" v-model="filteredTodo.completed">
            <input class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            autofocus autocomplete="off"
            @keyup.enter="updateTaskName"
            v-model="filteredTodo.taskName"
            />
          </div>
          <br>
        <div class="property description taskDetailsView-description">
        <div class="multiline">
          <span class="autogrow-textarea">
              <textarea rows="3" cols="50"
              v-model="filteredTodo.taskDesc"
              @keyup="updateTaskName"
              contenteditable="true" disable_highlighting_for_diagnostics="true" 
              tabindex="10" 
              class="field-description generic-input hypertext-input notranslate" 
              id="property_sheet:details_property_sheet_field:description"
              placeholder="Description">
            </textarea><br> 
            </span>
          </div>
      </div>
  </div>
</template>
<script>
  /* eslint-disable*/
import TodoItem from './TodoItem.vue'
import { mapActions } from 'vuex'
export default {
  props: ['filteredTodo'],
  methods: {
    ...mapActions([
      'editTaskName'
    ]),
    updateTaskName: function() {
      this.$store.dispatch('editTaskName', this.filteredTodo)
    }  
  },
  component: {
    TodoItem
  }
}
</script>
