<template>
    <div>
        <h3 class="ui header">Roles</h3>
        <div id="main-container" class="row asanaView-body" style="left: 20%;right: 20px;">
            <div id="center_pane_container" class="known-list">
                <div id="center_pane">
                    <main-left-section id="roleTypes" :filtered-todos="taskTypeList"></main-left-section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable*/
import MainLeftSection from './MainLeftSection.vue'
import { mapGetters } from 'vuex'
export default {
    data: function () {
        return {
        }
    },
    created() {
        this.$store.dispatch('getTaskTypes')
    },
    computed: {
        ...mapGetters({
            typeList:'getRolesList',
            parentIdArr:'parentIdArr'
        }),
         taskTypeList: function(){
           var types=this.typeList;
            if(types.length==0 || types[types.length-1].id!=='-1'){
           types.push({
                id:'-1',
                name:'',
                is_editable:true,
                is_checked:false,
                createdAt: new Date().toJSON()
            })
            }
            return types
        }
       
    },
    components: {
        MainLeftSection
    }
}
</script>