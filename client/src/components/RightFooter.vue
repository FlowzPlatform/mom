<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
        <div class="property-sheet-view"><div class="loading-boundary ">
            <div class="taskCommentsView ">
                <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                    <div v-if="$store.state.userObject.email" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <avatar v-if="$store.state.userObject.image_url" :username="$store.state.userObject.email" :src="$store.state.userObject.image_url" :size="30"></avatar>
                        <avatar v-else :username="$store.state.userObject.email" :size="30" color="#fff"></avatar>
                      </div>
                </div>
              <div style="width: 475px;">
               <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-date"></i> Html editor</span>
                <div>
                    <ckeditor v-model="commentText">
                    </ckeditor>
                </div>
                    <div class="taskCommentsView-toolbar">
                        <div id="details_property_sheet__new_comment_button" @click="insertComment(filteredTodo.id)" class="buttonView new-button new-primary-button buttonView--primary buttonView--default taskCommentsView-commentButton" style="" tabindex="710">
                            <span class="left-button-icon"></span>
                            <span class="new-button-text">Comment</span>
                            <span class="right-button-icon"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
    </div>
</div>
</template>
<script>
  /* eslint-disable*/
import { mapGetters } from 'vuex'
import Ckeditor from 'vue-ckeditor2'
import { markdownEditor } from 'vue-simplemde'
// import { markdownEditor } from 'vue-simplemde'
import Avatar from 'vue-avatar/dist/Avatar'
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


export default {
  components:{
      Ckeditor,
      markdownEditor,
      Avatar
  },
  props: ['filteredTodo'],
  data: function () {
    return {
      picker1: null,
      imageURlProfilePic: this.$store.state.userObject.image_url,
      commentText:''
    }
  },
  methods:{
        insertComment: function(taskId){
        this.$store.dispatch('insertTaskComment',{"id":this.filteredTodo.id, "comment":this.commentText, "commentBy": this.$store.state.userObject._id})
        this.commentText = ''
    }
  },
  computed: {
    capitalizeLetters: function(){
      var str = this.$store.state.userObject.email
      var firstLetters = str.substr(0,2)
      return firstLetters.toUpperCase()
    },
    ...mapGetters({
            getComment: 'getCommentById'
        }),
        getCommentByTaskId(){
            let commentList = this.getComment(this.filteredTodo.id)
            return commentList
        }
  }
}
</script>