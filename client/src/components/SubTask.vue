<template>
    <div>
        <text-description :id="id" :filteredTodo="taskObject">
        </text-description>
        <main-left-section v-if="!$store.state.deleteItemsSelected && id !== 'rightTaskTypes' && id !== 'rightTaskState'" :pholder="pholder" :filtered-todos="filteredTodos"></main-left-section>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
import TextDescription from './TextDescription.vue'
import MainLeftSection from './MainLeftSection.vue'

export default {
    props:  ['filteredTodos', 'pholder', 'todoObject', 'isCopyLink', 'id','filteredTodo'],
    data: function() {
        return {
            taskObject: this.filteredTodo
        }
    },
    components: {
        TextDescription,
        MainLeftSection
    }
}
</script>
  

