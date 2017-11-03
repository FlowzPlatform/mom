<template>
    <sticky>
        <!-- <div id="bottom-bar">
            <div class="placeholder-prev"></div>
            <div class="sticky" style="top: 0px; z-index: 10;">
                <div class="stickyed">
                    <Tabs>
                        <TabPane label="macOS" icon="social-apple">macOS High Sierra introduces new core technologies that improve the most important functions of your Mac. From re-architecting how it stores your data to improving the efficiency of video streaming to unleashing the full power of your graphics processor, it’s all central to today’s Mac experience.</TabPane>
                        <TabPane label="Windows" icon="social-windows">Windows</TabPane>
                        <TabPane label="Linux" icon="social-tux">Linux</TabPane>
                    </Tabs>
                </div>
                <div style="clear: both; height: 1px;"></div>
            </div>

        </div> -->
    </sticky>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import sticky from 'vue-sticky-position';

// https://github.com/idiotWu/smooth-scrollbar#common-mistakes

Vue.use(iView);

export default {
    components: {
        sticky
    },
    created: function() {
        this.applyScroll()
    },
    props: ['filteredTodo'],
    data: function() {
        return {
        }
    },
    methods: {
        applyScroll() {

        }
    },
    computed: {

    }
}
</script>
<style>




/* #bottom-bar {
    width: 100%;
    height: 500px;
    overflow: auto;
} */
</style>