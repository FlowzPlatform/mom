<template>
  <modal :showModal="showModal" :closeAction="closeAction" class="pos">
    <h3 slot="header">Task Priority</h3>
    <span slot="body" class="modal-body">
         <label class="form-label" for="sel1">
                    Task Priority:
                  <select class="form-control" id="sel1" v-model="filteredTodo.priority">
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
  export default {
    props: ['showModal', 'closeAction', 'filteredTodo'],
    components: { Modal },
    methods:{
    clickAction () {
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "taskPriority": this.filteredTodo.priority})
        // this.showModal=false
        // this.$emit('showModal', this.showModal);
        this.closeAction()

      }
    }
  }
</script>