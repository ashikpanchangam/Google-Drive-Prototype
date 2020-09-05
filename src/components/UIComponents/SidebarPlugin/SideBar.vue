<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidenav">

        <button v-if="!open" @click="toggle" class="openbtn">
          <svg x="25px" y="85px" width="24px" height="26px" viewBox="0 0 50 50" style="transform: scaleX(1);" fill="rgb(33,33,33)">
            <path d="M0,39h50v2H0V39z M0,26h50v-2H0V26z M0,9v2h50V9H0z"></path>
          </svg>
        </button>

        <button v-else @click="toggle" style="float: right" class="openbtn">
          <svg width="26px" height="25px" viewBox="0 0 32 32">
            <path d="M29.312 15.992c0-7.366-5.97-13.337-13.337-13.337s-13.337 5.97-13.337 13.337 5.97 13.337 13.337 13.337 13.337-5.97 13.337-13.337zM3.706 15.992c0-6.765 5.504-12.27 12.27-12.27s12.27 5.505 12.27 12.27-5.505 12.27-12.27 12.27c-6.765 0-12.27-5.505-12.27-12.27z" fill="#000000"/>
            <path d="M12.792 15.231l-0.754 0.754 6.035 6.035 0.754-0.754-5.281-5.281 5.256-5.256-0.754-0.754-3.013 3.013z" fill="#000000"/>
          </svg>
        </button>
        
        <div v-if="open">
          <button class="dropdown-btn" style="font-size: 16px; outline: none">
            <i class="far fa-fw fa-file"></i><span style="color: #212121"> Files</span>
            <i class="fa fa-caret-down" style="color: #080404"></i>
          </button>
          <div id="dropdown-container">
            <a href="#" style="font-size: 16px;"><i class="far fa-fw fa-clock"></i> Recent</a>
            <a href="#" style="font-size: 16px;"><i class="far fa-fw fa-star"></i> Starred</a>
            <a href="#" style="font-size: 16px;"><i class="fa fa-fw fa-share-alt"></i> Shared with me</a>
            <a href="#" style="font-size: 16px;"><i class="far fa-fw fa-clock"></i> Shared by me</a>
            <a href="#" style="font-size: 16px;"><i class="fa fa-fw fa-trash"></i> Trash</a>
          </div>
          <button class="dropdown-btn" style="font-size: 16px; outline: none">
            <i class="far fa-fw fa-envelope-open"></i><span style="color: #212121"> Email</span>
            <i class="fa fa-caret-down" style="color: #080404"></i>
          </button>
          <div id="dropdown-container">
          </div>
          <button class="dropdown-btn" style="font-size: 16px; outline: none">
            <i class="fa fa-fw fa-bullhorn" style="width: 1.28571429em"></i><span style="color: #212121"> Social</span>
            <i class="fa fa-caret-down" style="color: #080404"></i>
          </button>
          <div id="dropdown-container">
          </div>
          <button class="dropdown-btn" style="font-size: 16px; outline: none">
            <i class="fa fa-fw fa-database"></i><span style="color: #212121"> App Data</span>
            <i class="fa fa-caret-down" style="color: #080404"></i>
          </button>
          <div id="dropdown-container">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {

    data(){
      return{
        open: true
      }
    },
    
    methods:{

      toggle(){
        const sideBar = document.getElementsByClassName("side-bar");
              var dropdown = document.getElementsByClassName("dropdown-btn");
console.log(dropdown.length);
        
        if(this.open === true){
          this.open = false;
          sideBar[0].style.width = "73px";
        }
        else if(this.open === false){
          this.open = true;
          sideBar[0].style.width = "200px";
        }


      }
    },

    mounted(){
      this.toggle();
      
      var dropdown = document.getElementsByClassName("dropdown-btn");
      console.log(dropdown);
      var i;

      for (i = 0; i < dropdown.length; i++) {
        console.log(dropdown[i]);
          dropdown[i].addEventListener("click", function() {
          console.log("Inside event listener "+this);
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });
      }
    }
  }
</script>

<style>
.openbtn:focus{
  outline: none;
}

@media (max-width: 992px){
  .side-bar{
    display: none;
  }
}

.side-bar{
  transition: 0.5s;
  transform: rotate(0deg);
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  background:#F5F5F5;
  position: fixed;
  max-height: 100%;
  border: 0px;
  border-radius: 0px;
  box-shadow: none;
  z-index:  -1;
  pointer-events: all;
  overflow-x: hidden
}

.sidebar:after, body > .navbar-collapse:after{
  background: linear-gradient(to bottom, #F5F5F5  0%, #F5F5F5  100%)
}

.sidebar .sidebar-wrapper .sidenav {
  height: 100%;
  width: 200px;
  background-color: #F5F5F5;
  overflow-x: hidden;
  padding-top: 20px;
  transition: 0.5s;
  padding-top: 75px;
}

/* Style the sidenav links and the dropdown button */
 .sidenav a, .dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width:100%;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
}

/* On mouse-over */
.sidenav a:hover, .dropdown-btn:hover {
  color: #E91E63;
  border: 0px;
  transition: 0.5s;

}

/* Add an active class to the active dropdown button */
.active {
  color: #E91E63;
  transition: 0.5s;

}

/* Dropdown container (hidden by default). Optional: add a lighter background color and some left padding to change the design of the dropdown content */
#dropdown-container {
  display: none;
  background-color: #FAFAFA;
  transition: 0.5s;
}

/* Optional: Style the caret down icon */
.fa-caret-down {
  float: right;
  padding-top: 2px;
  padding-right: 60px;
}

.fa {
  width: 1.28571429em;
  text-align: center;
  transition: 0.5s;

}

.openbtn {
  padding: 0px 25px 0px 23px;
  background-color: #F5F5F5;
  border: none;
  outline: none;
  margin-top: 10px;
  margin-bottom: 10px; 
}

</style>