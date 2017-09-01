<template>
   <div class="markdownEditor">
    <markdown-editor 
    v-model="content"
    ref="markdownEditor"
    :value="content"
    :configs="configs"
    @input="handleInput"> 
   </markdown-editor> 
    <!-- {{content}}   -->
  </div> 
  
</template>

<script>
/* eslint-disable*/
import { markdownEditor } from 'vue-simplemde'
// import { simplemde } from 'vue-simplemde'

// Customize all information and/or add your own icons
export default {
  components: {
    markdownEditor
  },
  data () {
    return {
      content: '',
      configs: {
        toolbar: ['undo', 'redo', 'bold', 'italic', 'strikethrough', 'heading', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', 'guide'],
        placeholder: 'Type here...'
      }
    }
  },

  methods: {
    handleInput () {
      // var comments = this.content;
      
      // this.$store.state.comments = this.content;
      
      var mdString = this.$refs.markdownEditor.simplemde.markdown(this.content).replace('<table>','<table border=1 style="border:1px solid #bbb;">');
      var mdString2 = mdString.replace(new RegExp('<th>', 'g'),'<th style="padding:5px">');
      var mdString3 = mdString2.replace(new RegExp('<td>', 'g'),'<td style="padding:5px">');
      this.$store.state.comments = mdString3;

      // console.log("tetxarea",this.$refs.markdownEditor.simplemde.toTextArea())
      // console.log(this.$refs.markdownEditor.simplemde.clearAutosavedValue())
      // // console.log(this.$store.state.comments)
      // var comments = this.$store.state.comments;
      // console.log(comments)

      // console.log('Reference--->',this.$refs.markdownEditor.simplemde.markdown(this.content))
      // return customMarkdownParser(comments)
    }
  } 
}
</script>
<style>
 .markdown-editor{
  height: 500px;
}
 /* CodeMirror cm-s-paper CodeMirror-wrap CodeMirror-empty{
  height: 406px;
}  */
</style>
