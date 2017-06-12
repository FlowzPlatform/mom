<template>
  <modal :showModal="showModal" :closeAction="closeAction">
    <h3 slot="header">Settings</h3>
    <span slot="body">
      <div class="table-responsive">
        <table class="table" v-for="(arr, index) in settingArr">
          <tr>
          <td>{{arr.settings_name}}</td>
          <td >
              <input type="checkbox" :id="arr.id"  v-if="arr.user_setting.length > 0" v-model="arr.user_setting[0]" @change="toggleSetting(arr.user_setting[0])" class="toggleSetting">
              <!--<input type="checkbox" id="arr.id" v-if="arr.user_setting.length == 0" class="toggleSetting">-->
              <label :for="arr.id"></label>
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
  props: ['showModal', 'closeAction', 'filteredTodo'],
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
    ])
  }
}
</script>