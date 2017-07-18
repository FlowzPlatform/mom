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
                        <!--<span v-if="imageURlProfilePic"><img v-bind:src="imageURlProfilePic" /></span>
                          <span v-else>{{ capitalizeLetters }}</span>-->
                        </div>
                      </div>
                    </div>
                    <!--<label tabindex="-1" class="token_name" @click='getAllUsers()'>{{ uname }}</label>-->
                    <span class="dropdown">
                      <a tabindex="-1" class="token_name" data-toggle="dropdown" id='userlist' @click='getAllUsers()'>{{ getAssignedUserName () }}</a>
                      <ul class='dropdown-menu userlist' aria-labelledby="userlist">
                        <li v-for="(user, index) in getUserList"><a @click="btnUserClicked(user)"> 
                          <span><img v-if="user.image_url" v-bind:src="user.image_url" /><div v-else>{{capitalizeLetters(user.email)}}</div></span>{{user.email}}</a><hr>
                        </li>
                      </ul>
                    </span>
                </span>
              </span>
            </div>
          </div>
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
          <div id="property_tags" class="circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active" tabindex="410">
            <span class="circularButtonView-label">
              <i class="fa fa-tag" aria-hidden="true"></i>    
            </span>
          </div>
          <span class="attachmentsMenuView dropdown">
            <input autocomplete="off" id="attachments_menu_view_hidden_file_input_3" type="file" name="file" class="hidden-file-input" multiple="true" tabindex="-1">
                  <a id="details_property_sheetproperty_attach_attach_menu" tabindex="-1"  data-toggle="dropdown" class=" dropdown-menu-link attach-menu  circularButtonView property attach circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active">  
                  <i class="fa fa-paperclip" aria-hidden="true"></i>
                              </a>
              <ul class="dropdown-menu" aria-labelledby="details_property_sheetproperty_attach_attach_menu">
                      <li><a id="add_from_computer" for="attachments_menu_view_hidden_file_input_3" class="menu-item" title="">
                                              <span class="dropdown-menu-item-label upload-file-dropdown"><input type="file" id="file" @change="onFileChange($event)" @click="removeAttachmentPopUp"><span>Attach From Computer</span></span>
                      </a></li>
                      <!--<hr><li><a id="add_from_dropbox" class="menu-item" title="">
                            <span class="dropdown-menu-item-label">Attach From Dropbox</span></a></li>
                            <li><a id="add_from_gdrive" class="menu-item" title="">
                              <span class="dropdown-menu-item-label">Attach From Google Drive</span></a></li>
                            <li><a id="add_from_box" class="menu-item" title="">
                              <span class="dropdown-menu-item-label">Attach From Box</span></a></li>-->
                  </ul>
            </span>
          </div>
      
      <div class="loading-boundary reskinToolbarActionMenu">
				<a id="details_action_menu" tabindex="-1" class="dropdown-menu-link">
					<div class="circularButtonView action-menu-label circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
                      <span class="dropdown-menu-item-label" @click="exportToPDF">Export To PDF</span>
                    </a></li>
                    <!--<li><a id="convert_to_project" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Convert to a Project...</span>
                    </a></li>
                    <li><a id="print_task" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Print</span>
                    </a></li>-->
                  <!--</ul>-->
                  </ul>
				</a>
			</div>
      
      </span>
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right" tabindex="410" @click="openfullwinodw(filteredTodo.level)">
            <span class="circularButtonView-label" >
              <i class="fa fa-expand" aria-hidden="true"></i>    
            </span>
          </div>
          <estimated-hours  :showModal="estimated_time" :closeAction="closeDialog" :filteredTodo="filteredTodo" ></estimated-hours>
          <task-priority  :showModal="task_priority" :closeAction="closeDialog" :filteredTodo="filteredTodo"></task-priority>
          <!--<settings-menu :showModal="settings_menu" :closeAction="closeDialog" :filteredTodo="filteredTodo"></settings-menu>-->
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
// import SettingsMenu from './SettingsMenu.vue'
import { mapMutations, mapGetters } from 'vuex'
Vue.use(KeenUI);
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM DD')
  }
})

export default {
  props: ['filteredTodo','subTasksArray'],
  data() {
    return {
      picker1: null,
      // imageURlProfilePic: this.$store.state.userObject.image_url,
      imageURlProfilePic: '',
      index: this.filteredTodo.index,
      poproject_name:'',
      estimated_time: false,
      task_priority:false,
      userName: ''
    }
  },
    computed: {
     ...mapGetters({
      getUserList:'getAllUserList',
      getFiles: 'getAttachment',
      taskTagsById: 'getTaskTagsById'      
    }), 
    attachmentList(){
      var arrayAttchment = this.getFiles(this.filteredTodo.id)
      return arrayAttchment
    },
    taskTags() {
      let arrTags = this.taskTagsById(this.filteredTodo.id)
      return arrTags;
      },
    // uname: function(){
    //   var str = this.$store.state.userObject.email
    //   var n = str.indexOf("@")
    //   var res = str.substr(0, n)
    //   return res
    // },
    // capitalizeLetters: function(){
    //   var str = this.$store.state.userObject.email
    //   var firstLetters = str.substr(0,2)
    //   return firstLetters.toUpperCase()
    // }
  },
  methods: {
    ...mapMutations([
        'CLOSE_DIV'
      ]),
      deleteTodo: function () {
        this.$store.dispatch('delete_Todo', this.filteredTodo)
      },
      dateFormatter(dateTo){
        console.log('Date toS',dateTo)
         var selectedDate = moment(dateTo, 'YYYY-MM-DD').format('MMM DD');
        this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "selectedDate": dateTo})
        // var d = new Date()
        // d.setDate(d.getDate() + 2)
        // if(moment(dateTo).isBetween(new Date(), d)){
        //     $('#'+this.filteredTodo.id).removeClass('DueDate--overdue').removeClass('DueDate--future').addClass('DueDate--soon')
        // } else if(moment(dateTo).isBefore(new Date())){
        //     $('#'+this.filteredTodo.id).removeClass('DueDate--soon').removeClass('DueDate--future').addClass('DueDate--overdue')
        // }else if(moment(dateTo).isAfter(new Date())){
        //     $('#'+this.filteredTodo.id).addClass('DueDate--future')
        // }else{
        //       $('#'+this.filteredTodo.id).removeClass('DueDate--soon')
        //       $('#'+this.filteredTodo.id).removeClass('DueDate--overdue')
        //       $('#'+this.filteredTodo.id).removeClass('DueDate--future')
        // }
        
      },
   openfullwinodw : function(ind) {
     $('.window-full.circularButtonView').find('.fa').toggleClass('fa-compress');
     $('.window-full.circularButtonView').parents('.right_pane_container #right_pane #'+ind).toggleClass('open')
   },
   closeDialog () {
        this.estimated_time = false
        this.task_priority = false
        // this.settings_menu = false
    },
   onFileChange (e) {
      console.log('file',)
      var fileChooser = e.target // document.getElementById('file');
      this.$store.dispatch('selectFile', {"file": fileChooser, "taskId": this.filteredTodo.id, "level": this.filteredTodo.level,"cb" : function(){
        fileChooser.value = "";
      }})
    },
    copyTaskURL(){
      //window.clipboardData.setData("Text", location.href);
      var $temp = $("<input>");
      $("body").append($temp);
      // var url = "http://localhost:3000/navbar/task/" + (this.filteredTodo.level + 1) + "/" + this.filteredTodo.id
      var url = process.env.COPY_URL_PATH+"/navbar/task/" + (this.filteredTodo.level + 1) + "/" + this.filteredTodo.id
      $temp.val(url).select();
      document.execCommand("copy");
      $temp.remove(); 
    },
    exportToPDF(){
      console.log('Export to pdf called', this.taskTags)

          var doc = new jsPDF();
          console.log('pdf content height',doc.internal.pageSize.height);
          var pageHeight = doc.internal.pageSize.height;
          // Before adding new content
          //y = 500 // Height position of new content
          doc.setFontSize(15);
          doc.setFillColor(205,207,210);
          doc.circle(15, 15, 6, 'FD');
          doc.setTextColor(255, 255, 255);
          var letters = this.getUserLetters()
          if(letters){
             doc.text(11.5,16.5, letters);
          }
         
          doc.setTextColor(0, 0, 0);
          doc.text(24,16, this.getAssignedUserName());

          var dueDt = moment(this.filteredTodo.dueDate).isValid();
          if(dueDt){
            doc.setFontSize(15);
            doc.circle(55, 15, 6);
            doc.text(64,16.5, moment(this.filteredTodo.dueDate).format('DD MMM YYYY'));
          }
          
          doc.circle(115, 15, 6);
          doc.circle(130, 15, 6);
          doc.circle(145, 15, 6);
          doc.circle(160, 15, 6);

          doc.setLineWidth(0.1);
          doc.line(0, 25, 210, 25);

          doc.setFontSize(20);
          doc.text(11.5,40, this.filteredTodo.taskName);
          doc.setFontSize(13);
          doc.text(11.5,50, this.filteredTodo.taskDesc);

          if(this.attachmentList.length > 0){
             doc.setFontSize(14);
             doc.setTextColor(0, 76, 153);
             doc.text(11, 63, 'Attachments:');
          }
           doc.setFontSize(13);
           doc.setTextColor(0, 0, 0);

           var yPositionAttachments = 70;
           for (var i = 0; i < this.attachmentList.length; i++) {
              var attachment = this.attachmentList[i]
              console.log("Task Name", attachment.file_name)
              doc.text(15,yPositionAttachments, '~> ' + attachment.file_name + '(' +attachment.file_url+')');
              yPositionAttachments += 10;
          }

          if(this.taskTags.length > 0){
             doc.setFontSize(14);
             doc.setTextColor(0, 76, 153);
             doc.text(11, 95, 'Tags:');
          }
           doc.setFontSize(13);
           doc.setTextColor(0, 0, 0);

          var xPositionTags = 15;
           for (var i = 0; i < this.taskTags.length; i++) {
              var tag = this.taskTags[i]
              console.log("Tag Name", this.taskTags.name)
              doc.text(xPositionTags, 102, tag.name+' ');
              xPositionTags += 10;
          }

           if(this.filteredTodo.subtask_count > 0){
             doc.setFontSize(14);
             doc.setTextColor(0, 76, 153);
             doc.text(11, 115, 'Subtasks:');
             doc.setLineWidth(0.1);
             doc.line(0, 118, 510, 120);
          }
          doc.setFontSize(13);
          doc.setTextColor(0, 0, 0);
          
          var yPositionSubtasks = 125;
          for (var i = 0; i < this.filteredTodo.subtask_count; i++) {
              var subTask = this.subTasksArray[i]
              console.log("Task Name", subTask.taskName)
              doc.setLineWidth(0.1);
              doc.line(0, yPositionSubtasks+3.5, 510, yPositionSubtasks + 5);
              doc.text(20,yPositionSubtasks, subTask.taskName);
              yPositionSubtasks += 10;
          }

          // if (y>=pageHeight)
          // {
          //     doc.addPage();
          //     // y = 0 // Restart height position
          // }
         // doc.text(x, y, "value");
         // doc.text(20, 20, 'Do you like that?');
          doc.save(this.filteredTodo.id+'.pdf')
      
    },
    removeAttachmentPopUp () {
       setTimeout(function(){ $('.attachmentsMenuView').removeClass('open') }, 1000);
    },
    // getAllUsers () {
    //   console.log('get all users called')
    //   this.$store.dispatch('getAllUsersList')
    //   .then(function (response) {
    //     console.log('response: ', response)
    //   })
    //   .catch(function(error) {
    //     // $.notify.defaults({ className: "error" })
    //     // $.notify(error.message, { globalPosition:"top center"})
    //   })
    // },
    async getAllUsers () {
      await this.$store.dispatch('getAllUsersList')
    },
    closeDiv: function (id) {
      // console.log('divid', $('.destroy').parents('#'+id+'.right_pane_container'))
      // $('.destroy').parents('#'+id+'.right_pane_container').hide()
    },
    btnUserClicked (objUser) {
      this.$store.dispatch('editTaskName', {"todo":this.filteredTodo, "assigned_by": this.$store.state.userObject._id, "assigned_to": objUser._id})
    },
    // getUserListingURL (userUrl) {
    //   if(userUrl.image_url){
        
    //     this.imageURlProfilePic = userUrl.image_url
    //     return
    //   }
    //   this.imageURlProfilePic = ''
    //   return this.capitalizeLetters(userUrl.email)
    // },
    getUserLetters () {
      var user = this.getAssignedUserObj()
      if(user.image_url){
        this.imageURlProfilePic = user.image_url
        return
      }
      this.imageURlProfilePic = ''
      return this.capitalizeLetters(user.email)
    },
    getAssignedUserName () {
      var user = this.getAssignedUserObj()
      return this.getName(user.email)
    },
    getName(name) {
      var str = name
      var n = str.indexOf("@")
      var res = str.substr(0, n)
      return res
    },
    capitalizeLetters (name){
      var str = name
      var firstLetters = str.substr(0,2)
      return firstLetters.toUpperCase()
    },
    getAssignedUserObj (){
      var objUser
      // console.log('filteredTodo.assigned_to', this.filteredTodo.assigned_to)
      // console.log('this.$store.state.userObject._id', this.$store.state.userObject)
      if (this.filteredTodo.assigned_to === this.$store.state.userObject._id){
        objUser =  this.$store.state.userObject
      }else{
        objUser = _.find(this.$store.state.arrAllUsers, ['_id', this.filteredTodo.assigned_to])
      }
      // console.log('User', objUser)
      return objUser
    }
  },
  // mounted() {
  //   $('.datetimepicker1').datepicker().on(
  //     'changeDate', () => { this.selectedDate = $('.datetimepicker1').val() 
  //   })
  // },
  components:{
    Datepicker,
    EstimatedHours,
    TaskPriority,
  }
}
</script>
