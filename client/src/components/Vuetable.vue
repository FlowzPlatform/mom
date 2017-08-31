<template>
  <div v-bind:class="wrapperClass">
        <table class="vuetable" v-bind:class="tableClass">
            <thead>
                <tr>
                    <template v-for="(field, fieldNumber) in fields">
                        <th :class="field.titleClass" colspan="4" :style="getSectionBorderClass(fieldNumber-1,1) ">
                            {{ getTitle(field) }}&nbsp;
                        </th>
                    </template>
                </tr>
            </thead>
            <tbody v-cloak>
                <tr>
                    <th class="center aligned" colspan="4">
                        User Action
                    </th>
                    <template v-for="(field,fieldIndex) in fields.length-1">
                        <template v-for="n in 4">
                            <td :style="getSectionBorderClass(fieldIndex,n)">
                                {{ getFieldValue(n)}}

                            </td>
                        </template>
                    </template>
                </tr>
                <template v-for="(item, itemNumber) in tableData">
                    <tr @dblClick="onRowDoubleClicked(item, $event)" :class="onRowClass(item, itemNumber)">
                        <template v-for="(field,fieldNumber) in fields">
                            <td v-if="fieldNumber ==0" :class="field.dataClass" @dblclick="onCellDoubleClicked(item, field, $event)" colspan="4">
                                {{ item.name }}
                            </td>

                            <template v-for="n in 4" v-else>
                                <td :style="getSectionBorderClass(fieldNumber-1,n)">
                                    <!-- {{getObjectValue(item, field, n)}} -->
                                    <component :class="field.dataClass" is="custom-action" :row-data="item" :row-index="itemNumber" :row-check="getObjectValue(item, field, n)"
                                        :row-field="field" :role-value="getRoleValue(n)" :task-type-id="taskTypeId"></component>
                                </td>
                            </template>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
     /* eslint-disable*/
export default {
    props: {
        wrapperClass: {
            type: String,
            default: function() {
                return null
            }
        },
        tableWrapper: {
            type: String,
            default: function() {
                return null
            }
        },
        tableClass: {
            type: String,
            default: function() {
                return 'ui blue striped selectable celled stackable attached table'
            }
        },
        fields: {
            type: Array,
            required: true
        },
        itemActions: {
            type: Array,
            default: function() {
                return []
            }
        },
        rowClassCallback: {
            type: String,
            default: ''
        },
        tableData:{
            type: Array,
            required: true
        }
        ,
        taskTypeId:{
            type: String,
            required: true
        }
        
        
    },
    data: function() {
        return {
            eventPrefix: 'vuetable:',
            tablePagination: null,
            currentPage: 1,
            visibleDetailRows: []
        }
    },
    directives: {
        'attr': {
            update: function(value) {
                for (var i in value) {
                    this.el.setAttribute(i, value[i])
                }
            }
        },
    },
    methods: {
        getColSpan: function (fieldIndex) {
            var colSpan = fieldIndex == 0 ? 4 : 1
        },
        getSectionBorderClass: function (fieldIndex, colSpanIndex) {
            if (colSpanIndex == 1)
                return "border-left: 1px solid #000000;"
            // else if (colSpanIndex == 4 && fieldIndex < this.fields.length - 2)
            //     return "border-right: 1px solid #000000;"
            else
                return ""
        },
        getRoleValue:function(index)
        {
            if (index == 1)
                return 8
            else if (index == 2)
                return 4
            else if (index == 3)
                return 2
            else
                return 1
        },
        getFieldValue:function(index)
        {
            if (index == 1)
                return "C"
            else if (index == 2)
                return "R"
            else if (index == 3)
                return "U"
            else if (index == 4)
                return "D"
            else
                return ""
        },
        onRowClass: function(dataItem, index) {
            var func = this.rowClassCallback.trim()

            if (func !== '' && typeof this.$parent[func] === 'function') {
                return this.$parent[func].call(this.$parent, dataItem, index)
            }
            return ''
        },
        isSelectedRow: function(key) {
            return this.selectedTo.indexOf(key) >= 0
        },
        rowSelected: function(dataItem, fieldName) {
            var idColumn = fieldName
            var key = dataItem[idColumn]
            return key
        },
        itemAction: function(action,isChecked, data,rowCheck) {
            //  var idColumn = this.extractArgs(fieldName)
        },
        normalizeFields: function() {
            var self = this
            var obj
            this.fields.forEach(function (field, i) {
                if (typeof (field) === 'string') {
                    obj = {
                        name: field,
                        title: self.setTitle(field),
                        titleClass: '',
                        dataClass: '',
                        callback: null,
                        visible: true
                    }
                } else {
                    obj = {
                        name: field.name,
                        title: (field.title === undefined) ? self.setTitle(field.name) : field.title,
                        sortField: field.sortField,
                        titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
                        dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
                        callback: (field.callback === undefined) ? '' : field.callback,
                        visible: (field.visible === undefined) ? true : field.visible
                    }
                }
                self.fields.$set(i, obj)
            })
        },
        getObjectValue: function(object, path, crudIndex) {
            // defaultValue = (typeof defaultValue == 'undefined') ? null : defaultValue
            if (path.id) {
                var roleId = object.roleid;
                let roleIndex = _.findIndex(roleId, function (role) { return role.rId === path.id })
                if (roleIndex < 0)
                    return false;

                var role = roleId[roleIndex];
                if (role.rId == path.id) {
                    if (role.accessValue) {
                        if (crudIndex == 1) {
                            return role.accessValue >= 8
                        } else if (crudIndex == 2) {
                            var readValue = [4, 5, 6, 7, 12, 13, 14, 15];
                            return readValue.includes(role.accessValue)//>=4 && path.accessValue<=7) || (path.accessValue>12 && path.accessValue<=15) 
                        } else if (crudIndex == 3) {
                            var updatevalue = [2, 3, 6, 7, 10, 11, 14, 15]
                            return updatevalue.includes(role.accessValue)
                        } else {

                            var deletevalue = [1, 3, 5, 7, 9, 11, 13, 15]
                            return deletevalue.includes(role.accessValue)
                        }
                    }
                }
                return false;
            } else {
                return object.name;
            }
               
        },
        getTitle: function(field) {
            if (typeof field.title === 'undefined') {
                return this.titleCase(field.name.replace('.', ' '))
            }
            return this.titleCase(field.title)
        },
        setTitle: function(str) {
            if (this.isSpecialField(str)) {
                return ''
            }
            return this.titleCase(str)
        },
        titleCase: function(str)
        {
            return str.replace(/\w+/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        },
        checkCheckboxesState: function(fieldName) {
            var self = this
            var idColumn = this.extractArgs(fieldName)
            var selector = 'th.checkbox_' + idColumn + ' input[type=checkbox]'
            var els = document.querySelectorAll(selector)

            // count how many checkbox row in the current page has been checked
            var selected = this.tableData.filter(function(item) {
                return self.selectedTo.indexOf(item[idColumn]) >= 0
            })

            // count == 0, clear the checkbox
            if (selected.length <= 0) {
                els.forEach(function(el) {
                    el.indeterminate = false
                })
                return false
            }
            // count > 0 and count < perPage, set checkbox state to 'indeterminate'
            else if (selected.length < this.perPage) {
                els.forEach(function(el) {
                    el.indeterminate = true
                })
                return true
            }
            // count == perPage, set checkbox state to 'checked'
            else {
                els.forEach(function(el) {
                    el.indeterminate = false
                })
                return true
            }
        },
        extractName: function(string) {
            return string.split(':')[0].trim()
        },
        extractArgs: function(string) {
            return string.split(':')[1]
        },
        callDetailRowCallback: function(item) {
            var func = this.detailRowCallback.trim()
            if (func === '') {
                return ''
            }

            if (typeof this.$parent[func] == 'function') {
                return this.$parent[func].call(this.$parent, item)
            } else {
                // console.error('Function "'+func+'()" does not exist!')
            }
        },
        deleteRole: function(item) {
            this.$store.dispatch('removeNewRole', item)
        }
    },
    watch: {
        'multiSort': function(newVal, oldVal){
            if (newVal === false && this.sortOrder.length > 1) {
                this.sortOrder.splice(1);
                this.loadData();
            }
        }
    },
    events: {
        'vuetable-pagination:change-page': function(page) {
            if (page == 'prev') {
                this.gotoPreviousPage()
            } else if (page == 'next') {
                this.gotoNextPage()
            } else {
                this.gotoPage(page)
            }
        },
        'vuetable:reload': function() {
            this.loadData()
        },
        'vuetable:refresh': function() {
            this.currentPage = 1
            this.loadData()
        },
        'vuetable:goto-page': function(page) {
            this.$emit('vuetable-pagination:change-page', page)
        },
        'vuetable:set-options': function(options) {
            for (var n in options) {
                this.$set(n, options[n])
            }
        },
        'vuetable:toggle-detail': function(dataItem) {
            this.toggleDetailRow(dataItem)
        },
        'vuetable:show-detail': function(dataItem) {
            this.showDetailRow(dataItem)
        },
        'vuetable:hide-detail': function(dataItem) {
            this.hideDetailRow(dataItem)
        },
        'vuetable:normalize-fields': function() {
            this.normalizeFields()
        }
    },
    created: function() {
       // this.checkForDeprecatedProps()
        // this.normalizeFields()
    
        // this.$nextTick(function() {
        //     this.callPaginationConfig()
        // })
    }
}
</script>

<style>
.ui.table {
    font-size: 1em;
    display: inline-table;
}
    .vuetable th.sortable:hover {
      color: #2185d0;
      cursor: pointer;
    }
    .vuetable-actions {
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
    .vuetable-wrapper.ui.basic.segment {
       overflow-x: overlay;
    display: grid;
    width: 100%;
    }

    .thead > span {
    display: inline-block;
    width: 120px;
    line-height: 40px;
    box-shadow: inset 0 0 1px 0 rgba(0,0,0,.5);
    background-color: rgba(255,0,0,.3);
    text-align: center;
}
</style>
