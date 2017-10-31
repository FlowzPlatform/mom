<template>
    <div style="height:100%;overflow-x:scroll">
         <div v-for="(files, index) in attachmentList" style="padding:0 0 5px 0;">
            <div class="FeedBlockStory">
                <div class="BlockStory">
                    <div class="BlockStory-icon">
                        <div class="Avatar Avatar--medium Avatar--color2" style="background-image: url(&quot;https://s3.amazonaws.com/profile_photos/329633778653756.1pmLUlVhFA8h81mZ3biR_60x60.png&quot;);">
                            <!-- react-text: 434 -->
                            <!-- /react-text -->
                        </div>
                    </div>
                    <div class="BlockStory-block">
                        <div class="BlockStory-header">
                            <div class="BlockStory-headerContent">
                                <span class="BlockStory-storyContent">
                                    <a class="NavigationLink BlockStory-actorLink" href="javascript:void(0)">
                                        Hemant</a>
                                    <!-- react-text: 440 -->
                                    <!-- /react-text -->
                                    <span class="AddedAttachmentStory-content">
                                        <svg class="Icon AttachIcon" viewBox="0 0 32 32">
                                            <path d="M25.811,4.064c-3.905-3.904-10.235-3.904-14.14,0l-4.24,4.24l1.41,1.41l4.25-4.24c3.043-3.203,8.107-3.333,11.31-0.29s3.333,8.107,0.29,11.31c-0.094,0.099-0.191,0.196-0.29,0.29l-10.61,10.59c-1.986,1.918-5.152,1.863-7.07-0.123c-1.871-1.938-1.871-5.01,0-6.947l10.61-10.59c0.781-0.781,2.049-0.781,2.83,0s0.781,2.049,0,2.83l-7.07,7.07l1.41,1.42l7.07-7.07c1.563-1.563,1.563-4.097,0-5.66s-4.097-1.563-5.66,0l-10.6,10.61c-2.734,2.734-2.734,7.166,0,9.9s7.166,2.734,9.9,0l0,0l10.6-10.61C29.715,14.299,29.715,7.969,25.811,4.064z"></path>
                                        </svg>
                                        <!-- react-text: 444 -->attached
                                        <!-- /react-text -->
                                    </span>
                                </span>
                                <span class="BlockStory-metadata">
                                    <span class="BlockStory-timestamp">
                                        <!-- <span>Yesterday at 09:57</span> -->
                                        <span></span>
                                    </span>
                                </span>
                            </div>
                            <a class="hidden MiniHeartButton MiniHeartButton--withThumbsUp BlockStory-heartButton" role="button" aria-pressed="false">
                                <svg class="Icon ThumbsUpLineIcon MiniHeartButton-icon" viewBox="0 0 32 32">
                                    <path d="M10.0100098,25.990815 L25.7130758,25.990815 C26.4355767,25.990815 26.907404,25.7237882 27.2463608,25.2516827 C27.4604665,24.9534722 27.5728209,24.6484118 27.5950072,24.5410552 C27.6064756,24.458703 27.6064756,24.458703 27.6582766,24.0847701 C27.7086518,23.7205833 27.764789,23.3130583 27.8252464,22.8720563 C27.9979735,21.6121134 28.170696,20.3365004 28.3318696,19.1242008 C28.3594075,18.9169123 28.3594075,18.9169123 28.3868975,18.7093304 C28.6888342,16.4274522 28.9061144,14.6932998 29.0053522,13.737985 C29.0935444,12.8890005 28.8843983,12.4598949 28.4810455,12.2073213 C28.2638406,12.0713108 28.0349461,12.0130804 27.9984524,12.0083416 L17.4183504,11.9919674 L18.5656765,10.4083054 C18.6283173,10.3218419 18.7473774,10.1466403 18.9039434,9.89720276 C19.1685568,9.47562637 19.433782,9.00790798 19.680774,8.50925027 C20.2604538,7.33892139 20.6455901,6.18949426 20.7500991,5.15149012 C20.8542102,4.11743828 20.6735393,3.25979813 20.1779668,2.58081672 C18.9108162,1.47730042 17.5988371,2.03066611 17.1660826,3.65713546 C16.36595,5.93476748 15.282882,7.3455244 13.7432225,8.43279623 C13.5175931,8.59213051 13.2847782,8.74372345 13.0126895,8.9111541 C12.8483483,9.01228197 12.1924557,9.40498616 12.3407868,9.31572277 C10.8888174,10.1894958 10.351177,10.7756299 10.0100098,12.2091013 L10.0100098,25.990815 Z M28.0683443,10.010681 C28.4709372,10.0382604 29.0008677,10.1730737 29.5424879,10.5122283 C30.592866,11.1699598 31.1616539,12.3369434 30.9946478,13.9446323 C30.8928231,14.9248502 30.6740234,16.6711298 30.3696156,18.9716824 C30.342042,19.1798963 30.342042,19.1798963 30.3144251,19.3877788 C30.1528558,20.6030554 29.9797823,21.8812603 29.8067133,23.1436979 C29.7461422,23.585529 29.6898956,23.9938479 29.6394137,24.358806 C29.5874758,24.7337277 29.5874758,24.7337277 29.5672436,24.8689318 C29.4862605,25.2875154 29.2793204,25.8493913 28.8709933,26.4181172 C28.1725622,27.3909055 27.1125422,27.990815 25.7130758,27.990815 L8.01000977,27.990815 L8.01000977,12.0949707 L8.03442601,11.875343 C8.51382912,9.74583969 9.39815151,8.7523366 11.3095474,7.6020877 C11.1728468,7.684352 11.8123189,7.30147926 11.9645335,7.2078135 C12.2033508,7.06085657 12.4021843,6.93138998 12.589535,6.7990872 C13.7942643,5.94833534 14.61854,4.87466986 15.2557545,3.07035834 C16.0314787,0.132985974 19.1124692,-1.10991117 21.593353,1.16363659 L21.7082898,1.288501 C22.5856746,2.4211838 22.8954413,3.808352 22.7400385,5.35184253 C22.6079561,6.66371098 22.1503887,8.02930668 21.4729753,9.39695206 C21.3711462,9.60253701 21.2667378,9.80316377 21.1606628,9.99821512 L28.0683443,10.010681 Z"></path>
                                    <path d="M4,12 L4,26 L8,26 L8,12 L4,12 Z M10,10 L10,28 L2,28 L2,10 L10,10 Z"></path>
                                </svg>
                            </a>
                        </div>
                        <div class="BlockStory-body">
                            <div class="AddedAttachmentStory-body">
                                <div>
                                    <a class="AddedAttachmentStory-link" :href="files.file_url" target="_blank" tabindex="-1">{{files.file_name}}</a>
                                    <button class="" @click="deleteAttachment(files, index)">
                                        <a v-show="isDeleteAttachment" class="fa fa-close" />
                                    </button>
                                </div>
                                <div v-if="isImage(files.file_name)" class="AddedAttachmentStory-thumbnailContainer">
                                    <a :href="files.file_url" target="_blank">
                                        <img class="image-preview" :src="files.file_url">
                                    </a>
                                </div>
                                <iframe v-else class="Thumbnail-image" v-bind:src="imgURL(files.file_url)"></iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="hidden">
                <a target="_blank" v-bind:href="files.file_url">{{ files.file_name }}
                    <ui-progress-linear color="primary" type="determinate" :progress="$store.state.progress" v-show="filteredTodo.attachmentprogress" v-if="index === attachmentList.length-1">
                    </ui-progress-linear>
                </a>
                <button class="" @click="deleteAttachment(files, index)">
                    <a v-show="isDeleteAttachment" class="fa fa-close" />
                </button>
                <iframe v-bind:src="imgURL(files.file_url)" frameborder="0"></iframe>

                <div style="float:right;" v-if="index === btnClickedIndex">
                    <!--<span style="float:right;margin-right: 40px;" v-if="index === btnClickedIndex">-->
                    <ui-progress-circular color="black" type="indeterminate" v-show="filteredTodo.deleteprogress" class="circularProgress" :size="20">
                    </ui-progress-circular>
                </div>
            </div>

        </div>
        <div class="attachment-nav">
            <div class="attachment-mask">
                <label for="upload">
                    <i class="fa fa-paperclip"></i>
                    <input id="upload" type="file" @change="onFileChange($event)" style="display:none" />
                </label>
            </div>
        </div>

       
    </div>
</template>
<script>
/* eslint-disable*/
import { mapGetters } from "vuex";
import "vue-ionicons/ionicons/css/ionicons.css";
export default {
  props: ["filteredTodo", "isDeleteAttachment"],
  data: function() {
    return {
      btnClickedIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      getFiles: "getAttachment"
    }),
    attachmentList() {
      var array = this.getFiles(this.filteredTodo.id);
      return array;
    }
  },

  methods: {
    deleteAttachment(objAttachment, btnIndex) {
      this.btnClickedIndex = btnIndex;
      // this.$store.dispatch('deleteAttachmentFromDB', {"objAttachment": objAttachment})
      this.$store.dispatch("deleteAttachmentFromDB", objAttachment);
    },
    onFileChange(e) {
      var fileChooser = e.target; // document.getElementById('file');
      this.$store.dispatch("selectFile", {
        file: fileChooser,
        taskId: this.filteredTodo.id,
        level: this.filteredTodo.level,
        cb: function() {
          fileChooser.value = "";
        }
      });
    },
    imgURL(url) {
      let doc = "http://docs.google.com/gview?url=" + url + "&embedded=true";
      return doc;
    },
    isImage(fileName) {
      return fileName.match(/.(jpg|jpeg|png|gif)$/i);
    }
  }
};
</script>
<style>
.attachment-nav {
  right: 42px;
  z-index: 20;
  width: 45px;
  bottom: 15px;
  height: 45px;
  display: block;
  position: absolute;
  line-height: 45px;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
}

.attachment-mask {
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
  -webkit-transition: all 0.1s ease-in-out 0s;
  transition: all 0.1s ease-in-out 0s;
}

.thumbnail {
  width: 300px;
  height: 160px;
}

.thumbnail iframe {
  width: 900px;
  height: 480px;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.3, 0.3);
  -moz-transform: scale(0.3, 0.3);
  transform: scale(0.3, 0.3);
  overflow: hidden;
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
</style>
