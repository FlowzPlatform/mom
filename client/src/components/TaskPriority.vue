<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="'taskPriority'+filteredTodo.id" aria-hidden="true" style="position: absolute;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Task Priority</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="modalObjectInfos">
                <div class="objectInfoItem">
                  <span class="objectInfoItemName">Task:</span>
                  {{filteredTodo.taskName}}
                </div>
              </div>
              <label class="form-label" for="sel1">
                Task Priority:
                <select class="form-control" id="sel1" v-model="filteredTodo.priority">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                  <option>Urgent</option>
                </select>
              </label>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary setFooterColor" @click="clickAction">Save changes</button>
              <button type="button" class="btn btn-secondary setFooterColor" data-dismiss="modal">Close</button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable*/
  import * as Constant from "./Constants.js";
  export default {
    props: ['filteredTodo'],
    methods:{
    clickAction () {
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "taskPriority": this.filteredTodo.priority,log_action:Constant.HISTORY_LOG_ACTION.TASK_PRIORITY, log_text:this.filteredTodo.priority})
        $('#taskPriority'+this.filteredTodo.id).modal('hide')
      },
      async updateTaskPriority(id,level,created_by,typeId) {
        let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.TASK_PRIORITY,Constant.PERMISSION_ACTION.UPDATE)
        if (!permisionResult && id != -1) {
          this.isDisable = true
        } else {
          this.isDisable = false
        }  
      }
    }
  }
</script>