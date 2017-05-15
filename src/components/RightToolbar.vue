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
                        <!-- react-text: 2 -->UN<!-- /react-text -->
                        </div>
                      </div>
                    </div>
                    <a tabindex="-1" class="token_name " href="">User Name</a>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="loading-boundary taskDetailsView-toolbarProperty">
            <div class="redesign-due-date-container">
                <div class="property due_date ">
                    <div class="property-name" id="luna6">
                    <span>
                      <ui-datepicker
                          icon="event"
                          placeholder="Due Date"
                          v-model="picker1">
                      </ui-datepicker>
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
              <a id="details_property_sheetproperty_attach_attach_menu" tabindex="-1" class="dropdown-menu-link attach-menu  ">
                <div id="property_attach" class="circularButtonView property attach circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active">
                  <i class="fa fa-paperclip" aria-hidden="true"></i>
                </div>
              </a>
            </span>
          </div>
      
      <div class="loading-boundary reskinToolbarActionMenu">
				<a id="details_action_menu" tabindex="-1" class="dropdown-menu-link   open">
					<div class="circularButtonView action-menu-label circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active">
              <i class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></i>
					</div>
				</a>
			</div>
      </span>
      <!--<span class="destroy" @click="hideDiv()"><i class="fa fa-close"></i></span>-->
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue';
import KeenUI from 'keen-ui';

Vue.use(KeenUI);
export default {
  data() {
    return {
      picker1: null
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
