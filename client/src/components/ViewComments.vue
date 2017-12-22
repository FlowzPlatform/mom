<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
      <!-- <hr class="StoryFeed-separator StoryFeed-topSeparator"> -->
      <div class="dropdown sort-menu">
        <div class="dropdown">
          <button class="btn btn-defualt glyphicon glyphicon-cog setColor" type="button" data-toggle="dropdown"></button>
          <ul class="dropdown-menu">
            <li v-for="(val, key) in commentFilter">
              <a :href="'#/' + key" @click="getSortByName(key)">{{key | capitalizeFirstLetter}}</a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="StoryFeed-separator StoryFeed-topSeparator">
      <div v-for="comment in taskSortComments">
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
                      <a v-if="visibleFilter === 'all'" class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fullname | capitalizeFirstLetter}}</a>
                      <a v-if="visibleFilter === 'group_By'" class="DeprecatedNavigationLink BlockStory-actorLink">{{comment.fname | capitalizeFirstLetter}}</a>
                    </strong>
                  </span>
                  <span class="BlockStory-metadata">
                    <span class="BlockStory-timestamp" :title="comment.createAt | parseDate">
                      <span>{{comment.createAt | parseDateAgo}}</span>
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
                      <span class="BlockStory-timestamp" :title="comment.createAt | parseDate">
                        <span>{{userComment.createAt | parseDateAgo}}</span>
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
</template>
<script>
/* eslint-disable*/
import { mapGetters } from "vuex";
import Avatar from 'vue-avatar/src/Avatar'
import Vue from "vue";
import moment from 'moment';
import * as services from '../services'

  Vue.filter('parseDate', function (value) {
    if (value) {
      return moment(String(value)).calendar()
    }
  })
  Vue.filter('parseDateAgo', function (value) {
    if (value) {
      return moment(String(value)).fromNow()
    }
  })
  Vue.filter('capitalizeFirstLetter', function (str) {
    if(!str)
      return ""
    let str1 = str.split('_').join(' ')
    return str1.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  })
  const commentFilter = {
    all: totalComment => totalComment,
    group_By: totalComment => _(totalComment).groupBy(x => x.fullname)
      .map((value, key) => ({ fname: key, list: value })).value()
  }

export default {
  components: {
    Avatar
  },
  props: ['commentTaskId','commentParentId'],
  data: function() {
    return {
      picker1: null,
      imageURlProfilePic: this.$store.state.userObject.image_url,
      commentText: "",
      content: "",
      taskComments:[],
      taskSortComments:[],
      commentFilter: commentFilter,
      visibleFilter: 'all',
      isDeleteComment:true,
      configs: {
        toolbar: [
          "undo",
          "redo",
          "bold",
          "italic",
          "strikethrough",
          "heading",
          "quote",
          "unordered-list",
          "ordered-list",
          "clean-block",
          "link",
          "image",
          "table",
          "horizontal-rule",
          "preview",
          "side-by-side",
          "fullscreen",
          "guide"
        ],
        placeholder: "Type here..."
      }
    };
  },
  created: function () {
        services.taskComments.find({ query: { task_id: this.commentTaskId, parentId: this.commentParentId ? this.commentParentId:'' } }).then(response => {
          this.taskSortComments = response;
          this.getSubTaskComments();
          this.taskComments=this.taskSortComments.slice();
        });

        let vm=this;
        services.taskComments.on('created', message => {
            let indexCount = _.findIndex(this.taskComments, function (d) { return d.task_id == message.task_id && d.id == message.parentId})
            // Comment counter increament
            if (indexCount>-1){
               this.taskComments[indexCount].count+=1
            }
            // Add new comment
             let index = _.findIndex(this.taskSortComments, function (d) { return d.id == message.id})
              if(index<0 && indexCount<0){
                this.setcommenteduserData(message);
                this.taskSortComments.unshift(message)
                this.taskComments.unshift(message) 
              }

        });
        services.taskComments.on('removed', message => {
            //   let index = _.findIndex(this.taskSortComments, function (d) { return d.id == message.id})

              
            // let indexCount = _.findIndex(this.taskComments, function (d) { return d.task_id == message.task_id && d.id == message.parentId})
            // Comment counter decreament
            let indexCount = _.findIndex(this.taskComments, function (d) { return d.task_id == message.task_id && d.id == message.parentId})
            if (indexCount>-1){
               this.taskComments[indexCount].count-=1
            }
            // Remove comment
             let index = _.findIndex(this.taskSortComments, function (d) { return d.id == message.id})
              if(index>-1 && indexCount<0){
                this.taskSortComments.splice(index,1)
                this.taskComments=this.taskSortComments.slice();
              }

            }
        );
  },
  methods: {
    replyCommentMethod(comment) {
      comment.show_type = 'subcomment'
      comment.parentId = this.commentParentId 
      let parentList = this.$store.state.parentIdArr;
      let index;
      if(!comment.parentId){
        index = _.findIndex(parentList, function (d) { return d.id === comment.task_id })
      }else{
        index= _.findIndex(parentList, function (d) { return d.id === comment.parentId })
      }
      console.log("Index copy:-->",index);

      this.$store.state.parentIdArr.splice(index+1, 0, comment)
    },
    getSubTaskComments: function () {
      this.taskSortComments.forEach(function (c) {
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
    getSortByName:function(key){
      this.visibleFilter = key
    },
    deleteCommnet:function(commentObj){
      this.$store.dispatch('delete_Comment', commentObj)
    }
  },
  watch: {
      commentTaskId: function () {
        services.taskComments.find({ query: { task_id: this.commentTaskId, parentId:  this.commentParentId ? this.commentParentId:'' } }).then(response => {
          this.taskSortComments = response;
          this.getSubTaskComments();
        });
      },
      commentParentId: function () {
        services.taskComments.find({ query: { task_id: this.commentTaskId, parentId:  this.commentParentId ? this.commentParentId:''} }).then(response => {
          this.taskSortComments = response;
          this.getSubTaskComments();
        });
      },
      visibleFilter: function () {
        this.taskSortComments = commentFilter[this.visibleFilter](this.taskComments);
      }
    },
  computed: {
    capitalizeLetters: function() {
      var str = this.$store.state.userObject.email;
      var firstLetters = str.substr(0, 2);
      return firstLetters.toUpperCase();
    }
  }
};
</script>
