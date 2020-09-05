<template>
  <div>
    <div id="mySideNav" class="sidenav">
      <div class="content">
        <div class="container-fluid">
          <div>
            <p>Details</p>
          </div>

          <!-- If nothing is selected -->
          <div v-if="$store.state.folderSelected === -1 && $store.state.fileSelected === -1 && $store.state.recentFileSelected === -1" class="row" style="margin-top: 25px;">
            <div class="col">
              
              <div style="height: 100px; width: 100px; margin: 0 auto" >
                <i class="fas fa-folder" style="font-size: 100px; color: #878D99;"></i>
                <span style="font-weight: bold; color: #424242; font-family: 'Source Sans Pro', sans-serif; font-size: 14px; text-align: center;">
                  Select a folder or file to view its details
                </span>
              </div>

              <div class="dropdown">
                <button id="myBtn" class="plus-circle-btn" @click="openMenu" style="margin: 100px auto 0 auto">
                  <i class="fa fa-plus-circle"></i>
                </button>
                <div id="myDropdown" class="dropdown-content">
                  <a><i class="fa fa-file"></i> File Upload</a>
                  <a><i class="fa fa-folder"></i> Folder Upload</a>
                  <a><i class="fa fa-upload"></i> Bulk Upload</a>
                  <a style="border-top: 1px solid #E0E0E0"><i class="fa fa-folder"></i> Folder</a>
                </div>
              </div>
            </div>
          </div>

          <!-- If element selected is a recent file -->
          <div v-else-if="$store.state.recentFileSelected >= 0" class="row" style="margin-top: 25px;">
            <div class="col">
              <div style="height: 100px; width: 100px; margin: 0 auto" >
                <i class="fas fa-file" style="font-size: 100px; color: #878D99;"></i>
              </div>

              <div style="max-width: 100%;">
                <ul class="details-ul">
                  <li>Shared with: ~ 15 people</li>
                  <li>Name: {{recentFileDetails.recentFile.name}}</li>
                  <li>Type: File</li>
                  <li>Files: </li>
                  <li>Location: Home</li>
                  <li>Owner: John</li>
                  <li>Created: March 10, 2018</li>
                  <li>Opened: March 10, 2018, 7 PM by Jenny</li>
                  <li>Modified: {{recentFileDetails.recentFile.lastModified}}</li>
                  <li>Downloaded: March 10, 2018, by John </li>
                  <li>Retention Policy:  None</li>
                  <li>Tags: Add</li>
                  <li>Description: Add</li>
                </ul>
              </div>

              <div class="dropdown">
                <button id="myBtn" class="plus-circle-btn" @click="openMenu">
                  <i class="fa fa-plus-circle"></i>
                  <div id="myDropdown" class="dropdown-content" style="bottom: 85px;">
                    <a><i class="fa fa-file"></i> File Upload</a>
                    <a><i class="fa fa-folder"></i> Folder Upload</a>
                    <a><i class="fa fa-upload"></i> Bulk Upload</a>
                    <a style="border-top: 1px solid #E0E0E0"><i class="fa fa-folder"></i> Folder</a>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- If element selected is a folder -->
          <div v-else-if="$store.state.folderSelected >=0" class="row" style="margin-top: 25px;">
            <div class="col">
              <div style="height: 100px; width: 100px; margin: 0 auto" >
                <i class="fas fa-folder" style="font-size: 100px; color: #878D99;"></i>
              </div>

              <div style="max-width: 100%;">
                <ul class="details-ul">
                  <li>Shared with: ~ 15 people</li>
                  <li>Name: {{folderDetails.folder.name}}</li>
                  <li>Type: Folder</li>
                  <li>Files: {{folderDetails.folder.numOfFiles}}</li>
                  <li>Location: Home</li>
                  <li>Owner: John</li>
                  <li>Created: March 10, 2018</li>
                  <li>Opened: March 10, 2018, 7 PM by Jenny</li>
                  <li>Modified: {{folderDetails.folder.lastModified}}</li>
                  <li>Downloaded: March 10, 2018, by John </li>
                  <li>Retention Policy:  None</li>
                  <li>Tags: Add</li>
                  <li>Description: Add</li>
                </ul>
              </div>

              <div class="dropdown">
                <button id="myBtn" class="plus-circle-btn">
                  <i class="fa fa-plus-circle"></i>
                </button>
                <div id="myDropdown" class="dropdown-content">
                  <a><i class="fa fa-file"></i> File Upload</a>
                  <a><i class="fa fa-folder"></i> Folder Upload</a>
                  <a><i class="fa fa-upload"></i> Bulk Upload</a>
                  <a style="border-top: 1px solid #E0E0E0"><i class="fa fa-folder"></i> Folder</a>
                </div>
              </div>
            </div>
          </div>

          <!-- If element selected is a file -->
          <div v-else-if="$store.state.fileSelected >=0" class="row" style="margin-top: 25px;">
            <div class="col">
              <div style="height: 100px; width: 100px; margin: 0 auto" >
                <i class="fas fa-file" style="font-size: 100px; color: #878D99;"></i>
              </div>

              <div style="max-width: 100%;">
                <ul class="details-ul">
                  <li>Shared with: ~ 15 people</li>
                  <li>Name: {{fileDetails.file.name}}</li>
                  <li>Type: File</li>
                  <li>Files: </li>
                  <li>Location: Home</li>
                  <li>Owner: John</li>
                  <li>Created: March 10, 2018</li>
                  <li>Opened: March 10, 2018, 7 PM by Jenny</li>
                  <li>Modified: {{fileDetails.file.lastModified}}</li>
                  <li>Downloaded: March 10, 2018, by John </li>
                  <li>Retention Policy:  None</li>
                  <li>Tags: Add</li>
                  <li>Description: Add</li>
                </ul>
              </div>

              <div class="dropdown">
                <button id="myBtn" class="plus-circle-btn">
                  <i class="fa fa-plus-circle"></i>
                </button>
                <div id="myDropdown" class="dropdown-content">
                  <a><i class="fa fa-file"></i> File Upload</a>
                  <a><i class="fa fa-folder"></i> Folder Upload</a>
                  <a><i class="fa fa-upload"></i> Bulk Upload</a>
                  <a style="border-top: 1px solid #E0E0E0"><i class="fa fa-folder"></i> Folder</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>    
</template>

<script>

import { eventBus } from './../../../main'

export default {
    data(){
        return{

          folderDetails: {},

          fileDetails: {},

          recentFileDetails:{}

        }
    },

    mounted(){
      // let that = this;
      // document.getElementById('myBtn').onclick = function(){
      //   that.openMenu();
      // }
      this.openNav();
    },

    methods:{
        /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
        openNav() {
          const detailsSection = document.getElementById("mySideNav");

          detailsSection.style.transition = "0.5s";
          detailsSection.style.width = "20%";
        },

        openMenu(){
            document.getElementById('myDropdown').classList.toggle('showMenu');
        }
    },

    created(){

      eventBus.$on('folderDetailsSent', (details) =>{
        this.folderDetails = details;
      })

      eventBus.$on('fileDetailsSent', (details) =>{
        this.fileDetails = details;
      })

      eventBus.$on('recentFileDetailsSent', (details) =>{
        this.recentFileDetails = details;
      })

    }

}
</script>

<style scoped>

.dropdown #myDropdown a{
  color: #424242; 
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px; 
  text-align: left; 
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  overflow: auto;
  background: #FFFFFF;
  width: 249px; 
  height: 165px; 
  border: 1px solid #FFFFFF; 
  border-radius: 5px; 
  box-shadow: 0 0 5px #333; 
}

.dropdown-content #myDropdown a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown #myDropdown a:hover{
  background-color: #818181;
  color: black;
}

.dropdown-content #myDropdown a i{
  color: grey;
}


.showMenu{
  display: block;
  bottom: -15px;
  right: -75px;
}

.details-ul{
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 50px;
  padding-bottom: 5px;
}

.dropdown{
  height: 100px; 
  width: 100px; 
  margin: 10px auto
}

.container-fluid > div {
  width: 280px;
  height: 30px;
  margin-bottom: 25px;
}

.container-fluid > div > p{
  color: #424242;
  width: 239px;
  height: 30px;
  font-family: 'Source Sans Pro';
  font-size: 16px; 
  font-weight: bold; 
  font-style: normal; 
  text-decoration: none; 
  text-align: left;
}

.plus-circle-btn{
  font-size: 70px;
  color: #E91E63;
  border: none;
  cursor: pointer;
  padding-top: 2px;
  outline: none;
  background-color: white;
}

/* The side navigation menu */
#mySideNav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: absolute; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 57px;
  right: 0;
  background-color: #fff; /* Black*/
  padding-top: 4px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  margin-top: 10px;

}

/* The navigation menu links */
#mySideNav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
#mySideNav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
#mySideNav.closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  #mySideNav a {font-size: 18px;}
}
</style>