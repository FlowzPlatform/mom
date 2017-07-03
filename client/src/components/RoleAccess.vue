<template>
    <div>
    <!-- Page Contents -->
    <div id="app" class="ui vertical stripe segment">
        <div class="ui container">
            <div id="content" class="ui basic segment">
                <h3 class="ui header">User Group</h3>
                
              
                <vuetable v-ref:vuetable
                    wrapper-class="vuetable-wrapper ui basic segment"
                    table-wrapper=".vuetable-wrapper"
                    :fields="fields"
                    row-class-callback="rowClassCB"
                    :tableData="tableData"
                ></vuetable>
            </div>
        </div>
    </div>
    </div>
</template>
  <style type="text/css">
        .ui.vertical.stripe h3 {
          font-size: 2em;
        }

        .secondary.pointing.menu .toc.item {
          display: none;
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
        .vuetable-actions, .custom-action {
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
        .expand-enter, .expand-leave {
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

Vue.component('vuetable', require('./Vuetable.vue'));
Vue.use(Resource)

 Vue.component('custom-action', {
        template: [
            '<div>',
                '<input type="checkbox"  @click="itemAction(\'check-item\', $event.target.checked,rowData,rowField)" :checked="rowCheck"/>',
            '</div>'
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowCheck:{
                required: true
            },
             rowField:{
                required: true
            }
        },
        methods: {
            itemAction: function(action,isChecked, data,rowField) {
                if (isChecked) {
                    this.$store.dispatch('addAccessPermision', {
                        rId: rowField.id,
                        pId: data.id
                    })
                } else {
                    this.$store.dispatch('removeAccessPermision', {
                        rId: rowField.id,
                        pId: data.id
                    })

                }
            },
            onClick: function(event) {
                console.log('custom-action: on-click----->', event.target)
            },
            onDoubleClick: function(event) {
                console.log('custom-action: on-dblclick', event.target)
            }
        }
    })

    var tableColumns = []

 export default {
   data:function () {
    return  {
       fields: tableColumns,
       tableData: [
        //     {
        //        "id": 1,
        //        "name": "Noelia O'Kon",
        //        "nickname": "true",
        //        "email": false,
        //        "birthdate": false,
        //        "gender": true
        //    },
        //    {
        //        "id": 2,
        //        "name": "Mr. Enid Von PhD",
        //        "nickname": true,
        //        "email": false,
        //        "birthdate": false,
        //        "gender": false
        //    }, {
        //        "id": 1,
        //        "name": "Noelia O'Kon",
        //        "nickname": 1,
        //        "email": 0,
        //        "birthdate": 1,
        //        "gender": "false"
        //    }
    ],
   }},
   created(){ 

        this.$http.get('http://localhost:3030/role').then(response => {
           console.log("Response roles:--", response.body)
            tableColumns=[{
          name: 'name',
          title: '',
          sortField: 'name'
         }];
            this.fields=tableColumns;
           response.body.forEach(function (row) {
               row.titleClass = 'center aligned'
               row.dataClass = 'center aligned'
               console.log("Field row", row);
            //    tableColumns.push(row)
             tableColumns.push(row)
            //    this.fields.push(row);
             console.log("Field tablerow", tableColumns);
         
           }, this);
            //   this.fields.push(tableColumns);  
           this.callTaskList();
       });
   },
        methods: {
            callTaskList:function(){
                this.$http.get('http://localhost:3030/accessright').then(response => {
                    console.log("Response roles:--", response.body)
                    this.tableData=response.body;
                });
            },
            rowClassCB: function(data, index) {
                return (index % 2) === 0 ? 'odd' : 'even'
            },
         
        },
        events: {
            'vuetable:row-changed': function(data) {
                console.log('row-changed:', data.name)
            },
            'vuetable:row-clicked': function(data, event) {
                console.log('row-clicked:', data.name)
            },
            'vuetable:cell-clicked': function(data, field, event) {
                console.log('cell-clicked:', field.name)
                if (field.name !== '__actions') {
                    this.$broadcast('vuetable:toggle-detail', data.id)
                }
            },
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)

            }
        }
 }
 </script>
