<template>
    <div>
        <hr>
         <div class="[ row ]" style="margin-left: 0; margin-right: 0; display: inline-table; text-align: -webkit-auto;" v-if="id === 'rightTaskTypes'">
            <h4 class="uiStatus"><b>State</b></h4>
            <!-- <div class="left-multipleselect">
                <span class="multipleselect-filter">
                    <input type="text" >
                </span>
                <ul class="multipleselect list-group" id="AvailableSelectedMembers" name="AvailableSelectedMembers">
                    <li  class="list-group-item" @click="insertTypeState(status)" :value="status.status" v-for="status in getTaskStausList" v-if="status.id !== '-1'"><span :style="{'background-color': status.color}"> </span>{{status.status}}
                    </li>
                </ul>
            </div>
            <div class="state-btn-man">
                <div class="btn-group buttons">
                    <button type="button" class="btn move btn-primary" title="Move selected" @click="moveLeft">
                        <i class="glyphicon glyphicon-arrow-right"></i>
                    </button>
                </div>
                <div class="btn-group buttons">
                    <button type="button" class="btn remove btn-primary" title="Remove selected">
                        <i class="glyphicon glyphicon-arrow-left"></i>
                    </button>
                </div>
            </div>
            <div class="right-multipleselect ">
                <span class="multipleselect-filter">
                    <input type="text" >
                </span>
                <ul class="multipleselect list-group" id="RequestedSelectedMembers" multiple="multiple" name="RequestedSelectedMembers">
                    <li class="list-group-item" @click="removeTypeState(status)" :value="status.status" v-for="status in taskState"><span :style="{'background-color': status.color}"> </span>{{status.state}}</li>
                </ul>
            </div> -->
            <div class="[ form-group ]"  v-for="status in getTaskStausList" style="margin: 5px;" v-if="status.id !== '-1'">
            <input type="checkbox" @click="insertTypeState(status, $event.target.checked)" :name="status.status" :id="status.id" autocomplete="off" />
                <div class="[ btn-group ]">
                    <label :for="status.id" class="[ btn btn-default ]" :style="{'border-color':'#adadad',  'background-color':status.color }">
                    <span class="[ glyphicon glyphicon-ok ]"></span>
                    <span> </span>
                </label>
                    <label :for="status.id" class="[ btn btn-default active ]">
                        {{status.status}}
                </label>
                </div>
            </div>
        </div>
        <div v-if="id === 'rightTaskStatus'">
            <div class="control-group">
                <label for="input-color">Color:</label>
                <input type="color" id="bgcolor" v-model="filteredTodo.color" value="#ffffff" @change="getColorVal($event.target.value)"
                    style="height:25px; width:25px;" />
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
                value: ''
            }
        },
        created() {
            this.$store.dispatch('getTypeState')
        },
        computed: {
            ...mapGetters([
                'getTaskStausList',
                'getTask_types_state'
            ]),
            taskState() {
                let stateList = this.getTask_types_state
                this.taskStateList(stateList)
                return stateList
            },
        },
        methods: {
            getColorVal: function (val) {
                this.$store.dispatch('addTask_Status', { "status": this.filteredTodo, "color": val })
            },
            insertTypeState: function (status, event) {
                if(event){
                    this.$store.dispatch('insert_type_state', { "status": status, "taskType": this.filteredTodo })
                } else {
                    this.$store.dispatch('remove_type_state', status)    
                }
            },
            // removeTypeState: function (status) {
            //     this.$store.dispatch('remove_type_state', status)
            // },
            taskStateList: function (state) {
                state.forEach(function (c) {
                    let stateId = c.state_id
                    let stateIndex = _.findIndex(this.$store.state.task_status_list, function (m) {
                        return m.id === stateId
                    })
                    if (stateIndex < 0) {
                    } else {
                        c.color = this.$store.state.task_status_list[stateIndex].color
                        c.state = this.$store.state.task_status_list[stateIndex].status
                    }
                }, this)
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

    .uiStatus {
        width: 100%;
        float: left;
        text-align: left;
    }

    .glyphicon-ok:before {
        color: white
    }

    .verticalbutton {
        margin: 10px;
        height: 100%;
        margin-top: auto;
        margin-bottom: auto;
    }

    .colorswatches {
        width: 25px;
        height: 25px;
        border: 1px solid gray;
    }

    .multipleselect li span {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-color: #ccc;
        vertical-align: middle;
        margin-right: 5px;
    }

    .multipleselect li {
        width: 100%;
        text-align: left;
        display: inline-block;
        margin: 5px 2px 0 2px;
        border-bottom: solid 1px #ccc;
        padding-bottom: 5px;
        cursor: pointer
    }

    .multipleselect {
        border: solid 1px #ccc;
        margin-left: 10px;
        max-height: 200px;
        overflow: auto;
        margin-top: 10px;
        padding: 5px;
    }

.left-multipleselect,
.right-multipleselect {width: 40%; display: inline-block;vertical-align: top;}
.left-multipleselect > ul,
.right-multipleselect > ul {width: 100%; display: inline-block;overflow-x: hidden; vertical-align: top; height: 200px}
.state-btn-man {width: 50px; margin-left: 18px; display: inline-block; padding-top: 75px;}
.state-btn-man .buttons {margin-bottom: 5px;}
.multipleselect-filter > input{width: 100%; padding: 0 5px;
border: solid 1px #ccc;
line-height: 25px;
margin-left: 10px;
margin-top: 5px;}
</style>