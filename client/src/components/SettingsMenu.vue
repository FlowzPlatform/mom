<template>
  <modal :showModal="showModal" :closeAction="closeAction">
    <h3 slot="header">Settings</h3>
    <span slot="body">
      <div class="table-responsive">
        <table class="table" v-for="(arr, index) in settingArr">
          <tr>
          <td>{{arr.settings_name}}</td>
            <td>
            <input type="checkbox" :id="arr.id" :checked="checkFlag(arr)" @change="toggleSetting({arr:arr, event:$event.target.checked, uId: $store.state.userObject.id})" class="toggleSetting">
          </td>
          </tr>
        </table>
      </div>
    </span>
  </modal>
</template>

<script>
/* eslint-disable*/
import Modal from 'modal-vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['showModal', 'closeAction', 'settingArr'],
  components: { Modal },
  created(){
    this.$store.dispatch('getSettings', this.$store.state.userObject.id);
  },
  computed:{
    ...mapGetters([
      'settingArr'
    ])
  },
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