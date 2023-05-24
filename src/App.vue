<template>
  <div style="width: 99.6%;height: 99%;">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
body,html{
  margin: 0;
}
body{
    min-width: 1200px;
    height:max-content;
    /*background: lightblue;*/
    position: relative;
    display:flex;
    justify-content:center;
    padding: 0;
}
header{
	width:1200px;
}

</style>
