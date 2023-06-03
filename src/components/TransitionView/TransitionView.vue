<template>
  <router-view v-slot="{ Component }" :key="route.path || ''">
    <transition name="scale" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang='ts'>
const route = useRoute()

</script>
<style scoped lang='scss'>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>