<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">

    </div>
</template>
<script>
/* eslint-disable*/
import { mapGetters } from 'vuex'
import Ckeditor from 'vue-ckeditor2'
import { markdownEditor } from 'vue-simplemde'

// import { markdownEditor } from 'vue-simplemde'

import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


export default {
    components: {
        Ckeditor,
        markdownEditor
    },
    props: ['filteredTodo'],
    data: function() {
        return {
            picker1: null,
            imageURlProfilePic: this.$store.state.userObject.image_url,
            commentText: '',
            content: '',
            configs: {
                toolbar: ['undo', 'redo', 'bold', 'italic', 'strikethrough', 'heading', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', 'guide'],
                placeholder: 'Type here...'
            }
        }
    },
    methods: {
        insertComment: function(taskId) {
            if (this.commentText) {
                console.log('Comment by', this.$store.state.userObject.fullname)
                this.$store.dispatch('insertTaskComment', { "id": this.filteredTodo.id, "comment": this.commentText, "commentBy": this.$store.state.userObject._id })
                this.commentText = ''
                let frame = document.getElementsByClassName('cke_reset')[3].contentWindow
                frame.document.getElementsByClassName('cke_editable cke_editable_themed cke_contents_ltr cke_show_borders')[0].innerHTML = '';
            } else {
                console.log(this.content)
                console.log(this.$refs.markdownEditor.simplemde.markdown(this.content))
                var mdString = this.$refs.markdownEditor.simplemde.markdown(this.content).replace('<table>', '<table border=1 style="border:1px solid #bbb;">');
                var mdString2 = mdString.replace(new RegExp('<th>', 'g'), '<th style="padding:5px">');
                var mdString3 = mdString2.replace(new RegExp('<td>', 'g'), '<td style="padding:5px">');
                var mdString4 = mdString3
                this.$store.dispatch('insertTaskComment', { "id": this.filteredTodo.id, "comment": mdString4, "commentBy": this.$store.state.userObject._id })
                this.content = '';
            }
        }
    },
    computed: {
        capitalizeLetters: function() {
            var str = this.$store.state.userObject.email
            var firstLetters = str.substr(0, 2)
            return firstLetters.toUpperCase()
        },
        ...mapGetters({
            getComment: 'getCommentById'
        }),
        getCommentByTaskId() {
            let commentList = this.getComment(this.filteredTodo.id)
            return commentList
        }
    }
}
</script>
<style >
.markdown-editor {
    height: 500px;
}

.nav {
    right: 15px;
    z-index: 20;
    width: 45px;
    bottom: 15px;
    height: 45px;
    display: block;
    position: absolute;
    line-height: 45px;
    border-radius: 50%;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .75);
}

.mask {
    z-index: 21;
    color: #fff;
    width: inherit;
    height: inherit;
    cursor: pointer;
    font-size: 28px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    background: #f23363;
    -webkit-transition: all .1s ease-in-out 0s;
    transition: all .1s ease-in-out 0s;
}
</style>