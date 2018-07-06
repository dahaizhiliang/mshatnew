<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,input,textarea,p,th,td,figure,figcaption,header,footer,nav,aside,section,article{margin:0; padding:0; font-family: "微软雅黑", Microsoft Yahei, Arial, Helvetica, sans-serif;}
body,html{background: #fff;height: 100%;font-size: 100px;}
table{border-collapse:collapse;border-spacing:0;}
fieldset,img{border:0;}
ol,ul{list-style:none;}
a{text-decoration:none;}
textarea{ box-sizing: content-box; border:none;outline: none;}
input{outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:0; box-sizing: content-box;border: none;}

#app{
  position: relative;
  height: 100%;
  background: #f2f2f2;
}
</style>
