<template>
  <div class="w-full relative h-full">
    <el-switch
        v-if="$props.apiKey === 'assistant'"
        class="switchBtn" active-text="开启纠错"
        inactive-text="关闭纠错"
        :model-value="assistantSwitch"
        @change="onSwitchChange"
    />
    <div :class="['chat-title', { 'copilot-title': props.apiKey === 'assistant' }]">
      {{ title }}
    </div>
    <el-scrollbar ref="scrollbarRef" class="h-[calc(100%-40px)]" style="height: calc(100% - 40px);">
      <div ref="innerRef" class="flex flex-col pb-10">
        <template v-for="(item, index) in messageList" :key="index + item.target + item.text">
          <div v-if="item.text.indexOf('*') > -1 ? false : true" :class="['px-1 pb-8 flex chat-msg', { 'owner': item.target === 'user' }]">
            <div class="chat-msg-profile">
              <img class="chat-msg-img" v-if="$props.apiKey === 'ask'" :src="item.target === 'rbt' ? rbtJpg : userJpg"
              alt="">
              <div class="chat-msg-date">{{ item.date }}</div>
            </div>
            <div class="chat-msg-content">
              <div class="chat-msg-text" v-html="formatText(item.text)"></div>
            </div>
          </div>
        </template>
      </div>
    </el-scrollbar>

    <div class="flex items-center space-x-2 w-full absolute bottom-0  py-1">
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
import 'element-plus/es/components/scrollbar/style/css';
import { onBeforeUnmount } from "vue";
import { ChatDotSquare, Position } from "@element-plus/icons-vue";
import { sendChatMsg } from "@/api/chat";
import { ElNotification, ElScrollbar } from "element-plus/lib/components/index.js";
import { trim } from "lodash";
import { dayjs } from 'element-plus';
import { EventSourcePolyfill } from 'event-source-polyfill';
import userJpg from '../../assets/user.jpg';
import rbtJpg from '../../assets/rbt.jpg';
import useStore from "@/store";
import { storeToRefs } from "pinia";
const store = useStore();
const { sideBarStore } = store;
const { currentSelectedSideBarItem } = storeToRefs(sideBarStore);

import { getChatHistory } from "@/api/chat";
import { Session } from "@/utils/storage";

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
const message = ref("");
const assistantSwitch = ref(false);
const isNewMsg = ref(true);
const allowSend = ref(true); //初始允许发送对话请求
const title = ref(props.apiKey === 'assistant' ? 'Your Copilot' : 'W o r d   T a l k')
const messageList = ref<{ target: string, text: string, date: string }[]>([]);

function formatText(text?: string) {
  return text?.replace(/\n/g, '<br />')
}

let masterSource = '';

onBeforeUnmount(() => {
  masterSource.close();
})

window.addEventListener('beforeunload',() => {
  masterSource.close();
})

async function initMsgList(word) {
  const query = {
    bookId: currentSelectedSideBarItem.value.id,
    robotId: props.apiKey === 'assistant' ? 2 : 1,
    word,
  }
  getChatHistory(query).then(res => {
    const list = res.data?.records || [];
    const arr = [];
    list.forEach(item => {
      arr.push({
        target: item.role === 'assistant' ? 'rbt' : 'user',
        text: item.content,
        date: item.createTime,
      })
    })
    messageList.value = arr;
    if(props.apiKey === 'ask') {
      // const token = Session.getToken();
      // masterSource = new EventSourcePolyfill('/dev-api/ai/sse/open', {
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : "",
      //     'CLIENT-TOC': 'Y'
      //   }
      // });
      loadSource();
      isNewMsg.value = true;

      if (props.apiKey === 'ask' && !arr.length) { //初始只有主聊天需要自动发送一次对话
        const param = {
          bookId: currentSelectedSideBarItem.value.id,
          message:`Let’s start to learn the word ${word}*`,
          word: word,
          inject: {"word":word}
        }
        chatMsgControl(param, 1)
      }
    }
    // 消息置底
    handleToBottom()
  });
}

const loadSource = () => {
  const token = Session.getToken();
  let newMasterSource = new EventSourcePolyfill('/dev-api/ai/sse/open', {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      'CLIENT-TOC': 'Y'
    }
  });
  masterSource = newMasterSource;
  newMasterSource.addEventListener('master',function (event) {
    pushMsg(event,isNewMsg.value);
    isNewMsg.value = false
  });
  newMasterSource.addEventListener('servant',function (event) {
    if(props.callback) {
      props.callback(event,'eventsource');
    }
  });
  newMasterSource.onerror = () => {
    masterSource.close();
    loadSource()
  }
}

// 消息插入
async function pushMsg(e,isNew) {
  e.data = decodeURIComponent(e.data);
  handleToBottom()
  if(isNew) {
    messageList.value.push({
      'target': 'rbt',
      'text': e.data,
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
  } else {
    messageList.value.map((item,index) => {
      if(index === messageList.value.length - 1) {
        item.text = item.text + e.data;
      }
    })
  }
}

async function handleSend() {
  if (!trim(message.value)) {
    ElNotification({
      title: 'Info',
      message: '发送内容不能为空！',
      type: 'info',
    })
    message.value = ""
  } else if(!allowSend.value) {
    ElNotification({
      title: 'Info',
      message: '等机器人回答后再发送',
      type: 'info',
    })
  } else {
    isNewMsg.value = true //重置新消息
    messageList.value.push({
      target: 'user',
      text: message.value,
      date: dayjs().format("YYYY-MM-DD H:mm:ss")
    })
    props.apiKey === 'assistant' ? assistantChat() : masterChat('')
  }
  allowSend.value = false;
}
async function assistantChat() {
  isNewMsg.value = true //重置新消息
  const val = message.value
  message.value = ''
  const query = {
    bookId: currentSelectedSideBarItem.value.id,
    message: val,
    inject: null
  }
  chatMsgControl(query, 2)
}
async function masterChat(word) { // 主聊天对话机器人
  isNewMsg.value = true //重置新消息
  const val = message.value
  let param = { ask: val };
  message.value = "";
  const query = {
    bookId: currentSelectedSideBarItem.value.id,
    message: word ? `Let’s start to learn the word ${word}*` : param.ask,
    inject: null
  }
  chatMsgControl(query, 1)
  if (props.callback) {
    props.callback(param);
  }
  handleToBottom()
}

const chatMsgControl = (query,id) => {
  sendChatMsg(query, id).then(() => {
    allowSend.value = true;
  }).catch((err) => {
    console.log('对话出错');
    allowSend.value = true;
  })
}

const onSwitchChange = (val) => {
  assistantSwitch.value = val;
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
  setMsgList: (data) => { // 将主聊天框的纠错流式数据同步过来
    pushMsg(data,isNewMsg.value);
    isNewMsg.value = false;
  },
  initMsgList: (word) => initMsgList(word), // 切换词书时调用
  getMsgList: (word) => {// 切换单词时调用
    masterChat(word)
  },
  updateMsgList: (param,word) => {
    isNewMsg.value = true
    if (param && param.ask && assistantSwitch.value) {// 初始或者输入框内容为空不调用助手检测
      const query = {
        bookId: currentSelectedSideBarItem.value.id,
        message: `Check the sentence: ${param.ask}*`,
        word,
        inject:null
      }
      chatMsgControl(query, 2)
    }
  }
})
</script>

<style lang="scss" scoped>
.chat-title {
  font-size: 34px;
  color: #fbfbfb;
  font-weight: 500;
  text-align: center;
}

.copilot-title {
  font-size: 20px;
  color: #000;
  font-weight: 500;
  text-align: center;
}

.chat-msg {
  &-profile {
    flex-shrink: 0;
    margin-bottom: -20px;
    position: relative;
  }

  &-img {
    height: 40px;
    width: 40px;
    margin: 24px 24px 0 0;
    border-radius: 50%;
    object-fit: cover;
  }

  &-date {
    position: absolute;
    left: calc(100% + 12px);
    top: 0;
    font-size: 12px;
    font-weight: 400;
    color: #aaa;
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
    margin-top: 24px;
    background-color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 500;
    color: black;
    border: 1px solid rgb(129, 211, 248);
    word-break: break-word;
  }
}

.switchBtn {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
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

  .chat-msg-img {
    margin: 24px 0 0 24px;
  }

  .chat-msg-text {
    background-color: rgba(2, 167, 240, 0.5);
    border-radius: 5px;
    color: #333333;
    border: none;
  }
}
</style>
