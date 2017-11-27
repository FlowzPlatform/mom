<template id="desc">
    <div class="task">
          <div class="view">
            <input type="checkbox" class="toggleTask" v-model="filteredTodo.completed" @change="toggleTodo(filteredTodo)">
            <textarea v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @change="updateTaskName()"
            v-model="filteredTodo.taskName"
            />
            <textarea v-if="id === 'rightTaskTypes'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @keyup.enter="updateType"
            v-model="filteredTodo.type"
            />
            <textarea v-if="id === 'rightTaskState'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @keyup.enter="updateStatus"
            v-model="filteredTodo.taskState"
            />
          </div>
          <br>
        <div class="property description taskDetailsView-description">
        <div class="multiline">
          <span class="autogrow-textarea">
              <textarea v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" rows="3" cols="50"
              v-model="filteredTodo.taskDesc"
              @change="updateTaskName()" 
              contenteditable="true" disable_highlighting_for_diagnostics="true" 
              tabindex="10" 
              class="field-description generic-input hypertext-input notranslate" 
              id="property_sheet:details_property_sheet_field:description"
              placeholder="Description">
            </textarea><br>
            <textarea v-if="id === 'rightTaskTypes'" rows="3" cols="50"
              v-model="filteredTodo.typeDesc"
              @keyup="updateType()" 
              contenteditable="true" disable_highlighting_for_diagnostics="true" 
              tabindex="10" 
              class="field-description generic-input hypertext-input notranslate" 
              id="property_sheet:details_property_sheet_field:description"
              placeholder="Description">
            </textarea><br>
            <textarea v-if="id === 'rightTaskState'" rows="3" cols="50"
              v-model="filteredTodo.stateDesc"
              @keyup="updateStatus()" 
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
  props: ['filteredTodo', 'id'],
    data: function () {
      return {
        textName:''
      }
    },
  methods: {
    ...mapActions([
      'toggleTodo'
    ]),
    updateTaskName:  function() { this.$lodashDebounce(function() {
      this.$store.dispatch('editTaskName', {"todo":this.filteredTodo})
    }, 500)},
    autoresize: function() {
      var el = document.getElementById('text-area')
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:12';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      // el.focus();
      }, 300)
    },
    updateType: function() { this.$lodashDebounce(function() {
      this.$store.dispatch('editTypes', this.filteredTodo)
    }, 2000)
    },
    updateStatus:  function() { this.$$lodashDebounce(function() {
      this.$store.dispatch('editState', this.filteredTodo)
    }, 2000)},
    async onFocusClick(id,level,created_by,typeId){
      let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.TASK,Constant.PERMISSION_ACTION.UPDATE)
      console.log("permisionResult Text Description-->",permisionResult)
      if (!permisionResult && id != -1) {
        document.getElementById("txtAreaTaskName").readOnly = true
      } else {
        document.getElementById("txtAreaTaskName").readOnly = false
      }  
    },
  },
  component: {
    TodoItem
  }
}
</script>
