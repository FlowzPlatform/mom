<template>
    <div>
            <div class="content content--full">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="side-filter__wrapper side-filter__wrapper--open">
                            <ul class="side-filter__category-list">
                                <li class="side-filter__category-item" @click="showACL">
                                    <a class="side-filter__category-label">
                                    <span class="side-filter__category-content">
                                        <span class="side-filter__category-content-text side-filter__category-content-text--nockeckbox truncate">
                                                ACL
                                        </span>
                                    </span>
                                    </a>
                                </li>
                                <li class="side-filter__category-item" @click="showTaskType">
                                    <a class="side-filter__category-label">
                                    <span class="side-filter__category-content">
                                        <span class="side-filter__category-content-text side-filter__category-content-text--nockeckbox truncate">
                                                Task Type
                                        </span>
                                    </span>
                                    </a>
                                </li>
                                <li class="side-filter__category-item" @click="showTaskState">
                                    <a class="side-filter__category-label">
                                    <span class="side-filter__category-content">
                                        <span class="side-filter__category-content-text side-filter__category-content-text--nockeckbox truncate">
                                                Task State
                                        </span>
                                    </span>
                                    </a>
                                </li>
                                <li class="side-filter__category-item" @click="showRoleState">
                                    <a class="side-filter__category-label">
                                    <span class="side-filter__category-content">
                                        <span class="side-filter__category-content-text side-filter__category-content-text--nockeckbox truncate">
                                                Role
                                        </span>
                                    </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <!-- Page Contents -->
                        <div style="height: calc( 100% - 40px);">
                            <div id="app" class="ui vertical stripe segment" v-show="isUserGroup">
                                <div class="ui container">
                                    <div id="content" class="ui basic segment">
                                        <h3 class="ui header">ACL</h3>
                                        <div v-for="(item, itemNumber) in tableData">
                                            <Widget>
                                                <WidgetHeading :id="1" :Title="'Sales'" :TextColor="false" :DeleteButton="false" :ColorBox="false" :Expand="false" :Collapse="true"
                                                    :HeaderEditable="false">
                                                            {{item.type}}
                                                </WidgetHeading>
                                                <WidgetBody>
                                                       <vuetable table-wrapper=".vuetable-wrapper" :fields="fields"
                                                        row-class-callback="rowClassCB" :tableData="item.permission" :taskTypeId="item.id"></vuetable>   
                                                </WidgetBody>
                                            </Widget>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="app" class="ui vertical stripe segment" v-show = "isTaskType">
                                <show-task-types></show-task-types>
                            </div>
                            <div id="app" class="ui vertical stripe segment" v-show = "isTaskState">
                                <show-task-state></show-task-state>
                            </div>
                            <div id="app" class="ui vertical stripe segment" v-show = "isRoleList">
                                <roles-types></roles-types>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<style type="text/css">
    .col-md-2.border-right::after {position: fixed; left: 16.55%;border-right: solid 1px #ccc; content: ""; height: 100%; top: 0px; bottom: 0px;}

    .ui.segment {
        top: 0 !important;
        margin-top: 0px !important;
    }

    .ui.container {
        background-color: transparent;
        position: relative;
        top: 0;
        left: inherit;
        right: inherit;
        width: 100%;
        max-height: inherit;
        height: inherit;
        -ms-transform: translateX(0%) translateY(0%);
        transform: translateX(0%) translateY(0%);
        -webkit-transform: translateX(0%) translateY(0%);
    }

    .ui.blue.table {
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
            overflow-x: scroll;
        
    }
    .ui.blue.table td {
        margin: 0;
        text-align: center
    }
    .ui.blue.table td input {
        width: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
        align-items: center;
    }
    .ui.vertical.stripe h3 {
        font-size: 2em;
    }

    .content--full {
        max-width: 100%;
        padding: 0 15px;
        position: fixed;
        width: 100%;
        height: calc( 100% - 40px);
        top: 40px;
        overflow: auto;
    }

    .side-filter__wrapper {
        position: relative;
        display: block;

        overflow: hidden;
        margin-bottom: 10px;
        -webkit-transition: max-height .2s ease;
        transition: max-height .2s ease;
    }
        .ui.vertical.stripe h3 {
          font-size: 2em;
        }

    .side-filter__category-list {
        padding-left: 0;
        margin-top: 3px;
    }

    .side-filter__category-item {
        list-style: none;
        line-height: 3rem;
    }

    .side-filter__category-label {
        color: #4c5766;
        cursor: pointer;
        display: block;
        font-weight: 400;
        margin: 0;
        padding: 0 10px;
        position: relative;
    }

    .side-filter__category-content {
        text-transform: capitalize;
    }

    .side-filter__category-content-text--nockeckbox {
        bottom: 0;
    }

    .side-filter__category-content-text {
        width: 60%;
        display: inline-block;
        vertical-align: bottom;
        position: relative;
        bottom: 2px;
    }

    .truncate {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    li.side-filter__category-item:hover {
        background-color: #02ceff;
    }

    li.side-filter__category-item:active {
        background-color: #02ceff;
    }
    .secondary.pointing.menu .toc.item {
        display: none;
    }

    button.btn.btn-secondary {
        padding: 8px;
        margin: 0px;
    }

    .col-lg-6{
        margin: 3px;
        margin-left: 0;
        margin-right: 0;
    }
    .vuetable {
        margin-top: 1em !important;
    }

    .vuetable-wrapper.ui.basic.segment {
        padding: 0em;
    }

    .vuetable button.ui.button {
        padding: .5em .5em;
        font-weight: 400;
    }

    .vuetable button.ui.button i.icon {
        margin: 0;
    }

    .vuetable th.sortable:hover {
        color: #2185d0;
        cursor: pointer;
    }

    .vuetable-actions,
    .custom-action {
        width: 15%;
        padding: 12px 0px;
        text-align: center;
    }

    .vuetable-pagination {
        background: #f9fafb !important;
    }

    .vuetable-pagination-info {
        margin-top: auto;
        margin-bottom: auto;
    }

    [v-cloak] {
        display: none;
    }

    .highlight {
        background-color: yellow;
    }

    .vuetable-detail-row {
        height: 200px;
    }

    .detail-row {
        margin-left: 40px;
    }

    .expand-transition {
        transition: all .5s ease;
    }

    .expand-enter,
    .expand-leave {
        height: 0;
        opacity: 0;
    }

    tr.odd {
        background-color: #e6f5ff;
    }

    body {
        overflow-y: scroll;
    }
</style>
<script src="../../dist/vue-table.js"></script>
<script>
    /* eslint-disable*/
    import Vue from 'vue'
    import Resource from 'vue-resource'
    import VueWidgets from 'vue-widgets'
    import * as services from '../services'
    import 'vue-widgets/dist/styles/vue-widgets.css'
    Vue.use(VueWidgets)
    import ShowTaskTypes from './ShowTaskTypes.vue'
    import ShowTaskState from './ShowTaskState.vue'
    import RolesTypes from './RolesTypes.vue'
    Vue.component('vuetable', require('./Vuetable.vue'));
    Vue.use(Resource)

    Vue.component('custom-action', {
        template: [
            '<div>',
                '<input type="checkbox"  @click="itemAction(\'check-item\', $event.target.checked,rowData,rowField,roleValue,taskTypeId)" :checked="rowCheck" />',
            '</div>'
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowCheck: {
                required: true
            },
            rowField: {
                required: true
            },
             roleValue:{
                required: true
            },
            taskTypeId:{
                required: true
            }
        },
        methods: {
            itemAction: function(action,isChecked, data,rowField,roleValue,taskTypeId) {
                
                  let roleIndex = _.findIndex(data.roleid, function (role) { return role.rId === rowField.id })
                 if(roleIndex>-1)
                 {
                      var role = data.roleid[roleIndex];
                     var accessValues = role.access_value ? role.access_value : 0
                     var patchValue = isChecked ? accessValues + roleValue : accessValues - roleValue
                     this.$store.dispatch('patchAccessPermision', {
                         rId: rowField.id,
                         pId: data.id,
                         access_value: patchValue,
                         taskType:taskTypeId
                     })
                     role.access_value=patchValue;
                 }else{
                     this.$store.dispatch('addAccessPermision', {
                         rId: rowField.id,
                         pId: data.id,
                         access_value:  roleValue,
                         taskType:taskTypeId
                     })
                        data.roleid.push({rId: rowField.id,access_value:roleValue})
                 }
             
            },
            onClick: function (event) {
                console.log('custom-action: on-click----->', event.target)
            },
            onDoubleClick: function (event) {
                console.log('custom-action: on-dblclick', event.target)
            }
        }
    })

    var tableColumns = []

    export default {
        data: function () {
            return {
                fields: tableColumns,
                roles: [],
                tableData: [],
                addRole: '',
                isUserGroup: false,
                isTaskType: false,
                isTaskState: false,
                isRoleList:false
            }
        },
        created() {
            this.$store.dispatch('eventListener');
            this.$store.dispatch('getUsersRoles');
            services.roleService.find().then(response =>{
                console.log("Response :--",response)
                tableColumns = [{
                    name: 'name',
                    title: '',
                    sortField: 'name'
                }];
                this.fields = tableColumns;
                this.roles = response.body;
                response.forEach(function (row) {
                    row.titleClass = 'center aligned'
                    row.dataClass = 'center aligned'
                    // console.log("Field row", row);
                    //    tableColumns.push(row)
                    tableColumns.push(row)
                    //    this.fields.push(row);
                    // console.log("Field tablerow", tableColumns);

                }, this);
                //   this.fields.push(tableColumns);  
                this.callTaskList();
            })
           
        },
        methods: {
            callTaskList: function () {
                services.roleAccessService.find({
                    query: {
                        $client: {
                            flag: 'rolePermision'
                        }
                    }
                }).then(response => {
                    console.log("Response roles:--", response)
                    this.tableData = response;
                });
            },
            rowClassCB: function (data, index) {
                return (index % 2) === 0 ? 'odd' : 'even'
            },
            AddSubmit: function(obj){
                this.$store.dispatch('insertNewRole', {"name":obj, "index":this.tableData.length}) 
            },
            showACL: function() {
                this.isUserGroup = true
                this.isTaskType = false
                this.isTaskState = false
                this.isRoleList=false
            },
            showTaskType: function() {
                this.isTaskType = true
                this.isUserGroup = false
                this.isTaskState = false
                this.isRoleList=false
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
            },
            showTaskState: function() {
                this.isTaskType = false
                this.isUserGroup = false
                this.isTaskState = true
                this.isRoleList=false
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
            },
            showRoleState: function(){
                this.isTaskType = false
                this.isUserGroup = false
                this.isTaskState = false
                this.isRoleList=true
                this.$store.state.parentIdArr.splice(0, this.$store.state.parentIdArr.length)
            }

        },
        events: {
            'vuetable:row-changed': function (data) {
                console.log('row-changed:', data.name)
            },
            'vuetable:row-clicked': function (data, event) {
                console.log('row-clicked:', data.name)
            },
            'vuetable:cell-clicked': function (data, field, event) {
                console.log('cell-clicked:', field.name)
                if (field.name !== '__actions') {
                    this.$broadcast('vuetable:toggle-detail', data.id)
                }
            },
            'vuetable:action': function (action, data) {
                console.log('vuetable:action', action, data)

            }
        },
        components: {
            ShowTaskTypes,
            ShowTaskState,
            VueWidgets,
            RolesTypes
        }   
    }
</script>