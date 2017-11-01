<template>
    <div>
    <h1> Main Splitter</h1>
    <vue-splitter :margin="20" style="height: 600px;">
        
  <div slot="left-pane" >
    <div id="center_pane_container">
          <div id="center_pane" style="height: 500px;">
              <div class="middle">
                <div class="inner">
                  <div class="trashcan-empty gridPaneSearchEmptyView-noProjectItems">
                    <span class="fa fa-file-text-o fa-5x" />
                    <div class="text gridPaneSearchEmptyView-noProjectItemsTitleText">Add New Project
                    </div>
                    <div class="text gridPaneSearchEmptyView-noProjectItemsText" v-show="$store.state.projectlist.length==0">You have no project created.
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
  </div>
  <div slot="right-pane">
      {{parentIdArray}}
    <div :id="n.level" class="right_pane_container" v-for="(n, index) in parentIdArray">
          <div id="n.level">
            <main-right-section :id="n.level" :todoObject="n" :a="n"></main-right-section>
          </div>
        </div>
  </div>
</vue-splitter>
    </div>
</template>

<script>
/* eslint-disable*/
import VueSplitter from "vue-splitter-comp"

export default{
    data: function(){
        return{
        }
    },
    created: function(){
        console.log('CReated splitterjs')
    },
    computed: {
        parentIdArray: function(){
        var arr = [];
        arr.push ({assigned_by:"599a72aba005fc0020611a85",
            assigned_to:"599a72aba005fc0020611a85",
            attachmentprogress:0,
            completed:false,
            completed_subtask_count:0,
            createdAt:"2017-09-15T05:55:50.738Z",
            created_by:"599a72aba005fc0020611a85",
            deleteprogress:0,
            dueDate:"2017-09-15T18:30:00.000Z",
            email:"uhirani@officebrain.com",
            id:"39e9ac52-bc43-44ac-9038-dd7f1346a7f1",
            image_url:"https://s3-us-west-2.amazonaws.com/airflowbucket1%2Fobexpense%2Fexpenses/33639597-letter-u-logo-icon-design-template-elements.jpg",
            index:0,
            isDelete:false,
            isTaskUpdate:false,
            level:0,
            parentId:"",
            progress:0,
            progress_count:"0 / 3",
            project_id:"8e5fc40b-6ecc-4b77-8a4e-ca47a06f8ac8",
            subtask_count:3,
            taskDesc:"",
            taskName:"create user access rights for tasks update",
            type_id:"ea7e132c-9036-4477-916a-4a03577fd3ba",
            updatedAt:"2017-09-15T05:55:50.738Z",
            updatedBy:"599a72aba005fc0020611a85"});
          return arr;
        }
    },
    components: {
        VueSplitter
    }
}
</script>
    