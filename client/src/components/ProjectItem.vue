<template>
	    <div v-bind:key="data">
        <a class="DeprecatedNavigationLink SidebarItemRow ">
            <span class="SidebarItemRow-name">{{data}}</span>
            <span class="SidebarItemRowMenu-button">
                <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                    <circle cx="3" cy="16" r="3"></circle>
                    <circle cx="16" cy="16" r="3"></circle>
                    <circle cx="29" cy="16" r="3"></circle>
                </svg>
            </span>
        </a>
         <p slot="content">Hemant adsfjkdsafasdhfsjad</p>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'

export default {
    props: ['data'],
    data: function () {
        return {
            collapse: true
        }
    },
    methods: {

    },
    components: {

    }
}
</script>
<style>

</style>
