<template id="desc">
    <div class="task">
          <div class="view">
              <div id="topicon">
                  <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    tabindex="410" style="margin-top: 2px;">
                    <span id="close" class="destroy circularButtonView-label" @click="CLOSE_DIV(filteredTodo)">
                      <i class="fa fa-close"></i>
                    </span>
                  </div>
                  <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    style="margin-top: 2px;">
                    <span class="circularButtonView-label" @click="pinit(filteredTodo)">
                      <img class="init" v-if="filteredTodo.isPinned" src="../assets/unpin.png" style="width:20px; height:20px;"></img>
                      <img class="init" v-else src="../assets/pin.png" style="width:16px; height:16px; margin-bottom:2px;"></img>
                    </span>
                  </div>
                  <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    tabindex="410" @click="openfullwinodw(filteredTodo.level)" style="margin-top: 2px; ">
                    <span class="circularButtonView-label">
                      <i class="fa fa-expand" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
            <input type="checkbox" class="toggleTask" v-model="filteredTodo.completed" @change="toggleTodo(filteredTodo)" style="float: left;">
            <input v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @change="updateTaskName()"
            v-model="filteredTodo.taskName"
            />
            <input v-if="id === 'rightTaskTypes'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
            placeholder="New Task" 
            style="height: 40px;"
            rows="1"
            @keydown="autoresize"
            @click="autoresize"
            autofocus autocomplete="off"
            @keyup.enter="updateType"
            v-model="filteredTodo.type"
            />
            <input v-if="id === 'rightTaskState'" id="text-area" class="field-description generic-input hypertext-input notranslate header-name" 
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
        <div class="property description taskDetailsView-description" v-show="currentView.__file==='src/components/SubTask.vue'">
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
import { mapMutations, mapActions } from "vuex";
import _ from 'lodash'

export default {
  props: ['filteredTodo', 'id','currentView'],
    data: function () {
      return {
        textName:''
      }
    },
  methods: {
    ...mapActions([
      'toggleTodo'
    ]),
    ...mapMutations(["CLOSE_DIV"]),   
    updateTaskName: _.debounce(function() {
      this.$store.dispatch('editTaskName', {"todo":this.filteredTodo})
    }, 500),
    autoresize: function() {
      var el = document.getElementById('text-area')
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:12';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      // el.focus();
      }, 300)
    },
    updateType: _.debounce(function() {
      this.$store.dispatch('editTypes', this.filteredTodo)
    }, 2000),
    updateStatus: _.debounce(function() {
      this.$store.dispatch('editState', this.filteredTodo)
    }, 2000),
    async onFocusClick(id,level,created_by,typeId){
      let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.TASK,Constant.PERMISSION_ACTION.UPDATE)
      console.log("permisionResult Text Description-->",permisionResult)
      if (!permisionResult && id != -1) {
        document.getElementById("txtAreaTaskName").readOnly = true
      } else {
        document.getElementById("txtAreaTaskName").readOnly = false
      }  
    },
    pinit(filteredTodo) {
      console.log("TODO Object", filteredTodo);
      if (
        _.find(this.$store.state.todolist, ["id", filteredTodo.id]) &&
        !_.find(this.$store.state.todolist, ["id", filteredTodo.id]).isPinned
      ) {
        console.log("pinnned true");
        _.find(this.$store.state.todolist, [
          "id",
          filteredTodo.id
        ]).isPinned = true;
      } else {
        console.log("pinnned false");
        _.find(this.$store.state.todolist, [
          "id",
          filteredTodo.id
        ]).isPinned = false;
      }
    },
    openfullwinodw: function(ind) {
      console.log("Openfullwindow called====");
      $(".window-full.circularButtonView")
        .find(".fa")
        .toggleClass("fa-compress");
      $(".window-full.circularButtonView")
        .parents(".right_pane_container #right_pane #" + ind)
        .toggleClass("open");
    }
  },
  component: {
    TodoItem
  }
}
</script>
