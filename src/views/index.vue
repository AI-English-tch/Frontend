<template>
  <div class="w-full h-full overflow-hidden flex">
    <div class="p-4 flex-1 flex flex-col">
      <div class="flex-1 h-full">
        <chat-room ref="ChatRoom1Ref" :callback="handleCallback" apiKey="ask"></chat-room>
      </div>
    </div>
    <div class="p-4 flex flex-col space-y-3 right-box">
      <div
        class="hover-shadow bg-white rounded-xl w-full flex flex-col p-2 relative"
        style="height: 55%"
        ref="room2"
      >
        <div class="flex-1" :style="{ height: room2Height + 'px' }">
          <chat-room ref="ChatRoom2Ref" apiKey="assistant"></chat-room>
        </div>
      </div>
      <div class="hover-shadow bg-white p-4 rounded-xl w-full flex-1 overflow-auto" style="height: 40%">
        <div class="flex justify-between border-b border-gray-600 pb-4 mb-4">
          <el-button type="primary">功能区</el-button>
          <el-button type="primary">历史记录</el-button>
        </div>
        <el-tag>单词预览</el-tag>
        <!-- 单词 -->
        <div class="word-box flex justify-start">
          <el-button
            v-for="word in wordList"
            :key="word"
            text
            bg
            >{{ word }}</el-button
          >
        </div>
        <!-- <div v-for="word in wordList" :key="word">
          <el-card shadow="hover" style="height: 30px">
            <span>{{ word }}</span>
          </el-card>
        </div> -->
        <div class="flex justify-end">
          <el-button type="primary" style="margin-top: 10px" @click="handleChangeWord">
            换一换
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import ChatRoom from '../components/ChatRoom/ChatRoom.vue';

const wordList = ref<string[]>([]);
const room2 = ref<HTMLDivElement>();
const ChatRoom1Ref = ref<InstanceType<typeof ChatRoom>>();
  const ChatRoom2Ref = ref<InstanceType<typeof ChatRoom>>();
const room2Height = computed(() => {
  return room2.value?.clientHeight ? room2.value?.clientHeight - 8 : 0;
});
// const source = reactive({
//   chatSource:'',
// })
onMounted(() => {
  axios({
    url: '/dev-api/word',
    method: 'GET',
  }).then(res => {
    localStorage.setItem('token', res.data.data.token);
    wordList.value = res.data.data.words;
    ChatRoom1Ref.value?.getMsgList();
  });
  // 建立Source 连接
  // startSource()
});
// onUnmounted(() => {
//   // 关闭页面 Source 连接
//   closeSource();
// });

// 开始 source
// const startSource = (msg: string) => {
//   let url = '/dev-api/assistant?assistant=' + encodeURIComponent(msg)
//   const cSource = source.chatSource = new EventSource(url);
//
//   cSource.addEventListener('open',() => {
//     console.log('连接成功！');
//   },false)
//
//   cSource.addEventListener('message',(e) => {
//     ChatRoom2Ref.value?.updateMsgList(e.data);
//     console.log(`resp:(${e.data})`);
//   },false)
//
//   cSource.addEventListener('error',(err) => {
//     console.log('连接错误 :>> ', err);
//   },false)
// };
// // 关闭 source
// const closeSource = () => {
//   if(source.chatSource){source.chatSource.close()}
// };
const handleChangeWord = () => {
  axios({
    url: '/dev-api/word',
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  }).then(res => {
    wordList.value = res.data.data.words;
    ChatRoom1Ref.value?.clearMsgList();
    ChatRoom2Ref.value?.clearMsgList();
    ChatRoom1Ref.value?.getMsgList();
  });
};

const handleCallback = (param:any) => {
  ChatRoom2Ref.value?.updateMsgList(param);
};
</script>

<style lang="scss">
.el-card__body {
  padding: 5px 12px !important;
}
.right-box{
  background-color: #f1f1f1;
  width: 30%;
  min-width: 300px;
}
.hover-shadow{
  transition: .3s;
}
.hover-shadow:hover{
  box-shadow: 1px 0 5px #cfcfcf;
  transition: .3s;
}
.word-box{
  flex-wrap: wrap;
  .el-button{
    margin: 5px;
  }
}
</style>
