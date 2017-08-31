<template>
  <section class="todoapp">
    <div class="lunaUiProjectPageHeaderView-mountNode react-mount-node">
      <div data-reactroot="">
        <div class="PageHeaderStructure ProjectPageHeader">
          <div class="PageHeaderStructure-left">
          </div>
          <div class="PageHeaderStructure-center">
            <div class="PageHeaderStructure-titleRow">
              <div class="PageHeaderStructure-title ProjectPageHeader-projectName--colorNone ProjectPageHeader-projectName"><input id="project-name" type="text" name="fname" v-model="projectName" @keyup.enter="updateProjectName"/></div>
            </div>
          </div>
          <div class="PageHeaderStructure-right">
            <div class="projectHeaderFacepile-content">
              <div class="Facepile Facepile--grouped projectHeaderFacepile-facepile hidden">
                <div class="Avatar Avatar--large Avatar--color2 Facepile-avatar--clickable">
                  he
                </div>
                <a class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                  <div class="CircularButton-label">
                    <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                      <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                    </svg>
                  </div>
                </a>
                <a class="CircularButton CircularButton--enabled CircularButton--small Facepile-placeholder" tabindex="0" aria-role="button">
                  <div class="CircularButton-label">
                    <svg class="Icon UserIcon Facepile-placeholderIcon" title="UserIcon" viewBox="0 0 32 32">
                      <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                    </svg>
                  </div>
                </a>
              </div>
              <a id="ProjectPageHeader-facepileAddButton" class="CircularButton CircularButton--enabled CircularButton--small projectHeaderFacepile-addButton hidden"
                tabindex="0" aria-role="button">
                <div class="CircularButton-label">
                  <svg class="Icon PlusIcon projectHeaderFacepile-addIcon" title="PlusIcon" viewBox="0 0 32 32">
                    <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                  </svg>
                </div>
              </a>
              <div id="projectVisible" class="hidden projectHeaderFacepile-privacySummary projectHeaderFacepile-privacySummaryDropdown" @click="changePrivacyPopup">
                <div class="projectHeaderFacepile-privacySummaryDropdownTextDownIconContainer">
                  <svg v-if="$store.state.currentProjectPrivacy==2" class="Icon UserIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon"
                    title="UserIcon" viewBox="0 0 32 32">
                    <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                  </svg>
                  <svg v-else class="Icon UserIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon" title="UserIcon" viewBox="0 0 32 32">
                    <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                    <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                  </svg>
                  <div class="projectHeaderFacepile-privacySummaryDropdownText" v-if="$store.state.currentProjectPrivacy==0">Public to all</div>
                  <div class="projectHeaderFacepile-privacySummaryDropdownText" v-else-if="$store.state.currentProjectPrivacy==1">Private to member</div>
                  <div class="projectHeaderFacepile-privacySummaryDropdownText" v-else="$store.state.currentProjectPrivacy==2">Private to me</div>
                  <svg class="Icon DownIcon projectHeaderFacepile-privacySummaryDropdownDownIcon" title="DownIcon" viewBox="0 0 32 32">
                    <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                  </svg>
                </div>
                <!-- Change privacy  -->
                <div v-show="showPrivacyPopup" @mouseleave="hidePopup" class="layerPositioner-privacy layerPositioner--offsetRight layerPositioner--alignRight layerPositioner--below"
                  data-layerid="4" style="top: 101.339px; right: 20px;">
                  <div class="layerPositioner-layer-privacy">
                    <div class="Dropdown projectHeaderFacepile-privacySummaryDropdown">
                      <ul class="menu menu--long">
                        <li class="menu-item" @click="publicMode">
                          <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                            <svg v-show="showPublic" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                              <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                            </svg>
                            <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                              <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                              <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                            </svg>
                            <span class="menuItem-label">
                              <div class="projectHeaderFacepile-privacyMenuItemText">Public to all</div>
                            </span>
                          </a>
                        </li>
                        <li class="menu-item" @click="privateMemberMode">
                          <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                            <svg v-show="showPrivateMember" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                              <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                            </svg>
                            <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                              <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                              <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                            </svg>
                            <span class="menuItem-label">
                              <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                            </span>
                          </a>
                        </li>
                        <li class="hidden menu-item">
                          <a id="projectHeaderFacepile-privacyPrivateToMembersMenuItem" class="menuItem-button is-highlighted menuItem--extralarge projectHeaderFacepile-privacyMenuItem projectHeaderFacepile-privacyMenuItemUpgradeOption">
                            <span class="menuItem-label">
                              <div class="projectHeaderFacepile-privacyMenuItemIconText">
                                <svg class="Icon LockIcon projectHeaderFacepile-privacyMenuItemIcon" title="LockIcon" viewBox="0 0 32 32">
                                  <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                                </svg>
                                <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                              </div>
                              <div class="hidden projectHeaderFacepile-privacyMenuItemUpgradeTextContainer">
                                <u class="projectHeaderFacepile-privacyMenuItemUpgradeText">Upgrade to create Private Projects with multiple members</u>
                              </div>
                            </span>
                          </a>
                        </li>
                        <li class="menu-item" @click="privateToMe">
                          <a id="projectHeaderFacepile-privacyPrivateToMeMenuItem" class="menuItem-button menuItem--small projectHeaderFacepile-privacyMenuItem">
                            <svg v-show="showPrivateCheck" class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                              <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                            </svg>
                            <svg class="Icon UserIcon projectHeaderFacepile-privacyMenuItemIcon" title="UserIcon" viewBox="0 0 32 32">
                              <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                            </svg>
                            <span class="menuItem-label">
                              <div class="projectHeaderFacepile-privacyMenuItemText">Private to me</div>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Project privacy section  -->
          <div class="hidden PageHeaderStructure-right">
            <div class="projectHeaderFacepile-content">
              <div class="projectHeaderFacepile-privacySummary projectHeaderFacepile-privacySummaryDropdown">
                <svg class="Icon UsersIcon projectHeaderFacepile-privacySummaryDropdownLeftIcon" title="UsersIcon" viewBox="0 0 32 32">
                  <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                  <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                </svg>
                <div class="projectHeaderFacepile-privacySummaryDropdownTextDownIconContainer">
                  <div class="projectHeaderFacepile-privacySummaryDropdownText">Private to me</div>
                  <svg class="Icon DownIcon projectHeaderFacepile-privacySummaryDropdownDownIcon" title="DownIcon" viewBox="0 0 32 32">
                    <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                  </svg>
                </div>
              </div>
              <div data-reactroot="" class="layerPositioner layerPositioner--offsetRight layerPositioner--alignRight layerPositioner--below"
                data-layerid="4" style="top: 101.339px; right: 20px;">
                <div class="layerPositioner-layer">
                  <div class="Dropdown projectHeaderFacepile-privacySummaryDropdown">
                    <ul class="menu menu--long">
                      <li class="menu-item">
                        <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                            <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                            <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Public to officebeacon</div>
                          </span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a id="projectHeaderFacepile-privacyPublicMenuItem" class="menuItem-button is-highlighted menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UsersIcon projectHeaderFacepile-privacyMenuItemIcon" title="UsersIcon" viewBox="0 0 32 32">
                            <path d="M24.23,16.781C26.491,15.368,28,12.863,28,10c0-4.418-3.582-8-8-8s-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C11.233,18.494,8,22.864,8,28c0,0.683,0.07,1.348,0.18,2h23.64c0.11-0.652,0.18-1.317,0.18-2C32,22.864,28.767,18.494,24.23,16.781z M14,10c0-3.308,2.692-6,6-6s6,2.692,6,6s-2.692,6-6,6S14,13.308,14,10z M10,28c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10H10z"></path>
                            <path d="M2,28c0-4.829,3.441-8.869,8-9.798V15.65C7.673,14.824,6,12.606,6,10c0-3.308,2.692-6,6-6V2c-4.418,0-8,3.582-8,8c0,2.863,1.509,5.368,3.77,6.781C3.233,18.494,0,22.864,0,28c0,0.683,0.07,1.348,0.18,2H6v-2H2z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                          </span>
                        </a>
                      </li>
                      <li class="hidden menu-item">
                        <a id="projectHeaderFacepile-privacyPrivateToMembersMenuItem" class="menuItem-button is-highlighted menuItem--extralarge projectHeaderFacepile-privacyMenuItem projectHeaderFacepile-privacyMenuItemUpgradeOption">
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemIconText">
                              <svg class="Icon LockIcon projectHeaderFacepile-privacyMenuItemIcon" title="LockIcon" viewBox="0 0 32 32">
                                <path d="M24,12v-0.125V8c0-4.411-3.589-8-8-8S8,3.589,8,8v4H6v18h20V12H24z M14,12V8c0-1.103,0.897-2,2-2s2,0.897,2,2v4H14z M10,8c0-3.309,2.691-6,6-6s6,2.691,6,6v4h-2V8c0-2.206-1.794-4-4-4s-4,1.794-4,4v4h-2V8z M24,28H8V14h16V28z"></path>
                              </svg>
                              <div class="projectHeaderFacepile-privacyMenuItemText">Private to members</div>
                              </div>
                              <div class="hidden projectHeaderFacepile-privacyMenuItemUpgradeTextContainer">
                                <u class="projectHeaderFacepile-privacyMenuItemUpgradeText">Upgrade to create Private Projects with multiple members</u>
                              </div>
                            </span>
                          </a>
                      </li>
                      <li class="menu-item">
                        <a id="projectHeaderFacepile-privacyPrivateToMeMenuItem" class="menuItem-button menuItem--small projectHeaderFacepile-privacyMenuItem">
                          <svg class="Icon CheckIcon menuItem-selectedIcon" title="CheckIcon" viewBox="0 0 32 32">
                            <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                          </svg>
                          <svg class="Icon UserIcon projectHeaderFacepile-privacyMenuItemIcon" title="UserIcon" viewBox="0 0 32 32">
                            <path d="M20.534,16.765C23.203,15.204,25,12.315,25,9c0-4.971-4.029-9-9-9S7,4.029,7,9c0,3.315,1.797,6.204,4.466,7.765C5.962,18.651,2,23.857,2,30c0,0.681,0.065,1.345,0.159,2h27.682C29.935,31.345,30,30.681,30,30C30,23.857,26.038,18.651,20.534,16.765z M9,9c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S9,12.86,9,9z M4,30c0-6.617,5.383-12,12-12s12,5.383,12,12H4z"></path>
                          </svg>
                          <span class="menuItem-label">
                            <div class="projectHeaderFacepile-privacyMenuItemText">Private to me</div>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-container" class="row asanaView-body" style="padding-top: 15px; margin: 10px 10px 10px 10px;">
      <div class="asanaView-paneGutter"></div>
      <div id="center_pane_container" class="known-list">
        <div id="center_pane">
          <div v-if="$store.state.currentProjectId && $store.state.currentProjectId.length>0">
            <left-toolbar v-if="!isCopyLink" :filters="filters">
            </left-toolbar>
            <main-left-section id="todoTask" :isCopyLink="isCopyLink" :todoObject="todoObjectById" :pholder="taskPholder" :filtered-todos="taskById"></main-left-section>
          </div>
          <div class="outer" v-else>
            <div class="middle">
              <div class="inner">
                <div class="trashcan-empty gridPaneSearchEmptyView-noProjectItems">
                  <span class="fa fa-file-text-o fa-5x" @click="openCreateDialogs" />
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
      <div :id="n.level" class="right_pane_container" v-for="(n, index) in parentIdArray">
        <div id="right_pane">
          <main-right-section :id="n.level" :pholder="subtaskPholder" :todoObject="n" :a="n"></main-right-section>
        </div>
      </div>
      <div class="asanaView-paneGutter"></div>
      <create-project-dialog :show="isNewProjectDialogShow" v-on:updateDialog='updateDialogShow'></create-project-dialog>
    </div>
  </section>
</template>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script>
  /* eslint-disable*/
  import CreateProjectDialog from './CreateProjectDialog.vue'
  import MainLeftSection from './MainLeftSection.vue'
  import MainRightSection from './MainRightSection.vue'
  import LeftToolbar from './LeftToolbar.vue'
  import CmnFunc from './CommonFunc.js'
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  Vue.use(BootstrapVue)
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapGetters, mapActions } from 'vuex'
  Vue.use(require('vue-moment'))

  const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.completed),
    completed: todos => todos.filter(todo => todo.completed)
  }

  function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
  }
  export default {
    props: ['passData'],
    data: function () {
      return {
        eventIndex: 0,
        taskPholder: 'Task',
        subtaskPholder: 'Subtask',
        username: '',
        role: '',
        aboutme: '',
        dob: '',
        datepicker: null,
        picker10Max: new Date(),
        image: '',
        imageURlProfilePic: this.$store.state.userObject.image_url,
        loading: false,
        todolist: [],
        visibility: 'completed',
        filters: filters,
        url_parentId: '',
        url_level: 0,
        isCopyLink: false,
        isNewProjectDialogShow: false,
        showPrivacyPopup: false,
        showPrivateCheck: false,
        showPrivateMember: false,
        showPublic: false,
        pName:'' // Project Name 
      }
    },
    created() {
      this.$store.dispatch('getSettings', this.$store.state.userObject._id);
      this.$store.dispatch('removeAllEventListners');
      this.$store.dispatch('eventListener');
      this.getAllUsers()
      // ...mapActions([
      //         'getAllTodos'
      //     ])

      // get loaded URL to get querystring param
      //  var url = window.location.href;
      //  this.url_parentId = getQueryString('task', url)

      var url = window.location.href;
      if (url.indexOf('task') > -1) {
        url = url.split('task/')
        var split_url = url[1].split('/')
        this.url_level = split_url[0] ? split_url[0] : ''
        this.url_parentId = split_url[1] ? split_url[1] : 0
        this.isCopyLink = true
        this.$store.dispatch('getTodoObject', this.url_parentId);
        this.$store.dispatch('getAttachmentFromDB', this.url_parentId)
        this.$store.dispatch('getAllTaskTags', this.url_parentId);
        this.$store.dispatch('getTaskComment', this.url_parentId)
      }
      this.$store.dispatch('removeParentIdArray') // flush showDiv object from the memory when page refresh
      this.$store.commit('DELETE_ALLTAGS')
      this.$store.dispatch('getTaskStaus')
      this.$store.dispatch('getTaskTypes')

      this.$store.state.todolist = []
      // this.getProjectWiseTodo;
      var projects = this.getProjectWiseTodo;
      var projectId = this.$store.state.currentProjectId
      console.log("projectId:--",projectId)
      if (!projectId && projects.length > 0) {
        projectId = projects[0].id
        this.$store.state.currentProjectId = projects[0].id
        this.$store.state.currentProjectName = projects[0].project_name
        this.$store.state.currentProjectMember = projects[0].members; 
        this.$store.state.currentProjectPrivacy = projects[0].project_privacy
        this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '', project_id: projectId });
      
     } else {
        console.log("Can't set projectc id")
      }

      

      // if(this.$store.state.deleteItemsSelected)
      // {
      //   this.$store.dispatch('getDeleteTask');
      // }else {
      //   this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' });
      // }

      // this.$store.dispatch('getAllTodos', {'parentId': ''});
      // let self = this;
      // socket.on('feed-change', function(item){
      //          if(item.new_val){
      //            var result = $.grep(self.taskById, function(e){ return e.id == item.new_val.id; })
      //             if (result.length == 0) {
      //               if(item.new_val.parentId.length == 0){
      //             // self.taskById.push(item.new_val)
      //               self.taskById.splice(self.taskById.length - 1, 0, item.new_val);
      //               // self.$store.state.todolist.push(item.new_val)
      //               }else{
      //               }
      //             }else if(item.old_val){
      //               if(item.new_val.parentId.length == 0){
      //               let index = _.findIndex(self.taskById,function(d){return d.id == item.new_val.id})
      //               if(index > -1){
      //                 self.taskById[index].taskName = item.new_val.taskName
      //               }
      //             }else{
      //                // console.log("Sub Task Updated")
      //             }
      //             } 
      //          }else if(item.old_val){
      //            // var index = self.taskById.indexOf(item.old_val);
      //            if(item.old_val.parentId.length == 0){
      //            let index = _.findIndex(self.taskById,function(d){return d.id == item.old_val.id})
      //            if(index > -1){
      //             self.taskById.splice(index, 1);
      //            }
      //            }else{
      //            // console.log("Sub Task Deleted")
      //            }
      //            //self.taskById.splice(index, 1);
      //          }
      //        })
    },
    watch: {
      todolist: function (todo) {
        //  console.log('test');
      }
    },
    computed: {
      ...mapGetters({
        todoById: 'getTodoById',
        parentIdArray: 'parentIdArr',
        // userSettings: 'user_setting',
        todoObjectById: 'getObjectById',
        // projectName:'getCurrentProjectName',
       
        // deletedTasks:'getDeletedTaskById'
      }),
       projectName:{
          get(){
            return this.$store.state.currentProjectName
          },
          set(value){
            this.pName = value;
           // this.$store.commit('updateProjectName', value)
          }
        },
      getProjectWiseTodo() {
        //   var projectList= this.projectListData;
        //   var projectId=this.$store.state.currentProjectId
        // if(!projectId && projectList.length>0){
        //     // projectId=this.$store.state.projectlist[0].id
        //     this.$store.state.currentProjectId=projectList[0].id
        //     this.$store.dispatch('getAllTodos', { 'parentId': this.url_parentId ? this.url_parentId : '' ,project_id:projectId});
        // }else{
        //   console.log("cant set projectc id")
        // }

        return this.$store.state.projectlist;
      },
      taskById() {
        var insertPermssion=CmnFunc.isCreatePermission(15);

   
        let taskArray = this.todoById(this.url_parentId ? this.url_parentId : '', this.url_level)
        if (insertPermssion) {
            taskArray.push({
              id: '-1',
              parentId: this.url_parentId,
              taskName: '',
              taskDesc: '',
              level: this.url_level,
              //  level: 0,
              index: taskArray.length,
              completed: false,
              dueDate: '',
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON(),
              project_id: this.$store.state.currentProjectId
            })
          }
        this.todolist = taskArray
        this.userDetail(this.todolist)
        return filters[this.$store.state.visibility](taskArray)

      },
      todos: function () {
        return this.$store.getters.getTodoById('', 0)
      },
      uname: function () {
        var str = this.$store.state.userObject.email
        var n = str.indexOf("@")
        var res = str.substr(0, n)
        return res
      },
      capitalizeLetters: function () {
        var str = this.$store.state.userObject.email
        var firstLetters = str.substr(0, 2)
        return firstLetters.toUpperCase()
      }
    },
    methods: {
      userDetail(deletedTasks) {
        deletedTasks.forEach(function (c) {
          let userId = c.deletedBy
          let userIndex = _.findIndex(this.$store.state.arrAllUsers, function (m) { return m._id === userId })
          if (userIndex < 0) {
          } else {
            c.image_url = this.$store.state.arrAllUsers[userIndex].image_url,
              c.email = this.$store.state.arrAllUsers[userIndex].email
          }
        }, this)
      },
      openCreateDialogs() {
        this.isNewProjectDialogShow = true;
      },
      updateDialogShow(isDialogVal) {
        this.isNewProjectDialogShow = isDialogVal
      },
      btnLogoutClicked() {
        // this.$store.commit('DELETE_ATTACHMENTS')
        // this.$store.state.userObject = {}
        // this.$store.state.isAuthorized = false
        this.$store.commit('userData')
        // this.$store.commit('authorize')
        CmnFunc.resetProjectDefault()
        // CmnFunc.deleteAutheticationDetail()
        window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000"
      },
      getAllUsers() {
        var self = this
        this.$store.dispatch('getAllUsersList')
          .catch(function (error) {
            if (error.response.status === 401) {
              CmnFunc.deleteAutheticationDetail()
              self.$router.replace('/')
              return
            }
            $.notify.defaults({ className: "error" })
            $.notify(error.message, { globalPosition: "top center" })
          })
      },
      changePrivacyPopup() {
        this.showPrivacyPopup = !this.showPrivacyPopup;
        // Check privacy id to set related option
        var id = this.$store.state.currentProjectPrivacy;
        if (id != "") {
          if (id == "0") {
            this.showPublic = true;
            this.showPrivateMember = false;
            this.showPrivateCheck = false;
          } else if (id == "1") {
            this.showPublic = false;
            this.showPrivateMember = true;
            this.showPrivateCheck = false;
          } else if (id == "2") {
            this.showPublic = false;
            this.showPrivateMember = false;
            this.showPrivateCheck = true;
          }
        }
      },
      publicMode() {
        this.showPublic = true;
        this.showPrivateMember = false;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "0")
        this.$store.state.currentProjectPrivacy = "0"
        this.showPrivacyPopup = false;

      },
      privateMemberMode() {
        this.showPublic = false;
        this.showPrivateMember = true;
        this.showPrivateCheck = false;
        this.$store.dispatch('changeProjectPrivacy', "1")
        this.$store.state.currentProjectPrivacy = "1"
        this.showPrivacyPopup = false;

      },
      privateToMe() {
        this.showPublic = false;
        this.showPrivateCheck = true;
        this.showPrivateMember = false;
        this.$store.dispatch('changeProjectPrivacy', "2")
        this.$store.state.currentProjectPrivacy = "2"
        this.showPrivacyPopup = false;
      },
      hidePopup() {
        this.showPrivacyPopup = false;
      }
      // btnUpdateProfileClicked() {
      //   var bucket = new AWS.S3({params: {Bucket: 'obexpense'}});
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   if (file) {
      //     console.log('file type: ', file.type)
      //     console.log('body: ', file)
      //     var params = {Key: file.name, ContentType: file.type, Body: file};
      //     bucket.upload(params).on('httpUploadProgress', function(evt) {
      //     console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
      //     }).send(function(err, data) {
      //       alert("File uploaded successfully.");
      //       console.log('data: ', data)
      //       console.log('error: ', err)
      //     });
      // }
      // return false;

      // this.$store.state.userObject.username = this.username
      // this.$store.state.userObject.role = this.role
      // if (this.dob) {
      //   this.$store.state.userObject.dob = this.dob
      // }
      // this.$store.state.userObject.aboutme = this.aboutme
      // this.$store.commit('userData')
      // this.$http.post('/updateUserProfile', {
      //   email: this.$store.state.userObject.email,
      //   username: this.username,
      //   role: this.role,
      //   dob: this.dob,
      //   aboutme: this.aboutme,
      //   signup_type: this.$store.state.userObject.signup_type,
      //   image_url: this.imageURlProfilePic
      // }).then(response => response.json())
      // .then(json => {
      //   if (json.replaced) {
      //     $.notify.defaults({ className: "success" })
      //     $.notify("Profile updated successfully.", { globalPosition:"top center"})
      //   }
      //   var self = this
      //   this.$store.dispatch('updateUserProfile', {
      //     'fullname': this.username,
      //     'role': this.role,
      //     'dob': this.dob,
      //     'aboutme': this.aboutme,
      //     //'signup_type': this.$store.state.userObject.signup_type,
      //     'image_url': this.imageURlProfilePic
      //   })
      //     .then(function () {
      //       self.$store.state.userObject.fullname = self.username
      //       self.$store.state.userObject.role = self.role
      //       //if (this.dob) {
      //       self.$store.state.userObject.dob = self.dob
      //       //}
      //       self.$store.state.userObject.aboutme = self.aboutme
      //       self.$store.commit('userData')
      //     })
      //     .catch(function (error) {
      //       // $.notify.defaults({ className: "error" })
      //       // $.notify(error.message, { globalPosition:"top center"})
      //     });
      // },
      // btnProfileClicked() {
      //   console.log('UserName', this.$store.state.userObject.fullname)
      //   this.username = this.$store.state.userObject.fullname,
      //   console.log('UserName11', this.username)
      //     this.role = this.$store.state.userObject.role,
      //     this.aboutme = this.$store.state.userObject.aboutme,
      //     this.imageURlProfilePic = this.$store.state.userObject.image_url
      //   if (this.$store.state.userObject.dob) {
      //     this.datepicker = new Date(this.$store.state.userObject.dob)
      //   }
      //   this.enableUpdateProfileBtn()
      // },
      // picker9Formatter(date) {
      //   this.dob = Vue.moment(date).format('L');
      //   return this.dob
      // },
      // updateProfileImage() {
      //   this.loading = true
      //   let self = this
      //   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   var imageKey = self.$store.state.userObject.image_name

      //   if (file) {
      //     var params = { Key: file.name, ContentType: file.type, Body: file };
      //     bucket.upload(params).on('httpUploadProgress', function (evt) {
      //       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
      //     }).send(function (err, data) {
      //       console.log('file: ', file.name)
      //       self.imageURlProfilePic = data.Location
      //       self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       self.$store.state.userObject.image_name = file.name
      //       self.$store.commit('userData')
      //       //Delete image from amazon
      //       console.log('data: ', data.Location)
      //       console.log('key: ', self.$store.state.userObject.image_name)
      //       var bucketInstance = new AWS.S3();
      //       var params = {
      //         Bucket: 'airflowbucket1/obexpense/expenses',
      //         Key: imageKey
      //       }
      //       bucketInstance.deleteObject(params, function (err, data) {
      //         if (data) {
      //           self.$http.post('/updateImageURL', {
      //             email: self.$store.state.userObject.email,
      //             signup_type: self.$store.state.userObject.signup_type,
      //             image_url: self.imageURlProfilePic,
      //             image_name: file.name
      //           }).then(response => {
      //             if (response.body.replaced) {
      //               self.loading = false
      //             }
      //           })
      //         }
      //         else {
      //           console.log("Check if you have sufficient permissions : ", err.stack);
      //         }
      //       });
      //     });
      //   }
      //   return false;
      // },
      // onFileChange() {
      //   this.loading = true;
      //   let self = this;
      //   var bucket = new AWS.S3({ params: { Bucket: 'airflowbucket1/obexpense/expenses' } });
      //   var fileChooser = document.getElementById('file');
      //   var file = fileChooser.files[0];
      //   if (file) {
      //     var params = { Key: file.name, ContentType: file.type, Body: file };
      //     bucket.upload(params).on('httpUploadProgress', function (evt) {
      //       console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
      //     }).send(function (err, data) {
      //       // console.log("Amazon-data :: ", err);
      //       // self.$http.post('/updateImageURL', {
      //       // email: self.$store.state.userObject.email,
      //       // signup_type: self.$store.state.userObject.signup_type,
      //       // image_url: data.Location,
      //       // image_name: file.name
      //       // }).then(response => {
      //       //     if (response.body.replaced) {
      //       //         self.imageURlProfilePic = data.Location
      //       //         self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       //         self.$store.state.userObject.image_name = file.name
      //       //         self.$store.commit('userData')
      //       //         self.loading = false
      //       //     }
      //       self.$store.dispatch('updateUserProfile', {
      //         image_url: data.Location,
      //         image_name: file.name
      //       })
      //         .then(function () {
      //           self.imageURlProfilePic = data.Location
      //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //           self.$store.state.userObject.image_name = file.name
      //           self.$store.commit('userData')
      //           self.loading = false
      //         })
      //         .catch(function (error) {
      //           // $.notify.defaults({ className: "error" })
      //           // $.notify(error.message, { globalPosition:"top center"})
      //         });
      //     });
      //   }
      //   return false;
      // },
      // createImage(file) {
      //   var image = new Image();
      //   var reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.image = e.target.result;
      //   };
      //   reader.readAsDataURL(file);
      // },
      // removeImage: function (e) {
      //   this.loading = true
      //   this.imageURlProfilePic = null
      //   let self = this
      //   //Delete image from amazon
      //   var bucketInstance = new AWS.S3();
      //   var params = {
      //     Bucket: 'airflowbucket1/obexpense/expenses',
      //     Key: self.$store.state.userObject.image_name
      //   }
      //   bucketInstance.deleteObject(params, function (err, data) {
      //     if (data) {

      //       // self.$http.post('/updateImageURL', {
      //       //   email: self.$store.state.userObject.email,
      //       //   signup_type: self.$store.state.userObject.signup_type,
      //       //   image_url: self.imageURlProfilePic,
      //       //   image_name: ''
      //       //   }).then(response => {
      //       //       if (response.body.replaced) {
      //       //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //       //           self.$store.state.userObject.image_name = ''
      //       //           self.$store.commit('userData')
      //       //           self.loading = false
      //       //       }
      //       self.$store.dispatch('updateUserProfile', {
      //         image_url: self.imageURlProfilePic,
      //         image_name: ''
      //       })
      //         .then(function () {
      //           self.imageURlProfilePic = data.Location
      //           self.$store.state.userObject.image_url = self.imageURlProfilePic
      //           self.$store.state.userObject.image_name = ''
      //           self.$store.commit('userData')
      //           self.loading = false
      //         })
      //         .catch(function (error) {
      //           // $.notify.defaults({ className: "error" })
      //           // $.notify(error.message, { globalPosition:"top center"})
      //         });
      //     }
      //     else {
      //       console.log("Check if you have sufficient permissions : ", err.stack);
      //     }
      //   });
      // },
      // enableUpdateProfileBtn() {
      //   var trimmedusername = this.username.trim()
      //   if (trimmedusername.length >= 1) {
      //     $('#updateprofile_btn').removeClass('is-disabled')
      //     $("#updateprofile_btn").attr('disabled', false);
      //   } else {
      //     $('#updateprofile_btn').addClass('is-disabled')
      //     $("#updateprofile_btn").attr('disabled', true);
      //   }
      // }
      ,updateProjectName(){
        this.$store.dispatch('renameProjectName',this.pName)
      }
    },
    components: {
      MainLeftSection,
      MainRightSection,
      LeftToolbar,
      CreateProjectDialog
    }
  }

</script>