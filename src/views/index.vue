<template>
  <div class="w-full h-full overflow-hidden flex">
    <div v-if="currentSelectedSideBarItem" class="p-4 flex-1 flex flex-col">
      <div class="flex-1 h-full">
        <chat-room ref="ChatRoom1Ref" :bookId="currentSelectedSideBarItem.id" :callback="handleCallback" apiKey="ask"></chat-room>
      </div>
    </div>
    <div v-else class="p-4 flex-1 flex flex-col no-book">
      想要和我对话学习英语吗，快选择你想要学习的词书吧！
    </div>
    <div class="flex flex-col rounded-xl space-y-3 pt-2 right-box">
      <div v-if="currentSelectedSideBarItem" class="bg-white p-4 w-full flex-1 overflow-auto word-content">
        <div class="book-name">正在阅览：{{currentSelectedSideBarItem?.text || ''}}</div>
        <div class="mb-1 current-word">{{currentWord}}</div>
        <div class="speak-btn" @click="speakWord"><img src="../assets/images/play.svg" />单词发音</div>
        <div class="flex justify-around mb-3 operate-box">
          <el-button @click="nextWord" class="operate-item" type="primary">掌握</el-button>
          <el-button @click="nextWord" class="operate-item" type="primary">认识</el-button>
          <el-button @click="nextWord" class="operate-item" type="primary">不会</el-button>
        </div>
        <!-- 单词 -->
        <div class="word-box flex justify-start">
          <el-row justify="center">
            <el-col
                span="6"
                class="word"
                v-for="(item) in wordList"
                :key="item.id"
                text
                bg
                @click="handleChangeWord(item)"
            >{{ item.word }}<span @click="clearWord(item)" class="close-icon"><el-icon><CloseBold /></el-icon></span></el-col>
          </el-row>
        </div>
      </div>
      <div v-else class="bg-white p-4 w-full flex-1 word-content no-book">
        你还未选择词书哦
      </div>
      <div
        class="bg-white rounded-xl w-full flex flex-col p-2 relative copilot-box"
        style="height: 55%"
        ref="room2"
      >
        <div v-if="currentSelectedSideBarItem" class="flex-1" :style="{ height: room2Height + 'px' }">
          <chat-room ref="ChatRoom2Ref" :bookId="currentSelectedSideBarItem.id" apiKey="assistant"></chat-room>
        </div>
        <div v-else class="flex-1 no-book" :style="{ height: room2Height + 'px' }">
          我是解答你学习过程中的疑问哒，快来问我吧！
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { extractWords } from "@/api/word";
import ChatRoom from '../components/ChatRoom/ChatRoom.vue';
import { CloseBold } from "@element-plus/icons-vue";
import useStore from "@/store/index";
import { storeToRefs } from 'pinia';

const store = useStore()

const { sideBarStore } = store;

const { currentSelectedSideBarItem } = storeToRefs(sideBarStore)

watch(currentSelectedSideBarItem, (newValue)=>{ // 切换词书
  const id = newValue.id;
  if(!newValue.words.length) {
    extractWords({size:11},id).then((res :any) => {
      const result = [];
      res.data.forEach(item => {
        result.push({
          id: item.id,
          word: item.word,
        })
      });
      newValue.words = result;
      sideBarStore.handleChangeSide(newValue);
      const words = [...result];
      const firstWord = words.pop()?.word || '';
      currentWord.value = firstWord;
      ChatRoom1Ref.value?.initMsgList(firstWord);
      ChatRoom2Ref.value?.initMsgList(firstWord);
      wordList.value = words;
    })
  } else {
    const result = [...newValue.words];
    const firstWord = result.pop()?.word || '';
    currentWord.value = firstWord;
    ChatRoom1Ref.value?.initMsgList(firstWord);
    ChatRoom2Ref.value?.initMsgList(firstWord);
    wordList.value = result;
  }
},{deep:false})

const wordList = ref<string[]>([]);
const currentWord = ref<string>('');
const room2 = ref<HTMLDivElement>();
const ChatRoom1Ref = ref<InstanceType<typeof ChatRoom>>();
  const ChatRoom2Ref = ref<InstanceType<typeof ChatRoom>>();
const room2Height = computed(() => {
  return room2.value?.clientHeight ? room2.value?.clientHeight - 8 : 0;
});

const clearWord = (current) => {  // 删除单词,必要时需要阻止冒泡
  wordList.value = wordList.value.filter(item => item.id !== current.id);
  extractWords({size:1},currentSelectedSideBarItem.value.id).then((res :any) => {
    const result = [];
    res.data.forEach(item => {
      result.push({
        id: item.id,
        word: item.word,
      })
    })
    wordList.value.push(...result);
  })
}

const nextWord = () => { // 下一个单词
  currentWord.value = wordList.value[0]?.word || '';
  ChatRoom1Ref.value?.getMsgList(wordList.value[0]?.word || '');
  wordList.value = wordList.value.filter((item,index) => index !== 0);
  extractWords({size:1},currentSelectedSideBarItem.value.id).then((res :any) => {
    const result = [];
    res.data.forEach(item => {
      result.push({
        id: item.id,
        word: item.word,
      })
    })
    wordList.value.push(...result);
  })
}
const speakWord = () => {
  const msg = new SpeechSynthesisUtterance();
  const speech = window.speechSynthesis;
  msg.text = currentWord.value;
  msg.pitch = 1;
  msg.rate = 0.5;
  msg.volume = 10;
  msg.lang = 'en';
  speech.speak(msg);
};

const handleChangeWord = (current) => { // 点击单词，对应的单词设置为当前单词，同时抽取一个单词
  currentWord.value = current.word;
  ChatRoom1Ref.value?.getMsgList(current.word);
  wordList.value = wordList.value.filter(item => item.id !== current.id);
  extractWords({size:1},currentSelectedSideBarItem.value.id).then((res :any) => {
    const result = [];
    res.data.forEach(item => {
      result.push({
        id: item.id,
        word: item.word,
      })
    })
    wordList.value.push(...result);
  })
};

const handleCallback = (param:any,type:string) => {
  if(type === 'eventsource') {
    ChatRoom2Ref.value?.setMsgList(param);
  } else {
    ChatRoom2Ref.value?.updateMsgList(param,currentWord.value);
  }
};
</script>

<style lang="scss">
.el-card__body {
  padding: 5px 12px !important;
}
.book-name {
  border-bottom: 1px solid #333333;
  font-size: 30px;
  color: #89EEFC;
  text-align: center;
  margin-bottom: 24px;
}
.current-word {
  font-size: 32px;
  color: #333;
  font-weight: 600;
  text-align: center;
}
.operate-item {
  max-width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #333;
  &:hover, &:focus {
    color: #333!important;
  }
}
.word-content {
  height: 40%;
  border-bottom: 2px solid #333333;
  border-radius: 20px 20px 0 0;
}
.right-box{
  background-color: rgba(255, 255, 255, 0.9764705882352941);
  width: 384px;
  border-radius: 20px;
  border: 1px solid rgba(121, 121, 121, 1);
}
.word-box{
  flex-wrap: wrap;
  .word{
    border-radius: 6px;
    background-color: #e1e1e1!important;
    margin: 4px;
    text-align: center;
    height: 36px;
    line-height: 36px;
    width: 144px;
    position: relative;
    .close-icon {
      position: absolute;
      top: -6px;
      right: 2px;
      display: none;
      border-radius: 50%;
    }
    &:hover {
      .close-icon {
        display: inline-block;
      }
    }
  }
}
.copilot-box {
  border-radius: 0 0 20px 20px;
}

.no-book {
  display: flex;
  align-items: center;
  justify-content: center;
}

.speak-btn {
  height: 32px;
  text-align: center;
  cursor: pointer;
  img {
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 4px;
  }
}

</style>
