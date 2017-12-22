<template>
    <div class="lod-pag">
        <div class="lds-css ng-scope">
            <div style="width:100%;height:100%" class="lds-ellipsis">
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            </div>
            <div class="logo-setUp">
                <img src='../assets/Flowz_logo.png' width="200px">
            </div>
        </div>
       
    </div>
</template>

<script>
    /* eslint-disable*/
     export default {
         created () {
            this.userDetail(this)
         },
         methods: {
             userDetail(self) {
                self.$store.dispatch('getUserDetail')             
                    //  self.$store.dispatch('getUserRegister')                           
                    .then(function () {                 
                         self.$router.replace('/navbar/mainapp')   
                    })             
                    .catch(function(error) {      
                        console.log("login error",error)
                       if (error.response.status === 401) { 
                           return 
                        }              
                        $.notify.defaults({ className: "error" })                 
                        $.notify(error.message, { globalPosition:"top center"})             
                    })
            }
         }
     }
</script>


<style type="text/css">@keyframes lds-ellipsis3 {
    0%, 25% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  75% {
    left: 100px;
  }
  100% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes lds-ellipsis3 {
  0%, 25% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  75% {
    left: 100px;
  }
  100% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@keyframes lds-ellipsis {
  0% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 100px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis {
  0% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 100px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
.lds-ellipsis {
  position: relative;
}
.lds-ellipsis > div {
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
}
.lds-ellipsis div > div {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f00;
  position: absolute;
  top: 50px;
  left: 32px;
  -webkit-animation: lds-ellipsis 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
}
.lds-ellipsis div:nth-child(1) div {
  -webkit-animation: lds-ellipsis2 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis2 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #001529;
}
.lds-ellipsis div:nth-child(2) div {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
  background: #0e406d;
}
.lds-ellipsis div:nth-child(3) div {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
  background: #001529;
}
.lds-ellipsis div:nth-child(4) div {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  background: #0e406d;
}
.lds-ellipsis div:nth-child(5) div {
  -webkit-animation: lds-ellipsis3 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis3 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #001529;
}
.lds-ellipsis {
  width: 200px !important;
  height: 100px !important;
  margin: 0 auto;
}
.lod-pag {    width: 200px;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    border: 0;
    margin: -100px auto 0 auto;}
</style>
