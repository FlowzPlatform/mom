<template>
    <div>
        <h3 class="ui header">Status</h3>
        <div id="main-container" class="row asanaView-body" style="left: 20%;right: 20px;">
            <div id="center_pane_container" class="known-list">
                <div id="center_pane">
                    <main-left-section id="taskStatus" :filtered-todos="taskStausList"></main-left-section>
                </div>
            </div>
            <div class="right_pane_container" v-for="(n, index) in pidArr">
                <div id="right_pane">
                    <main-right-section id="rightTaskStatus" :todoObject="n"></main-right-section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable*/
import MainLeftSection from './MainLeftSection.vue'
import MainRightSection from './MainRightSection.vue'
import { mapGetters } from 'vuex'
export default {
    data: function () {
        return {
        }
    },
    created() {
        this.$store.dispatch('getTaskStaus')
    },
    computed:{
        ...mapGetters({
            statusList: 'getTaskStausList',
            pidArr:'parentIdArr'
        }),
        taskStausList(){
            this.statusList.push({
                status:'',
                createdAt: new Date().toJSON()
            })
            return this.statusList
        }
    },
    components: {
        MainLeftSection,
        MainRightSection
    }
}
</script>