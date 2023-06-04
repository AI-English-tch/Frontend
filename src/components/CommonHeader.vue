<template>
  <div class="layout-header flex justify-between p-4 text-white shadow">
    <h1 class="font-bold text-xl">
      WordTalk
    </h1>
    <div class="flex space-x-4 items-center">
      <el-icon>
        <Bell />
      </el-icon>
      <el-icon>
        <QuestionFilled />
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Bell, QuestionFilled } from "@element-plus/icons-vue"
</script>
<style lang="scss">
.layout-header {
  background: linear-gradient(91.4604825118438deg, rgba(0, 0, 0, 1) 21%, rgba(0, 40, 77, 1) 53%);
}
</style>
