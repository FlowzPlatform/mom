<template>
    <div>
        <hr>
        <div class="[ row ]" style="margin-left: 0; margin-right: 0" v-if="id === 'rightTaskTypes'">
            <h4 class="uiStatus"><b>State</b></h4>
            <div class="[ form-group ]" @change="toggleStatus(status)" v-for="status in getTaskStausList" style="margin: 5px;" v-if="status.id !== '-1'">
                <input type="checkbox" :name="status.status" :id="status.id" autocomplete="off" />
                <div class="[ btn-group ]">
                    <label :for="status.id" class="[ btn btn-default ]" :style="{'border-color':'#adadad',  'background-color':status.color }">
                    <span class="[ glyphicon glyphicon-ok ]"></span>
                    <span> </span>
                </label>
                    <label :for="status.id" class="[ btn btn-default active ]">
                        {{status.status}}
                </label>
                </div>
            </div>
        </div>
        <div v-if="id === 'rightTaskStatus'">
            <div class="control-group">
                <label for="input-color">Color:</label>
                 <input type="color" id="bgcolor" v-model="filteredTodo.color" value="#ffffff" @change="getColorVal($event.target.value)" />
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
                value:''
            }
        },
        created() {
        },
        computed: {
            ...mapGetters([
                'getTaskStausList'
            ])
        },
        methods: {
            getColorVal: function (val) {
                this.$store.dispatch('addTask_Status', { "status": this.filteredTodo, "color": val })
            },
            toggleStatus: function (status) {
                this.$store.dispatch('toggle_status', {"status": status, "taskType":this.filteredTodo})
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
    .uiStatus{
        width: 100%;
        float: left;
        text-align: left;
    }
    .glyphicon-ok:before{
        color: white
    }
</style>