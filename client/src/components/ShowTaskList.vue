<template>
    <div>
        <div class="PageHeaderStructure ProjectPageHeader">
        <div class="PageHeaderStructure-center">
            <div class="PageHeaderStructure-titleRow">
              <div class="PageHeaderStructure-title ProjectPageHeader-projectName--colorNone ProjectPageHeader-projectName">{{$store.state.searchView}}</div>
            </div>
          </div>
        </div>
        <div id="main-container" class="row asanaView-body" style="padding-top: 15px; margin: 10px 10px 10px 10px;">
            <div id="center_pane_container" class="known-list">
                <div id="center_pane">
                    <main-left-section :filtered-todos="searchList"></main-left-section>
                </div>
            </div>
            <div class="right_pane_container" v-for="(n, index) in parentIdArr">
                <div id="right_pane">
                    <main-right-section :todoObject = "n" ></main-right-section>
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
        computed: {
            ...mapGetters([
                'getTaskLists',
                'parentIdArr',
                'getRecentlyCompletedLists',
                'getTaskAssignedToOthers'
            ]),
            searchList(){
                var list = []
                if(this.$store.state.searchView === "Tasks I've Created"){
                    list = this.getTaskLists
                } else if (this.$store.state.searchView === "Recently Completed Tasks"){
                    list = this.getRecentlyCompletedLists
                } else if (this.$store.state.searchView === "Tasks I've Assigned to Others"){
                    list = this.getTaskAssignedToOthers
                }
                return list
            }
        },
        components: {
            MainLeftSection,
            MainRightSection
        }
    }

</script>