<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
        <!-- <div class="Comment-headerTitle" v-html="commentName">
          </div> -->
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
</template>
<script>
/* eslint-disable*/
import { mapGetters } from "vuex";

// import { markdownEditor } from 'vue-simplemde'
import Avatar from 'vue-avatar/dist/Avatar'
import Vue from "vue";
import moment from 'moment';
import * as services from '../services'
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });

  Vue.filter('parseDate', function (value) {
    // console.log("Comment Dialog", value)
    if (value) {
      return moment(String(value)).calendar()
    }
  })
  Vue.filter('parseDateAgo', function (value) {
    // console.log("Comment Dialog", value)
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
            // if (message.parentId === vm.commentParentId) {       
              let index = _.findIndex(this.taskComments, function (d) { return d.task_id == message.task_id && d.id == message.parentId})
        console.log("--Counter----indes:--",index)
      // let counterUpdateComment=state.taskComment[index];
      // console.log("--Counter----counterUpdateComment :; ",counterUpdateComment)  
      if(index>-1)
        this.taskComments[index].count+=1
     
      // Vue.set(state.taskComment[index],'count',5)
              // this.setcommenteduserData(message)
              // this.taskSubComments.push(message)
            // }
          });
  },
  methods: {
    replyCommentMethod(comment) {
      comment.show_type = 'subcomment'
      comment.parentId = this.commentParentId 
      console.log("Click Comment:--", comment)
      let parentList = this.$store.state.parentIdArr;
      // let index = _.findIndex(parentList, function (d) { return d.parentId === comment.parentId })
      // console.log("parentList:------->", index)
      
      
      let indexParent = _.findIndex(parentList, function (d) { return d.id === comment.parentId })
      
      if (indexParent < 0) {
      let tempParentId=this.commentParentId;
        // parentList.forEach(function(element,index) {
        //     console.log("element::-",element);
        //     console.log("element index::-",index);
        //     if(element.show_type==="subcomment")
        //     { 
        //       tempParentId=element.id;
        //        this.$store.state.parentIdArr.splice(index,1)
              
        //     }

        //   }, this);
          this.$store.state.parentIdArr.length=1;
        } else {
          let tempC = parentList[indexParent];
          console.log("Parent Index indexParent:------->", indexParent)
          console.log("Parent Index:------->", tempC)
          this.$store.dispatch('closeChildComment', tempC)
        }
        // if(index<1)
        this.$store.state.parentIdArr.push(comment)
      // else
      // {
      //     Vue.set(this.$store.state.parentIdArr, index, comment)
      // }
      // this.updateDialogShow(true);
      console.log("Parent Index after:-->", this.$store.state.parentIdArr)
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
      //console.log("---tasksubcomment---->", c)
    },
    getSortByName:function(key){
        this.visibleFilter = key
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
        // console.log("visibale filter", this.taskSortComments)
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
<style >
.markdown-editor {
  height: 500px;
}
</style>