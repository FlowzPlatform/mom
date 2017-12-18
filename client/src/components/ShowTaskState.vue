<template>
    <div>
        <div id="main-container" class="row right-tasktype" >
            <div id="center_pane_container" class="scrollbar">
                <div id="center_pane">
                    <main-left-section id="taskState" :filtered-todos="taskStausList"></main-left-section>
                </div>
            </div>
            <div class="right_pane_container" v-for="(n, index) in pidArr">
                <div id="right_pane">
                    <!-- <main-right-section id="rightTaskState" :todoObject="n"></main-right-section> -->
                    <role-access-right-sec id="rightTaskState" :todoObject="n"></role-access-right-sec>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable*/
import MainLeftSection from './MainLeftSection.vue'
// import MainRightSection from './MainRightSection.vue'
import RoleAccessRightSec from './RoleAccessRightSec.vue'
import { mapGetters } from 'vuex'
export default {
    created() {
        this.$store.dispatch('getTaskStaus')
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
    components: {
        MainLeftSection,
        // MainRightSection
        RoleAccessRightSec
    }
}
</script>