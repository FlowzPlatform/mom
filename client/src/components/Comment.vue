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
import { markdownEditor } from 'vue-simplemde'
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
            if (this.isReadComment) {
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            } else {
                this.currentView = ViewComments
                $("#icon-comment").removeClass('fa-comments-o');
                $("#icon-comment").addClass('fa-pencil');
            }
            this.isReadComment = !this.isReadComment
        }
    }
}
</script>
