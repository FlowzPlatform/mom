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
                                        <span v-if="imageURlProfilePic"><img v-bind:src="comment.image_url" /></span>
                                        <span v-else>{{ capitalizeLetters }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BlockStory-block">
                            <div class="BlockStory-header">
                                <div class="BlockStory-headerContent">
                                    <span class="BlockStory-storyContent">
                                            <a class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.username}}</a>
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
            return moment(String(value)).format('MMM DD, h:mm')
        }
    })
    export default {
        props: ['filteredTodo'],
        data: function () {
            return {
                imageURlProfilePic: this.$store.state.userObject.image_url,
            }
        },
        created() {
            // this.$store.dispatch('getTaskComment', this.filteredTodo.id)
        },
        computed: {
            capitalizeLetters: function () {
                var str = this.$store.state.userObject.email
                var firstLetters = str.substr(0, 2)
                return firstLetters.toUpperCase()
            },
            ...mapGetters({
                getComment: 'getCommentById'
            }),
            commentList() {
                let commentList = this.getComment(this.filteredTodo.id)
                console.log('Commentlist', commentList)
                return commentList
            }
        }
    }

</script>