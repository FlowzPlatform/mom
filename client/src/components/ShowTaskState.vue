<template>
    <div>
        <div id="main-container" class="row right-tasktype">
            <div id="split-container" class="type-split-container" style="height: calc(100vh);">
                <div id="left_task_container" class="split split-horizontal scrollbar">
                    <div id="center_pane">
                        <main-left-section id="taskState" :filtered-todos="taskStausList"></main-left-section>
                    </div>
                </div>
                <div :id="'task-' + index" class="right_pane_container split split-horizontal" v-for="(n, index) in splitIdList">
                    <div id="right_pane">
                            <role-access-right-sec id="rightTaskState" :todoObject="n"></role-access-right-sec>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable*/
import MainLeftSection from './MainLeftSection.vue'
import RoleAccessRightSec from './RoleAccessRightSec.vue'
import { mapGetters } from 'vuex'
import Split from 'split.js'

export default {
    data: function () {
        return {
            splitIdList: this.splitIdMethod(),
            instanceState: null
        }
    },
    created() {
        this.$store.dispatch('getTaskStaus')
    },
    mounted()  {
        this.splitIdMethod();
    },
    watch: {
        splitIdList: function () {
        
        let ids = ['#left_task_container'];
        
        if (this.splitIdList) {
          for (let i = 0; i <= this.splitIdList.length-1; ++i) {
            ids.push('#task-' + i);
          }
          
          if (ids.length > 0) {
            setTimeout(function() {
              if(this.instanceState){
                this.instanceState.destroy()
                this.instanceState = null
              } 
              this.instanceState = Split(ids, {minSize: 225, gutterSize: 4});
            }, 20);
          }
        }
      }
    },
    computed:{
        ...mapGetters({
            stateList: 'getTaskStausList',
            pidArr:'parentIdArr'
        }),
        taskStausList() {
            var types=this.stateList;
        if(this.stateList.length==0 || this.stateList[this.stateList.length-1].id!=='-1'){
           this.stateList.push({
                id:'-1',
                taskState:'',
                createdAt: new Date().toJSON()
                })
            }
            return this.stateList
        }
    },
    methods: {
        splitIdMethod: function () {
            let array = this.pidArr;
            this.splitIdList = array;
      }
    },
    components: {
        MainLeftSection,
        RoleAccessRightSec
    }
}
</script>