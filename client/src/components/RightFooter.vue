<template>
    <div id="details_pane_footer" class="details-pane-redesign details-pane-footer">
        <div class="property-sheet-view">
            <div class="loading-boundary ">
                <div class="taskCommentsView ">
                    <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners taskCommentsView-photo">
                        <div v-if="$store.state.userObject.email" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <avatar v-if="$store.state.userObject.image_url" :username="$store.state.userObject.email" :src="$store.state.userObject.image_url"
                                :size="30"></avatar>
                            <avatar v-else :username="$store.state.userObject.email" :size="30" color="#fff"></avatar>
                        </div>
                    </div>
                    <div style="width: 475px;">
                        <el-tabs type="border-card">
                            <el-tab-pane>
                                <span slot="label">
                                    <i class="el-icon-date"></i> Html editor</span>
                                <div>
                                    <ckeditor v-model="commentText">
                                    </ckeditor>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Markdown editor">
                                <div class="markdownEditor">
                                    <!-- <markdown-editor>
                    </markdown-editor> -->
                                    <markdown-editor v-model="content" ref="markdownEditor" :value="content" :configs="configs">
                                    </markdown-editor>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>

                    <!-- <div>
                    <ckeditor v-model="commentText">
                    </ckeditor>
                </div>   -->
                    <!-- <div>
                    <markdown-editor>
                    </markdown-editor>
                </div>     -->
                    <div class="taskCommentsView-toolbar">
                        <div id="details_property_sheet__new_comment_button" @click="insertComment(commentTaskId)" class="buttonView new-button new-primary-button buttonView--primary buttonView--default taskCommentsView-commentButton"
                            style="" tabindex="710">
                            <span class="left-button-icon"></span>
                            <span class="new-button-text">Comment</span>
                            <span class="right-button-icon"></span>
                        </div>
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
       
        props: ['commentTaskId','commentParentId'],
        data: function () {
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
            insertComment: function (taskId) {
                if (this.commentText) {
                    console.log('Comment by', this.$store.state.userObject.fullname)
                    let comment = {
                            task_id: this.commentTaskId,
                            commentBy: this.$store.state.userObject._id,
                            comment: this.commentText.trim(),
                            parentId: this.commentParentId
                        };

                    this.$store.dispatch('insertTaskComment', comment)
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

                    let comment = {
                            task_id: this.commentTaskId,
                            commentBy: this.$store.state.userObject._id,
                            comment: mdString4.trim(),
                            parentId: this.commentParentId
                        };
                    this.$store.dispatch('insertTaskComment', comment)
                    this.content = '';
                }
            }
        },
        computed: {
            capitalizeLetters: function () {
                var str = this.$store.state.userObject.email
                var firstLetters = str.substr(0, 2)
                return firstLetters.toUpperCase()
            },
            ...mapGetters({
                getComment: 'getCommentById'
            }),
            getCommentByTaskId() {
                let commentList = this.getComment(this.commentTaskId)
                return commentList
            }
        }, components: {
            Ckeditor,
            markdownEditor,
            Avatar
        }
    }
</script>
