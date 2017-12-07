<template>
    <div>
        <h3 class="ui header">Types</h3>
        <div id="main-container" class="row asanaView-body" style="left: 20%;right: 20px;">
            <div id="center_pane_container" class="known-list">
                <div id="center_pane">
                    <main-left-section id="taskTypes" :filtered-todos="taskTypeList"></main-left-section>
                </div>
            </div>
            <div class="right_pane_container" v-for="(n, index) in parentIdArr">
                <div id="right_pane">
                    <main-right-section id="rightTaskTypes" :todoObject="n"></main-right-section>
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
    created() {
        this.$store.dispatch('getTaskTypes')
    },
    computed: {
        ...mapGetters({
            typeList:'getTaskTypeList',
            parentIdArr:'parentIdArr'
        }),
         taskTypeList: function(){
           var types=this.typeList;
            if(types.length==0 || types[types.length-1].id!=='-1'){
           types.push({
                id:'-1',
                type:'',
                createdAt: new Date().toJSON()
            })
            }
            return types
        }
    },
    components: {
        MainLeftSection,
        MainRightSection
    }
}
</script>