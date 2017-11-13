<template>
    <div>
            <comment></comment>
            <div class="todoapp comment_right_bar">
                <div class="comment-header header-scroll">
                        <!--<div class="Comment-headerTitle">
                            <div id="title-header" v-html=comment.comment> </div>
                            <p> {{comment.fullname}}  {{comment.createdAt | parseDate}}</p>
                        </div>
                        <a class="CloseButton" @click="close(comment)">
                            <svg class="Icon XIcon CloseButton-xIcon" title="XIcon" viewBox="0 0 32 32">
                                <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                            </svg>
                        </a>-->
                </div>
            <div class="StoryFeed">
                <!-- <table id="ember1276" class="topic-list ember-view" style="width:100%;">
                    <thead>
                        <tr>
                            <th data-sort-order="default" class="default">Comments</th>
    
                            <th data-sort-order="posters" class="posters">Users</th>
    
                            
    
                            <th data-sort-order="activity" class="activity sortable num">Activity</th>
                            <th data-sort-order="posts" class="posts sortable num">Replies</th>
                            <th data-sort-order="posts" class="posters"></th>
    
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="comment in taskSubComments" data-topic-id="48665" id="ember1279" class="topic-list-item category-design-help ember-view">
                            <td class="main-link clearfix" colspan="1">
                                <span class="link-top-line">
                                    <div class="title raw-link raw-topic-link" v-html="comment.comment"></div>
                                    <span class="topic-post-badges">
                                    </span>
                                </span>
                            </td>
                            <td class="posters" :title="comment.fullname ? comment.fullname : comment.email" >
                                <div v-if="comment.email">
                                        <avatar v-if="comment.image_url" :username="comment.email" :src="comment.image_url" :size="30"></avatar>
                                        <avatar v-else :username="comment.email" :size="30" color="#fff"></avatar>
                                    </div>
                            </td>
                           
                            <td class="with-year age coldmap-high activity" :title="comment.createdAt | parseDate"><span class="relative-date" data-time="1487728662866" data-format="tiny"> {{comment.createdAt | parseDateAgo}}</span></td>
                            <td class="num posts-map posts heatmap" title="Total replies on comment">
                                    <a  class="posts-map badge-posts heatmap-" @click="replyCommentMethod(comment)">
                                    <span class="number" >{{comment.count ?  comment.count :0}}</span>
                                    </a>
                                </td>
                            <td class="num posts-map posts heatmap-" title="Reply on comment" @click="replyCommentMethod(comment)">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="25px" height="25px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
                                    <g>
                                        <g id="reply-all">
                                            <path d="M178.5,191.25v-76.5L0,293.25l178.5,178.5v-76.5l-102-102L178.5,191.25z M331.5,216.75v-102L153,293.25l178.5,178.5V367.2
                                                               C459,367.2,548.25,408,612,497.25C586.5,369.75,510,242.25,331.5,216.75z" fill="#1AAFD0"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="Comment-headerTitle" v-html="commentName">
                </div>
                <hr class="StoryFeed-separator StoryFeed-topSeparator">
                <div class="dropdown sort-menu">
                    <div class="dropdown">
                        <button class="btn btn-defualt glyphicon glyphicon-cog" type="button" data-toggle="dropdown"></button>
                        <ul class="dropdown-menu">
                           <li v-for="(val, key) in commentFilter">
                                <a :href="'#/' + key" @click="getSortByName(key)">{{key | capitalizeFirstLetter}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr class="StoryFeed-separator StoryFeed-topSeparator">
                <div v-for="comment in taskSubComments">
                        <div class="FeedBlockStory StoryFeed-blockStory">
                            <div class="BlockStory">
                                <div class="BlockStory-icon">
                                    <div v-if="comment.email">
                                        <avatar v-if="comment.image_url" :username="comment.email" :src="comment.image_url" :size="30"></avatar>
                                        <avatar v-else :username="comment.email" :size="30" color="#fff"></avatar>
                                    </div>
                                    <div v-if="visibleFilter === 'group_By'">
                                        <div v-if="comment.list[0].email">
                                            <avatar v-if="comment.list[0].image_url" :username="comment.list[0].email" :src="comment.list[0].image_url" :size="30"></avatar>
                                            <avatar v-else :username="comment.list[0].email" :size="30" color="#fff"></avatar>
                                        </div>
                                    </div>
                                </div>
                                <div class="BlockStory-block commentbox">
                                    <div class="BlockStory-header">
                                        <div class="BlockStory-headerContent">
                                            <span class="BlockStory-storyContent">
                                                <strong>
                                                    <a v-if="visibleFilter === 'all'" class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fullname | capitalizeFirstLetter }}</a>
                                                    <a v-if="visibleFilter === 'group_By'" class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fname | capitalizeFirstLetter}}</a>
                                                </strong>
                                                </span>
                                            <span class="BlockStory-metadata">
                                                <span class="BlockStory-timestamp" :title="comment.createdAt | parseDate">
                                                    <span>{{comment.createdAt | parseDateAgo}}</span>
                                            </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="BlockStory-body">
                                        <div class="truncatedRichText">
                                            <div class="richText truncatedRichText-richText" v-html="comment.comment"></div>
                                            <div v-if="visibleFilter === 'group_By'" v-for="userComment in comment.list" v-html="userComment.comment">
                                                <div class="richText truncatedRichText-richText">{{userComment.comment}}</div>
                                                <span class="BlockStory-metadata">
                                                <span class="BlockStory-timestamp" :title="comment.createdAt | parseDate">
                                                    <span>{{userComment.createdAt | parseDateAgo}}</span>
                                                </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="visibleFilter === 'all' " class="pull-right comment-delete" v-show="isDeleteComment">
                                        <span class="fa fa-close" @click="deleteCommnet(comment)"></span>
                                    </div>
                                    <div v-if="visibleFilter === 'all' " class="pull-right comment-delete">
                                        <span style="margin-right:5px;">{{comment.count ?  comment.count :0}}</span>
                                        <span class="fa fa-reply" @click="replyCommentMethod(comment)"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>      
            <!-- <right-footer></right-footer> -->
    </div>
    </template>
    <script>
        /* eslint-disable*/
        import Vue from 'vue'
        import { mapGetters } from 'vuex'
        import moment from 'moment';
        import { focus } from 'vue-focus';
        import notify from './notify.js'
        import RightFooter from './RightFooter.vue'
        import Comment from './Comment.vue'
        import * as services from '../services'
        import Avatar from 'vue-avatar/dist/Avatar'
        Vue.filter('parseDate', function (value) {
            console.log("Comment Dialog", value)
        if (value) {
          return moment(String(value)).calendar()
        }
      })
      Vue.filter('parseDateAgo', function (value) {
            console.log("Comment Dialog", value)
        if (value) {
          return moment(String(value)).fromNow()
        }
      })
      Vue.filter('capitalizeFirstLetter', function (str) {
            let str1 =  str.split('_').join(' ')
            return str1.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        })
      const commentFilter = {
            all: totalComment => totalComment,
            group_By: totalComment => _(totalComment).groupBy(x => x.fullname)
                            .map((value, key) => ({ fname: key, list: value })).value()
        }
        export default {
            components: {
                RightFooter,
                Comment,
                Avatar
            },
            props: ['show', 'commentTaskId', 'commentParentId', 'commentName'],
            directives: { focus: focus },
            data: function () {
                return {
                    projectName: '',
                    description: '',
                    privacyOption: '',
                    createProjectError: '',
                    privacyMsg: '',
                    createCommentBox: true,
                    focused: true,
                    imageURlProfilePic: "",
                    taskSubComments: [],
                    commentText: '',
                    commentFilter: commentFilter,
                    visibleFilter: 'all',
                    isDeleteComment: true
                }
            },
            mounted: function () {
            },
            created: function () {
                $("#new_project_dialog_content_name_input").focus();
                let vm=this;
                services.taskComments.on('created', message => {
                    if(message.parentId===vm.comment.id)
                    {
                        this.setcommenteduserData(message)
                        this.taskSubComments.push(message)
                    }
                })
                console.log("Comment created subcomment",this.comment);
                // services.taskComments.find({ query: { task_id:  this.commentTaskId, parentId:  this.commentParentId } }).then(response => {
                //         this.taskSubComments = response;
                //         this.getSubTaskComments();
                //     });
                // 
                // this.commentsFind()
                
            },
            watch: {
                commentParentId: function () {
                    console.log("Comment commentParentId watch",this.comment);
                    // this.$store.dispatch('taskComments', {task_id: this.commentParentId,parentId:this.comment.parentId})
                   
                    // services.taskComments.find({ query: { task_id:  this.commentTaskId, parentId:  this.commentParentId } }).then(response => {
                    //     this.taskSubComments = response;
                    //     this.getSubTaskComments();
                    // });

                    // this.commentsFind();
                },
                commentTaskId: function () {
                    console.log("Comment commentTaskId watch",this.comment);
                    // this.$store.dispatch('taskComments', {task_id: this.commentParentId,parentId:this.comment.parentId})
                   
                    // services.taskComments.find({ query: { task_id:  this.commentTaskId, parentId:  this.commentParentId } }).then(response => {
                    //     this.taskSubComments = commentFilter[this.visibleFilter](response);
                    //     this.getSubTaskComments();
                    // });
                    // this.commentsFind();
                },
                visibleFilter: function(){
                    this.taskSubComments = commentFilter[this.visibleFilter](this.taskSubComments);
                    console.log("visibale filter", this.taskSubComments)
                }
            },
            computed: {
                ...mapGetters({
                    getSubComments: 'getSubTaskComment',
                })
            },
            methods: {
                async commentsFind()
                {
                    services.taskComments.find({ query: { task_id:  this.commentTaskId, parentId:  this.commentParentId } }).then(response => {
                        this.taskSubComments = commentFilter[this.visibleFilter](response);
                        this.getSubTaskComments();
                    });
                },
                // close:function(comment)
                // {
                //     this.$store.dispatch('closeComment', comment)
                // },
                replyCommentMethod(comment){
                    this.replyComnet=comment;
                    comment.show_type='subcomment'
                    comment.parentId= this.commentParentId
                    console.log("Click Comment:--",comment)
                    let parentList=this.$store.state.parentIdArr;
                    let index = _.findIndex(parentList, function (d) { return d.parentId === comment.parentId })
                    console.log("Parent Index:------->",index)
    
                    let indexParent = _.findIndex(parentList, function (d) { return d.id === comment.parentId })
                    let tempC=parentList[indexParent];
                    this.$store.dispatch('closeChildComment', tempC)
    
                    // if(index<1)
                        this.$store.state.parentIdArr.push(comment)
                    // else
                    // {
                    //     Vue.set(this.$store.state.parentIdArr, index, comment)
                    // }
                    // this.updateDialogShow(true);
                    console.log("Parent Index after:-->",this.$store.state.parentIdArr)
                },
                insertComment: function () {
                    console.log("Insert Comment")
                    var vm = this
                    services.taskComments.create({
                        task_id:  this.commentTaskId,
                        commentBy: this.$store.state.userObject._id,
                        comment: this.commentText.trim(),
                        createdAt: new Date().toJSON(),
                        parentId:  this.commentParentId
                    }).then(function (response) {
                        // vm.setcommenteduserData(response)
                        // vm.taskSubComments.push(response)
                        // console.log("Task comment;--",this.taskSubComments)
                        // CmnFunc.sendEmailNotification("todo-mom@flows.com","igandhi@officebrain.com","","","Task Comment","<html><h3>Hello</h3><b>Task Comment Added</b></html>","");
                    })
                    // this.$store.dispatch('insertTaskComment',{"id": this.commentTaskId, "comment":this.commentText, "commentBy": this.$store.state.userObject._id,parentId: this.commentParentId})
                    this.commentText = ''
                },
                getSubTaskComments: function () {
                    this.taskSubComments.forEach(function (c) {
                        this.setcommenteduserData(c);
                    }, this)
                },
                setcommenteduserData: function (c) {
                    let userId = c.commentBy
                    let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
                    if (userIndex < 0) {
                    } else {
                        var id = this.$store.state.arrAllUsers[userIndex]._id
                        c.fullname = this.$store.state.arrAllUsers[userIndex].fullname
                        c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
                        c.email = this.$store.state.arrAllUsers[userIndex].email
                    }
                    console.log("---tasksubcomment---->", c)
                },
                getSortByName:function(key){
                    this.visibleFilter = key
                },
                deleteCommnet:function(commentObj){
                    this.$store.dispatch('delete_Comment', commentObj)
                },
                async onDeleteComment(id,level,created_by,typeId) {
                    let permisionResult=await CmnFunc.checkActionPermision(this,typeId,Constant.USER_ACTION.COMMENT,Constant.PERMISSION_ACTION.DELETE)
                    console.log("permisionResult Delete Comment-->",permisionResult)
                    if (!permisionResult && id != -1) {
                        this.isDeleteComment = false
                    } else {
                        this.isDeleteComment = true
                    }  
                },
            }
            
        }
    
    </script>
    <style>
    
    </style>