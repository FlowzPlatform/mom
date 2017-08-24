<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
        <div class="property-sheet-view"><div class="loading-boundary ">
            <div class="taskCommentsView ">
                <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                    <div class="react-mount-node photoView-reactMount">
                        <div data-reactroot="" class="Avatar Avatar--medium Avatar--color4">
                             <span v-if="imageURlProfilePic"><img v-bind:src="imageURlProfilePic" /></span>
                             <span v-else>{{ capitalizeLetters }}</span>
                        </div>
                    </div>
                </div>
                <!--<div class="taskCommentsView-composer is-expanded">
                    <div class="taskCommentsView-textarea">
                        <noscript></noscript>
                        <textarea  class="taskCommentsView-placeholder" id="property_sheet:details_property_sheet_field:comments" tabindex="710">
                            Write a comment…
                        </div>
                    </div>-->
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
    </div>
</template>
<script>
  /* eslint-disable*/
import { mapGetters } from 'vuex'
import Ckeditor from 'vue-ckeditor2'

export default {
  components:{
      Ckeditor
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
            //    var text = this.commentText
            console.log('Comment by', this.$store.state.userObject.fullname)
            this.$store.dispatch('insertTaskComment',{"id":this.filteredTodo.id, "comment":this.commentText, "commentBy": this.$store.state.userObject._id})
            this.commentText = ''
            let frame = document.getElementsByClassName('cke_reset')[3].contentWindow
            frame.document.getElementsByClassName('cke_editable cke_editable_themed cke_contents_ltr cke_show_borders')[0].innerHTML = '';
        }
        //  strip: function(this.commentText)
        // {
        // var tmp = document.implementation.createHTMLDocument("New").body;
        // tmp.innerHTML = this.commentText;
        // return tmp.textContent || tmp.innerText || "";
        // }
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