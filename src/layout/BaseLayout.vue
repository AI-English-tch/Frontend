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
  /* background: linear-gradient(to right, #FFFFFF, #add9e9, #3984b5); */
  background: linear-gradient(120.69828829179015deg, rgba(249, 249, 249, 1) 0%, rgba(48, 183, 243, 1) 100%);
  &-main {
    max-width: 1500px;
    height: calc(100vh - 100px);
    /* border-radius: 20px; */
    margin: 20px auto;
    width: calc(100% - 40px);
    /* box-shadow: 1px 0px 5px rgb(206, 205, 205); */
  }
}
.bg-wd {
    position: absolute;
    align-self: flex-start;
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
    width: 100%;
    font-size: 18px;
    color: rgba(253, 251, 251, 0.4980392156862745);
    top: 70px;
    text-align: center;
}
</style>
