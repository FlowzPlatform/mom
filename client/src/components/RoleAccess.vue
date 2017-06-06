<template>
    <div>
    <!-- Page Contents -->
    <div id="app" class="ui vertical stripe segment">
        <div class="ui container">
            <div id="content" class="ui basic segment">
                <h3 class="ui header">List of Users</h3>
                
              
                <vuetable v-ref:vuetable
                    pagination-path=""
                    :pagination-component="paginationComponent"
                    wrapper-class="vuetable-wrapper ui basic segment"
                    table-wrapper=".vuetable-wrapper"
                    :fields="fields"
                    :sort-order="sortOrder"
                    :multi-sort="multiSort"
                    :item-actions="itemActions"
                    :per-page="perPage"
                    :append-params="moreParams"
                    detail-row-component="my-detail-row"
                    detail-row-id="id"
                    detail-row-transition="expand"
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
       <script src="../dist//vue-table.js"></script>  
<script>
 /* eslint-disable*/
import Vue from 'vue'
Vue.component('vuetable', require('./Vuetable.vue'));

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
                //  var idColumn = this.extractArgs(fieldName)
                data[rowField]=isChecked;
                console.log('custom-action name: ',data[rowField]);
                console.log('custom-action: ' + action, data, isChecked,rowField)

            },
            onClick: function(event) {
                console.log('custom-action: on-click', event.target)
            },
            onDoubleClick: function(event) {
                console.log('custom-action: on-dblclick', event.target)
            }
        }
    })

    Vue.component('my-detail-row', {
        template: [
            '<div class="detail-row ui form" @click="onClick($event)">',
                '<div class="inline field">',
                    '<label>Name: </label>',
                    '<span>{{rowData.name}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Email: </label>',
                    '<span>{{rowData.email}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Nickname: </label>',
                    '<span>{{rowData.nickname}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Birthdate: </label>',
                    '<span>{{rowData.birthdate}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Gender: </label>',
                    '<span>{{rowData.gender}}</span>',
                '</div>',
            '</div>',
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            onClick: function(event) {
                console.log('my-detail-row: on-click')
            }
        },
    })

    var tableColumns = [
        // '__checkbox:id',
     
        {
          name: 'name',
          title: '',
          sortField: 'name'
        },
        {
            name: 'email',
            sortField: 'email',
            visible: true,
            dataClass: 'center aligned',
            
        },
        {
            name: 'nickname',
            sortField: 'nickname',
            callback: 'allCap',
            dataClass: 'center aligned',
        },
        {
            name: 'birthdate',
            sortField: 'birthdate',
            callback: 'formatDate|D/MM/Y',
            dataClass: 'center aligned',
        },
        {
            name: ':custom-action',
            sortField: 'gender',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
            callback: 'gender'
        }
    ]

 export default {
   data:function () {
    return  {
       searchFor: '',
       moreParams: [],
       fields: tableColumns,
       sortOrder: [{
           field: 'name',
           direction: 'asc',
       }],
       multiSort: true,
       paginationComponent: 'vuetable-pagination',
       perPage: 10,
       // paginationInfoTemplate: 'แสดง {from} ถึง {to} จากทั้งหมด {total} รายการ',
       itemActions: [
           { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
           { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button' },
           { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
       ], tableData: [
            {
               "id": 1,
               "name": "Noelia O'Kon",
               "nickname": "true",
               "email": false,
               "birthdate": false,
               "gender": true
           },
           {
               "id": 2,
               "name": "Mr. Enid Von PhD",
               "nickname": true,
               "email": false,
               "birthdate": false,
               "gender": false
           }, {
               "id": 1,
               "name": "Noelia O'Kon",
               "nickname": 1,
               "email": 0,
               "birthdate": 1,
               "gender": "false"
           }
    ],
   }},
        methods: {
           
            rowClassCB: function(data, index) {
                return (index % 2) === 0 ? 'odd' : 'even'
            },
            // -------------------------------------------------------------------------------------------
            // You can change how sort params string is constructed by overriding getSortParam() like this
            // -------------------------------------------------------------------------------------------
            // getSortParam: function(sortOrder) {
            //     console.log('parent getSortParam:', JSON.stringify(sortOrder))
            //     return sortOrder.map(function(sort) {
            //         return (sort.direction === 'desc' ? '+' : '') + sort.field
            //     }).join(',')
            // }
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

                // if (action == 'view-item') {
                //     sweetAlert(action, data.name)
                // } else if (action == 'edit-item') {
                //     sweetAlert(action, data.name)
                // } else if (action == 'delete-item') {
                //     sweetAlert(action, data.name)
                // }
            }
        }
 }
 </script>
