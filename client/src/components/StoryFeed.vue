<template>
    <div class="SingleTaskPane-feed" v-if="test.length > 0">
        <div class="StoryFeed">
            <hr class="StoryFeed-separator StoryFeed-topSeparator">
            <div class="dropdown sort-menu">
                <div class="dropdown">
                    <button class="btn btn-defualt glyphicon glyphicon-cog" type="button" data-toggle="dropdown"></button>
                    <ul class="dropdown-menu">
                       <li v-for="(val, key) in commentFilter">
                            <a :href="'#/' + key" @click="getSortByName(key)" >{{key | capitalizeFirstLetter}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr class="StoryFeed-separator StoryFeed-topSeparator">
            <div v-for="comment in test">
                <div class="FeedBlockStory StoryFeed-blockStory">
                    <div class="BlockStory">
                        <div class="BlockStory-icon">
                            <div class="photo-view presulthoto-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                                <div class="react-mount-node photoView-reactMount">
                                    <div data-reactroot="">
                                        <div v-if="comment.email">
                                            <avatar v-if="comment.image_url" :username="comment.email" :size="30" :src="comment.image_url"></avatar>
                                            <avatar v-else :username="comment.email" color="#fff" :size="30"></avatar>
                                        </div>
                                        <div v-if="visibleFilter === 'group_By'">
                                            <div v-if="comment.list[0].email">
                                                <avatar v-if="comment.list[0].image_url" :username="comment.list[0].email" :size="30" :src="comment.list[0].image_url"></avatar>
                                                <avatar v-else :username="comment.list[0].email" color="#fff" :size="30"></avatar>
                                            </div>
                                        </div>
                                    </div>
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
                                        <span class="BlockStory-timestamp">
                                            <span>{{comment.createdAt | formatDate}}</span>
                                    </span>
                                    </span>
                                </div>
                            </div>
                            <div class="BlockStory-body">
                                <div class="truncatedRichText">
                                    <div class="richText truncatedRichText-richText">{{comment.comment}}</div>
                                    <div v-if="visibleFilter === 'group_By'" v-for="userComment in comment.list">
                                        <div class="richText truncatedRichText-richText">{{userComment.comment}}</div>
                                        <span class="BlockStory-metadata">
                                        <span class="BlockStory-timestamp">
                                            <span>{{userComment.createdAt | formatDate}}</span>
                                        </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="visibleFilter === 'all' " class="pull-right comment-delete">
                                <span class="fa fa-close" @click="deleteCommnet(comment)"></span>
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
    import Vue from 'vue';
    import moment from 'moment';
    import { mapGetters } from 'vuex'
    import CmnFunc from './CommonFunc.js'
    import * as Constant from './Constants.js'
    import Avatar from 'vue-avatar/dist/Avatar'
    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(String(value)).format('LLL')
        }
    })
    Vue.filter('capitalizeLetters', function(str){
        if(str){
            var firstLetters = str.substr(0, 2)
            return firstLetters.toUpperCase()
        }
    })
    // Vue.filter('capitalizeFirstLetter', function (str) {
    //     let str1 =  str.split('_').join(' ')
    //     return str1.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    // })
    const commentFilter = {
        all: totalComment => totalComment,
        group_By: totalComment => _(totalComment).groupBy(x => x.fullname)
                        .map((value, key) => ({ fname: key, list: value })).value()
    }
    export default {
        props: ['filteredTodo'],
        data: function () {
            return {
                commentFilter: commentFilter,
                visibleFilter: 'all'
            }
        },
        methods: {
            commentDetailList: function (comment_list) {
                comment_list.forEach(function (c) {
                    let userId = c.commentBy
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



        },
        computed: {
            ...mapGetters({
                getComment:'getCommentById',
            }),
           test(){
                let commentList = this.getComment(this.filteredTodo.id)
                this.commentDetailList(commentList)
                return commentFilter[this.visibleFilter](commentList)   
                
            },
            totalComment: function () {
                return this.$store.getters.getCommentById(this.filteredTodo.id)
            }
        },
        components: {
            Avatar
        }
    }

</script>       