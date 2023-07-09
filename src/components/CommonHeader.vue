<template>
  <div class="layout-header flex justify-between text-white shadow">
    <h1 class="font-bold text-xl">
      <img src="../assets/images/logo.png" class="logo" alt=""> <span>AI-English-Tch</span>
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
  padding: .5rem 1rem;
  .font-bold{
    display: flex;
    align-items: center;
    .logo{
        border-width: 0px;
        width: 54px;
        margin-right: 10px;
    }
  }
}

</style>
