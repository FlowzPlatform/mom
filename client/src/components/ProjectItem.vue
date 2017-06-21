<template>
	<li v-bind:key="project" class="todo">
        <div  class="DragContainer">
            <a class="DeprecatedNavigationLink SidebarItemRow " >
                <span class="SidebarItemRow-name">{{project}}</span>
                <span class="SidebarItemRowMenu-button">
                    <svg class="Icon MoreIcon SidebarItemRow-icon SidebarItemRow-defaultIcon" title="MoreIcon" viewBox="0 0 32 32">
                        <circle cx="3" cy="16" r="3"></circle>
                        <circle cx="16" cy="16" r="3"></circle>
                        <circle cx="29" cy="16" r="3"></circle>
                    </svg>
                </span>
            </a>
        </div>
 </li>
</template>
<script>
export default {
  
}
</script>
<style>

</style>

