<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="settingsMenu" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" >Settings</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-9" v-for="(arr, index) in settingArr" style="padding: 10px;    position: static;">
              {{arr.settings_name}}
              <input type="checkbox" :id="arr.id" :checked="checkFlag(arr)" @change="toggleSetting({arr:arr, event:$event.target.checked, uId: $store.state.userObject._id})" class="toggleSetting">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable*/
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['settingArr'],
  methods:{
    ...mapActions([
      'toggleSetting'
    ]),
    checkFlag(settingArr) {
      if(settingArr.user_setting.length == 0){
        return false
      }else{
        return settingArr.user_setting[0].setting_value
      }
    }
  }
}
</script>