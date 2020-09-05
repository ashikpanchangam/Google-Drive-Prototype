<template>
  <div>
    <ol class="breadcrumb" id="topButtons"
        style="display: flex;margin-top: 8px;padding: 0rem 1rem;background-color: transparent;margin-bottom: 0px;">
      <li class="breadcrumb-item active" style="margin-right: auto; margin-left: 15px; padding-top: 13px; color: #424242; 
          font-family: 'Source Sans Pro'; 
          font-size: 18px; 
          font-weight: normal; 
          font-style: normal; 
          text-decoration: none; 
          text-align: left;
          padding: 10px 0px;">
          Files
      </li> 
      <li class="pull-right">
        <button class="btn">
          <i class="fa fa-sort-amount-asc">
          </i>
        </button>
      </li> 
      <li class="pull-right">
        <button v-if="!$store.state.gridView" @click="changeView" class="btn">
          <i class="fa fa-th-large"></i>
        </button>
        <button v-if="$store.state.gridView" @click="changeView" class="btn">
          <i class="fa fa-list-ul">
          </i>
        </button>
      </li>
      <li class="pull-right">
        <button v-if="!$store.state.detailsSectionOpen" class="btn" id="infoButton" @click="openDetailsSection">
          <i class="fa fa-info-circle"></i>
        </button>
        <button v-else-if="$store.state.detailsSectionOpen" class="btn" id="infoButton" @click="closeDetailsSection">
          <i class="fa fa-info-circle"></i>
        </button>
      </li>
    </ol>

    <!-- Line break -->
    <hr class="breadcrumb-hr" style="margin-bottom: 0px;margin-left: 30px;margin-right: 30px;">
    
    <div class="content" style="padding-top: 0px;margin-bottom: 15px;padding-bottom: 8px;" id="show">

      <div class="container-fluid">

        <div>
          <!-- Grid view section begins here -->
          <grid-view v-if="$store.state.gridView && !$store.state.detailsSectionOpen" 
                          :folders="folders" 
                          :recentFiles="recentFiles"
                          :files="files">
          </grid-view>

          <!-- If the details section is open, give a scroller -->
          <grid-view v-else-if="$store.state.gridView && $store.state.detailsSectionOpen"
                                :folders="folders" 
                                :recentFiles="recentFiles"
                                :files="files"
                                id="grid-view">
          </grid-view>

          <!-- List View section begins here -->
          <list-view v-if="!$store.state.gridView && !$store.state.detailsSectionOpen" 
                            :folders="folders" 
                            :recentFiles="recentFiles"
                            :files="files">
          </list-view>

          <!-- If the details section is open, give a scroller -->
          <list-view v-else-if="!$store.state.gridView && $store.state.detailsSectionOpen" 
                                :folders="folders" 
                                :recentFiles="recentFiles"
                                :files="files"
                                id="list-view">
          </list-view>

        </div>
      </div>

    </div>

    <details-view 
      v-if="$store.state.detailsSectionOpen"
            @folderDetailsSent="folderDetails = $event"
            @fileDetailsSent="fileDetails = $event"
            @recentFileDetailsSent="recentFileDetails = $event"
            id="details">
    </details-view>
  </div>
</template>

<script>
  import GridView from 'src/components/Dashboard/Views/GridView.vue'
  import ListView from 'src/components/Dashboard/Views/ListView.vue'
  import DetailsView from 'src/components/Dashboard/Views/DetailsView.vue'

  export default {
    methods:{

      changeView(){
        if(this.$store.state.gridView){
          this.$store.state.gridView = false;
        }
        else if(!this.$store.state.gridView){
          this.$store.state.gridView = true;
        }
      },

      openDetailsSection() {
        if(!this.$store.state.detailsSectionOpen){
          this.$store.state.detailsSectionOpen = true;
        }

        this.$nextTick(() => {
          
          const detailsSection = document.getElementById("details");
          const showSection = document.getElementById("show");
          
          showSection.style.width = "80%";
          showSection.style.transition = "0.5s";
        })
                  
      },

      closeDetailsSection(){
        if(this.$store.state.detailsSectionOpen){
          this.$store.state.detailsSectionOpen = false;
        }
        const detailsSection = document.getElementById("details");
        const showSection = document.getElementById("show");

        detailsSection.style.width = "0%";
        showSection.style.width = "100%";
        
      }
    },

    data(){
      return {

        folderDetails : {},

        fileDetails: {},

        recentFileDetails:{},

        recentFiles: [
          {
            name: "File 2",
            size: 2,
            source: 'http://www.dap.asn.au/wp-content/uploads/2017/01/pdfLogo.png',
            shared: false,
            lastModified: 'March 2, 2018 5:15 PM by me'
          },
          {
            name: "File 1",
            size: 1,
            source: 'https://image.flaticon.com/icons/png/512/136/136526.png',
            shared: true,
            lastModified: 'March 1, 2018 5:15 PM by me'
          },
          {
            name: "File 3",
            size: 1,
            source: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Microsoft_Word_logo.png',
            shared: false,
            lastModified: 'March 3, 2018 5:15 PM by me'
          },
          {
            
            name: "File 5",
            size: 1,
            source: 'https://image.flaticon.com/icons/png/512/136/136526.png',
            shared: true,
            lastModified: 'March 5, 2018 5:15 PM by me'
          },
          {
            name: "File 4",
            size: 2,
            source: 'https://banner2.kisspng.com/20180319/ize/kisspng-microsoft-excel-logo-microsoft-word-microsoft-offi-excel-png-office-xlsx-icon-5ab06a09e26a86.9276767815215109219274.jpg',
            shared: true,
            lastModified: 'March 4, 2018 5:15 PM by me'
          },
          {
            name: "File 6",
            size: 2,
            source: 'http://www.dap.asn.au/wp-content/uploads/2017/01/pdfLogo.png',
            shared: false,
            lastModified: 'March 6, 2018 5:15 PM by me'
          }
        ],

        folders: [{
            name: "Folder 1",
            numOfFiles: 25,
            shared: true,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 2",
            numOfFiles: 20,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 3",
            numOfFiles: 21,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          }, 
          {
            name: "Folder 4",
            numOfFiles: 20,
            shared: true,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 5",
            numOfFiles: 20,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 6",
            numOfFiles: 20,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 7",
            numOfFiles: 20,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          },
          {
            name: "Folder 8",
            numOfFiles: 20,
            shared: false,
            lastModified: 'March 10, 2018 5:15 PM by me'
          }
        ],
        
        files: [{
            name: "File 1",
            size: 1,
            source: 'https://image.flaticon.com/icons/png/512/136/136526.png',
            shared: true,
            lastModified: 'March 1, 2018 5:15 PM by me'
          },
          {
            name: "File 2",
            size: 2,
            source: 'http://www.dap.asn.au/wp-content/uploads/2017/01/pdfLogo.png',
            shared: false,
            lastModified: 'March 2, 2018 5:15 PM by me'
          },
          {
            name: "File 3",
            size: 1,
            source: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Microsoft_Word_logo.png',
            shared: false,
            lastModified: 'March 3, 2018 5:15 PM by me'
          }, 
          {
            name: "File 4",
            size: 2,
            source: 'https://banner2.kisspng.com/20180319/ize/kisspng-microsoft-excel-logo-microsoft-word-microsoft-offi-excel-png-office-xlsx-icon-5ab06a09e26a86.9276767815215109219274.jpg',
            shared: true,
            lastModified: 'March 4, 2018 5:15 PM by me'
          },
          {
            
            name: "File 5",
            size: 1,
            source: 'https://image.flaticon.com/icons/png/512/136/136526.png',
            shared: true,
            lastModified: 'March 5, 2018 5:15 PM by me'
          },
          {
            name: "File 6",
            size: 2,
            source: 'http://www.dap.asn.au/wp-content/uploads/2017/01/pdfLogo.png',
            shared: false,
            lastModified: 'March 6, 2018 5:15 PM by me'
          },
          {
            name: "File 7",
            size: 1,
            source: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Microsoft_Word_logo.png',
            shared: false,
            lastModified: 'March 7, 2018 5:15 PM by me'
          }, 
          {
            name: "File 8",
            size: 3,
            source: 'https://banner2.kisspng.com/20180319/ize/kisspng-microsoft-excel-logo-microsoft-word-microsoft-offi-excel-png-office-xlsx-icon-5ab06a09e26a86.9276767815215109219274.jpg',
            shared: true,
            lastModified: 'March 8, 2018 5:15 PM by me'
          }
        ]
      }
    },

    components: {
      ListView,
      GridView,
      DetailsView
    }
  }
</script>

<style>

  #infoButton:focus{
    outline: none;
    box-shadow: none!important;
  }

  li .btn:hover{
    color: #E91E63;
  }

  .details-ul li{
    width: 261px;
    height: 29px;
    color: #424242;
    font-family: 'Source Sans Pro';
    font-size: 14px;
    text-align: left;
    line-height: 1px;
    padding: 5px;
  }

  .breadcrumb-hr {
    -moz-border-bottom-colors: none;
    -moz-border-image: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 25px;
    border: 1px solid #BDBDBD;
    margin-top: 0px;
    border-top-width: 0px;
  }

  .breadcrumb-hr-details {
    -moz-border-bottom-colors: none;
    -moz-border-image: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    border: 1px solid #BDBDBD;
    margin-top: 0px;
    border-top-width: 0px;
  }

  .details-section-hr{
    -moz-border-bottom-colors: none;
    -moz-border-image: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    
    border: 1px solid #BDBDBD;
    margin-top: 0px;
    border-top-width: 0px;
  }

  .context-menu{  
    width: 197px; 
    height: 400px;
    background: #FFFFFF; 
    border: 1px solid #FFFFFF; 
    border-radius: 5px; 
    box-shadow: 0 0 5px #333; 
  }

  .context-menu-span{
    padding-left: 10px;
    color: #424242;
  }

  .context-menu-item:hover {
    background-color: #E91E63 !important;
  }

  #context-menu-icon{
    color: #424242;
  }

  /* Scrollbar for gridView */
  #grid-view{
    overflow-y: scroll;
    height: 100vh;
    overflow-x: hidden; 
  }

  /* Custom scrollbar */
  #grid-view::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  #grid-view::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 0px;
    background: #ffffff; 
    border-color: #E0E0E0; 
  }
  
  /* Handle */
  #grid-view::-webkit-scrollbar-thumb {
    background:#cccccc; 
    border-radius: 0px;
  }

  /* Handle on hover */
  #grid-view::-webkit-scrollbar-thumb:hover {
    background: #cccccc; 
  }
  
  /* Scrollbar for listView */
  #list-view{
    overflow-y: scroll;
    height: 100vh;
    overflow-x: hidden; 
  }

  /* Custom scrollbar */
  #list-view::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  #list-view::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 0px;
    background: #ffffff; 
    border-color: #E0E0E0; 
  }
  
  /* Handle */
  #list-view::-webkit-scrollbar-thumb {
    background:#cccccc; 
    border-radius: 0px;
  }

  /* Handle on hover */
  #list-view::-webkit-scrollbar-thumb:hover {
    background: #cccccc; 
  }
</style>