<template>
    <div class="SingleTaskPane-feed">
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
                                    <div data-reactroot="" class="Avatar Avatar--medium Avatar--color4">
                                            <span v-if="comment.image_url"><img v-bind:src="comment.image_url" /></span>
                                            <span v-else>{{ comment.email | capitalizeLetters }}</span>
                                        <div v-if="visibleFilter === 'groupByComment'">
                                            <span v-if="comment.list[0].image_url"><img v-bind:src="comment.list[0].image_url" /></span>
                                            <span v-else>{{ comment.list[0].email | capitalizeLetters }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BlockStory-block">
                            <div class="BlockStory-header">
                                <div class="BlockStory-headerContent">
                                    <span class="BlockStory-storyContent">
                                            <a class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fullname  }}</a>
                                            <a v-if="visibleFilter === 'groupByComment'" class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.list[0].fullname }}</a>
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
                                    <div v-if="visibleFilter === 'groupByComment'" v-for="userComment in comment.list">
                                        <div class="richText truncatedRichText-richText">{{userComment.comment}}</div>
                                        <span class="BlockStory-metadata">
                                        <span class="BlockStory-timestamp">
                                            <span>{{userComment.createdAt | formatDate}}</span>
                                        </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="pull-right comment-delete">
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
    Vue.filter('capitalizeLetters', function (str) {
        if (str) {
            var firstLetters = str.substr(0, 2)
            return firstLetters.toUpperCase()
        }
    })
    Vue.filter('capitalizeFirstLetter', function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    })
    const commentFilter = {
        allCommnet: totalComment => totalComment,
        groupByComment: totalComment => _(totalComment).groupBy(x => x.fullname)
                        .map((value, key) => ({ fname: key, list: value })).value()
    }
    export default {
        props: ['filteredTodo'],
        data: function () {
            return {
                commentFilter: commentFilter,
                visibleFilter: 'allCommnet'
            }
        },
        created() {
            this.filteredTodo.groupBy = false
            // this.getSortByName();
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
            // getSortByName: function () {
            //     this.commentList =this.test
            //     this.filteredTodo.groupBy = !this.filteredTodo.groupBy
            //     this.commentDetailList(this.commentList)
            //     console.log("commentList",this.commentList)
            //     if (!this.filteredTodo.groupBy) {
            //         console.log("commentList false",this.commentList)
            //         this.result = this.commentList;
            //     } else {
            //         console.log("commentList true",this.commentList)
            //         this.result = _(this.commentList).groupBy(x => x.fullname)
            //             .map((value, key) => ({ fname: key, list: value })).value()
            //         console.log("result", this.result)
            //     }
            // },
            getSortByName:function(key){
                this.filteredTodo.groupBy = !this.filteredTodo.groupBy
                this.visibleFilter = key
            },
            deleteCommnet:function(commentObj){
                this.$store.dispatch('delete_Comment', commentObj)
            }

        },
        computed: {
            ...mapGetters({
                getComment:'getCommentById',
            }),
           test(){
                let commentList = this.getComment(this.filteredTodo.id)
                this.commentDetailList(commentList)
                console.log("Test Called",commentFilter[this.visibleFilter](commentList))
                return commentFilter[this.visibleFilter](commentList)   
                
            },
            totalComment: function () {
                return this.$store.getters.getCommentById(this.filteredTodo.id)
            }
        }
    }

</script>       