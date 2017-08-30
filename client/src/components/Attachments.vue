<template>
    <div>
        <!--<ui-progress-linear 
            color="primary" 
            type="determinate" 
            :progress="this.$store.state.progress" 
            v-show="this.$store.state.isProgress">
        </ui-progress-linear>-->
        <!--{{filteredTodo.attachmentprogress}} | {{filteredTodo.deleteprogress}}-->
         <ul class="uplod-list-file list-inline">
            <li v-for="(files, index) in attachmentList" style="padding:0 0 5px 0;">
            <span>
                <a target="_blank" v-bind:href="files.file_url">{{ files.file_name }} 
                    <ui-progress-linear
                        color="primary"
                        type="determinate"
                        :progress="$store.state.progress"
                        v-show="filteredTodo.attachmentprogress"
                        v-if="index === attachmentList.length-1">
                    </ui-progress-linear></a>
                <button class="" @click="deleteAttachment(files, index)">
					<a class="fa fa-close"/>
				</button>
                </span>
                <span style="float:right;" v-if="index === btnClickedIndex">
                <!--<span style="float:right;margin-right: 40px;" v-if="index === btnClickedIndex">-->
                <ui-progress-circular color="black" type="indeterminate" v-show="filteredTodo.deleteprogress" class="circularProgress" :size="20">
                </ui-progress-circular>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    /* eslint-disable*/
    import { mapGetters } from 'vuex'
    export default {
        props: ['filteredTodo'],
        data: function () {
            return {
                btnClickedIndex: 0
            }
        },
        computed: {
            ...mapGetters({
                getFiles: 'getAttachment'
            }), 
            attachmentList(){
             var array = this.getFiles(this.filteredTodo.id)
             return array
            }
        },
        
        methods: {
             deleteAttachment (objAttachment, btnIndex) {
                this.btnClickedIndex = btnIndex
                // this.$store.dispatch('deleteAttachmentFromDB', {"objAttachment": objAttachment})
                this.$store.dispatch('deleteAttachmentFromDB', objAttachment)
            }
        }
    }

</script>