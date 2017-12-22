<template>
    <div>
        <!-- <div class="comment-title" v-html="commentName">{{commentName}}</div> -->
        <!-- <task-heading :commentName="commentName"></task-heading> -->
        <div :id="id">
            <div class="nav1">
                <div class="share" :id="setCommentId('share')" @click="writeComment">
                    <i id="icon-comment" class="fa fa-pencil"></i>
                </div>
                <div class="one" :id="setCommentId('one')">
                    <i class="fa fa-code" title="Quill editor" @click="htmlEditor"></i>
                </div>
                <div class="two" :id="setCommentId('two')">
                    <i class="fa fa-html5" title="Markdown editor" @click="markdownEditor"></i>
                </div>
            </div>
            <component :is="currentView" :view="view" :commentTaskId="commentTaskId" :commentParentId="commentParentId"></component>
            <div class="todoapp comment_right_bar hidden">
                <div class="comment-header header-scroll">
                </div>
                <div class="StoryFeed hidden">
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
                                        <span style="margin-right:5px;">{{comment.count ? comment.count :0}}</span>
                                        <span class="fa fa-reply" @click="replyCommentMethod(comment)"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import moment from 'moment';
    import { focus } from 'vue-focus';
    import notify from './notify.js'
    import Comment from './Comment.vue'
    import * as services from '../services'
    import Avatar from 'vue-avatar/src/Avatar'
    import ViewComments from './ViewComments.vue'
    import RightFooter from './RightFooter.vue'
    import TaskHeading from './TaskHeading.vue'
    const commentFilter = {
        all: totalComment => totalComment,
        group_By: totalComment => _(totalComment).groupBy(x => x.fullname)
            .map((value, key) => ({ fname: key, list: value })).value()
    }

    export default {
        components: {
            RightFooter,
            Comment,
            Avatar,
            ViewComments,
            TaskHeading
        },
        props: ['show', 'commentTaskId', 'commentParentId', 'commentName', 'id'],
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
                isDeleteComment: true,
                currentView: ViewComments,
                isReadComment: true,
                flag: 0,
                view: ""
            }
        },
        created: function () {
            $("#new_project_dialog_content_name_input").focus();
            let vm = this;
        },
        watch: {
            commentParentId: function () {
                console.log("Comment commentParentId watch", this.comment);

            },
            commentTaskId: function () {
                console.log("Comment commentTaskId watch", this.comment);
            },
            visibleFilter: function () {
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
            async commentsFind() {
                services.taskComments.find({ query: { task_id: this.commentTaskId, parentId: this.commentParentId } }).then(response => {
                    this.taskSubComments = commentFilter[this.visibleFilter](response);
                    this.getSubTaskComments();
                });
            },
            writeComment: function () {
                if (this.flag === 0) {
                    $('#' + this.setCommentId("share")).siblings('.one').animate({
                        top: '-60px',
                        left: '50%',
                    }, 200);

                    $('#' + this.setCommentId("share")).siblings('.two').delay(200).animate({
                        top: '-120px',
                        left: '50%'
                    }, 200);

                    $('#' + this.setCommentId("share")).siblings('.three').delay(300).animate({
                        top: '260px',
                        left: '60%'
                    }, 200);

                    // $('.one i,.two i, .three i').delay(500).fadeIn(200);
                    // this.flag = 1;
                    $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeIn(200);
                    this.flag = 1;
                }
                else {
                    $('#' + this.setCommentId('one')).animate({
                        top: '300px',
                        left: '50%'
                    }, 200);
                    $('#' + this.setCommentId('two')).animate({
                        top: '300px',
                        left: '50%'
                    }, 200);

                    // $('.one i,.two i, .three i').delay(500).fadeOut(200);
                    $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                    this.flag = 0;
                }
                this.currentView = ViewComments
                // Read comment
                $("#icon-comment").removeClass('fa-comments-o');
                $("#icon-comment").addClass('fa-pencil');
                this.isReadComment = !this.isReadComment
            },
            htmlEditor() {
                $('#' + this.setCommentId('one')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);
                $('#' + this.setCommentId('two')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);

                $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                this.flag = 0;

                this.view = "htmlEditor"
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            },
            markdownEditor() {
                $('#' + this.setCommentId('one')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);
                $('#' + this.setCommentId('two')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);

                $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                this.flag = 0;

                this.view = "markdownEditor"
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            },
            replyCommentMethod(comment) {
                this.replyComnet = comment;
                comment.show_type = 'subcomment'
                comment.parentId = this.commentParentId
                // console.log("Click Comment:--", comment)
                let parentList = this.$store.state.parentIdArr;
                let indexParent = _.findIndex(parentList, function (d) { return d.id === comment.parentId })
                let tempC = parentList[indexParent];
                this.$store.dispatch('closeChildComment', tempC)
                this.$store.state.parentIdArr.push(comment)
            },
            insertComment: function () {
                var vm = this
                services.taskComments.create({
                    task_id: this.commentTaskId,
                    commentBy: this.$store.state.userObject._id,
                    comment: this.commentText.trim(),
                    createdAt: new Date().toJSON(),
                    parentId: this.commentParentId
                }).then(function (response) {
                })
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
            },
            getSortByName: function (key) {
                this.visibleFilter = key
            },
            deleteCommnet: function (commentObj) {
                this.$store.dispatch('delete_Comment', commentObj)
            },
            async onDeleteComment(id, level, created_by, typeId) {
                let permisionResult = await CmnFunc.checkActionPermision(this, typeId, Constant.USER_ACTION.COMMENT, Constant.PERMISSION_ACTION.DELETE)
                if (!permisionResult && id != -1) {
                    this.isDeleteComment = false
                } else {
                    this.isDeleteComment = true
                }
            },
            setCommentId(value) {
                return this.commentParentId ? value + "-" + this.commentParentId : value + "-" + 1
            }
        }
    }    
</script>