<template>
    <div>
        <div id="main-container" class="row right-tasktype">
            <div id="split-container" class="type-split-container" style=" height: calc(100vh);">
                <div id="left_type_container" class="split split-horizontal scrollbar">
                    <div id="center_pane">
                        <main-left-section id="taskTypes"  pholder="Type"  :filtered-todos="taskTypeList"></main-left-section>
                    </div>
                </div>
                <div :id="'type-' + index" class="right_pane_container split split-horizontal" v-for="(n, index) in parentIdList">
                    <div id="right_pane">
                        <role-access-right-sec id="rightTaskTypes" :todoObject="n"></role-access-right-sec>
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
            parentIdList: this.parentIdMethod(),
            instanceType: null
        }
    },
    created() {
        this.$store.dispatch('getTaskTypes')
    },
    mounted()  {
        this.parentIdMethod();
    },
    watch: {
      parentIdList: function () {
        
        let ids = ['#left_type_container'];
        
        if (this.parentIdList) {
          for (let i = 0; i <= this.parentIdList.length-1; ++i) {
            ids.push('#type-' + i);
          }
          
          if (ids.length > 0) {
            setTimeout(function() {
              if(this.instanceType){
                this.instanceType.destroy()
                this.instanceType = null
              } 
              this.instanceType = Split(ids, {minSize: 225, gutterSize: 4});
            }, 20);
          }
        }
      }
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
    methods: {
      parentIdMethod: function () {
        let array = this.parentIdArr;
        this.parentIdList = array;
      }
    },
    components: {
        MainLeftSection,
        RoleAccessRightSec
    }
}
</script>