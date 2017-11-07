<template id="tags">
    <div class="taskTagsView">
        <span class="task-tag-icon">
            <svg class="svgIcon taskTagsView-icon" viewBox="0 0 32 32" title="tags">
                <path d="M10,7c-1.654,0-3,1.346-3,3c0,1.654,1.346,3,3,3s3-1.346,3-3C13,8.346,11.654,7,10,7z M10,11c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,10.552,10.552,11,10,11z"></path>
                <path d="M15.209,4l13.903,13.03L17.943,29.115L4,15.172V4H15.209 M16,2H2v14l16,16l13.929-15.071L16,2L16,2z"></path>
            </svg>
        </span>
        <div class="task-tag-box">
            <span class="token-input-container">
                <el-tag :key="tag.id" v-for="tag in taskTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
                    {{getTagNameFromId(tag)}}
                    <!--{{tag.name}}-->
                </el-tag>
            </span>
            <span class="el-dropdowns-parts" v-show="isTagCreatePermission">
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleEnterConfirm" @blur="handleInputConfirm" @keyup.native="showMenu">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                <div class="popup hidden" ref="menuTag">
                    <ul class="popup-content" style="overflow-y:scroll;">

                        <template v-for="item in searchItems">
                            <li @click="selectLiTag(item)">
                                <span class="tag">
                                    <div v-if="item.id==0">
                                        <b>ADD NEW</b>
                                    </div>{{ item.name }}</span>
                            </li>
                            <hr class="divider">
                        </template>
                    </ul>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'
import { mapGetters } from 'vuex'
import * as Constant from './Constants.js'
import CmnFunc from './CommonFunc.js'
Vue.config.devtools = true
import {
    Tag,
    Button,
    Input
} from 'element-ui'
Vue.use(Tag)
Vue.use(Button)
Vue.use(Input)



export default {
    props: ['filteredTodo'],
    data() {
        return {
            newTag: '',
            inputVisible: false,
            searchVisible: false,
            inputValue: '',
            tagItem: '',
            isNewTag: false,
            isSearchTag: false,  // isSearchTag is true when tag search from tags array otherwise false
            isTagCreatePermission: false,
            isTagDeletePermission: false,
            createPermission:'',
        }
    },
    created() {
        this.newTagPermission();
        this.deleteTagPermission();
        this.$store.dispatch('getTagsList')
        
        //this.$store.dispatch('getAllTaskTags', this.filteredTodo.id);
    },
    computed: {
        ...mapGetters({
            // taskTags:'getTaskTags', // Hemant
            taskTagsById: 'getTaskTagsById'
        }),
        taskTags: function() {
            let arrTags = this.taskTagsById(this.filteredTodo.id)
            return arrTags;
        },
        searchItems: function() {
            let self = this
            let sameMatch = false;
            let itemList = self.$store.state.tagsList.filter(function(item) {
                if (!sameMatch) {
                    sameMatch = (item.name.toLowerCase() == self.inputValue.toLowerCase())
                }
                return item.name.toLowerCase().indexOf(self.inputValue.toLowerCase()) != -1
            })
            if (!sameMatch)
                itemList.push({ "id": "0", "name": self.inputValue });
            return itemList;
        },
        getNewPermissionValue: function(){
            return this.$store.state.accessRight;
        }
    },
    watch:{
        getNewPermissionValue: function(newPermission){
            console.log("watcher method call");
            // this.createPermission = this.$store.state.accessRight;
            this.newTagPermission();
            this.deleteTagPermission();
        }
    }, methods: {
        getTagNameFromId: function(tag) {
            if (tag.name)
                return tag.name;
            let index = _.findIndex(this.$store.state.tagsList, function(d) { return d.id == tag.tag_id })
            if (index > -1) {
                if (!tag.name)
                    tag.name = this.$store.state.tagsList[index].name
                return tag.name
            }
            else
                return ''
            //  return this.$store.state.tagsList[index].name
        },
        selectLiTag: function(item) {
            this.selectFromList = true;
            this.tagItem = item;
            this.inputValue = item.name.trim().replace('ADD NEW', '');
            this.handleInputConfirm(this.tagItem);
        },
        handleClose(tag) {
            if(this.isTagDeletePermission){
                this.removeTaskTags(tag);
            }
        },
        showMenu() {
            $(this.$refs.menuTag).removeClass('hidden');
        }
        ,
        showInput() {
            this.inputValue = ''; // Clear input value
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm(tag) {
            // Same tag match from task tag then not insert into database
            if (this.eventEnter || this.selectFromList) {
                var inputTag = this.inputValue;
                if (this.eventEnter) {
                    this.eventEnter = false;
                    //Check duplication tag in task 
                    let index = _.findIndex(this.taskTags, function(d) { return d.name == inputTag })
                    if (index > -1) {
                        this.inputVisible = false;
                        this.inputValue = ''; // Clear input value
                        this.tagItem = '';
                        return;
                    } else {
                        //Check enter tag is availble in database list
                        let index = _.findIndex(this.$store.state.tagsList, function(d) { return d.name == inputTag })
                        if (index > -1) {
                            var indexTag = this.$store.state.tagsList[index];
                            // Insert tag task in task
                            this.insertTaskTag(indexTag);
                        } else {
                            //Enter new tag in database
                            this.insertTag(this.inputValue);
                        }
                    }
                    this.inputVisible = false;
                    this.inputValue = ''; // Clear input value
                    this.tagItem = '';
                } else {
                    this.selectFromList = false;
                    if (tag.name) {
                        let index = _.findIndex(this.taskTags, function(d) { return d.name == tag.name })
                        if (index > -1) {
                        } else {
                            let index = _.findIndex(this.$store.state.tagsList, function(d) { return d.name == inputTag })
                            if (index > -1) {
                                var indexTag = this.$store.state.tagsList[index];
                                // Insert tag task in task
                                this.insertTaskTag(indexTag);
                            } else {
                                //Enter new tag in database
                                this.insertTag(this.inputValue);
                            }
                        }
                        this.inputVisible = false;
                        this.inputValue = ''; // Clear input value
                        this.tagItem = '';
                    }
                }
            }
            else {
                this.inputVisible = false;
                // this.inputValue = '';
            }

            this.hideDropDownMenu();
        },
        handleEnterConfirm() {
            this.eventEnter = true;
            this.inputVisible = false;
            let tag = String(this.inputValue).trim();
            //   this.inputValue='';
            if (tag && tag.length > 0) {
                //    this.tagItem.id=new Date().getMilliseconds()
                this.inputValue = tag;
                this.$refs.saveTagInput.$refs.input.blur();
            }

        },
        insertTag(value) {
            // Insert new tag into tags table
            this.$store.dispatch('insertTagsInDB', { "tagName": value, "taskId": this.filteredTodo.id })
        },
        insertTaskTag(tag) {
            // Insert new tag into tags table
            // Add task_id into tag
            this.$store.dispatch('insertIntoTaskTags', { 'tag': tag, 'taskId': this.filteredTodo.id })
        },
        hideDropDownMenu() {
            setTimeout(function() {
                $(".popup").addClass('hidden');
            }, 500);
        },
        removeTaskTags(tag) {
            // Remove tags from task
            this.$store.dispatch('removeTaskTagsFromDB', tag)
        },
        async newTagPermission() {
            this.isTagCreatePermission = await CmnFunc.checkActionPermision(this, this.filteredTodo.type_id, Constant.USER_ACTION.TAG, Constant.PERMISSION_ACTION.CREATE)
            console.log("Tag Create permission:", this.isTagCreatePermission)
        },
        async deleteTagPermission(){
            this.isTagDeletePermission = await CmnFunc.checkActionPermision(this, this.filteredTodo.type_id, Constant.USER_ACTION.TAG, Constant.PERMISSION_ACTION.DELETE)
            console.log("Tag Delete permission:", this.isTagDeletePermission)
        }

    }, components: {

    },
}

</script>