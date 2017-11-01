<template>
  <modal :showModal="showModal" :closeAction="closeAction" class="pos">
    <h3 slot="header">Estimated Time</h3>
    <span slot="body" class="modal-body">
         <label class="form-label">
                    Estimated Time:
            <input class="form-control" v-model="filteredTodo.estimatedTime">
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
  export default {
    props: ['showModal', 'closeAction', 'filteredTodo'],
    data(){
        return{
        }
    },
    components: { Modal },
    methods:{
    clickAction () {
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "estimatedTime": this.filteredTodo.estimatedTime})
        // this.showModal=false
        // this.$emit('showModal', this.showModal);
         this.closeAction()
      }
    }
  }
</script>