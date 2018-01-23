<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="'estimateHr'+filteredTodo.id" aria-hidden="true" style="position: absolute;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Estimated Time</h5>
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
          <label class="form-label">
            Estimated Time:
            <input class="form-control" v-model="filteredTodo.estimatedTime" type="number" step="0.1" min="0">
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
    data() {
      return {
      }
    },
    methods: {
      clickAction() {
        if (this.filteredTodo.estimatedTime < 0) {
          this.$Notice.error({
            title: 'Estimate Time',
            desc: 'Please Enter valid Hours '
          });
        } else {
          this.$store.dispatch('editTaskName', { "todo": this.filteredTodo, "estimatedTime": this.filteredTodo.estimatedTime, log_action: Constant.HISTORY_LOG_ACTION.ESTIMATED_HOURS, log_text: this.filteredTodo.estimatedTime })
          $('#estimateHr' + this.filteredTodo.id).modal('hide')
        }
      },
      async updateEstimatHour(id, level, created_by, typeId) {
        let permisionResult = await CmnFunc.checkActionPermision(this, typeId, Constant.USER_ACTION.ESTIMATED_HOURS, Constant.PERMISSION_ACTION.UPDATE)
        console.log("permisionResult update Estimate HR-->", permisionResult)
        if (!permisionResult && id != -1) {
          document.getElementById("estimateInput").readOnly = true
        } else {
          document.getElementById("estimateInput").readOnly = false
        }
      }
    }
  }
</script>