<template>
  <div v-bind:class="wrapperClass">
        <table class="vuetable" v-bind:class="tableClass">
            <thead>
                <tr>
                    <template v-for="field in fields">
                                <th :class="field.titleClass">
                                    {{ getTitle(field) | capitalize }}&nbsp;
                                </th>
                        </template>
                </tr>
            </thead>
            <tbody v-cloak>
                <template v-for="(item, itemNumber) in tableData">
                    <tr @dblClick="onRowDoubleClicked(item, $event)" :class="onRowClass(item, itemNumber)">
                        <template v-for="(field,fieldNumber) in fields">
                            <td v-if="fieldNumber > 0" >
                              <!--{{  getObjectValue(item, field.name, '') }}-->
                                        <component :class="field.dataClass" is="custom-action" :row-data="item" :row-index="itemNumber" :row-check="getObjectValue(item, field, '')" :row-field="field" ></component>
                                    </td>
                                <td v-else :class="field.dataClass"  @dblclick="onCellDoubleClicked(item, field, $event)">
                                      {{ getObjectValue(item, field, "") }}
                                </td>
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
             console.log("fieldName-->",fieldName);
             console.log("dataItem-->",dataItem);
            
            var idColumn = fieldName
             console.log("idColumn-->",idColumn);
            var key = dataItem[idColumn]
            console.log("key-->",key);
            return key
        },
            itemAction: function(action,isChecked, data,rowCheck) {
                //  var idColumn = this.extractArgs(fieldName)
                console.log('custom-action: ' + action, data.name, isChecked, rowCheck)
            },
        normalizeFields: function() {
            var self = this
            var obj
            this.fields.forEach(function(field, i) {
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
        getObjectValue: function(object, path, defaultValue) {
            defaultValue = (typeof defaultValue == 'undefined') ? null : defaultValue
            console.log("object",object);
            console.log("path",path.id);
            // console.log("defaultValue",defaultValue);

            if (path.id) {
                    var roleId = object.roleid;
                    
                    var isAccess = false;   
                    if(roleId)
                    {
                    for (var index = 0; index < roleId.length; index++) {
                        var role = roleId[index];
                        if (role.rId == path.id) {
                            isAccess = true;
                            break;
                        }
                    }
                    }
                    return isAccess;
                } else {
                    return object.name;
                }
           
        },  getTitle: function(field) {
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
                console.error('Function "'+func+'()" does not exist!')
            }
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
        this.checkForDeprecatedProps()
        this.normalizeFields()
    
        this.$nextTick(function() {
            this.callPaginationConfig()
        })
    }
}
</script>

<style>
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
</style>
