<template>
    <div>
        <div id="drag-2" v-draggable>
            <ul id="menu">
                <a class="menu-button fa fa-bars" href="#menu" title="Show navigation"></a>
                <a class="menu-button fa fa-times" href="#" title="Hide navigation"></a>
                <li class="menu-item icon-picture"><a class="menu-item-back" @click="showRoleAccess" href="#roleAccess"></a></li>
                <li class="menu-item icon-headphones"><a class="menu-item-back" href="#main-container"></a></li>
                <li class="menu-item icon-home"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-star"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-envelope-alt"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-cloud"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-heart"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-user"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-film"><a class="menu-item-back" href="#menu"></a></li>
                <li class="menu-item icon-camera"><a class="menu-item-back" href="#menu"></a></li>
            </ul>
            <!-- <div class="size">
              <input type="text" name="test" value="choose" class="field" readonly="readonly" />
              <ul class="list">
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
                <li>Option 4</li>
              </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
Vue.directive('draggable', {
  bind: function (el) {
    el.style.position = 'fixed';
    var startX, startY, initialMouseX, initialMouseY;

    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }

    el.addEventListener('mousedown', function(e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
      return false;
    });
  }
})

export default {
  data: function(){
    return {
      isRoleAccess: false,
      isMyTask:true
    }
    },
    methods: {
      showRoleAccess(){
        this.isRoleAccess = true
        this.isMyTask = false
      } 
    },
    components: {
    }
}
</script>
<style>
@import url(https://netdna.bootstrapcdn.com/font-awesome/2.0/css/font-awesome.css);
#drag-2 {
  /* min-height: 6.5em; */
  /* margin: 10%; */
  color: white;
  border-radius: 0.75em;
  padding: 2%;
  -webkit-transform: translate(0px, 0px);
          transform: translate(0px, 0px);
}
#drag-me::before {
  content: "#" attr(id);
  font-weight: bold;
}
* {
  Box-sizing: Border-box;
}
html, body {
  background: #e0e0e0;
  overflow: hidden;
}
#menu {
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  border-radius: 500px;
  border-radius: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  list-style: none;
  font-size: 200%;
  transition: width 500ms, height 500ms, margin 500ms;
  overflow: hidden;
}
#menu:target {
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -150px;
}
.menu-button {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -25px 0 0 -25px;
  background: #fff;
  box-shadow: 0 0 0 1px #000;
  border-radius: 500px;
  border-radius: 50%;
  opacity: 0;
  z-index: 0;
}
.fa-bars:before, .fa-times:before {
  color: #000;
  position: relative;
  top: 25%;
  /* left: 42%; */
  transition: opacity 500ms ease-in;
  text-decoration: none;
  z-index: 2;
}
#menu:not(:target) > a:first-of-type, #menu:target > a:last-of-type {
  opacity: 1;
  z-index: 1;
}
.menu-item-back {
  background: #000;
  width: 175px;
  height: 150px;
  position: absolute;
  transform-origin: 0px 150px;
  margin-top: -150px;
  left: 50%;
  top: 50%;
  border: 1px solid whitesmoke;
}
.menu-item-back:hover {
  background: #000;
}
.menu-item {
  position: absolute;
  text-decoration: none;
  top: 50%;
  left: 50%;
  display: none;
}
.menu-item:before {
  color: #fff;
  position: absolute;
  text-decoration: none;
  top: -12px;
  left: 30px;
  z-index: 1;
}
.menu-item:nth-child(3) {
  display: block;
}
.menu-item:nth-child(3) .menu-item-back {
  transform: rotate(-64.28571deg) skew(-38.57143deg);
}
.menu-item:nth-child(3):before {
  /* margin: sin(-90deg) * 110px 0 0 cos(-90deg) * 110px; */
    margin: -110px 0 0 0px;
}
.menu-item:nth-child(4) {
  display: block;
}
.menu-item:nth-child(4) .menu-item-back {
  transform: rotate(-12.85714deg) skew(-38.57143deg);
}
.menu-item:nth-child(4):before {
  /* margin: sin(-38.57143deg) * 110px 0 0 cos(-38.57143deg) * 110px; */
    margin: -68.58388px 0 0 86.00146px;
}
.menu-item:nth-child(5) {
  display: block;
}
.menu-item:nth-child(5) .menu-item-back {
  transform: rotate(38.57143deg) skew(-38.57143deg);
}
.menu-item:nth-child(5):before {
  /* margin: sin(12.85714deg) * 110px 0 0 cos(12.85714deg) * 110px; */
    margin: 24.4773px 0 0 107.24207px;
}
.menu-item:nth-child(6) {
  display: block;
}
.menu-item:nth-child(6) .menu-item-back {
  transform: rotate(90deg) skew(-38.57143deg);
}
.menu-item:nth-child(6):before {
  /* margin: sin(64.28571deg) * 110px 0 0 cos(64.28571deg) * 110px; */
    margin: 99.10658px 0 0 47.72721px;
}
.menu-item:nth-child(7) {
  display: block;
}
.menu-item:nth-child(7) .menu-item-back {
  transform: rotate(141.42857deg) skew(-38.57143deg);
}
.menu-item:nth-child(7):before {
  /* margin: sin(115.71429deg) * 110px 0 0 cos(115.71429deg) * 110px; */
    margin: 99.10658px 0 0 -47.72721px;
}
.menu-item:nth-child(8) {
  display: block;
}
.menu-item:nth-child(8) .menu-item-back {
  transform: rotate(192.85714deg) skew(-38.57143deg);
}
.menu-item:nth-child(8):before {
  /* margin: sin(167.14286deg) * 110px 0 0 cos(167.14286deg) * 110px; */
    margin: 24.4773px 0 0 -107.24207px;
}
.menu-item:nth-child(9) {
  display: block;
}
.menu-item:nth-child(9) .menu-item-back {
  transform: rotate(244.28571deg) skew(-38.57143deg);
}
.menu-item:nth-child(9):before {
  /* margin: sin(218.57143deg) * 110px 0 0 cos(218.57143deg) * 110px; */
    margin: -68.58388px 0 0 -86.00146px;
}
.size { position:relative }
.size .field {
	width:300px; background:#EC6603; color:#fff; padding:5px; border:none; cursor:pointer;
	font-family:'lucida sans unicode',sans-serif; font-size:1em;
	border:solid 1px #EC6603;
	-webkit-transition: all .4s ease-in-out;
	transition: all .4s ease-in-out;
}
.size .field:hover {
	border:solid 1px #fff;
	-moz-box-shadow:0 0 5px #999; -webkit-box-shadow:0 0 5px #999; box-shadow:0 0 5px #999
}
.size>ul.list { display:none;
	position:absolute; left:30px; top:-30px; z-index:999;
	width:300px;
	margin:0; padding:10px; list-style:none;
	background:#fff; color:#333;
	-moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px;
	-moz-box-shadow:0 0 5px #999; -webkit-box-shadow:0 0 5px #999; box-shadow:0 0 5px #999
}
.size>ul.list li {
	padding:10px;
	border-bottom: solid 1px #ccc;
}
.size>ul.list li:hover {
	background:#EC6603; color:#fff;
}
.size>ul.list li:last-child { border:none }
</style>