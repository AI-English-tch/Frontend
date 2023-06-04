<template>
  <div class="layout-main-side dark flex-shrink-0 overflow-x-hidden shadow h-full p-4" style="width: 260px;">
    <div class="flex h-full min-h-0 flex-col">
      <nav class=" p-2 flex flex-col w-full h-full">
        <a
          class="flex py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 mb-1 flex-shrink-0">
          <el-icon>
            <Plus />
          </el-icon>
          New Learn
        </a>
        <div class="flex flex-col flex-1  overflow-y-auto">
          <div class="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            <div>
              <div class="relative">
                <div class="sticky top-0 z-[16]">
                  <h3
                    class="h-9 pb-2 pt-3 px-3 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all bg-transparent">
                    Today
                  </h3>
                </div>
                <ol>
                  <li class="relative">
                    <a @mouseenter="visible = true" @mouseleave="visible = false"
                      class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all !hover:pr-4 bg-transparent group transition-colors group">
                      <el-icon>
                        <ChatSquare />
                      </el-icon>
                      <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                        CET-6
                      </div>
                      <div class="absolute flex right-2 space-x-2 z-10 text-gray-300" v-show="visible">
                        <el-icon class="transition-colors hover:text-white">
                          <EditPen />
                        </el-icon>
                        <el-icon class="transition-colors hover:text-white">
                          <Delete />
                        </el-icon>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-4">
            <el-button :icon="User">关于</el-button>
            <el-button :icon="Document">教程</el-button>
          </div>
          <div class="border-t border-white/20 pt-2">
            <div class="group relative">
              <button
                class="flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors duration-200 hover:bg-gray-800 group-ui-open:bg-gray-800">
                <el-avatar shape="square" class="-ml-0.5 w-5 flex-shrink-0" :size="20">A</el-avatar>
                <div class=" overflow-hidden text-ellipsis whitespace-nowrap text-left text-white" style="flex-grow: 1;">
                  Admin
                </div>
                <el-icon class="h-4 w-4 flex-shrink-0 !text-gray-500">
                  <More />
                </el-icon>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
const visible = ref(false)
import { Plus, ChatSquare, EditPen, Delete, More, User, Document } from "@element-plus/icons-vue"
</script>
<style lang="scss">
.layout-main-side {

  background: linear-gradient(151.64103655387deg, rgba(0, 0, 0, 1) 18%, rgba(0, 40, 77, 1) 58%);
}
</style>
