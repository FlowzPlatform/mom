<template>
    <div> 
      <Progress :percent="$store.state.progress" v-show="filteredTodo.attachmentprogress"></Progress>
        <!-- <div v-show="filteredTodo.deleteprogress">
          <img  src="../assets/attach_delete.gif" style="width:30px; height:30px;"/>
          <span class="del_attachment_text">Deleting...</span>
       </div>   -->
        <div v-bind:key="index" v-for="(files, index) in attachmentList">
            <Card style="margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:3px;">
                <p slot="title">
                    <span style="float:left">
                        <div v-if="files.email">
                            <avatar v-if="files.image_url" :username="files.email" :src="files.image_url" :size="30"></avatar>
                            <avatar v-else :username="files.email" :size="30" color="#fff"></avatar>
                        </div>
                    </span>
                    <span class="attachment-username">
                        <span style="font-size:10px">{{files.fullname}} </span>
                         <span class="BlockStory-timestamp">
                                <span>{{logDate(files.created_on)}}</span>
                         </span>
                    </span>
                    <Dropdown @on-click="moreActionMenuClick" trigger="click" placement="bottom" class="close-btn">
                        <a href="javascript:void(0)">
                            <Icon style="font-size:20px;color:rgb(149, 152, 157)" type="android-more-horizontal"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="1"><span style="padding:10px" @click="deleteAttachment(files, index)">Delete</span></DropdownItem>
                            <DropdownItem class="hidden" name="2">share <span class="hidden">{{files}}</span></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <!-- <button class="hidden close-btn" @click="deleteAttachment(files, index)">
                        <a v-show="isDeleteAttachment" class="fa fa-trash-o" aria-hidden="true" />
                    </button> -->
                </p>
                <div class="BlockStory-body">
                    <div class="AddedAttachmentStory-body">
                        <div style="display: inline;" v-if="isImage(files.file_name)" class="AddedAttachmentStory-thumbnailContainer">
                            <a :href="files.file_url" target="_blank">
                                <img class="image-preview" :src="files.file_url">
                            </a>
                        </div>
                        <iframe style="vertical-align: middle;" v-else class="Thumbnail-image" v-bind:src="imgURL(files.file_url)"></iframe>
                        <span style="display:inline-block;" v-show="index==btnClickedIndex && filteredTodo.deleteprogress"> 
                              <img  src="../assets/attach_delete.gif" style="width:30px; height:30px;"/>
                              <span class="del_attachment_text">Deleting...</span>
                        </span>                          
                        <div class="">
                            <a class="AddedAttachmentStory-link" style="color:inherit; text-decoration: none;font-size:11px" :href="files.file_url" target="_blank" tabindex="-1">
                                <i><span style="color:black;font-size:12px">file:</span>{{files.file_name}}</i>
                            </a>
                            <button class="" @click="deleteAttachment(files, index)">
                                <a v-show="isDeleteAttachment" class="fa fa-close" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="attachment-card-footer">
                    <span style="float:left;margin-top:10px">
                        <i class="fa fa-thumbs-o-up hidden" style="font-size:25px;color:rgb(149, 152, 157)" aria-hidden="true"></i>
                        <i class="fa fa-comments hidden" style="font-size:25px;color:rgb(149, 152, 157);margin-left:30px" aria-hidden="true"></i>
                        <a :href="files.file_url" download>
                            <i class="fa fa-arrow-circle-o-down" style="font-size:25px; color:rgb(211, 211, 211);" aria-hidden="true"></i>
                        </a>
                        <!-- <button class="close-btn" @click="deleteAttachment(files, index)">
                            <a v-show="isDeleteAttachment" class="fa fa-trash-o" aria-hidden="true" />
                        </button> -->
                    </span>
                </div>
                <div class="attachment-comment-footer hidden">
                    <span style="float:left;margin-top:10px;width:100%">
                        <Input type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="Enter comments...">
                        </Input>
                        <div style="width: 475px;" class="hidden">
                            <el-tabs type="border-card">
                                <el-tab-pane>
                                    <span slot="label">
                                        <i class="el-icon-date"></i> Html editor</span>
                                </el-tab-pane>
                                <el-tab-pane label="Markdown editor">
                                    <div class="markdownEditor">
                                        <markdown-editor v-model="content" ref="markdownEditor" :value="content" :configs="configs">
                                        </markdown-editor>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </span>
                </div> 
            </Card>
            <!-- <div class="hidden">
                <a target="_blank" v-bind:href="files.file_url">{{ files.file_name }}
                    <ui-progress-linear color="primary" type="determinate" :progress="$store.state.progress" v-show="filteredTodo.attachmentprogress"
                        v-if="index === attachmentList.length-1">
                    </ui-progress-linear>
                </a>
                <button class="" @click="deleteAttachment(files, index)">
                    <a v-show="isDeleteAttachment" class="fa fa-close" />
                </button>
                <iframe v-bind:src="imgURL(files.file_url)" frameborder="0"></iframe>

                <div style="float:right;" v-if="index === btnClickedIndex">
                    <span style="float:right;margin-right: 40px;" v-if="index === btnClickedIndex">
                    <ui-progress-circular color="black" type="indeterminate" v-show="filteredTodo.deleteprogress" class="circularProgress" :size="20">
                    </ui-progress-circular>
                </div>
            </div> -->

        </div>
    <div class="nav1">
      <div :id="filteredTodo.id" class="share">
        <label :for="'upload'+filteredTodo.level" :id="filteredTodo.level">
          <i class="fa fa-paperclip"></i>
          <input :id="'upload'+filteredTodo.level" type="file" @change="onFileChange" style="display:none" /> </label>
      </div>
    </div>

  </div>
</template>
<script>
/* eslint-disable*/
import Vue from "vue";
import { mapGetters } from "vuex";
import iView from "iview";
import "iview/dist/styles/iview.css";
import Avatar from "vue-avatar/src/Avatar";
import { markdownEditor } from "vue-simplemde";
import Ckeditor from "vue-ckeditor2";
import notify from "./notify.js";
import moment from 'moment';

Vue.use(iView);
export default {
  props: ["filteredTodo", "isDeleteAttachment"],
  data: function() {
    return {
      btnClickedIndex: 0,
      content: "",
      commentText: "",
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
      },
      file: {},
    };
  },
  computed: {
    ...mapGetters({
      getFiles: "getAttachment"
    }),
    attachmentList() {
      var array = this.getFiles(this.filteredTodo.id);
      this.attachmentDetailList(array);
      return array;
    }
  },
  methods: {
    deleteAttachment(objAttachment, btnIndex) {
      this.deletedIndex = btnIndex
      this.$Modal.confirm({
        title: "Attachment",
        content:
          "<p>Are you sure that you want to permanently delete attachment?</p>",
        onOk: () => {
          this.btnClickedIndex = btnIndex;
          this.$store.dispatch("deleteAttachmentFromDB", objAttachment);
        }
      });
    },
    computed: {
      ...mapGetters({
        getFiles: "getAttachment"
      }),
      attachmentList() {
        var array = this.getFiles(this.filteredTodo.id);
        this.attachmentDetailList(array);
        return array;
      }
    },
    methods: {
      deleteAttachment(objAttachment, btnIndex) {
        this.btnClickedIndex = btnIndex;
        this.$store.dispatch("deleteAttachmentFromDB", objAttachment);
      },
      onFileChange(e) {
        var fileChooser = e.target; // document.getElementById('file');
        try {
          this.$store.dispatch("selectFile", {
            file: fileChooser,
            taskId: this.filteredTodo.id,
            level: this.filteredTodo.level,
            cb: function (result) {
              fileChooser.value = "";
              if (result == "success") {
              } else {
                $.notify.defaults({ className: "error" });
                $.notify("File upload error", { globalPosition: "top center" });
              }
            }
          });
        } catch (exception) {
          console.log("File upload error");
        }
      },
      imgURL(url) {
        let doc = "http://docs.google.com/gview?url=" + url + "&embedded=true";
        return doc;
      },
      isImage(fileName) {
        return fileName.match(/.(jpg|jpeg|png|gif)$/i);
      },
      attachmentDetailList: function (attachList) {
        attachList.forEach(function (c) {
          let userId = c.uploadedBy;
          let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) {
            return m._id === userId;
          });
          if (userIndex < 0) {
          } else {
            var id = this.$store.state.arrAllUsers[userIndex]._id;
            c.fullname = this.$store.state.arrAllUsers[userIndex].fullname;
            (c.image_url = this.$store.state.arrAllUsers[userIndex].image_url),
              (c.email = this.$store.state.arrAllUsers[userIndex].email);
          }
        }, this);
      },
    moreActionMenuClick(key, val) {
      console.log("moreActionMenuClick", key);
      if (val == 1) {
      }
    },
    logDate(logDate) {
        if(logDate){
          return moment(logDate).calendar()
        }else{
          return ''
        }
      }
    },
    components: {
      Avatar
    }
  }
}
</script>
<style>
  .thumbnail {
    width: 300px;
    height: 160px;
  }

  .Thumbnail-image {
    border: 1px solid #b7bfc6;
    display: inline-block;
    max-width: 100%;
    position: relative;
    z-index: 1;
    background: url("../assets/ob_logo.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .image-preview {
    width: 300px;
    height: 160px;
  }

  .ivu-card-head p,
  .ivu-card-head-inner {
    padding-bottom: 30px;
  }

  .attachment-username {
    text-align: -webkit-left;
    text-align: left;
    margin-left: 10px;
    font-size: 20px;
    color: gray;
    float: left;
  }

  .attachment-time {
    margin-top: -5px;
    font-size: 10px;
  }

  .ivu-card-head {
    padding: 10px 10px;
  }

  .attachment-card-footer {
    border-top: 1px solid #e9eaec;
    height: 36px;
    padding-left: -16px;
    padding-right: -16px;
    line-height: 36px;
    text-align: center;
  }

  .attachment-comment-footer {
    margin-top: 10px;
    border-top: 1px solid #e9eaec;
    padding-left: -16px;
    padding-right: -16px;
    line-height: 36px;
    text-align: center;
    display: inline-block;
    width: 100%;
  }

  .close-btn {
    float: right;
  }

.AddedAttachmentStory-body {
  text-align: -webkit-left;
  text-align: left;
  margin: 10px;
}
.loading {
  margin: 20px;
  width: 100px;
  height: 100px;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 2000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 2000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 2000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
span.del_attachment_text {
    color: #ee7aa5;
}

.close-btn.ivu-dropdown ul {
    min-width: inherit;
}
.close-btn.ivu-dropdown ul li {
    padding: 7px 0px;
}
.BlockStory-timestamp{
  margin-left: 50px;
}
label.attchment-icon {
    padding-top: 0px;
    padding-left: 22px;
    float: left;
    padding-right: 20px;
}
</style>