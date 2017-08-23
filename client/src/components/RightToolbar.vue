<template>
  <div class="toolbar details-pane-top details-pane-toolbar  toolbar-no-grad">
    <div class="gutter-left"></div>
    <span class="toolbar-section left">
        <div class="loading-boundary taskDetailsView-toolbarProperty">
          <div class="redesign-assigned-to-container">
            <div class="property assigned_to value-set">
              <span class="token-wrapper">
                <span class="token user_token">
                  <div class="photo-view photo-view-remix inbox-size photo-view-rounded-corners clickable ">
                    <div class="react-mount-node photoView-reactMount">
                      <div data-reactroot="" class="Avatar Avatar--medium Avatar--color4">
                        <span> {{ getUserLetters() }}<img v-bind:src="imageURlProfilePic" /></span>
                      </div>
                    </div>
                  </div>
                  <span class="dropdown">
                    <a tabindex="-1" class="token_name" data-toggle="dropdown" id='userlist' @click='getAllUsers()'>{{ getAssignedUserName () }}</a>
                      <ul class='dropdown-menu userlist' aria-labelledby="userlist">
                        <li v-for="(user, index) in getUserList"><a @click="btnUserClicked(user)"> 
                          <span><img v-if="user.image_url" v-bind:src="user.image_url" /><div v-else>{{user.email | capitalizeLetters}}</div></span>{{user.email}}</a>
                        <hr>
                      </li>
                    </ul>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
         <!-- <select v-model="type" @change="updateTypeInTask(type)"  class="form-control" style="width: 100% !important; border-color: rgba(255, 255, 255, 0) ">
              <option v-bind:value="type" v-for="type in getTypes">{{type.type}}</option>
            </select>  -->
            <div class="statusBorderClass">
                <span class="dropdown">
                  <div class="statusClass" data-toggle="dropdown">
                    {{ getAssignedType}}
                  </div>
                  <ul class="dropdown-menu statusList">
                    <li v-for="type in getTypes"><a @click="btnTypeClicked(type)">{{type.type}}</a><hr></li>
                  </ul>
                </span>
              </div> 
        <div class="loading-boundary taskDetailsView-toolbarProperty">
          <div class="redesign-due-date-container">
            <div class="property due_date value-set">
              <div class="property-name">
                <span>
                  <datepicker 
                      placeholder="Due Date"
                      class="wrapperClass temp"
                      v-on:selected="dateFormatter"
                      clear-button
                      calendarButton
                      calendarButtonIcon="fa fa-calendar"
                      clearButtonIcon="fa fa-close"
                      today
                      selected
                      v-model="filteredTodo.dueDate">
                  </datepicker>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-boundary reskinToolbarViewsWithShortcuts">
          <div class="heart-button-container unhovered">
            <span class="heart-button heartButtonView heartButtonView--withHearts">
              <div class="heartButtonView-container ">
                <div class="circularToggleButtonView  circularToggleButtonView--toggledOff heartToggleButtonView">
                  <div class="circularToggleButtonView-pulse"></div>
                  <div class="circularButtonView circularToggleButtonView-button circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active" id="luna16">
                    <span class="circularButtonView-label">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <span class="attachmentsMenuView dropdown">
            <input autocomplete="off" id="attachments_menu_view_hidden_file_input_3" type="file" name="file" class="hidden-file-input"
              multiple="true" tabindex="-1">
            <a id="details_property_sheetproperty_attach_attach_menu" tabindex="-1" data-toggle="dropdown" class=" dropdown-menu-link attach-menu  circularButtonView property attach circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active">  
              <i class="fa fa-paperclip" aria-hidden="true"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="details_property_sheetproperty_attach_attach_menu">
              <li><a id="add_from_computer" for="attachments_menu_view_hidden_file_input_3" class="menu-item" title="">
                <span class="dropdown-menu-item-label upload-file-dropdown"><input type="file" id="file" @change="onFileChange($event)" @click="removeAttachmentPopUp"><span>Attach From Computer</span></span>
                </a>
              </li>
            </ul>
          </span>
        </div>
        <div class="loading-boundary reskinToolbarActionMenu">
          <a id="details_action_menu" tabindex="-1" class="dropdown-menu-link">
            <div class="circularButtonView action-menu-label circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active"
              data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <i class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></i>
            </div>
            <ul class="dropdown-menu" style="top: 52px;max-height: 250px;left: 408.31px;min-width: 30px;z-index: 2000;">
              <li><a id="estimated_hours" class="menu-item" title="">
                            <button class="dropdown-menu-item-label" @click="estimated_time = true">Estimated Hours</button>
                          </a></li>
              <li><a id="task_priority" class="menu-item" title="">
                            <span class="dropdown-menu-item-label" @click="task_priority = true">Task Priority</span>
                          </a></li>
              <li><a id="copy_task_url" class="menu-item" title="">
                            <span class="dropdown-menu-item-label" @click="copyTaskURL">Copy Task URL</span>
                          </a></li>
              <li><a id="delete_task" class="menu-item" title="">               
                            <span class="dropdown-menu-item-label" @click="deleteTodo({filteredTodo : filteredTodo})">Delete Task</span>
                          </a></li>
              <li><a id="export_pdf" class="menu-item" title="">               
                            <span class="dropdown-menu-item-label" >Export PDF</span>
                          </a></li>
            </ul>
          </a>
        </div>
  </span>
      <div class="loading-boundary reskinToolbarActionMenu">
  <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
    tabindex="410" @click="openfullwinodw(filteredTodo.level)" style="margin-top: 7px">
    <span class="circularButtonView-label">
          <i class="fa fa-expand" aria-hidden="true"></i>    
        </span>
  </div>
      </div>
  <estimated-hours :showModal="estimated_time" :closeAction="closeDialog" :filteredTodo="filteredTodo"></estimated-hours>
  <task-priority :showModal="task_priority" :closeAction="closeDialog" :filteredTodo="filteredTodo"></task-priority>
  <span id="close" class="destroy" @click="CLOSE_DIV(filteredTodo)"><i class="fa fa-close"></i></span>
  </div>
</template>
<script>
  /* eslint-disable*/
  import Vue from 'vue';
  import KeenUI from 'keen-ui';
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker'
  import EstimatedHours from './EstimatedHours.vue'
  import TaskPriority from './TaskPriority.vue'
  import { mapMutations, mapGetters } from 'vuex'
  Vue.use(KeenUI);
  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(String(value)).format('MMM DD')
    }
  })

  export default {
    props: ['filteredTodo', 'subTasksArray'],
    data() {
      return {
        picker1: null,
        // imageURlProfilePic: this.$store.state.userObject.image_url,
        imageURlProfilePic: '',
        index: this.filteredTodo.index,
        poproject_name: '',
        estimated_time: false,
        task_priority: false,
        userName: '',
        type: ''
      }
    },
    computed: {
      ...mapGetters({
        getUserList: 'getAllUserList',
        getFiles: 'getAttachment',
        taskTagsById: 'getTaskTagsById',
        getComment: 'getCommentById',
        getTypes: 'getTaskTypeList'
      }),
      attachmentList() {
        var arrayAttchment = this.getFiles(this.filteredTodo.id)
        return arrayAttchment
      },
      taskTags() {
        let arrTags = this.taskTagsById(this.filteredTodo.id)
        return arrTags;
      },
      getCommentByTaskId() {
        let commentList = this.getComment(this.filteredTodo.id)
        return commentList
      },
      getAssignedType: function() {
        if (this.filteredTodo.taskType) {
          var objType = _.find(this.$store.state.task_types_list, ['id', this.filteredTodo.taskType])
          return objType.type
        }else {
          //return this.$store.state.task_types_list.type
          return 'todo'
        }
      }
    },
    methods: {
      ...mapMutations([
        'CLOSE_DIV'
      ]),
      
      
      deleteTodo: function () {
        this.$store.dispatch('delete_Todo', this.filteredTodo)
      },
      dateFormatter(dateTo) {
        var selectedDate = moment(dateTo, 'YYYY-MM-DD').format('MMM DD');
        this.$store.dispatch('editTaskName', { "todo": this.filteredTodo, "selectedDate": dateTo })
      },
      openfullwinodw: function (ind) {
        $('.window-full.circularButtonView').find('.fa').toggleClass('fa-compress');
        $('.window-full.circularButtonView').parents('.right_pane_container #right_pane #' + ind).toggleClass('open')
      },
      closeDialog() {
        this.estimated_time = false
        this.task_priority = false
      },
      onFileChange(e) {
        console.log('file', )
        var fileChooser = e.target // document.getElementById('file');
        this.$store.dispatch('selectFile', {
          "file": fileChooser, "taskId": this.filteredTodo.id, "level": this.filteredTodo.level, "cb": function () {
            fileChooser.value = "";
          }
        })
      },
      copyTaskURL() {
        //window.clipboardData.setData("Text", location.href);
        var $temp = $("<input>");
        $("body").append($temp);
        // var url = "http://localhost:3000/navbar/task/" + (this.filteredTodo.level + 1) + "/" + this.filteredTodo.id
        var url = process.env.COPY_URL_PATH + "/navbar/task/" + (this.filteredTodo.level + 1) + "/" + this.filteredTodo.id
        $temp.val(url).select();
        document.execCommand("copy");
        $temp.remove();
      },
      exportToPDF() {
        var htmlString = "<html><head></head><body>"
        var letters = this.getUserLetters()
        htmlString += (this.imageURlProfilePic.length > 0 ? "<div style='display: inline-block;width:30px;height:30px;border-radius:100%;overflow: hidden;vertical-align: middle; border:solid 1px #ddd'><img src=" + this.imageURlProfilePic + " style='max-width:100%; max-height:100%'/></div>" : "<div style='display: inline-block;width:30px;height:30px;border-radius:100%;overflow: hidden;vertical-align: middle; border:solid 1px #ddd; line-height:32px;font-size:16px; text-align:center;'>" + letters + "</div>");
        htmlString += "&nbsp;&nbsp;<span>" + this.getAssignedUserName() + "</span>";
        var dueDt = moment(this.filteredTodo.dueDate).isValid();
        if (dueDt) {
          htmlString += "<span style='padding-left:8em;'> <div style='padding-left:5px; margin-right:10px; display: inline-block;width:25px;height:30px;border-radius:100%;overflow: hidden;vertical-align: middle; border:solid 1px #ddd; line-height:28px;font-size:16px; text-align:center; '>&#128197;</div>" + moment(this.filteredTodo.dueDate).format('DD MMM YYYY') + "</span>";
        }
        htmlString += "<hr/>"

        var imgChk = (this.filteredTodo.completed ? "checked" : "unchecked")
        htmlString += "<span style='display: inline-block;vertical-align: middle;'><img src='https://s3-us-west-2.amazonaws.com/airflowbucket1/obexpense/expenses/" + imgChk + ".png' style='width:20px'></span><span style='padding-left:1em;font-size:18px;font-weight: bold;margin-left:-10px;'>" + this.filteredTodo.taskName + "</span>";

        if (this.filteredTodo.taskDesc.length > 0)
          htmlString += "<p>" + this.filteredTodo.taskDesc + "</p><br/>";

        if (this.attachmentList.length > 0)
          htmlString += "<h3 style='color:gray;'>Attachments:</h3>";

        var yPositionAttachments = 70;
        for (var i = 0; i < this.attachmentList.length; i++) {
          var attachment = this.attachmentList[i]
          htmlString += "<a href=" + attachment.file_url + " target='_blank'>" + attachment.file_name + "</a><br/>"
        }

        if (this.taskTags.length > 0)
          htmlString += "<br/><h3 style='color:gray;'>Tags:</h3>";

        var xPositionTags = 15;
        for (var i = 0; i < this.taskTags.length; i++) {
          var tag = this.taskTags[i]
          htmlString += (i == this.taskTags.length - 1 ? "<span>" + tag.name + "</span>" : "<span>" + tag.name + ", </span>");
        }

        if (this.filteredTodo.subtask_count > 0)
          htmlString += "<br/><br/><h3 style='color:gray;'>Subtasks:</h3>";

        for (var i = 0; i < this.filteredTodo.subtask_count; i++) {
          var subTask = this.subTasksArray[i]
          var imgName = (subTask.completed ? "checked" : "unchecked")
          htmlString += "<span style='display: inline-block;vertical-align: middle;'><img src='https://s3-us-west-2.amazonaws.com/airflowbucket1/obexpense/expenses/" + imgName + ".png' style='width:20px'></span><span style='padding-left:1em;'>" + subTask.taskName + "</span><hr>";
        }

        // if(this.getCommentByTaskId.length > 0)
        //    htmlString += "<br/><br/><h3 style='color:gray;'>Comments:</h3>";

        //  for (var i = 0; i <  this.getCommentByTaskId.length; i++) {
        //    var commentObj = this.getCommentByTaskId[i]
        //    console.log("Comment user",commentObj.comment)

        //  }

        htmlString += "</body></html>";

        this.$http.post('/getHtmlToPdf', {
          divHtml: htmlString
        }).then(response => {
          console.log('Response pdf', response.data);
          //window.location.assign(response.data);
          // top.location.href = "/report";
          var link = document.createElement('a');
          link.href = "/report";
          link.dispatchEvent(new MouseEvent('click'));
        });

      },
      removeAttachmentPopUp() {
        setTimeout(function () { $('.attachmentsMenuView').removeClass('open') }, 1000);
      },
      async getAllUsers() {
        await this.$store.dispatch('getAllUsersList')
      },
      closeDiv: function (id) {
        // console.log('divid', $('.destroy').parents('#'+id+'.right_pane_container'))
        // $('.destroy').parents('#'+id+'.right_pane_container').hide()
      },
      btnUserClicked(objUser) {
        this.$store.dispatch('editTaskName', { "todo": this.filteredTodo, "assigned_by": this.$store.state.userObject._id, "assigned_to": objUser._id })
      },
      // getUserListingURL (userUrl) {
      //   if(userUrl.image_url){

      //     this.imageURlProfilePic = userUrl.image_url
      //     return
      //   }
      //   this.imageURlProfilePic = ''
      //   return this.capitalizeLetters(userUrl.email)
      // }
    
      getUserLetters() {
        var user = this.getAssignedUserObj()
        if (user.image_url) {
          this.imageURlProfilePic = user.image_url
          console.log('Image url', user.image_url)
          return
        }
        this.imageURlProfilePic = ''
        return this.capitalizeLetters(user.email)
      },
      getAssignedUserName() {
        var user = this.getAssignedUserObj()
        return this.getName(user.email)
      },
      getName(name) {
        var str = name
        var n = str.indexOf("@")
        var res = str.substr(0, n)
        return res
      },
      capitalizeLetters(name) {
        var str = "null"
        if (name != null) {
          str = name
        }
        // else if(name.fullname != null){
        //   console.log('Name', name.fullname)
        //   str = name.fullname
        // }
        // var str = name.email
        var firstLetters = str.substr(0, 2)
        return firstLetters.toUpperCase()
      },
      getAssignedUserObj() {
        var objUser
        // console.log('filteredTodo.assigned_to', this.filteredTodo.assigned_to)
        // console.log('this.$store.state.userObject._id', this.$store.state.userObject)
        if (this.filteredTodo.assigned_to === this.$store.state.userObject._id) {
          objUser = this.$store.state.userObject
        } else {
          objUser = _.find(this.$store.state.arrAllUsers, ['_id', this.filteredTodo.assigned_to])
        }
        // console.log('User', objUser)
        return objUser
      },
      btnTypeClicked(objType) {
        this.$store.dispatch('editTaskName', { "todo": this.filteredTodo, "selectedType": objType })
      }
      // updateTypeInTask: function(value) {
      //   console.log("updateTypeInTask",value)
      //   this.$store.dispatch('editTaskName', { "todo": this.filteredTodo, "selectedType": value })
      // }
    },
    components: {
      Datepicker,
      EstimatedHours,
      TaskPriority,
    }
  }

</script>
<style>
.form-control:focus {
     color: #464a4c; 
     background-color: #fff; 
     border-color: #5cb3fd; 
     outline: none; 
          border-color: #66afe9; 
     outline: 0; 
     -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6); 
     box-shadow: inset 0 0px 0px rgba(0,0,0,.075), 0 0 0px rgba(102,175,233,.6);
}
</style>