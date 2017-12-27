<template>
    <div>
        <hr>
        <div class="[ row ]" style="margin-left: 0; margin-right: 0; display: inline-table; text-align: -webkit-auto;" v-if="id === 'rightTaskTypes'">
            <h4 class="uiStatus">
                <b>State</b>
            </h4>
            <div class="[ form-group ]" v-for="state in setSelectedState" style="margin: 5px;" v-if="state.id !== '-1'">
                <input type="checkbox" checked="" v-model="state.selected" @click="insertTypeState(state, $event.target.checked)" :name="state.taskState"
                    :id="state.id" autocomplete="off" />
                <div class="[ btn-group ]">
                    <label :for="state.id" class="[ btn btn-default ]" :style="{'border-color':'#adadad',  'background-color':state.color }">
                        <span class="[ glyphicon glyphicon-ok ]"></span>
                        <span> </span>
                    </label>
                    <label :for="state.id" class="[ btn btn-default active ]">
                        {{state.taskState}}
                    </label>
                </div>
            </div>
        </div>
        <div v-if="id === 'rightTaskState'">
            <div class="control-group">
                <label for="input-color">Color:</label>
                <input type="color" id="bgcolor" v-model="filteredTodo.color" value="#0000" @change="getColorVal($event.target.value)" style="height:25px; width:25px;"
                />
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
        computed: {
            ...mapGetters([
                'getTaskStausList',
                'getTask_types_state'
            ]),
            setSelectedState() {
                let selectedList = this.getTaskStausList
                this.stateSelectedList(selectedList)
                return selectedList
            }
        },
        methods: {
            getColorVal: function (val) {
                this.$store.dispatch('addTask_State', { "state": this.filteredTodo, "color": val })
            },
            insertTypeState: function (state, event) {
                if (event) {
                    this.$store.dispatch('insert_type_state', { "state": state, "taskType": this.filteredTodo })
                } else {
                    let findObject = this.$store.state.task_types_state.find(type => type.state_id === state.id)
                    this.$store.dispatch('remove_type_state', findObject)
                }
            },
            stateSelectedList: function (list) {
                list.forEach(function (c) {
                    let stateId = c.id
                    let stateIndex = _.findIndex(this.$store.state.task_types_state, function (m) {
                        return m.state_id === stateId
                    })
                    if (stateIndex < 0) {
                        c.selected = false
                    } else {
                        c.selected = true
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
    .right-multipleselect {
        width: 40%;
        display: inline-block;
        vertical-align: top;
    }

    .left-multipleselect>ul,
    .right-multipleselect>ul {
        width: 100%;
        display: inline-block;
        overflow-x: hidden;
        vertical-align: top;
        height: 200px
    }

    .state-btn-man {
        width: 50px;
        margin-left: 18px;
        display: inline-block;
        padding-top: 75px;
    }

    .state-btn-man .buttons {
        margin-bottom: 5px;
    }

    .multipleselect-filter>input {
        width: 100%;
        padding: 0 5px;
        border: solid 1px #ccc;
        line-height: 25px;
        margin-left: 10px;
        margin-top: 5px;
    }
</style>