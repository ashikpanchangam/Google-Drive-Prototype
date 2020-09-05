<template>
    <div>
        
        <!-- Recently used files section begins here -->
        <div style="width: 280px;height: 30px;margin-left: 15px;margin-top: 10px;">
            <p style="color: rgb(66, 66, 66); font-family: &quot;Source Sans Pro&quot;; font-size: 16px; font-weight: bold; font-style: normal; text-decoration: none; text-align: left;">
                Recent
            </p>
        </div>

        <div class="row" style="padding-right: 15px; padding-left: 15px;">

            <div v-for="(item, index) in recentFiles" 
                @mouseover=" showByIndexRecent = index" 
                @mouseout="showByIndexRecent = null"
                class="col-xs-5ths col-sm-5ths col-md-5ths col-lg-5ths col-xl-5ths">
              
                <stats-card>
                    
                    <div slot="header"
                         class="recent-header-rectangle position-relative d-flex align-items-center justify-content-center"
                         :class="{'header-file-selected': recentFileSelected === index}" 
                         @click="recentFileMethods(recentFileSelected, index, recentFiles[index])" 
                         @contextmenu.prevent="$refs.menu.open">
                        
                        <div>
                            <label class="form-checkbox" 
                                   v-show="showByIndexRecent === index || recentlySelectedFiles[index]" 
                                   style="position: absolute; top: 10px; right: 10px">
                                <input type="checkbox" 
                                   :value="item.name" 
                                   v-model="recentlySelectedFiles[index]" 
                                   style="height:16px; width:16px;">
                            </label>
                        </div>

                        <div>
                            <img :src="item.source" style=" height: 50px;">
                        </div>
                    </div>

                    <div slot="footer"
                        class="recent-footer-rectangle"
                        :class="{'footer-file-selected': recentFileSelected === index}"
                        @click="recentFileMethods(recentFileSelected, index, recentFiles[index])"
                        @contextmenu.prevent="$refs.menu.open"
                        style="display: flex; flex-direction: column; justify-content: center;">
                       
                        <div class="row" >
                            <div class="col-8" style="display: flex;flex-direction: column;justify-content: center;">
                                <div class="file-name-style">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="file-size-style" >
                                    <span>{{item.size}} MB</span>
                                </div>
                            </div>
                            <div class="col-4" style="display: flex; flex-direction: column; justify-content: center; margin-top:">
                                <div v-show="!item.shared" style="float: right; padding: 0px 5px 5px 0px;">
                                    <i class='fas fa-users' id="image"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </stats-card>
            </div>
            
            <!-- Context menu -->
            <vue-context ref="menu">
                <ul style="font-family: 'Source Sans Pro'; font-size: 15px; font-weight: normal; font-style: normal; text-decoration: none; text-align: left; ">
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="23px" height="23px" viewBox="0 0 50 50">
                            <path d="M28,46H6V2h18v14h14v7c0,0.552,0.447,1,1,1s1-0.448,1-1v-8.414L25.414,0H4v48h24c0.553,0,1-0.447,1-1S28.553,46,28,46z   M26,3.414L36.586,14H26V3.414z M49.707,48.293l-5.969-5.969C45.15,40.599,46,38.397,46,36c0-5.514-4.486-10-10-10s-10,4.486-10,10  s4.486,10,10,10c2.397,0,4.599-0.85,6.324-2.262l5.969,5.969L49.707,48.293z M28,36c0-4.411,3.589-8,8-8s8,3.589,8,8s-3.589,8-8,8  S28,40.411,28,36z"/>
                        </svg>
                        <span class="context-menu-span">Preview</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="25px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M30.707,27.293L25,21.586  l-5.707,5.707c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L24,25.414V43c0,0.553,0.448,1,1,1c0.553,0,1-0.447,1-1V25.414  l3.293,3.293c0.391,0.391,1.023,0.391,1.414,0S31.098,27.684,30.707,27.293z"/>
                        </svg>
                        <span class="context-menu-span">Upload New Version</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="24px" viewBox="0 0 50 50">
                            <path d="M40,30c-2.133,0-4.112,0.671-5.737,1.813L20.636,25l13.626-6.813C35.888,19.329,37.867,20,40,20c5.514,0,10-4.486,10-10  S45.514,0,40,0c-5.475,0-9.936,4.422-9.999,9.882l-14.1,7.049C14.246,15.717,12.206,15,10,15C4.486,15,0,19.486,0,25  c0,5.514,4.486,10,10,10c2.205,0,4.246-0.718,5.901-1.931l14.1,7.049C30.064,45.578,34.525,50,40,50c5.514,0,10-4.486,10-10  S45.514,30,40,30z M40,2c4.411,0,8,3.589,8,8s-3.589,8-8,8c-1.802,0-3.467-0.599-4.806-1.608c-0.1-0.131-0.229-0.233-0.373-0.299  C33.096,14.624,32,12.438,32,10C32,5.589,35.589,2,40,2z M30.204,12.016c0.371,1.807,1.231,3.437,2.436,4.746l-12.808,6.404  c-0.338-1.816-1.168-3.461-2.347-4.791L30.204,12.016z M10,33c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S14.411,33,10,33z   M17.485,31.625c1.178-1.33,2.009-2.976,2.347-4.791l12.808,6.403c-1.204,1.31-2.064,2.94-2.436,4.747L17.485,31.625z M40,48  c-4.411,0-8-3.589-8-8c0-2.438,1.096-4.624,2.821-6.093c0.144-0.066,0.273-0.168,0.373-0.3C36.533,32.599,38.198,32,40,32  c4.411,0,8,3.589,8,8S44.411,48,40,48z"/>
                        </svg>
                        <span class="context-menu-span">Share</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="22px" viewBox="0 0 50 50">
                            <g>
                                <path d="M0,8v42h31V20.586L18.414,8H0z M29,48H2V10h15v12h12V48z M19,11.414L27.586,20H19V11.414z"/>
                                <path d="M37.414,0H19v6l2,2V2h15v12h12v26H33v2h17V12.586L37.414,0z M38,3.414L46.586,12H38V3.414z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">Copy/Move</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="21px" viewBox="0 0 50 50">
                            <path d="M49.144,18.314l-17.748-0.957L25,0.774l-6.396,16.583L0.856,18.314l13.797,11.207l-4.575,17.175L25,37.039l14.921,9.656  l-4.574-17.175L49.144,18.314z M36.653,42.199L25,34.656l-11.654,7.543l3.573-13.415L6.144,20.032l13.861-0.747L25,6.333  l4.995,12.952l13.861,0.747l-10.775,8.752L36.653,42.199z"/>
                        </svg>
                        <span class="context-menu-span">Add to Starred</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)" style="border-bottom: 1px solid #E0E0E0;">
                        <svg width="25px" height="23px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M29.293,40.293L26,43.586  V26c0-0.553-0.447-1-1-1c-0.552,0-1,0.447-1,1v17.586l-3.293-3.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414  L25,47.414l5.707-5.707c0.391-0.391,0.391-1.023,0-1.414S29.684,39.902,29.293,40.293z"/>
                        </svg>
                        <span class="context-menu-span">Download</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="18px" height="19px" viewBox="0 0 50 50">
                            <path d="M43.655,11.825c0.391,0.391,0.391,1.023,0,1.414L11.196,45.697c-0.124,0.124-0.278,0.213-0.448,0.259l-7.489,2.01  C3.173,47.989,3.086,48,3,48c-0.262,0-0.517-0.103-0.707-0.293c-0.253-0.253-0.352-0.621-0.259-0.966l2.009-7.489  c0.045-0.17,0.135-0.324,0.259-0.448L36.761,6.345c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-32.27,32.27l-0.003,0.011  l4.057,4.057l0.011-0.003l32.27-32.269C42.632,11.435,43.265,11.435,43.655,11.825z M46.575,3.426c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825l6.884,6.883c-0.005,0.004,0.824-0.825,0.824-0.825C48.474,8.408,48.474,5.326,46.575,3.426z"/>
                        </svg>
                        <span class="context-menu-span">Rename</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="24px" viewBox="0 0 50 50">
                            <path d="M25,4.07C12.356,4.07,2.07,13.011,2.07,24c0,6.176,3.337,12.045,8.957,15.805c-0.126,1.034-0.646,3.622-2.787,6.66  l-1.027,1.457l1.84,0.008c5.448-0.001,9.116-3.367,10.285-4.611c1.842,0.405,3.744,0.611,5.662,0.611  c12.644,0,22.93-8.94,22.93-19.93S37.644,4.07,25,4.07z M25,42.07c-1.96,0-3.902-0.23-5.771-0.686l-0.574-0.14l-0.37,0.461  c-0.031,0.039-2.86,3.495-7.502,4.229c2.12-3.685,2.143-6.476,2.143-6.608l-0.001-0.511l-0.431-0.273  C7.131,35.143,3.93,29.706,3.93,24c0-9.964,9.452-18.07,21.07-18.07S46.07,14.036,46.07,24S36.618,42.07,25,42.07z"/>
                        </svg>
                        <span class="context-menu-span">Comment</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="27px" viewBox="0 0 50 50">
                            <path d="M47.998,20.377L48,5.5C48,3.57,46.43,2,44.5,2L29.624,2.002L28.995,2c-1.294,0-2.529,0.074-3.419,0.963L2.848,25.69  C2.301,26.235,2,26.962,2,27.734c0,0.772,0.301,1.499,0.847,2.045l17.374,17.374c0.546,0.546,1.271,0.846,2.044,0.846  s1.498-0.3,2.044-0.846l22.727-22.729c0.975-0.972,0.969-2.372,0.963-3.725L47.998,20.377z M45.999,20.708  c0.004,0.986,0.008,1.918-0.376,2.302L22.895,45.739c-0.336,0.336-0.924,0.336-1.26,0L4.261,28.364C4.092,28.196,4,27.973,4,27.734  c0-0.237,0.092-0.46,0.261-0.629L26.99,4.377C27.339,4.029,28.138,4,28.995,4l0.629,0.002L44.5,4C45.327,4,46,4.673,46,5.5  l-0.002,14.877L45.999,20.708z M39,7c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S41.206,7,39,7z M39,13c-1.103,0-2-0.897-2-2  s0.897-2,2-2s2,0.897,2,2S40.103,13,39,13z"/>
                        </svg>
                        <span class="context-menu-span">
                            Tags
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="25px" height="24px" viewBox="0 0 50 50">
                            <path d="M42,20h-4v-5.773c0-7.168-5.832-13-13-13c-7.168,0-13,5.832-13,13V20H8c-1.654,0-3,1.346-3,3v24c0,1.654,1.346,3,3,3h34  c1.654,0,3-1.346,3-3V23C45,21.346,43.654,20,42,20z M14,14.227c0-6.065,4.935-11,11-11s11,4.935,11,11V20H14V14.227z M43,47  c0,0.552-0.448,1-1,1H8c-0.551,0-1-0.448-1-1V23c0-0.551,0.449-1,1-1h34c0.552,0,1,0.449,1,1V47z M39,35c0,1.105-0.895,2-2,2  c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C38.105,33,39,33.895,39,35z M31,35c0,1.105-0.895,2-2,2s-2-0.895-2-2  c0-1.105,0.895-2,2-2C30.105,33,31,33.895,31,35z M23,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2  C22.105,33,23,33.895,23,35z M15,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C14.105,33,15,33.895,15,35z"/>
                        </svg>
                        <span class="context-menu-span">
                            Legal Hold
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="23px" viewBox="0 0 50 50">
                            <g>
	                            <path d="M22,43h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,41.822,20.178,43,22,43z"/>
                                <path d="M39,3H11C8.243,3,6,5.243,6,8v35c0,2.757,2.243,5,5,5h28c2.757,0,5-2.243,5-5V8C44,5.243,41.757,3,39,3z M42,43   c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3v-9h34V43z M42,32H8V19h34V32z M42,17H8V8c0-1.654,1.346-3,3-3h28   c1.654,0,3,1.346,3,3V17z"/>
                                <path d="M30,9c-0.553,0-1,0.448-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1c0-0.552-0.448-1-1-1s-1,0.448-1,1   c0,1.822,1.178,3,3,3h6c1.794,0,3-1.206,3-3C31,9.448,30.553,9,30,9z"/>
                                <path d="M22,29h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,27.822,20.178,29,22,29z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">
                            Retention
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="23px" viewBox="0 0 50 50">
                            <path d="M42.799,9c-0.45-1.118-1.6-2-2.799-2h-7V6.7C33,3.582,31.486,2,28.5,2h-7C18.514,2,17,3.582,17,6.7V7h-7  C8.8,7,7.652,7.882,7.201,9H5v6h3v29c0,2.243,1.757,4,4,4h26c2.243,0,4-1.757,4-4V15h3V9H42.799z M19,6.7C19,4.681,19.631,4,21.5,4  h7C30.369,4,31,4.681,31,6.7V7H19V6.7z M40,44c0,1.141-0.859,2-2,2H12c-1.14,0-2-0.859-2-2V15h30V44z M43,13H7v-2h2v-1  c0-0.449,0.551-1,1-1h30c0.448,0,1,0.551,1,1v1h2V13z M32,41V20c0-0.552,0.447-1,1-1s1,0.448,1,1v21c0,0.553-0.447,1-1,1  S32,41.553,32,41z M16,41V20c0-0.552,0.448-1,1-1s1,0.448,1,1v21c0,0.553-0.448,1-1,1S16,41.553,16,41z M24,41V20  c0-0.552,0.448-1,1-1c0.553,0,1,0.448,1,1v21c0,0.553-0.447,1-1,1C24.448,42,24,41.553,24,41z"/>
                        </svg>
                        <span class="context-menu-span">
                            Delete
                        </span>
                    </li>
                </ul>
            </vue-context>

        </div>

        <!-- Start of the table -->
        <div class="row" style="padding-bottom: 15px; margin-bottom: 20px; padding-right: 15px; padding-left: 15px;">
            <div class="col">
                <table class="table table-hover table-responsive-sm">
                    <thead>
                        <tr>
                            <th style="width: 36px; padding-left: 8px;padding-right: 8px;text-align: left; vertical-align: middle; border-top-width:0px;">
                                <label class="form-checkbox" style="margin-top: 8px;">
                                <input type="checkbox" v-model="allFoldersInTableSelected" @click="selectFoldersFromTable">
                                    <i class="form-icon"></i>
                                </label>
                            </th>
                            <th style="padding-left: 8px;padding-right: 8px;text-align: left; vertical-align: middle; border-top-width: 0px;">Name</th>
                            <th style="width: 423px; padding-left: 8px;padding-right: 8px;text-align: left; vertical-align: middle; border-top-width: 0px">Last Modified</th>
                            <th style="width: 406px; padding-left: 8px;padding-right: 8px;text-align: left; vertical-align: middle; border-top-width: 0px;">Size</th>
                            <th style="width: 64px; padding-left: 8px;padding-right: 8px;text-align: left; vertical-align: middle; border-top-width: 0px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in folders" @mouseover="showByIndexTable = i" @mouseout="showByIndexTable = null">
                            <td style="padding-left: 12px;padding-right: 12px; vertical-align: middle;">
                                <label v-show="showByIndexTable === i || selectedFoldersFromTable.includes(i.name) || selectedFoldersFromTable.length === folders.length" class="form-checkbox" style="margin-top: 8px;">
                                    <input type="checkbox" :value="i.name" v-model="selectedFoldersFromTable">
                                    <i class="form-icon">
                                    </i>
                                </label>
                            </td>
                            <td v-if="i.shared === true" style=" vertical-align: middle;">
                                <i class="material-icons">folder_shared</i>
                                    <span class="folder-name">
                                        {{i.name}}
                                    </span> 
                            </td>
                            <td v-else style=" vertical-align: middle;">
                                <i class="material-icons">folder</i>
                                    <span class="folder-name"> 
                                        {{i.name}}
                                    </span>
                            </td>
                            <td style="color: #424242; font-family: 'Source Sans Pro'; font-size: 15px; text-align: left; vertical-align: middle;">
                                {{i.lastModified}}
                            </td>
                            <td style="color: #424242; font-family: 'Source Sans Pro'; font-size: 15px; text-align: left; vertical-align: middle;">
                                {{i.numOfFiles}}
                            </td>
                            <td style="vertical-align: middle;">
                                <button class="btn">
                                    <svg width="32" height="32" >
                                        <path d="M3.205 12.801c-1.767 0-3.199 1.432-3.199 3.199s1.432 3.199 3.199 3.199c1.766 0 3.199-1.432 3.199-3.199s-1.433-3.199-3.199-3.199zM3.205 18.133c-1.177 0-2.132-0.956-2.132-2.133s0.956-2.133 2.132-2.133c1.176 0 2.133 0.956 2.133 2.133s-0.957 2.133-2.132 2.133z" fill="#000000"/>
                                        <path d="M28.795 12.801c-1.767 0-3.199 1.432-3.199 3.199s1.432 3.199 3.199 3.199c1.766 0 3.199-1.432 3.199-3.199s-1.433-3.199-3.199-3.199zM28.795 18.133c-1.176 0-2.133-0.956-2.133-2.133s0.957-2.133 2.133-2.133c1.176 0 2.133 0.956 2.133 2.133s-0.957 2.133-2.133 2.133z" fill="#000000"/>
                                        <path d="M16 12.801c-1.767 0-3.199 1.432-3.199 3.199s1.432 3.199 3.199 3.199c1.766 0 3.199-1.432 3.199-3.199s-1.433-3.199-3.199-3.199zM16 18.133c-1.176 0-2.133-0.956-2.133-2.133s0.957-2.133 2.133-2.133c1.176 0 2.133 0.956 2.133 2.133s-0.957 2.133-2.133 2.133z" fill="#000000"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End of the table -->

        <!-- Folder section begins here -->
        <div style="width: 280px; height: 30px; margin-left: 15px;">
            <p style="color: #424242; font-family: 'Source Sans Pro'; font-size: 16px; font-weight: bold; font-style: normal; text-decoration: none; text-align: left;">Folders</p>
        </div>

        <div class="row" style="padding-right: 15px; padding-left: 15px;">
            <div v-for="(folder,index) in folders"  
                @mouseover="showByIndexFolders = index" 
                @mouseout="showByIndexFolders = null" 
                class="col-xs-5ths col-sm-5ths col-md-5ths col-lg-5ths col-xl-5ths">
                <stats-card>
                    
                    <div slot="header"
                         class="folder-rectangle"
                         :class="{'folder-selected':folderSelected == index}"
                         @contextmenu.prevent="$refs.menu.open"
                         @click="folderMethods(folderSelected, index, folders[index])">
                        <div class="row">
                            <div class="col-2" style="padding-right: 15px;padding-left: 15px;">
                                <div v-if="folder.shared" class="clearfix" style="margin-top: 8px; margin-left: 10px;">
                                    <i class="material-icons" id="folder-image">&#xe2c9;</i>
                                </div>
                                <div v-else class="clearfix" style="margin-top: 8px; margin-left: 10px;">
                                    <i class="material-icons" id="folder-image">folder</i>
                                </div>
                            </div>
                            <div class="col-10" style="padding: 7px; position:absolute; left:45px;">
                                <div>
                                    <label class="form-checkbox" v-show="showByIndexFolders === index || selectedFolders[index]" style="position: absolute; top: 10px; right: 15px; margin-right: 10px">
                                        <input type="checkbox" :value="folder.name" v-model="selectedFolders[index]" style="height:16px; width:16px;">
                                        
                                    </label>
                                </div>
                                <div class="d-flex file-name-style" style="padding-right: 5px;padding-left: 5px;margin-left: 10px;margin-right: 10px;">
                                    <span>{{folder.name}}</span>
                                </div>
                                <div class="d-flex file-size-style" style="padding-bottom: 5px;padding-top: 10px;padding-left: 5px;margin-left: 10px;margin-right: 10px;">
                                    <span>{{folder.numOfFiles}} files</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </stats-card>
            </div>
            
            <!-- Context menu -->
            <vue-context ref="menu">
                <ul style="font-family: 'Source Sans Pro'; font-size: 15px; font-weight: normal; font-style: normal; text-decoration: none; text-align: left; ">
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="23px" height="23px" viewBox="0 0 50 50">
                            <path d="M28,46H6V2h18v14h14v7c0,0.552,0.447,1,1,1s1-0.448,1-1v-8.414L25.414,0H4v48h24c0.553,0,1-0.447,1-1S28.553,46,28,46z   M26,3.414L36.586,14H26V3.414z M49.707,48.293l-5.969-5.969C45.15,40.599,46,38.397,46,36c0-5.514-4.486-10-10-10s-10,4.486-10,10  s4.486,10,10,10c2.397,0,4.599-0.85,6.324-2.262l5.969,5.969L49.707,48.293z M28,36c0-4.411,3.589-8,8-8s8,3.589,8,8s-3.589,8-8,8  S28,40.411,28,36z"/>
                        </svg>
                        <span class="context-menu-span">Preview</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="25px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M30.707,27.293L25,21.586  l-5.707,5.707c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L24,25.414V43c0,0.553,0.448,1,1,1c0.553,0,1-0.447,1-1V25.414  l3.293,3.293c0.391,0.391,1.023,0.391,1.414,0S31.098,27.684,30.707,27.293z"/>
                        </svg>
                        <span class="context-menu-span">Upload New Version</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="24px" viewBox="0 0 50 50">
                            <path d="M40,30c-2.133,0-4.112,0.671-5.737,1.813L20.636,25l13.626-6.813C35.888,19.329,37.867,20,40,20c5.514,0,10-4.486,10-10  S45.514,0,40,0c-5.475,0-9.936,4.422-9.999,9.882l-14.1,7.049C14.246,15.717,12.206,15,10,15C4.486,15,0,19.486,0,25  c0,5.514,4.486,10,10,10c2.205,0,4.246-0.718,5.901-1.931l14.1,7.049C30.064,45.578,34.525,50,40,50c5.514,0,10-4.486,10-10  S45.514,30,40,30z M40,2c4.411,0,8,3.589,8,8s-3.589,8-8,8c-1.802,0-3.467-0.599-4.806-1.608c-0.1-0.131-0.229-0.233-0.373-0.299  C33.096,14.624,32,12.438,32,10C32,5.589,35.589,2,40,2z M30.204,12.016c0.371,1.807,1.231,3.437,2.436,4.746l-12.808,6.404  c-0.338-1.816-1.168-3.461-2.347-4.791L30.204,12.016z M10,33c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S14.411,33,10,33z   M17.485,31.625c1.178-1.33,2.009-2.976,2.347-4.791l12.808,6.403c-1.204,1.31-2.064,2.94-2.436,4.747L17.485,31.625z M40,48  c-4.411,0-8-3.589-8-8c0-2.438,1.096-4.624,2.821-6.093c0.144-0.066,0.273-0.168,0.373-0.3C36.533,32.599,38.198,32,40,32  c4.411,0,8,3.589,8,8S44.411,48,40,48z"/>
                        </svg>
                        <span class="context-menu-span">Share</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="22px" viewBox="0 0 50 50">
                            <g>
                                <path d="M0,8v42h31V20.586L18.414,8H0z M29,48H2V10h15v12h12V48z M19,11.414L27.586,20H19V11.414z"/>
                                <path d="M37.414,0H19v6l2,2V2h15v12h12v26H33v2h17V12.586L37.414,0z M38,3.414L46.586,12H38V3.414z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">Copy/Move</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="21px" viewBox="0 0 50 50">
                            <path d="M49.144,18.314l-17.748-0.957L25,0.774l-6.396,16.583L0.856,18.314l13.797,11.207l-4.575,17.175L25,37.039l14.921,9.656  l-4.574-17.175L49.144,18.314z M36.653,42.199L25,34.656l-11.654,7.543l3.573-13.415L6.144,20.032l13.861-0.747L25,6.333  l4.995,12.952l13.861,0.747l-10.775,8.752L36.653,42.199z"/>
                        </svg>
                        <span class="context-menu-span">Add to Starred</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)" style="border-bottom: 1px solid #E0E0E0;">
                        <svg width="25px" height="23px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M29.293,40.293L26,43.586  V26c0-0.553-0.447-1-1-1c-0.552,0-1,0.447-1,1v17.586l-3.293-3.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414  L25,47.414l5.707-5.707c0.391-0.391,0.391-1.023,0-1.414S29.684,39.902,29.293,40.293z"/>
                        </svg>
                        <span class="context-menu-span">Download</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="18px" height="19px" viewBox="0 0 50 50">
                            <path d="M43.655,11.825c0.391,0.391,0.391,1.023,0,1.414L11.196,45.697c-0.124,0.124-0.278,0.213-0.448,0.259l-7.489,2.01  C3.173,47.989,3.086,48,3,48c-0.262,0-0.517-0.103-0.707-0.293c-0.253-0.253-0.352-0.621-0.259-0.966l2.009-7.489  c0.045-0.17,0.135-0.324,0.259-0.448L36.761,6.345c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-32.27,32.27l-0.003,0.011  l4.057,4.057l0.011-0.003l32.27-32.269C42.632,11.435,43.265,11.435,43.655,11.825z M46.575,3.426c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825l6.884,6.883c-0.005,0.004,0.824-0.825,0.824-0.825C48.474,8.408,48.474,5.326,46.575,3.426z"/>
                        </svg>
                        <span class="context-menu-span">Rename</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="24px" viewBox="0 0 50 50">
                            <path d="M25,4.07C12.356,4.07,2.07,13.011,2.07,24c0,6.176,3.337,12.045,8.957,15.805c-0.126,1.034-0.646,3.622-2.787,6.66  l-1.027,1.457l1.84,0.008c5.448-0.001,9.116-3.367,10.285-4.611c1.842,0.405,3.744,0.611,5.662,0.611  c12.644,0,22.93-8.94,22.93-19.93S37.644,4.07,25,4.07z M25,42.07c-1.96,0-3.902-0.23-5.771-0.686l-0.574-0.14l-0.37,0.461  c-0.031,0.039-2.86,3.495-7.502,4.229c2.12-3.685,2.143-6.476,2.143-6.608l-0.001-0.511l-0.431-0.273  C7.131,35.143,3.93,29.706,3.93,24c0-9.964,9.452-18.07,21.07-18.07S46.07,14.036,46.07,24S36.618,42.07,25,42.07z"/>
                        </svg>
                        <span class="context-menu-span">Comment</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="27px" viewBox="0 0 50 50">
                            <path d="M47.998,20.377L48,5.5C48,3.57,46.43,2,44.5,2L29.624,2.002L28.995,2c-1.294,0-2.529,0.074-3.419,0.963L2.848,25.69  C2.301,26.235,2,26.962,2,27.734c0,0.772,0.301,1.499,0.847,2.045l17.374,17.374c0.546,0.546,1.271,0.846,2.044,0.846  s1.498-0.3,2.044-0.846l22.727-22.729c0.975-0.972,0.969-2.372,0.963-3.725L47.998,20.377z M45.999,20.708  c0.004,0.986,0.008,1.918-0.376,2.302L22.895,45.739c-0.336,0.336-0.924,0.336-1.26,0L4.261,28.364C4.092,28.196,4,27.973,4,27.734  c0-0.237,0.092-0.46,0.261-0.629L26.99,4.377C27.339,4.029,28.138,4,28.995,4l0.629,0.002L44.5,4C45.327,4,46,4.673,46,5.5  l-0.002,14.877L45.999,20.708z M39,7c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S41.206,7,39,7z M39,13c-1.103,0-2-0.897-2-2  s0.897-2,2-2s2,0.897,2,2S40.103,13,39,13z"/>
                        </svg>
                        <span class="context-menu-span">
                            Tags
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="25px" height="24px" viewBox="0 0 50 50">
                            <path d="M42,20h-4v-5.773c0-7.168-5.832-13-13-13c-7.168,0-13,5.832-13,13V20H8c-1.654,0-3,1.346-3,3v24c0,1.654,1.346,3,3,3h34  c1.654,0,3-1.346,3-3V23C45,21.346,43.654,20,42,20z M14,14.227c0-6.065,4.935-11,11-11s11,4.935,11,11V20H14V14.227z M43,47  c0,0.552-0.448,1-1,1H8c-0.551,0-1-0.448-1-1V23c0-0.551,0.449-1,1-1h34c0.552,0,1,0.449,1,1V47z M39,35c0,1.105-0.895,2-2,2  c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C38.105,33,39,33.895,39,35z M31,35c0,1.105-0.895,2-2,2s-2-0.895-2-2  c0-1.105,0.895-2,2-2C30.105,33,31,33.895,31,35z M23,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2  C22.105,33,23,33.895,23,35z M15,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C14.105,33,15,33.895,15,35z"/>
                        </svg>
                        <span class="context-menu-span">
                            Legal Hold
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="23px" viewBox="0 0 50 50">
                            <g>
	                            <path d="M22,43h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,41.822,20.178,43,22,43z"/>
                                <path d="M39,3H11C8.243,3,6,5.243,6,8v35c0,2.757,2.243,5,5,5h28c2.757,0,5-2.243,5-5V8C44,5.243,41.757,3,39,3z M42,43   c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3v-9h34V43z M42,32H8V19h34V32z M42,17H8V8c0-1.654,1.346-3,3-3h28   c1.654,0,3,1.346,3,3V17z"/>
                                <path d="M30,9c-0.553,0-1,0.448-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1c0-0.552-0.448-1-1-1s-1,0.448-1,1   c0,1.822,1.178,3,3,3h6c1.794,0,3-1.206,3-3C31,9.448,30.553,9,30,9z"/>
                                <path d="M22,29h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,27.822,20.178,29,22,29z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">
                            Retention
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="23px" viewBox="0 0 50 50">
                            <path d="M42.799,9c-0.45-1.118-1.6-2-2.799-2h-7V6.7C33,3.582,31.486,2,28.5,2h-7C18.514,2,17,3.582,17,6.7V7h-7  C8.8,7,7.652,7.882,7.201,9H5v6h3v29c0,2.243,1.757,4,4,4h26c2.243,0,4-1.757,4-4V15h3V9H42.799z M19,6.7C19,4.681,19.631,4,21.5,4  h7C30.369,4,31,4.681,31,6.7V7H19V6.7z M40,44c0,1.141-0.859,2-2,2H12c-1.14,0-2-0.859-2-2V15h30V44z M43,13H7v-2h2v-1  c0-0.449,0.551-1,1-1h30c0.448,0,1,0.551,1,1v1h2V13z M32,41V20c0-0.552,0.447-1,1-1s1,0.448,1,1v21c0,0.553-0.447,1-1,1  S32,41.553,32,41z M16,41V20c0-0.552,0.448-1,1-1s1,0.448,1,1v21c0,0.553-0.448,1-1,1S16,41.553,16,41z M24,41V20  c0-0.552,0.448-1,1-1c0.553,0,1,0.448,1,1v21c0,0.553-0.447,1-1,1C24.448,42,24,41.553,24,41z"/>
                        </svg>
                        <span class="context-menu-span">
                            Delete
                        </span>
                    </li>
                </ul>
            </vue-context>
        </div>

        <!-- Files section begins here -->
        <div style="width: 280px; height: 30px; margin-left: 15px;">
            <p style="color: #424242; font-family: 'Source Sans Pro'; font-size: 16px; font-weight: bold; font-style: normal; text-decoration: none; text-align: left;">Files</p>
        </div>

        <div class="row" style="padding-bottom: 15px; margin-bottom: 20px; padding-right: 15px; padding-left: 15px;">

            <div v-for="(item, index) in files" 
                @mouseover="showByIndexFiles = index" 
                @mouseout="showByIndexFiles = null"
                class="col-xs-5ths col-sm-5ths col-md-5ths col-lg-5ths col-xl-5ths">
              
                <stats-card>
                    
                    <div slot="header"
                         class="header-rectangle position-relative d-flex align-items-center justify-content-center"
                         :class="{'header-file-selected': fileSelected === index}" 
                         @click="fileMethods(fileSelected, index, files[index])" 
                         @contextmenu.prevent="$refs.menu.open"> 
                        
                        <div>
                            <label class="form-checkbox" 
                                    v-show="showByIndexFiles === index || selectedFiles[index]" 
                                    style="position: absolute; top: 10px; right: 10px">
                                <input type="checkbox" 
                                    :value="item.name" 
                                    v-model="selectedFiles[index]" 
                                    style="height:16px; width:16px;">
                            </label>
                        </div>

                        <div>
                            
                            <img :src="item.source" style=" height: 50px;">
                            
                        </div>
                    </div>

                    <div slot="footer"
                        class="footer-rectangle"
                        :class="{'footer-file-selected': fileSelected === index}"
                        @click="fileMethods(fileSelected, index, files[index])"
                         @contextmenu.prevent="$refs.menu.open"
                        style="display: flex; flex-direction: column; justify-content: center;">
                       
                        <div class="row" >
                            <div class="col-8" style="display: flex;flex-direction: column;justify-content: center;">
                                <div class="file-name-style">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="file-size-style" >
                                    <span>{{item.size}} MB</span>
                                </div>
                            </div>
                            <div class="col-4" style="display: flex; flex-direction: column; justify-content: center; margin-top:">
                                <div v-show="!item.shared" style="float: right; padding: 0px 5px 5px 0px;">
                                    <i class='fas fa-users' id="image"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </stats-card>
            </div>
            
            <!-- Context menu -->
            <vue-context ref="menu">
                <ul style="font-family: 'Source Sans Pro'; font-size: 15px; font-weight: normal; font-style: normal; text-decoration: none; text-align: left; ">
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="23px" height="23px" viewBox="0 0 50 50">
                            <path d="M28,46H6V2h18v14h14v7c0,0.552,0.447,1,1,1s1-0.448,1-1v-8.414L25.414,0H4v48h24c0.553,0,1-0.447,1-1S28.553,46,28,46z   M26,3.414L36.586,14H26V3.414z M49.707,48.293l-5.969-5.969C45.15,40.599,46,38.397,46,36c0-5.514-4.486-10-10-10s-10,4.486-10,10  s4.486,10,10,10c2.397,0,4.599-0.85,6.324-2.262l5.969,5.969L49.707,48.293z M28,36c0-4.411,3.589-8,8-8s8,3.589,8,8s-3.589,8-8,8  S28,40.411,28,36z"/>
                        </svg>
                        <span class="context-menu-span">Preview</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="25px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M30.707,27.293L25,21.586  l-5.707,5.707c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L24,25.414V43c0,0.553,0.448,1,1,1c0.553,0,1-0.447,1-1V25.414  l3.293,3.293c0.391,0.391,1.023,0.391,1.414,0S31.098,27.684,30.707,27.293z"/>
                        </svg>
                        <span class="context-menu-span">Upload New Version</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="24px" viewBox="0 0 50 50">
                            <path d="M40,30c-2.133,0-4.112,0.671-5.737,1.813L20.636,25l13.626-6.813C35.888,19.329,37.867,20,40,20c5.514,0,10-4.486,10-10  S45.514,0,40,0c-5.475,0-9.936,4.422-9.999,9.882l-14.1,7.049C14.246,15.717,12.206,15,10,15C4.486,15,0,19.486,0,25  c0,5.514,4.486,10,10,10c2.205,0,4.246-0.718,5.901-1.931l14.1,7.049C30.064,45.578,34.525,50,40,50c5.514,0,10-4.486,10-10  S45.514,30,40,30z M40,2c4.411,0,8,3.589,8,8s-3.589,8-8,8c-1.802,0-3.467-0.599-4.806-1.608c-0.1-0.131-0.229-0.233-0.373-0.299  C33.096,14.624,32,12.438,32,10C32,5.589,35.589,2,40,2z M30.204,12.016c0.371,1.807,1.231,3.437,2.436,4.746l-12.808,6.404  c-0.338-1.816-1.168-3.461-2.347-4.791L30.204,12.016z M10,33c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S14.411,33,10,33z   M17.485,31.625c1.178-1.33,2.009-2.976,2.347-4.791l12.808,6.403c-1.204,1.31-2.064,2.94-2.436,4.747L17.485,31.625z M40,48  c-4.411,0-8-3.589-8-8c0-2.438,1.096-4.624,2.821-6.093c0.144-0.066,0.273-0.168,0.373-0.3C36.533,32.599,38.198,32,40,32  c4.411,0,8,3.589,8,8S44.411,48,40,48z"/>
                        </svg>
                        <span class="context-menu-span">Share</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="22px" viewBox="0 0 50 50">
                            <g>
                                <path d="M0,8v42h31V20.586L18.414,8H0z M29,48H2V10h15v12h12V48z M19,11.414L27.586,20H19V11.414z"/>
                                <path d="M37.414,0H19v6l2,2V2h15v12h12v26H33v2h17V12.586L37.414,0z M38,3.414L46.586,12H38V3.414z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">Copy/Move</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="21px" viewBox="0 0 50 50">
                            <path d="M49.144,18.314l-17.748-0.957L25,0.774l-6.396,16.583L0.856,18.314l13.797,11.207l-4.575,17.175L25,37.039l14.921,9.656  l-4.574-17.175L49.144,18.314z M36.653,42.199L25,34.656l-11.654,7.543l3.573-13.415L6.144,20.032l13.861-0.747L25,6.333  l4.995,12.952l13.861,0.747l-10.775,8.752L36.653,42.199z"/>
                        </svg>
                        <span class="context-menu-span">Add to Starred</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)" style="border-bottom: 1px solid #E0E0E0;">
                        <svg width="25px" height="23px" viewBox="0 0 50 50">
                            <path d="M50,27.099C50,32.007,46.007,36,41.098,36H32c-0.553,0-1-0.447-1-1s0.447-1,1-1h9.098C44.903,34,48,30.904,48,27.099  s-3.097-6.901-6.902-6.901c-0.286,0-0.588-0.121-0.777-0.336c-0.19-0.214-0.308-0.499-0.272-0.783  c0.064-0.53,0.095-0.969,0.095-1.383c0-6.148-5.002-11.15-11.149-11.15c-4.637,0-8.835,2.929-10.448,7.288  c-0.119,0.32-0.392,0.557-0.725,0.63c-0.334,0.074-0.68-0.029-0.921-0.271c-0.947-0.948-2.205-1.47-3.543-1.47  c-2.762,0-5.009,2.247-5.009,5.008l0.012,0.216c0.016,0.462-0.287,0.875-0.733,0.999C4.313,19.861,2,22.898,2,26.331  C2,30.56,5.441,34,9.67,34H18c0.552,0,1,0.447,1,1s-0.448,1-1,1H9.67C4.338,36,0,31.662,0,26.331c0-4.072,2.581-7.702,6.363-9.08  c0.247-3.642,3.289-6.528,6.993-6.528c1.392,0,2.722,0.403,3.857,1.155c2.196-4.436,6.771-7.332,11.78-7.332  c7.251,0,13.149,5.899,13.149,13.15c0,0.186-0.005,0.374-0.015,0.568C46.577,18.794,50,22.554,50,27.099z M29.293,40.293L26,43.586  V26c0-0.553-0.447-1-1-1c-0.552,0-1,0.447-1,1v17.586l-3.293-3.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414  L25,47.414l5.707-5.707c0.391-0.391,0.391-1.023,0-1.414S29.684,39.902,29.293,40.293z"/>
                        </svg>
                        <span class="context-menu-span">Download</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="18px" height="19px" viewBox="0 0 50 50">
                            <path d="M43.655,11.825c0.391,0.391,0.391,1.023,0,1.414L11.196,45.697c-0.124,0.124-0.278,0.213-0.448,0.259l-7.489,2.01  C3.173,47.989,3.086,48,3,48c-0.262,0-0.517-0.103-0.707-0.293c-0.253-0.253-0.352-0.621-0.259-0.966l2.009-7.489  c0.045-0.17,0.135-0.324,0.259-0.448L36.761,6.345c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-32.27,32.27l-0.003,0.011  l4.057,4.057l0.011-0.003l32.27-32.269C42.632,11.435,43.265,11.435,43.655,11.825z M46.575,3.426c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825l6.884,6.883c-0.005,0.004,0.824-0.825,0.824-0.825C48.474,8.408,48.474,5.326,46.575,3.426z"/>
                        </svg>
                        <span class="context-menu-span">Rename</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="27px" height="24px" viewBox="0 0 50 50">
                            <path d="M25,4.07C12.356,4.07,2.07,13.011,2.07,24c0,6.176,3.337,12.045,8.957,15.805c-0.126,1.034-0.646,3.622-2.787,6.66  l-1.027,1.457l1.84,0.008c5.448-0.001,9.116-3.367,10.285-4.611c1.842,0.405,3.744,0.611,5.662,0.611  c12.644,0,22.93-8.94,22.93-19.93S37.644,4.07,25,4.07z M25,42.07c-1.96,0-3.902-0.23-5.771-0.686l-0.574-0.14l-0.37,0.461  c-0.031,0.039-2.86,3.495-7.502,4.229c2.12-3.685,2.143-6.476,2.143-6.608l-0.001-0.511l-0.431-0.273  C7.131,35.143,3.93,29.706,3.93,24c0-9.964,9.452-18.07,21.07-18.07S46.07,14.036,46.07,24S36.618,42.07,25,42.07z"/>
                        </svg>
                        <span class="context-menu-span">Comment</span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="27px" viewBox="0 0 50 50">
                            <path d="M47.998,20.377L48,5.5C48,3.57,46.43,2,44.5,2L29.624,2.002L28.995,2c-1.294,0-2.529,0.074-3.419,0.963L2.848,25.69  C2.301,26.235,2,26.962,2,27.734c0,0.772,0.301,1.499,0.847,2.045l17.374,17.374c0.546,0.546,1.271,0.846,2.044,0.846  s1.498-0.3,2.044-0.846l22.727-22.729c0.975-0.972,0.969-2.372,0.963-3.725L47.998,20.377z M45.999,20.708  c0.004,0.986,0.008,1.918-0.376,2.302L22.895,45.739c-0.336,0.336-0.924,0.336-1.26,0L4.261,28.364C4.092,28.196,4,27.973,4,27.734  c0-0.237,0.092-0.46,0.261-0.629L26.99,4.377C27.339,4.029,28.138,4,28.995,4l0.629,0.002L44.5,4C45.327,4,46,4.673,46,5.5  l-0.002,14.877L45.999,20.708z M39,7c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S41.206,7,39,7z M39,13c-1.103,0-2-0.897-2-2  s0.897-2,2-2s2,0.897,2,2S40.103,13,39,13z"/>
                        </svg>
                        <span class="context-menu-span">
                            Tags
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="25px" height="24px" viewBox="0 0 50 50">
                            <path d="M42,20h-4v-5.773c0-7.168-5.832-13-13-13c-7.168,0-13,5.832-13,13V20H8c-1.654,0-3,1.346-3,3v24c0,1.654,1.346,3,3,3h34  c1.654,0,3-1.346,3-3V23C45,21.346,43.654,20,42,20z M14,14.227c0-6.065,4.935-11,11-11s11,4.935,11,11V20H14V14.227z M43,47  c0,0.552-0.448,1-1,1H8c-0.551,0-1-0.448-1-1V23c0-0.551,0.449-1,1-1h34c0.552,0,1,0.449,1,1V47z M39,35c0,1.105-0.895,2-2,2  c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C38.105,33,39,33.895,39,35z M31,35c0,1.105-0.895,2-2,2s-2-0.895-2-2  c0-1.105,0.895-2,2-2C30.105,33,31,33.895,31,35z M23,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2  C22.105,33,23,33.895,23,35z M15,35c0,1.105-0.895,2-2,2c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2C14.105,33,15,33.895,15,35z"/>
                        </svg>
                        <span class="context-menu-span">
                            Legal Hold
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="22px" height="23px" viewBox="0 0 50 50">
                            <g>
	                            <path d="M22,43h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,41.822,20.178,43,22,43z"/>
                                <path d="M39,3H11C8.243,3,6,5.243,6,8v35c0,2.757,2.243,5,5,5h28c2.757,0,5-2.243,5-5V8C44,5.243,41.757,3,39,3z M42,43   c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3v-9h34V43z M42,32H8V19h34V32z M42,17H8V8c0-1.654,1.346-3,3-3h28   c1.654,0,3,1.346,3,3V17z"/>
                                <path d="M30,9c-0.553,0-1,0.448-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1c0-0.552-0.448-1-1-1s-1,0.448-1,1   c0,1.822,1.178,3,3,3h6c1.794,0,3-1.206,3-3C31,9.448,30.553,9,30,9z"/>
                                <path d="M22,29h6c1.794,0,3-1.206,3-3c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,0.881-0.506,1-1,1h-6c-0.52,0-1-0.121-1-1   c0-0.553-0.448-1-1-1s-1,0.447-1,1C19,27.822,20.178,29,22,29z"/>
                            </g>
                        </svg>
                        <span class="context-menu-span">
                            Retention
                        </span>
                    </li>
                    <li class="context-menu-item" @click="onClick($event.target.innerText)">
                        <svg width="21px" height="23px" viewBox="0 0 50 50">
                            <path d="M42.799,9c-0.45-1.118-1.6-2-2.799-2h-7V6.7C33,3.582,31.486,2,28.5,2h-7C18.514,2,17,3.582,17,6.7V7h-7  C8.8,7,7.652,7.882,7.201,9H5v6h3v29c0,2.243,1.757,4,4,4h26c2.243,0,4-1.757,4-4V15h3V9H42.799z M19,6.7C19,4.681,19.631,4,21.5,4  h7C30.369,4,31,4.681,31,6.7V7H19V6.7z M40,44c0,1.141-0.859,2-2,2H12c-1.14,0-2-0.859-2-2V15h30V44z M43,13H7v-2h2v-1  c0-0.449,0.551-1,1-1h30c0.448,0,1,0.551,1,1v1h2V13z M32,41V20c0-0.552,0.447-1,1-1s1,0.448,1,1v21c0,0.553-0.447,1-1,1  S32,41.553,32,41z M16,41V20c0-0.552,0.448-1,1-1s1,0.448,1,1v21c0,0.553-0.448,1-1,1S16,41.553,16,41z M24,41V20  c0-0.552,0.448-1,1-1c0.553,0,1,0.448,1,1v21c0,0.553-0.447,1-1,1C24.448,42,24,41.553,24,41z"/>
                        </svg>
                        <span class="context-menu-span">
                            Delete
                        </span>
                    </li>
                </ul>
            </vue-context>

        </div> 
    </div>
</template>

<script>
    import { eventBus } from './../../../main'

    import { VueContext } from 'vue-context'
    import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
    import Card from 'src/components/UIComponents/Cards/Card.vue'

    export default {
        data(){
            return{
                
                // Recently selected files
                recentFileSelected: -1,
                recentlySelectedFiles: [],
                showByIndexRecent: null,

                // Folders selected from table
                folderTableSelected: -1,
                selectedFoldersFromTable: [],
                allFoldersInTableSelected: false,
                showByIndexTable: null,
                
                // Folders selected
                folderSelected: -1,
                selectedFolders: [],
                showByIndexFolders: null,

                // Files selected
                fileSelected: -1,
                selectedFiles: [],
                showByIndexFiles: null

            }
        },
        components:{
            Card,
            StatsCard,
            VueContext
        },

        methods:{
            
            // Methods for recent files
            assignRecentFileIndex(recentFileSelected, index){
                this.recentFileSelected = index;
                this.$store.state.recentFileSelected = index;
            },
            getRecentFileDetails(recentFile){
                eventBus.emitRecentFileDetails({'recentFile': recentFile, 'index': this.recentFileSelected});
            },
            recentFileMethods(recentFileSelected, index, recentFile){
                this.assignRecentFileIndex(recentFileSelected, index);
                this.getRecentFileDetails(recentFile);
            },

            //Selected folders from table
            selectFoldersFromTable() {
                this.selectedFoldersFromTable = [];
                if (!this.allFoldersInTableSelected) {
                    for (let i in this.folders) {
                        this.selectedFoldersFromTable.push(this.folders[i].name);
                    }
                }
            },

            // Methods for selecting folders
            assignFolderIndex(folderSelected, index){
                this.folderSelected = index;
                this.$store.state.folderSelected = index;
            },
            getFolderDetails(folder){
                eventBus.emitFolderDetails({'folder': folder, 'index': this.folderSelected});
            },
            folderMethods(folderSelected, index, folder){
                this.assignFolderIndex(folderSelected, index);
                this.getFolderDetails(folder);
            },
            
            // Methods for selecting files
            assignFileIndex(fileSelected, index){
                this.fileSelected = index;
                this.$store.state.fileSelected = index;
            },
            getFileDetails(file){
                eventBus.emitFileDetails({'file': file, 'index': this.fileSelected});
            },
            fileMethods(fileSelected, index, file){
                this.assignFileIndex(fileSelected, index);
                this.getFileDetails(file);
            }

        },

        props:{
            recentFiles: Array,
            folders: Array,
            files: Array,
        },

        mounted(){

            let that = this;

            document.addEventListener('click', function(event){

                if(event.target.closest('.recent-footer-rectangle') || event.target.closest('.recent-header-rectangle') || event.target.closest('#details')){
                    return;
                }
                    
                that.recentFileSelected = -1;
                that.$store.state.recentFileSelected = -1;
            }, false)

            document.addEventListener('click', function(event){
                
                if(event.target.closest('.folder-rectangle') || event.target.closest('#details')){
                    return;
                }
                    
                that.folderSelected = -1;
                that.$store.state.folderSelected = -1;

            }, false)

            document.addEventListener('click', function(event){

                if(event.target.closest('.footer-rectangle') || event.target.closest('.header-rectangle') || event.target.closest('#details')){
                    return;
                }
                    
                that.fileSelected = -1;
                that.$store.state.fileSelected = -1;
            }, false)
        }
    }
</script>

<style>
.recent-header-rectangle {
    height: 155px; 
    background: #F5F5F5; 
    border: 1px solid #E0E0E0; 
    border-radius: 0px;
    border-bottom: none;
    vertical-align:middle; text-align:center;
  }

  .recent-footer-rectangle {  
    height: 63px; 
    background: #FAFAFA;
    border: 0px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;
    border-radius: 0px;
    vertical-align:middle; text-align:center;
  }

.header-file-selected {
    background: #DCF3FD; 
    border: 1px solid #E0E0E0; 
    border-radius: 0px;
    border-bottom: none; 
    box-shadow:0px 0px 0px 0px rgba(3,169,244,1)
  }

  .footer-file-selected {
    background: #DCF3FD; 
    border: 0px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;
    border-radius: 0px;
    box-shadow:0px 0px 0px 0px rgba(3,169,244,1)
  }


.folder-rectangle {
    height: 63px;
    background-color: #FFFFFF;
    border: 1px solid rgb(189, 189, 189);
    border-radius: 0px;
  }
  
.folder-selected {
    background: #DCF3FD; 
    border: 1px solid #BDBDBD; 
    border-radius: 0px; 
    box-shadow:0px 0px 5px 0px rgba(3,169,244,1)
}


.material-icons{
    display: inline-flex;
    vertical-align: top;
    font-size: 30px;
    color: #878D99;
}

.folder-name{
    vertical-align: -webkit-baseline-middle;
    color: #424242; 
    font-family: 'Source Sans Pro'; 
    font-size: 15px; 
    text-align: left;
}
#folder-image{ 
    width: 29px; 
    height: 20px;
    color: #878D99;
    font-size: 30px;
}

.table > thead > tr > th{
  color: #424242; 
  font-family: 'Source Sans Pro'; 
  font-size: 16px; 
  font-weight: bold; 
  font-style: normal; 
  text-decoration: none; 
  text-align: center;
}

.table > tbody > tr:hover{
  background: #DCF3FD;
}

.table > tbody > tr{
  height: 53px;
}

.table > tbody > tr > td{
  padding: 5px 8px;
}

/* Bootstrap 5 columns resizing */
  .col-sm-5ths,
  .col-md-5ths,
  .col-lg-5ths,
  .col-xl-5ths,
  .col-xs-5ths {
    position: relative;
    min-height: 1px;
  }
  
  @media (max-width: 575px) {
    .col-xs-5ths {
        width: 100%;
        float: left;
    }
  }

  @media (min-width: 576px) {
    .col-sm-5ths {
        width: 50%;
        float: left;
    }
  }

  @media (min-width: 768px) {
    .col-md-5ths {
        width: 33.33%;
        float: left;
    }
  }

  @media (min-width: 992px) {
    .col-lg-5ths {
        width: 25%;
        float: left;
    }
  }

  @media (min-width: 1200px) {
    .col-xl-5ths {
        width: 20%;
        float: left;
    }
  }

</style>