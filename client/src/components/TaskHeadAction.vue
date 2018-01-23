<template>
            <div id="topicon" style="position: absolute; float: right; right: 0;">
                <div id="closeWindow" class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    tabindex="410" style="margin-top: 2px;">
                    <span id="close" class="destroy circularButtonView-label" @click="closeDiv">
                        <i class="fa fa-close"></i>
                    </span>
                </div>
                <div id="pinnedWindow" v-if="id !== 'rightTaskTypes' && id !== 'rightTaskState' && !$store.state.deleteItemsSelected" class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    style="margin-top: 2px;">
                    <span class="circularButtonView-label" @click="pinIt">
                        <img class="init" v-if="isPinned" src="../assets/unpin.png" style="width:20px; height:20px;"></img>
                        <img class="init" v-else src="../assets/pin.png" style="width:16px; height:16px; margin-bottom:2px;"></img>
                    </span>
                </div>
                <!-- <div id="fullWindow" class="window-full circularButtonView property tags circularButtonView--default circularButtonView--onWhiteBackground circularButtonView--active pull-right"
                    tabindex="410" @click="openfullwinodw(filteredTodo.level)" style="margin-top: 2px; ">
                    <span class="circularButtonView-label">
                        <i class="fa fa-expand" aria-hidden="true"></i>
                    </span>
                </div> -->
            </div>
</template> 
<script>
        /* eslint-disable*/
        import { mapMutations, mapActions } from "vuex";
        import TaskHeading from './TaskHeading.vue'
        import * as Constant from "./Constants.js";
        export default {
            props: ['isPinned', 'closeDiv', 'pinIt','id'],
            data: function () {
                return {
                }
            }
        }
</script>   