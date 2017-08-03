<template id="desc">
    <div class="task">
          <div class="view">
            <input type="checkbox" class="toggleTask" v-model="filteredTodo.completed" @change="toggleTodo(filteredTodo)">
            <textarea id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @change="updateTaskName()"
            v-model="filteredTodo.taskName"
            />
          </div>
          <br>
        <div class="property description taskDetailsView-description">
        <div class="multiline">
          <span class="autogrow-textarea">
              <textarea rows="3" cols="50"
              v-model="filteredTodo.taskDesc"
              @change="updateTaskName()" 
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
import _ from 'lodash'

export default {
  props: ['filteredTodo'],
  methods: {
    ...mapActions([
      // 'editTaskName',
      'toggleTodo'
    ]),
    updateTaskName: _.debounce(function() {
      this.$store.dispatch('editTaskName', {"todo":this.filteredTodo})
    }, 500),
    autoresize: function() {
      var el = document.getElementById('text-area')
      setTimeout(function(){
        el.style.cssText = 'height:auto; padding:12';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
        el.focus();
      }, 300)
    }
  },
  component: {
    TodoItem
  }
}
</script>
