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
                        <!-- react-text: 2 -->{{ capitalizeLetters }}<!-- /react-text -->
                        </div>
                      </div>
                    </div>
                    <a tabindex="-1" class="token_name " href="">{{ uname }}</a>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="loading-boundary taskDetailsView-toolbarProperty">
            <div class="redesign-due-date-container">
                <div class="property due_date ">
                    <div class="property-name">
                    <span>
                      <ui-datepicker
                          icon="event"
                          placeholder="Due Date"
                          :custom-formatter="dateFormatter"
                          v-model="picker1">
                      </ui-datepicker>
                      {{this.filteredTodos.parentDueDate | formatDate}}
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
          <span class="attachmentsMenuView">
            <input autocomplete="off" id="attachments_menu_view_hidden_file_input_3" type="file" name="file" class="hidden-file-input" multiple="true" tabindex="-1">
                            <a id="details_property_sheetproperty_attach_attach_menu" tabindex="-1" class="dropdown-menu-link attach-menu  " data-toggle="dropdown">
                <div  id="property_attach" class="circularButtonView property attach circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-paperclip" aria-hidden="true"></i>
                </div>
                <ul class="dropdown-menu" style="top: 50px;max-height: 258px;left: 368.38px;min-width: 30px;z-index: 2000;">
                      <li><a id="add_from_computer" for="attachments_menu_view_hidden_file_input_3" class="menu-item" title="">
                        <span class="dropdown-menu-item-label">Attach From Computer</span>
                      </a></li>
                      <!--<hr><li><a id="add_from_dropbox" class="menu-item" title="">
                            <span class="dropdown-menu-item-label">Attach From Dropbox</span></a></li>
                            <li><a id="add_from_gdrive" class="menu-item" title="">
                              <span class="dropdown-menu-item-label">Attach From Google Drive</span></a></li>
                            <li><a id="add_from_box" class="menu-item" title="">
                              <span class="dropdown-menu-item-label">Attach From Box</span></a></li>-->
                  </ul>
              </a>
            </span>
          </div>
      
      <div class="loading-boundary reskinToolbarActionMenu">
				<a id="details_action_menu" tabindex="-1" class="dropdown-menu-link   open">
					<div class="circularButtonView action-menu-label circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <i class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></i>
					</div>
                    <!--<ul class="dropdown-menu" style="top: 52px;max-height: 250px;left: 334.31px;min-width: 30px;z-index: 2000;">-->
                    <!--<li><a id="duplicate_task" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Copy Task...</span>
                    </a></li>
                    <li><a id="change_task_privacy" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Make Public to Team</span>
                    </a></li>
                    <li><a id="copy_task_url" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Copy Task URL</span>
                    </a></li>
                    <li><a id="close_as_duplicate" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Merge Duplicate Tasks...</span>
                      <span class="shortcut">Tab+Shift+D</span>
                    </a></li>
                    <li><a id="convert_to_project" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Convert to a Project...</span>
                    </a></li>
                    <li><a id="print_task" class="menu-item" title="">
                      <span class="dropdown-menu-item-label">Print</span>
                    </a></li>-->
                  <!--</ul>-->
				</a>
			</div>
      
      </span>
      <div class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right" tabindex="410">
            <span class="circularButtonView-label" @click="openfullwinodw(filteredTodos.index)">
              <i class="fa fa-expand" aria-hidden="true"></i>    
            </span>
          </div>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue';
import KeenUI from 'keen-ui';
import moment from 'moment';
Vue.use(KeenUI);
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM DD')
  }
})

export default {
  props: ['filteredTodos'],
  data() {
    return {
      picker1: null,
      index: this.filteredTodos.index
    }
  },
  computed: {
    uname: function(){
      var str = this.$store.state.userObject.email
      var n = str.indexOf("@")
      var res = str.substr(0, n)
      return res
    },
    capitalizeLetters: function(){
      var str = this.$store.state.userObject.email
      var firstLetters = str.substr(0,2)
      return firstLetters.toUpperCase()
    }
  },
  methods: {
      dateFormatter(date){
        this.$http.post('/updatetasks', {
                id: this.filteredTodos.id,
                dueDate: date.toJSON()
            }).then(response => {
              console.log('task update', response.data)
          })
        var selectedDate = moment(date, 'YYYY-MM-DD').format('MMM DD');
        var cdate = new Date();
        // var datetime = "Last Sync: " + cdate.getDay() + "/"+cdate.getMonth() 
        // + "/" + cdate.getFullYear() + " @ " 
        // + cdate.getHours() + ":" 
        // + cdate.getMinutes() + ":" + cdate.getSeconds();
        var currentdate = moment(cdate, 'YYYY-MM-DD').format('ll');
        console.log("selectedDate:--",currentdate<selectedDate );
        console.log("currentdate:--",currentdate);
        if(currentdate == selectedDate){
          console.log("Due Soon",selectedDate);
          $('.ui-datepicker__display-value').css('color', "green");
        }else if(currentdate<selectedDate){
          console.log("Incompleted Task",selectedDate)
          $('.ui-datepicker__display-value').css('color', "black");
        }else if(currentdate>selectedDate){
          console.log("Over due Task",selectedDate)
          $('.ui-datepicker__display-value').css('color', "green");
        }
        return selectedDate
    },
   openfullwinodw : function(ind) {
     $('.window-full.circularButtonView').find('.fa').toggleClass('fa-compress');
     $('.window-full.circularButtonView').parents('#right_pane_container').toggleClass('open')
   } 
  }
  //   methods: {
  //   hideDiv: function () {
  //     var x = document.getElementById('right_pane_container');
  //     x.style.display = 'none';
  //   }
  // }
}
</script>
