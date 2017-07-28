<template>
    <div>
        <div id="main-container" class="row asanaView-body" style="left: 20%;right: 20px;">
            <div id="center_pane_container" class="known-list">
                <div id="center_pane">
                    <main-left-section :filtered-todos="getTaskTypeList"></main-left-section>
                </div>
            </div>
        
        <div class="right_pane_container" v-for="(n, index) in parentIdArr">
            <div id="right_pane">
                <main-right-section :todoObject="n"></main-right-section>
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
            this.$store.dispatch('getTaskTypes')
        },
        computed: {
            ...mapGetters([
                'getTaskTypeList',
                'parentIdArr'
            ])
        },
        components: {
            MainLeftSection,
            MainRightSection
        }
    }

</script>