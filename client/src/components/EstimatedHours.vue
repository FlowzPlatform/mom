<template>
  <modal :showModal="showModal" :closeAction="closeAction" class="pos">
    <h3 slot="header">Estimated Time</h3>
    <span slot="body" class="modal-body">
         <label class="form-label">
                    Estimated Time:
            <input type="number" id="estimateInput" pattern="[0-9]" class="form-control" @focus="updateEstimatHour(filteredTodo.id, filteredTodo.level,filteredTodo.created_by,filteredTodo.type_id)" 
            v-model="filteredTodo.estimatedTime" readonly="isReadOnly" style="width: 20% !important;"> Hours
            <!-- <input id="estimateInput" class="form-control" @focus="updateEstimatHour(filteredTodo.id, filteredTodo.level,filteredTodo.created_by,filteredTodo.type_id)" 
            v-model="filteredTodo.estimatedTime" readonly="isReadOnly" style="width: 20% !important;"> Minutes -->
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
    data(){
        return{
          isReadOnly: false
        }
    },
    components: { Modal },
    methods:{
    clickAction () {
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "estimatedTime": this.filteredTodo.estimatedTime})
        // this.showModal=false
        // this.$emit('showModal', this.showModal);
         this.closeAction()
      },
      async updateEstimatHour(id,level,created_by,typeId) {
        let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.ESTIMATED_HOURS,Constant.PERMISSION_ACTION.UPDATE)
        console.log("permisionResult update Estimate HR-->",permisionResult)
        if (!permisionResult && id != -1) {
          console.log("====true====")
          document.getElementById("estimateInput").readOnly = true
        } else {
          console.log("====false====")
          document.getElementById("estimateInput").readOnly = false
        }  
      }
    }
  }
</script>