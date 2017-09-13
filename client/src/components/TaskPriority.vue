<template>
  <modal :showModal="showModal" :closeAction="closeAction" class="pos">
    <h3 slot="header">Task Priority</h3>
    <span slot="body" class="modal-body">
         <label class="form-label" for="sel1">
                    Task Priority:
                  <select id="priorityBox" class="form-control"
                  @focus="updateTaskPriority(filteredTodo.id, filteredTodo.level,filteredTodo.created_by,filteredTodo.type_id)"
                  v-model="filteredTodo.priority" :disabled="isDisable">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                    <option>Urgent</option>
                  </select>
        </label>
    </span>
    <div slot="footer" class="text-right">
      <button class="modal-default-button" @click="clickAction" style="margin: 10px 10px 10px 10px;">Save</button>
    </div>
  </modal>
</template>

<script>
/* eslint-disable*/
  import Modal from 'modal-vue'
  import CmnFunc from './CommonFunc.js'
  import * as Constant from './Constants.js'
  export default {
    props: ['showModal', 'closeAction', 'filteredTodo'],
    components: { Modal },
    data() {
      return {
        isDisable: false,
      }
    },
    methods:{
    clickAction () {
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "taskPriority": this.filteredTodo.priority})
        // this.showModal=false
        // this.$emit('showModal', this.showModal);
        this.closeAction()

      },
      async updateTaskPriority(id,level,created_by,typeId) {
        let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.TASK_PRIORITY,Constant.PERMISSION_ACTION.UPDATE)
        console.log("permisionResult update Task Priotity-->",permisionResult)
        if (!permisionResult && id != -1) {
          this.isDisable = true
        } else {
          this.isDisable = false
        }  
      }
    }
  }
</script>