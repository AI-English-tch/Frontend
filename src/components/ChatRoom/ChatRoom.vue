<template>
  <div class="w-full relative h-full">
    <el-scrollbar ref="scrollbarRef" class="h-[calc(100%-40px)]" style="height: calc(100%-40);">
      <div ref="innerRef" class="flex flex-col pb-10">
        <div :class="['px-1 pb-8 flex chat-msg', { 'owner': item.target === 'user' }]"
          v-for="(item, index) in messageList" :key="index + item.target + item.text">
          <div class="chat-msg-profile">
            <img class="chat-msg-img"
              v-if="$props.apiKey === 'ask'"
              :src="item.target === 'rbt' ? rbtJpg : userJpg"
              alt="">
            <div class="chat-msg-date">{{ item.date }}</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text" v-html="formatText(item.text)"></div>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div class="flex items-center space-x-2 w-full absolute bottom-0 bg-white py-1">
      <el-icon>
        <ChatDotSquare />
      </el-icon>
      <div class="flex-1">
        <el-input v-model="message" placeholder="请输入" @keyup.enter="handleSend">
          <template #suffix>
            <el-icon @click="handleSend" class="cursor-pointer hover:text-gray-800 transition-colors" :size="20">
              <Position />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/scrollbar/style/css'
import { ChatDotSquare, Position } from "@element-plus/icons-vue"
// import axios from "axios";
import { ElNotification, ElScrollbar } from "element-plus/lib/components/index.js";
import { trim } from "lodash";
import { dayjs } from 'element-plus';
import { EventSourcePolyfill } from 'event-source-polyfill';
import userJpg from '../../assets/user.jpg';
import rbtJpg from '../../assets/rbt.jpg';
// ** 用于解决TS 类型报错接口，后期应模块化优化 **
interface TsObject {
  data?: any,
  ask?: string
}

const props = defineProps({
  apiKey: {
    type: String,
    default: "ask"
  },
  callback: Function,
  height: String
})
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const innerRef = ref<HTMLDivElement>()
const message = ref("")
const messageList = ref<{ target: string, text: string, date: string }[]>([])

function formatText(text?: string) {
  return text?.replace(/\n/g, '<br />')
}

async function handleSend() {
  if (!trim(message.value)) {
    ElNotification({
      title: 'Info',
      message: '发送内容不能为空！',
      type: 'info',
    })
    message.value = ""
  } else {
    messageList.value.push({
      target: 'user',
      text: message.value,
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
    // assistant 接口
    props.apiKey === 'assistant' ? getSource() : getMessageList()
  }
}
async function getSource() {
  const val = message.value
  message.value = ''
  let url = '/dev-api/assistant?assistant=' + encodeURIComponent(val)
  var cSource = new EventSourcePolyfill(url, {
    headers: {
      token: localStorage.getItem('token')
    }
  })
  let flag = true;
  cSource.onmessage = (event: TsObject) => {
    handleToBottom()
    setMessageList(event,flag);
    flag = false;
  }
  cSource.addEventListener("end", function () {
    cSource.close();
  });
}
async function getMessageList() {
  const val = message.value
  let param = { ask: val };
  message.value = ""
  getMessage(param, 'chat'); // chat:对话区,assistant:助手区
  if (props.callback) {
    props.callback(param);
  }
  handleToBottom()
}

const getMessage = (param: TsObject, type: any) => {
  const ask = encodeURIComponent(param.ask);
  const urlConfig = {
    chat: `/dev-api/ask1?ask=${ask}`,
    assistant: `/dev-api/ask2?ask=${ask}`,
  }
  var askSource = new EventSourcePolyfill(urlConfig[type as string] || urlConfig['chat'], {
    headers: {
      token: localStorage.getItem('token')
    }
  })
  let flag = true;
  askSource.onmessage = (event:TsObject) => {
    setMessageList(event,flag);
    handleToBottom()
    flag = false;
  }
  askSource.addEventListener("end", function () {
    askSource.close();
  });
}



const setMessageList = (res:TsObject,flag: any) => { // 将流式返回数据设置到messageList
  if(flag) {
    messageList.value.push({
      'target': 'rbt',
      'text': res.data,
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
  } else {
    messageList.value.map((item,index) => {
      if(index === messageList.value.length - 1) {
        item.text = item.text + res.data;
      }
    })
  }
}

function handleToBottom() {
  scrollbarRef.value!.setScrollTop(innerRef.value?.clientHeight)
}

onUpdated(() => {
  handleToBottom()
})

defineExpose({
  clearMsgList: () => {
    messageList.value = []
  },
  getMsgList: getMessageList,
  updateMsgList: (param:TsObject) => {
    if(param && param.ask) {// 初始或者输入框内容为空不调用助手检测
      getMessage(param, 'assistant');
    }
  }
})

</script>

<style lang="scss" scoped>
.chat-msg {
  &-profile {
    flex-shrink: 0;
    margin-bottom: -20px;
    position: relative;
  }

  &-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  &-date {
    position: absolute;
    left: calc(100% + 12px);
    bottom: 0;
    font-size: 12px;
    font-weight: 600;
    color: #5f6066;
    white-space: nowrap;
  }

  &-content {
    margin-left: 8px;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &-text {
    margin-top: 15px;
    background-color: #f1f2f6;
    padding:6px 10px;
    border-radius: 0 12px 12px 12px;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 500;
    color: black;
  }
}

.owner {
  flex-direction: row-reverse;

  .chat-msg-date {
    left: auto;
    right: calc(100% + 12px);
  }

  .chat-msg-content {
    margin-left: 0;
    margin-right: 8px;
    align-items: flex-end;
  }

  .chat-msg-text {
    background-color: #0086ff;
    color: #fff;
    border-radius: 12px 0 12px 12px;
  }
}
</style>
