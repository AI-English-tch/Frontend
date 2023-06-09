<template>
  <div class="layout w-full h-full overflow-hidden">
    <common-header />
    <div class="layout-main overflow-hidden w-full  relative flex z-0 radius-lx">
      <common-side></common-side>
      <div class="relative h-full max-w-full flex flex-1 overflow-hidden">
        <main class="relative transition-width overflow-hidden flex-1">
          <transition-view />
        </main>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.layout {
  // background: linear-gradient(to right, #FFFFFF, #add9e9, #3984b5);
  background-color: #fff;
  &-main {
    max-width: 1500px;
    height: calc(100vh - 100px);
    border-radius: 20px;
    margin: 20px auto;
    background: #fff;
    border-radius: 20px;
    width: calc(100% - 40px);
    box-shadow: 1px 0px 5px rgb(206, 205, 205);
  }
}
</style>