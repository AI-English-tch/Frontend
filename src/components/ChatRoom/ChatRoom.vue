<template>
  <div class="w-full relative h-full">
    <el-scrollbar ref="scrollbarRef" class="h-full">
      <div ref="innerRef" class="flex flex-col pb-8">
        <div :class="['px-5 pb-10 flex chat-msg', { 'owner': item.target === 'user' }]"
          v-for="(item, index) in messageList" :key="index + item.target + item.text">
          <div class="chat-msg-profile">
            <img class="chat-msg-img"
              :src="item.target === 'rbt' ? 'https://img95.699pic.com/element/40119/1268.png_300.png' : 'https://ts3.cn.mm.bing.net/th?id=OIP-C.z14sN0yiNEyPL7GjoAQ5kAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'"
              alt="">
            <div class="chat-msg-date">{{ item.date }}</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text" v-html="formatText(item.text)"></div>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div class="flex items-center space-x-2 w-full absolute bottom-0">
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
import axios from "axios";
import { ElNotification, ElScrollbar } from "element-plus/lib/components/index.js";
import { trim } from "lodash";
import { dayjs } from 'element-plus';
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
    // getMessageList()
  }
}
async function getSource() {
  let url = '/api-dev/assistant' + encodeURIComponent(message.value)
  var cSource = new EventSource(url)
  cSource.addEventListener("open", function () {
    console.log("connect");
  });
  //如果服务器响应报文中没有指明事件，默认触发message事件
  cSource.addEventListener("message", function (e) {
    console.log(`resp:(${e.data})`);
    if (e.data.check) {
      props.callback && props.callback({
        'target': 'rbt',
        'text': e.data.check
      })
    }
  })
  // todo...
}
async function getMessageList() {
  let params = {
  } as Record<string, string>
  params[props.apiKey] = message.value
  message.value = ""
  var askSource = new EventSource(`/api-dev/ask?ask=${encodeURIComponent(params.ask)}`)
  askSource.addEventListener("message", function (e) {
    messageList.value.push({
      'target': 'rbt',
      'text': e.data['ask'],
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
  })
  const { data } = await axios({
    url: "/dev-api/" + props.apiKey,
    headers: {
      'token': localStorage.getItem("token"),
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'POST',
    data: params
  })
  
  const resultKey = props.apiKey === 'ask' ? 'chat' : 'assistant'
  if (data.data[resultKey]) {
    messageList.value.push({
      'target': 'rbt',
      'text': data.data[resultKey],
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
  }

  if (props.apiKey === 'ask') {
    if (data.data.check) {
      props.callback && props.callback({
        'target': 'rbt',
        'text': data.data.check
      })
    }
  }
  handleToBottom()
}

function handleToBottom() {
  console.log("innerRef.value?.clientHeight", innerRef.value?.clientHeight);

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
  updateMsgList: (data: any) => {
    messageList.value.push(data)
  }
})

</script>

<style lang="scss" scoped>
.chat-msg {
  &-profile {
    flex-shrink: 0;
    margin-top: auto;
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
    margin-left: 12px;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &-text {
    background-color: #f1f2f6;
    padding: 15px;
    border-radius: 20px 20px 20px 0;
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
    margin-right: 12px;
    align-items: flex-end;
  }

  .chat-msg-text {
    background-color: #0086ff;
    color: #fff;
    border-radius: 20px 20px 0 20px;
  }
}
</style>