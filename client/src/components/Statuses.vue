<template>
    <div>
        <hr>
        <div class="[ row ]" style="margin-left: 0; margin-right: 0" v-if="id === 'rightTaskTypes'">
            <h4 class="uiStatus"><b>State</b></h4>
            <select id="AvailableSelectedMembers" multiple="multiple" name="AvailableSelectedMembers" style="width: 200px; height: 200px">
                <option @click="insertTypeState(status)"  :value="status.status" v-for="status in getTaskStausList">{{status.status}}</option>
            </select>
            <div class="verticalbutton">
            <div class="btn-group buttons">
                <button type="button" class="btn moveall btn-primary" title="Move all">
                    <i class="glyphicon glyphicon-arrow-right"></i>
                    <i class="glyphicon glyphicon-arrow-right"></i>
                </button>
                <button  type="button" class="btn move btn-primary" title="Move selected">
                    <i class="glyphicon glyphicon-arrow-right"></i>
                </button>
            </div>
            <div class="btn-group buttons">
                <button type="button" class="btn remove btn-primary" title="Remove selected">
                    <i class="glyphicon glyphicon-arrow-left"></i>
                </button>
                <button type="button" class="btn removeall btn-primary" title="Remove all">
                    <i class="glyphicon glyphicon-arrow-left"></i>
                    <i class="glyphicon glyphicon-arrow-left"></i>
                </button>
            </div>
            </div>
            <select id="RequestedSelectedMembers" multiple="multiple" name="RequestedSelectedMembers" style="width: 200px; height: 200px">
                <option @click="removeTypeState(status)" :value="status.status" v-for="status in getTask_types_state">{{status.state}}</option>
            </select>
            <!-- <div class="[ form-group ]" @change="toggleStatus(status, $event)" v-for="status in getTaskStausList" style="margin: 5px;" v-if="status.id !== '-1'">
                <input type="checkbox" :name="status.status" :id="status.id" autocomplete="off" />
                <div class="[ btn-group ]">
                    <label :for="status.id" class="[ btn btn-default ]" :style="{'border-color':'#adadad',  'background-color':status.color }">
                    <span class="[ glyphicon glyphicon-ok ]"></span>
                    <span> </span>
                </label>
                    <label :for="status.id" class="[ btn btn-default active ]">
                        {{status.status}}
                </label>
                </div>
            </div> -->
        </div>
        <div v-if="id === 'rightTaskStatus'">
            <div class="control-group">
                <label for="input-color">Color:</label>
                 <input type="color" id="bgcolor" v-model="filteredTodo.color" value="#ffffff" @change="getColorVal($event.target.value)" />
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable*/
    import { mapGetters } from 'vuex'
    export default {
        props: ['id', 'filteredTodo'],
        data: function () {
            return {
                value:''
            }
        },
        created() {
            this.$store.dispatch('getTypeState')
        },
        computed: {
            ...mapGetters([
                'getTaskStausList',
                'getTask_types_state'
            ])
        },
        methods: {
            getColorVal: function (val) {
                this.$store.dispatch('addTask_Status', { "status": this.filteredTodo, "color": val })
            },
            insertTypeState: function (status) {
                console.log(status)
                this.$store.dispatch('insert_type_state', {"status": status, "taskType":this.filteredTodo})
            },
            removeTypeState: function(status) {
                this.$store.dispatch('remove_type_state', status)
            }
        }
    }
</script>
<style>
    .form-group input[type="checkbox"] {
        display: none;
    }

    .form-group input[type="checkbox"]+.btn-group>label span {
        width: 20px;
    }

    .form-group input[type="checkbox"]+.btn-group>label span:first-child {
        display: none;
    }

    .form-group input[type="checkbox"]+.btn-group>label span:last-child {
        display: inline-block;
    }

    .form-group input[type="checkbox"]:checked+.btn-group>label span:first-child {
        display: inline-block;
    }

    .form-group input[type="checkbox"]:checked+.btn-group>label span:last-child {
        display: none;
    }
    .uiStatus{
        width: 100%;
        float: left;
        text-align: left;
    }
    .glyphicon-ok:before{
        color: white
    }
    .verticalbutton{
        margin: 10px;
        height: 100%;
        margin-top: auto;
        margin-bottom: auto;
    }
</style>