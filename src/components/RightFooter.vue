<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
        <div class="property-sheet-view"><div class="loading-boundary ">
            <div class="taskCommentsView ">
                <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                    <div class="react-mount-node photoView-reactMount">
                        <div data-reactroot="" class="Avatar Avatar--medium Avatar--color4">
                            <!-- react-text: 2 -->UN<!-- /react-text -->
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
	                <div class="taskCommentsView-composer is-expanded">
                        <span class="taskCommentsView-textarea">
                            <textarea rows="5" cols="50"
                                contenteditable="true" 
                                v-model="filteredTodo.parentTaskComment"
                                disable_highlighting_for_diagnostics="true" 
                                tabindex="10" 
                                class="field-description hypertext-input notranslate" 
                                id="property_sheet:details_property_sheet_field:description"
                                placeholder="Write Comment...">
                        </textarea><br> 
                    </span>
                </div>
                    <div class="taskCommentsView-toolbar">
                        <div id="details_property_sheet__new_comment_button" @click="updateComment(filteredTodo.id)" class="buttonView new-button new-primary-button buttonView--primary buttonView--default taskCommentsView-commentButton" style="" tabindex="710">
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
import store from './store.js'
export default {
  props: ['filteredTodo'],
  data: function () {
    return {
    }
  },
  methods:{
    updateComment : function(taskId)
    {
        if (taskId){
            this.$http.post('/updatetasks', {
                id: taskId,
                taskComment: this.filteredTodo.parentTaskComment,
            }).then(response => {
              console.log('task update', response.data)
          })
        }
    }
  }
}
</script>