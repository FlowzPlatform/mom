<template>
    <section class="main" v-cloak>
        <ul class="todo-list main">
            <div v-for="(log, ind) in historyLog">
                <div v-show="log.log_action===0">
                    <b>{{findUserName(log.created_by)}}</b> created task.
                </div>
                <div v-show="log.log_action===1">
                    <b> {{findUserName(log.created_by)}} </b> change task name "{{log.text}}".
                </div>
                <div v-show="log.log_action===3">
                     <b> {{findUserName(log.created_by)}} </b> uploaded attachement.
                <img v-show="getUrlExtension(log.text)==='jpeg' || getUrlExtension(log.text)==='jpg'" :src='log.text' width="70px" height="70px"/>
                 </div>
                 <div v-show="log.log_action===8">
                     <!-- assig tsk -->
                    <b> {{findUserName(log.created_by)}} </b> assign task to "{{findUserName(log.text)}}".
                </div>
            </div>
        </ul>
    </section>
</template>

<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import Resource from 'vue-resource'
    import draggable from 'vuedraggable'
    import { mapActions } from 'vuex'
    import * as services from '../services'
    import { mapGetters } from 'vuex'
    Vue.use(Resource)
    export default {
        props: ['taskId'],
        data: function () {
            return {
                // historyLog: this.historyLogService()
            }
        },
        computed: {
            ...mapGetters({
                getMemberName: 'getMemberName',
                historyLog: 'taskHistoryLog' 
            })
        },
        watch: {
            taskId: function () {
                // services.taskHistoryLogs.find({ query: { task_id: this.taskId } }).then(response => {
                //     response.sort(function (a, b) {
                //         return new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
                //     });
                //     this.historyLog = response
                //     console.log("Hisory Log watch:-->", this.historyLog)
                // })
            }
        },
        methods: {
            getUrlExtension(url){
                return url.split('.').pop();
            },
            historyLogService() {
                // services.taskHistoryLogs.find({ query: { task_id: this.taskId } }).then(response => {
                //     response.sort(function (a, b) {
                //         return new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
                //     });
                //     this.historyLog = response
                //     console.log("Hisory Log:-->", this.historyLog)

                // })
                // return this.historyLog
            },
            findUserName(uId) { 
                console.log("Uid:--",uId)
                return this.getMemberName(uId)
            }
        }
    }
</script>   