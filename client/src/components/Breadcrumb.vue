<template>
    <div>
        <Breadcrumb v-for="pTask in getParentTasksName">
            <BreadcrumbItem :to="'task/' + (pTask.level + 1) + '/' + pTask.id"  @click="SHOW_DIV(pTask)">{{pTask.taskName}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script>
import iView from "iview";
import "iview/dist/styles/iview.css";
import { mapGetters } from "vuex";
import config from '../../config/customConfig'
export default {
    props: ['filteredTodo'],
    computed: {
      ...mapGetters([
        'getParent_Tasks'
        ]),
        getParentTasksName: function(){
            let list = this.getParent_Tasks
            return list
        }
    }
}
</script>
<style>
    .ivu-breadcrumb{
        display: -webkit-inline-box;
    }
    .ivu-breadcrumb>span:last-child .ivu-breadcrumb-item-separator{
        display: -webkit-inline-box;
    }
</style>