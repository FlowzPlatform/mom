<template>
    <div>
        <div class="nav">
			<div class="mask" @click="addAttachment"><i class="fa fa-paperclip"></i></div>
		</div>
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
					<a v-show="isDeleteAttachment" class="fa fa-close"/>
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
    import 'vue-ionicons/ionicons/css/ionicons.css'
    export default {
        props: ['filteredTodo', 'isDeleteAttachment'],
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
            },
            addAttachment(){
                
            }
        }
    }

</script>
<style>
.nav {
    right: 15px;
    z-index: 20;
    width: 45px;
    bottom: 15px;
    height: 45px;
    display: block;
    position: absolute;
    line-height: 45px;
    border-radius: 50%;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .75);
}
.mask {
    z-index: 21;
    color: #fff;
    width: inherit;
    height: inherit;
    cursor: pointer;
    font-size: 28px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    background: #f23363;
    -webkit-transition: all .1s ease-in-out 0s;
    transition: all .1s ease-in-out 0s;
}
</style>
