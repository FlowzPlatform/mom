<template>
    <section class="main" v-cloak>
        <div v-bind:key="ind" v-show="!(log.log_action==3 && getAttachment(log.text) < 0)" v-for="(log, ind) in historyDetailLog">
            <div class="FeedBlockStory">
                <div class="BlockStory">
                    <div class="BlockStory-icon">
                        <div v-if="log.email">
                            <avatar v-if="log.image_url" :username="log.email" :src="log.image_url" :size="30"></avatar>
                            <avatar v-else :username="log.email" :size="30" color="#fff"></avatar>
                        </div>
                    </div>
                    <div class="BlockStory-block">
                        <div class="BlockStory-header">
                            <div class="BlockStory-headerContent">
                                <span class="BlockStory-storyContent">
                                    <a class="history-username" href="javascript:void(0)">
                                        {{log.fullname}}</a>
                                    <span class="AddedAttachmentStory-content"  v-show="log.log_action===3">
                                        <svg class="Icon AttachIcon" viewBox="0 0 32 32">
                                            <path d="M25.811,4.064c-3.905-3.904-10.235-3.904-14.14,0l-4.24,4.24l1.41,1.41l4.25-4.24c3.043-3.203,8.107-3.333,11.31-0.29s3.333,8.107,0.29,11.31c-0.094,0.099-0.191,0.196-0.29,0.29l-10.61,10.59c-1.986,1.918-5.152,1.863-7.07-0.123c-1.871-1.938-1.871-5.01,0-6.947l10.61-10.59c0.781-0.781,2.049-0.781,2.83,0s0.781,2.049,0,2.83l-7.07,7.07l1.41,1.42l7.07-7.07c1.563-1.563,1.563-4.097,0-5.66s-4.097-1.563-5.66,0l-10.6,10.61c-2.734,2.734-2.734,7.166,0,9.9s7.166,2.734,9.9,0l0,0l10.6-10.61C29.715,14.299,29.715,7.969,25.811,4.064z"></path>
                                        </svg>
                                        attached
                                    </span>
                                </span>
                                <span class="BlockStory-metadata">
                                    <span class="BlockStory-timestamp">
                                        <span>{{logDate(log.created_on)}}</span>
                                    </span>
                                </span>
                            </div>
                            <a class="hidden MiniHeartButton MiniHeartButton--withThumbsUp BlockStory-heartButton" role="button" aria-pressed="false">
                                <svg class="Icon ThumbsUpLineIcon MiniHeartButton-icon" viewBox="0 0 32 32">
                                    <path d="M10.0100098,25.990815 L25.7130758,25.990815 C26.4355767,25.990815 26.907404,25.7237882 27.2463608,25.2516827 C27.4604665,24.9534722 27.5728209,24.6484118 27.5950072,24.5410552 C27.6064756,24.458703 27.6064756,24.458703 27.6582766,24.0847701 C27.7086518,23.7205833 27.764789,23.3130583 27.8252464,22.8720563 C27.9979735,21.6121134 28.170696,20.3365004 28.3318696,19.1242008 C28.3594075,18.9169123 28.3594075,18.9169123 28.3868975,18.7093304 C28.6888342,16.4274522 28.9061144,14.6932998 29.0053522,13.737985 C29.0935444,12.8890005 28.8843983,12.4598949 28.4810455,12.2073213 C28.2638406,12.0713108 28.0349461,12.0130804 27.9984524,12.0083416 L17.4183504,11.9919674 L18.5656765,10.4083054 C18.6283173,10.3218419 18.7473774,10.1466403 18.9039434,9.89720276 C19.1685568,9.47562637 19.433782,9.00790798 19.680774,8.50925027 C20.2604538,7.33892139 20.6455901,6.18949426 20.7500991,5.15149012 C20.8542102,4.11743828 20.6735393,3.25979813 20.1779668,2.58081672 C18.9108162,1.47730042 17.5988371,2.03066611 17.1660826,3.65713546 C16.36595,5.93476748 15.282882,7.3455244 13.7432225,8.43279623 C13.5175931,8.59213051 13.2847782,8.74372345 13.0126895,8.9111541 C12.8483483,9.01228197 12.1924557,9.40498616 12.3407868,9.31572277 C10.8888174,10.1894958 10.351177,10.7756299 10.0100098,12.2091013 L10.0100098,25.990815 Z M28.0683443,10.010681 C28.4709372,10.0382604 29.0008677,10.1730737 29.5424879,10.5122283 C30.592866,11.1699598 31.1616539,12.3369434 30.9946478,13.9446323 C30.8928231,14.9248502 30.6740234,16.6711298 30.3696156,18.9716824 C30.342042,19.1798963 30.342042,19.1798963 30.3144251,19.3877788 C30.1528558,20.6030554 29.9797823,21.8812603 29.8067133,23.1436979 C29.7461422,23.585529 29.6898956,23.9938479 29.6394137,24.358806 C29.5874758,24.7337277 29.5874758,24.7337277 29.5672436,24.8689318 C29.4862605,25.2875154 29.2793204,25.8493913 28.8709933,26.4181172 C28.1725622,27.3909055 27.1125422,27.990815 25.7130758,27.990815 L8.01000977,27.990815 L8.01000977,12.0949707 L8.03442601,11.875343 C8.51382912,9.74583969 9.39815151,8.7523366 11.3095474,7.6020877 C11.1728468,7.684352 11.8123189,7.30147926 11.9645335,7.2078135 C12.2033508,7.06085657 12.4021843,6.93138998 12.589535,6.7990872 C13.7942643,5.94833534 14.61854,4.87466986 15.2557545,3.07035834 C16.0314787,0.132985974 19.1124692,-1.10991117 21.593353,1.16363659 L21.7082898,1.288501 C22.5856746,2.4211838 22.8954413,3.808352 22.7400385,5.35184253 C22.6079561,6.66371098 22.1503887,8.02930668 21.4729753,9.39695206 C21.3711462,9.60253701 21.2667378,9.80316377 21.1606628,9.99821512 L28.0683443,10.010681 Z"></path>
                                    <path d="M4,12 L4,26 L8,26 L8,12 L4,12 Z M10,10 L10,28 L2,28 L2,10 L10,10 Z"></path>
                                </svg>
                            </a>
                        </div>
                        <div class="BlockStory-body">
                            <div class="truncatedRichText">
                                <!-- Create task -->
                                <div class="history-label" v-show="log.log_action===0">
                                    created task.
                                </div>
                                <!-- Update task -->
                                <div class="history-label" v-show="log.log_action===1">
                                    changed task name to {{log.text}}
                                </div>
                                <!-- Task assigned -->
                                <div class="history-label" v-show="log.log_action===8">
                                    task assigned to {{getUser(log.text)}}
                                </div>
                                <!-- Due date -->
                                <div class="history-label" v-show="log.log_action===9">
                                     changed the due date to {{formateDate(log.text)}}.
                                </div> 
                                <!-- Task description -->
                                <div class="history-label" v-show="log.log_action===10">
                                     added task description {{log.text}}
                                </div>
                                <!-- Tag create -->
                                <div class="history-label" v-show="log.log_action===11">
                                     created tag  {{getTagNameFromId(log.text)}}
                                </div>
                                <!-- Tag add -->
                                <div class="history-label" v-show="log.log_action===12">
                                     added tag  {{getTagNameFromId(log.text)}}
                                </div>
                                <!-- Tag Delete -->
                                <div class="history-label" v-show="log.log_action===13">
                                     removed tag {{getTagNameFromId(log.text)}}
                                </div>
                                <!-- Comment Add -->
                                <div class="history-label" v-show="log.log_action===14">
                                     comment added  <span v-html="getComment(log.text)"></span>
                                </div>
                                <!-- Comment delete -->
                                <div class="history-label" v-show="log.log_action===15">
                                     comment deleted <span v-html="getComment(log.text)"></span>
                                </div>
                                <!-- Attachment remove log -->
                                 <div class="AddedAttachmentStory-body" v-if="log.log_action===16">
                                    remove attachment <div>{{log.text}}</div>
                                </div>
                                <!-- Attchment upload log -->
                                <div class="AddedAttachmentStory-body" v-else-if="log.log_action===3">
                                    <a class="AddedAttachmentStory-link" :href="getAttachment(log.text).file_url" target="_blank" tabindex="-1"><div>{{getAttachment(log.text).file_name}}</div></a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <svg class="hidden Icon DownIcon FeedBlockStory-actionsDropdownIcon" viewBox="0 0 32 32">
                    <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                </svg>
            </div>
        </div>
    </section>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import Resource from 'vue-resource'
import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'
import * as services from '../services'
import moment from 'moment';
import Avatar from 'vue-avatar/src/Avatar'
Vue.use(Resource)
export default {
    props: ['taskId'],
    data: function() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            historyLog: 'taskHistoryLog'
        }),
        historyDetailLog(){
            let log = this.historyLog
            console.log('historyDetailLog()',log)
            this.historyDetailList(log)
            return log
        }
    },
    created(){
        console.log("oncreated call")
        // Load history log when component created 
        this.$store.dispatch("findHistoryLog", this.taskId);
    },
    watch: {
        // Find history log using taskid 
        taskId: function(newTaskId,oldTaskId) {
             this.$store.dispatch("findHistoryLog", this.taskId);
        }
    },
    methods: {
        getUrlExtension(url) {
            return url.split('.').pop();
        },
        logDate(logDate) {
            return moment(logDate).calendar()
        },
        formateDate(dateTo){
            return  moment(dateTo).format('ll')
        },
        /**
         * Add user detail into history log
         */
        historyDetailList: function (historyList) {
            console.log("In historyDetailList() method:",historyList)
            historyList.forEach(function (c) {
                let userId = c.created_by
                let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
                if (userIndex < 0) {
                } else {
                    var id = this.$store.state.arrAllUsers[userIndex]._id
                    c.fullname = this.$store.state.arrAllUsers[userIndex].fullname
                    c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
                    c.email = this.$store.state.arrAllUsers[userIndex].email
                }
            }, this)
        },
        /**
         * Get user name 
         * @userId
         * 
         */
        getUser(userId){
            let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
            if (userIndex < 0) {
            } else {
                let user = this.$store.state.arrAllUsers[userIndex]
                if(user.username){
                    return user.username
                }
                return  user.email
            }
        },
        /**
         * Get tag name
         * @augments tagId  */
        getTagNameFromId(tagId) {
          
            let index = _.findIndex(this.$store.state.tagsList, function(d) { return d.id == tagId })
            if (index > -1) {
                let   tag_name = this.$store.state.tagsList[index].name
                return tag_name
            }
            else
                return ''
        },
        /**
         * Get comment 
         * @augments commentId */
        getComment(commentId){
            let index = _.findIndex(this.$store.state.taskComment, function(d) { return d.id == commentId })
            if (index > -1) {
                let   comment = this.$store.state.taskComment[index].comment
                return comment
            }
            else
                return commentId
        },
        /**
         * Find attachment 
         * @augments attachmentID 
         * */
        getAttachment(id){
            let index = _.findIndex(this.$store.state.arrAttachment, function(d) { return d.id == id })
            if (index > -1) {
                let   attachment = this.$store.state.arrAttachment[index]
                return attachment
            }
            return index
        }


    },
    components: {
        Avatar
    }
}
</script>   
<style>
svg.Icon.DownIcon.FeedBlockStory-actionsDropdownIcon {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;
    width: 28px;
}
.history-label{
    color: #848f99;
    font-size: 11px;
    line-height: 17px;
}
a.history-username{
     color: inherit;
    font-size: 11px;
}
</style>
