<template>
    <div>
        <!-- <div class="comment-title" v-html="commentName">{{commentName}}</div> -->
        <!-- <task-heading :commentName="commentName"></task-heading> -->
        <TaskHeadAction :id='id' :closeDiv="closeDiv" :pinIt="pinit" :isPinned="isPinned" v-show='commentParentId'></TaskHeadAction>
        <div  v-html="commentName" style="padding:  15px;text-align:  left;" v-show="commentName.length>0">{{commentName}}</div>    
        <div :id="id">
            <div class="nav1">
                <div class="share" :id="setCommentId('share')" @click="writeComment">
                    <i id="icon-comment" class="fa fa-pencil"></i>
                </div>
                <div class="one" :id="setCommentId('one')">
                    <i class="fa fa-code" title="Quill editor" @click="htmlEditor"></i>
                </div>
                <div class="two" :id="setCommentId('two')">
                    <i class="fa fa-html5" title="Markdown editor" @click="markdownEditor"></i>
                </div>
            </div>
            <component :is="currentView" :view="view" :commentTaskId="commentTaskId" :commentParentId="commentParentId" :id="id"></component>
        </div>
    </div>
</template>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import moment from 'moment';
    import { focus } from 'vue-focus';
    import notify from './notify.js'
    import ViewComments from './ViewComments.vue'
    import RightFooter from './RightFooter.vue'
    import TaskHeading from './TaskHeading.vue'
    import TaskHeadAction from './TaskHeadAction.vue'

    export default {
        components: {
            RightFooter,
            ViewComments,
            TaskHeading,
            TaskHeadAction
        },
        props: ['commentTaskId', 'commentParentId', 'commentName', 'id','isPinned'],
        directives: { focus: focus },
        data: function () {
            return {
                currentView: ViewComments,
                isReadComment: true,
                flag: 0,
                view: ""
            }
        },
        methods: {
            closeDiv:function()
            {
                console.log("Close Comment On Click")
                this.$store.dispatch('closeComment', this.commentParentId)
            },
            pinit:function()
            {   var self=this;
                let index = _.findIndex(this.$store.state.parentIdArr, function (d) { return d.id == self.commentParentId })
                if(index>-1)
                {
                    // this.$store.state.parentIdArr[index].isPinned=!this.isPinned
                    Vue.set(this.$store.state.parentIdArr[index],"isPinned",!this.isPinned)                        

                }
                
            },        
            writeComment: function () {
                if (this.flag === 0) {
                    $('#' + this.setCommentId("share")).siblings('.one').animate({
                        top: '-60px',
                        left: '50%',
                    }, 200);

                    $('#' + this.setCommentId("share")).siblings('.two').delay(200).animate({
                        top: '-120px',
                        left: '50%'
                    }, 200);

                    $('#' + this.setCommentId("share")).siblings('.three').delay(300).animate({
                        top: '260px',
                        left: '60%'
                    }, 200);

                    // $('.one i,.two i, .three i').delay(500).fadeIn(200);
                    // this.flag = 1;
                    $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeIn(200);
                    this.flag = 1;
                }
                else {
                    $('#' + this.setCommentId('one')).animate({
                        top: '300px',
                        left: '50%'
                    }, 200);
                    $('#' + this.setCommentId('two')).animate({
                        top: '300px',
                        left: '50%'
                    }, 200);

                    // $('.one i,.two i, .three i').delay(500).fadeOut(200);
                    $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                    this.flag = 0;
                }
                this.currentView = ViewComments
                // Read comment
                $("#icon-comment").removeClass('fa-comments-o');
                $("#icon-comment").addClass('fa-pencil');
                this.isReadComment = !this.isReadComment
            },
            htmlEditor() {
                $('#' + this.setCommentId('one')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);
                $('#' + this.setCommentId('two')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);

                $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                this.flag = 0;

                this.view = "htmlEditor"
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            },
            markdownEditor() {
                $('#' + this.setCommentId('one')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);
                $('#' + this.setCommentId('two')).animate({
                    top: '300px',
                    left: '50%'
                }, 200);

                $('#' + this.setCommentId('one') + " i," + '#' + this.setCommentId('two') + " i").delay(500).fadeOut(200);
                this.flag = 0;

                this.view = "markdownEditor"
                this.currentView = RightFooter
                $("#icon-comment").removeClass('fa-pencil');
                $("#icon-comment").addClass('fa-comments-o');
            },
            setCommentId(value) {
                return this.commentParentId ? value + "-" + this.commentParentId : value + "-" + this.commentTaskId
                // return this.commentParentId ? value + "-" + this.commentParentId : value + "-" + 1
            }
        }
    }    
</script>