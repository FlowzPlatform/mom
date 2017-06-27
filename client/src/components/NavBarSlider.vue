<template>
    <div class="Sidebar">
        <!--Company logo-->
        <div class="SidebarHeader-companyLogo">
            <a class="CloseButton SidebarHeader-closeIcon">
                <svg class="Icon XIcon CloseButton-xIcon" title="XIcon" viewBox="0 0 32 32" @click="closeNav">
                    <polygon points="24.485,27.314 27.314,24.485 18.828,16 27.314,7.515 24.485,4.686 16,13.172 7.515,4.686 4.686,7.515 13.172,16 4.686,24.485 7.515,27.314 16,18.828 "></polygon>
                </svg>
            </a>
        </div>
        <!-- Project list -->
        <div class="SidebarTeamDetailsProjectsList">
            <div class="text-left SidebarTeamDetailsProjectsList-header">Projects
                <a @click="createProject" class="CircularButton CircularButton--enabled CircularButton--xxsmall SidebarTeamDetailsProjectsList-addProjectButton" tabindex="0" aria-role="button">
                    <div class="CircularButton-label">
                        <svg class="Icon PlusIcon" title="PlusIcon" viewBox="0 0 32 32">
                            <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                        </svg>
                    </div>
                </a>
            </div>
            <div class="SidebarTeamDetailsProjectsList-emptyTeam">
                <span class="SidebarTeamDetailsProjectsList-emptFText">Get started with a project</span>
                <svg class="Icon UpSwoopArrowIcon SidebarTeamDetailsProjectsList-upSwoopArrowIcon" title="UpSwoopArrowIcon" viewBox="0 0 32 32">
                    <path d="M19.976,1c-0.365-0.009-0.509,0.288-0.762,0.611L9.701,12.297C9.5,12.703,9.58,12.993,9.947,13h5   c0.428,2.583,0.674,6.494-1.772,10.603c-3.737,6.276-11.228,6.64-11.228,6.64l0.77,0.154c0,0,9.032,2.668,16.058-3.228   c5.887-4.94,6.495-11.399,6.172-14.17h4c0.537,0.016,0.787-0.172,0.671-0.64L20.746,1.712C20.48,1.378,20.339,1.006,19.976,1z"></path>
                </svg>
            </div>
            <draggable v-model="projectList">
                        <div v-for="project in projectList" class="DragContainer">
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
            </draggable>
        </div>
        <create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
    </div>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import CreateProjectDialog from './CreateProjectDialog.vue'
import draggable from 'vuedraggable'


export default {
    data: function () {
        return {
            isOpen: this.$store.state.isSliderOpen,
            isNewProjectDialogShow: false,
            projectList : ["project 1","project 2","project 3","project 4"]
        }
    },
    beforeMount() {
        this.displayToolTips()
    },
    methods: {
        closeNav: function () {

            document.getElementById("top-bar").style.marginLeft = "0px";
            document.getElementById('mySidenav').style.width = "0px"
            $('.Topbar-navButton').css('margin-left', '0px');
            document.getElementById("center_pane").style.marginLeft = "0px";

            this.isOpen = false;
            this.$store.commit('UPDATE_SLIDER_VALUE', this.isOpen)

        },
        displayToolTips: function () {
            $('.CircularButton').tooltip({ title: "Create a project", placement: "bottom" });
        },
        createProject: function () {
            console.log("createProject")
            this.isNewProjectDialogShow = true;
        },
        updateDialogShow(isDialogVal) {
            console.log('dialog val: ', isDialogVal)
            this.isNewProjectDialogShow = isDialogVal
        }
    },
    components: {
        CreateProjectDialog,
        draggable
    }
}

</script>

<style>
.SidebarHeader-closeIcon {
    fill: #a2b4bc;
    padding: 0 10px;
}
.DragContainer{
    margin-bottom: -1px;
    padding-bottom: 1px;
    position: relative;
}
.SidebarItemRow {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-left: 3px solid transparent;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    fill: #a2b4bc;
    height: 28px;
    -webkit-box-pack: right;
    -webkit-justify-content: right;
    -ms-flex-pack: right;
    justify-content: right;
    line-height: 28px;
    padding: 0 10px 0 12px;
}
.SidebarItemRow .is-selected {
    background-color: #1b2432;
    color: #fff;
}
.SidebarItemRow-name {
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
}
.SidebarItemRow:hover, .DragContainer--isDragging .SidebarItemRow {
    background-color: #179dba;
}
.SidebarItemRow .SidebarItemRowMenu-button:hover .SidebarItemRow-icon {
    fill: #fff;
    visibility: visible;
}

.SidebarItemRowMenu-button {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.Sidebar {
    height: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: #2e3c54;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 0 2px;
}

.SidebarHeader-companyLogo,
.SidebarPlaceholder-companyLogo {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: url(https://siva.jsstatic.com/ph/71839/images/banner/71839_banner_0_77293.png);
    background-position: 13px 10px;
    background-repeat: no-repeat;
    background-size: 110px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 40px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}

.SidebarTeamDetailsProjectsList-header {
    color: #a2b4bc;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 15px;
    padding-left: 15px;
    padding-right: 10px;
    text-transform: uppercase;
}

.SidebarTeamDetailsProjectsList-emptyTeam {
    webkit-box-align: right;
    -webkit-align-items: right;
    -ms-flex-align: right;
    align-items: right;
    text-align: right;
    color: #a2b4bc;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: inherit;
    fill: #a2b4bc;
    margin: 10px 15px 5px;
    position: relative;
}

.CircularButton-label {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    height: 100%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
}

.CircularButton.CircularButton--xxsmall .Icon {
    height: 10px;
    width: 10px
}

.Icon {
    height: 16px;
    width: 16px;
}

.SidebarTeamDetailsProjectsList-addProjectButton.CircularButton--enabled:hover {
    background-color: transparent;
    border-color: transparent;
    box-shadow: 0 0 0 3px #fff;
    color: #fff;
    fill: #fff;
}

.CircularButton.CircularButton--xxsmall {
    height: 16px;
    width: 16px;
    background-color: transparent;
    line-height: 13px;
}

.SidebarTeamDetailsProjectsList-addProjectButton {
    background: transparent;
    border: 1px solid #a2b4bc;
    color: #a2b4bc;
    fill: #a2b4bc;
    float: right;
    margin-top: -2px;
}

.CircularButton {
    background: #fff;
    border: 1px solid #b9bcc0;
    border-radius: 50%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #b9bcc0;
    fill: #b9bcc0;
    font-size: 13px;
    height: 30px;
    line-height: 1;
    -webkit-transition: 200ms box-shadow, 200ms color, 200ms background, 200ms fill;
    transition: 200ms box-shadow, 200ms color, 200ms background, 200ms fill;
    width: 30px;
    display: inline-block;
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
}

.sidenav>a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav>a:hover,
.offcanvas a:focus {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

#center_pane {
    transition: margin-left .5s;
    padding: 16px;
}
selected {
    text-decoration: none;
}

.SidebarDraggableItemRowStructure-dropTarget--gridItem {
    margin-bottom: 0;
    padding-bottom: 0;
}
.dropTargetRow {
    margin-bottom: -1px;
    padding-bottom: 1px;
    position: relative;
}
@media screen and (max-height: 450px) {
    .sidenav {
        /*padding-top: 15px;*/
    }
    .sidenav a {
        font-size: 18px;
    }
}
</style>