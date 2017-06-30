<template>
    <div class="SingleTaskPane-feed">
        <div class="StoryFeed">
            <hr class="StoryFeed-separator StoryFeed-topSeparator">
            <div v-for="comment in commentList">
                <div class="FeedBlockStory StoryFeed-blockStory">
                    <div class="BlockStory">
                        <div class="BlockStory-icon">
                            <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                                <div class="react-mount-node photoView-reactMount">
                                    <div data-reactroot="" class="Avatar Avatar--medium Avatar--color4">
                                        <span v-if="comment.image_url"><img v-bind:src="comment.image_url" /></span>
                                        <span v-else>{{ comment.email | capitalizeLetters }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BlockStory-block">
                            <div class="BlockStory-header">
                                <div class="BlockStory-headerContent">
                                    <span class="BlockStory-storyContent">
                                            <a class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fullname}}</a>
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
    Vue.filter('capitalizeLetters', function(str){
        if(str){
            var firstLetters = str.substr(0, 2)
            return firstLetters.toUpperCase()
        }
    })
    export default {
        props: ['filteredTodo'],
        data: function () {
            return {
            }
        },
        created() {
            // this.$store.dispatch('getTaskComment', this.filteredTodo.id)
        },
        methods:{
            commentDetailList:function(commentList){
                commentList.forEach(function(c) {
                let userId =c.commentBy
                let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
                if(userIndex < 0){
                } else {
                    var id = this.$store.state.arrAllUsers[userIndex]._id
                    c.fullname = this.$store.state.arrAllUsers[userIndex].fullname
                    c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
                    c.email = this.$store.state.arrAllUsers[userIndex].email
                }
                
                }, this)
            }
        },
        computed: {
            ...mapGetters({
                getComment: 'getCommentById'
            }),
            commentList() {
                let commentList = this.getComment(this.filteredTodo.id)
                this.commentDetailList(commentList)
                return commentList

            }
        }
    }

</script>