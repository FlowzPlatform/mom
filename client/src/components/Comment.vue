<template>
    <div style="height:100%;overflow-x:scroll">
        <div class="nav">
            <div class="mask" @click="writeComment">
                <i id="icon-comment" class="fa fa-pencil"></i>
            </div>
        </div>
        <component :is="currentView" :filteredTodoObj="filteredTodo"></component>

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
import ViewComments from './ViewComments.vue'
import RightFooter from './RightFooter.vue'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


export default {
    components: {
        ViewComments,
        RightFooter
    },
    props: ['filteredTodo'],
    data: function() {
        return {
            currentView: ViewComments,
            isReadComment: true
        }
    },
    methods: {
        writeComment: function() {

            // Write comment
            if (this.isReadComment) {
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            } else {
                this.currentView = ViewComments
                // Read comment
                $("#icon-comment").removeClass('fa-comments-o');
                $("#icon-comment").addClass('fa-pencil');
            }

            this.isReadComment = !this.isReadComment
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
    /* bottom: 50px; */
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
    /*bottom: 50px; */
    background: #f23363;
    -webkit-transition: all .1s ease-in-out 0s;
    transition: all .1s ease-in-out 0s;
}
</style>