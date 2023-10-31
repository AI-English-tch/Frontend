<template>
  <div class="content">
    <div class="main" :style="{zoom:scale}">
      <div class="_main">
        <el-row>
          <el-col :span="5" class="no-select">
            <userData @resetWord="resetWord" @changeWrods="changeWrods"></userData>
            <div class="webTitle">
              <span class="webTitleBlack">AI-English-</span>
              <span class="webTitleBlue">Tech</span>
            </div>
            <webData></webData>
          </el-col>
          <el-col :span="13">
            <div class="mainContent">
              <div class="mainHeader">
                <div class="mainHeaderTip">
                  <span>{{ wordName }}</span>
                </div>
                <div class="Progress">
                  <span>{{ num }}/{{ nums }}词</span>
                  <el-progress :percentage="~~((num/nums)*100)" :show-text="false" color="#a378fc"></el-progress>
                </div>
              </div>
              <div class="mainShowWord">
                <div class="mainWord">
                  <wordCard v-loading="changeWrod" @nextWord="nextWord" :nowWord="nowWord" :learnWording="learnWording"
                            :isSelectBook="isSelectBook" @speakWord="speakWord" style="overflow: hidden"
                  ></wordCard>
                </div>
                <div class="mainWord">
                  <explainCard :explain="explain"></explainCard>
                </div>
              </div>
              <div class="wordTip">
                <span class="webTitleBlack" style="font-size: 40px">Word</span>&nbsp;&nbsp;&nbsp;
                <span class="webTitleBlue" style="font-size: 40px">Talk</span>
              </div>
              <wordChat v-loading="isMainLoading" :messages="mainMessage" @speakWord="speakWord"></wordChat>
              <chatInput @inputMessage="inputMessage" :isMainLoading="isMainLoading" class="mianChat"></chatInput>
            </div>
          </el-col>
          <el-col :span="6">
            <chatCopliot @changeVal="changeValW" :messages="copilotMessages" @copilotInputMsg="copilotInputMsg"
                         :isCopilotLoading="isCopilotLoading">

            </chatCopliot>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--    前测-->
    <el-dialog
        title="单词前测大概需要花费10～20min时间"
        :visible.sync="dialogPreTest"
        :fullscreen="true">
      <el-carousel trigger="click" height="450px" :autoplay="false" :arrow="'never'" :loop="false"
      >
        <el-carousel-item v-for="(item, index) in questions" :key="index">
          <h3 class="small">{{ item.title }}</h3>
          <div v-for="(_item, _index) in item.answer" :key="_index" style="margin-top: 20px">
            <el-button type="primary" plain @click="judgingQuestion(item,_item)">{{
                btnText[_index] + '. ' + _item
              }}
            </el-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!--    评分-->
    <el-dialog
        title="对话评分"
        :visible.sync="dialogScore"
        width="30%"
        center
    >
      <el-rate
          style="margin: auto;text-align: center"
          v-model="wordRateVal"
          :colors="wordRateColor">
      </el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogScore = false">取 消</el-button>
    <el-button type="primary" @click="endNowWords">确 定</el-button>
  </span>
    </el-dialog>
    <!--    翻译-->
    <div class="copyTranslate">
      <div class="toptop"></div>
      <div class="copyContent">
        <pre>123123</pre>
      </div>
    </div>
  </div>

</template>

<script>
import userData from "@/components/userData/index"
import webData from "@/components/webData/index"
import wordCard from "@/components/showWord/wordCard";
import explainCard from "@/components/showWord/explainCard";
import wordChat from "@/components/showWord/wordChat";
import chatInput from "@/components/showWord/chatInput";
import chatCopliot from "@/components/copilot/index";
import {
  learnWords,
  endLearnWords,
  getAllTeacher,
  getAllgroup,
  extractWords,
  startLearnWords,
  closeBook,
  explainWord
} from "./../../api/index"
import lv1 from "./../../src/public/question_lv1"
import lv2 from "./../../src/public/question_lv2"
import lv3 from "./../../src/public/question_lv3"
import lv4 from "./../../src/public/question_lv4"
import lv5 from "./../../src/public/question_lv5"


export default {
  name: "home",
  components: {
    userData,
    webData,
    wordCard,
    explainCard,
    wordChat,
    chatInput,
    chatCopliot
  },
  data() {
    return {
      nums: 0,//单词总数
      num: 0,//当前掌握单词数，数据类型int，只需要提供两个值自动计算进度条
      isSelectBook: false,
      nowWord: {
        title: 'book',
        phonetic: "",
        id: null
      },
      explain: {
        isloading: false,
        tip: ""
      },
      bookId: null,
      mainMessage: [],
      masterSource: null,
      socket: null,
      isMainLoading: false,
      isChangeW: true,
      isCopilotLoading: false,
      copilotMessages: [],
      wordName: "词书名称",
      scale: 1,
      marginTop: 40,
      dialogPreTest: false,
      dialogScore: false,
      questions: [],
      // btnTypes: ["A", "B", "C", "D", "E", "F"],
      btnText: ["A", "B", "C", "D", "E", "F"],
      initial_index: 0,
      changeWrod: false,
      learnWording: false,
      wordRateVal: null,
      wordRateColor: ['#99A9BF', '#F7BA2A', '#FF9900']

    }
  },
  mounted() {
    this.turnLogin();
    window.addEventListener('beforeunload', () => {
      if (this.masterSource) {
        this.masterSource.close();
      }
    })
    window.addEventListener('resize', this.resizeWindows);
    this.resizeWindows()
    this.questions = lv3.questions
    this.lookAllTeacher()
    this.lookAllGrounp()
    this.startCopyText()

  },
  beforeDestroy() {
    this.closeBooks()
  },
  methods: {
    /**
     * 监听复制文字
     */
    startCopyText() {
      let that = this
      document.addEventListener('mouseup', function (event) {
        if (window.getSelection) {
          var selectedText = window.getSelection().toString();
          if (selectedText) {
            //console.log('选中的文本是：', selectedText);
            // 在这里可以执行你想要的选中文字后的操作
            that.showCopyText(event.clientX, event.clientY, selectedText)
          } else {
            that.hiddenCopyText()
          }
        }
      });
    },
    /**
     * 关闭词书
     */
    closeBooks() {
      let token = sessionStorage.getItem('token')
      if (!token || !this.bookId) return;
      let data = {
        id: this.bookId
      }
      //console.log(this.bookId)
      closeBook(token, data)
    },
    /**
     * 查看所有的助教老师
     */
    lookAllTeacher() {
      let token = sessionStorage.getItem('token')
      if (!token) return;

      getAllTeacher(token).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.$store.state.allTeacher = res.data.records
        }
      })


    },
    /**
     * 查看所有的组
     */
    lookAllGrounp() {
      let token = sessionStorage.getItem('token')
      if (!token) return;

      getAllgroup(token).then(res => {
        console.log(res)
        this.$store.state.allGroup = res.data.records
        //console.log(this.$store.state.allGroup)
      })

    },
    /**
     * 判断前测题目是否正确
     * @param item
     * @param val
     */
    judgingQuestion(item, val) {
      //console.log(item, val)
      if (item.correctAnswer == val) {
        console.log("===yes")
        this.initial_index++

      } else {
        console.log("===no")
      }
    },
    /**
     * 重制窗口大小
     */
    resizeWindows() {
      var windowWidth = window.innerWidth; // 获取窗口宽度
      var windowHeight = window.innerHeight; // 获取窗口高度
      var div = document.querySelector('.main'); // 获取 div 元素
      var divWidth = div.offsetWidth; // 获取 div 的宽度
      var divHeight = div.offsetHeight; // 获取 div 的高度
      this.scale = Math.min(windowWidth / divWidth, windowHeight / divHeight);
      document.querySelector(".main").style.marginTop = ((windowHeight - (divHeight * this.scale)) / 2) + "px"
      //console.log(this.scale, divWidth / windowWidth, divHeight / windowHeight, divWidth, divHeight, windowWidth, windowHeight)
    },
    changeValW(val) {
      //console.log(val)
      this.isChangeW = val
    },
    /**
     * 跳转至登录页面
     * @returns {boolean}
     */
    turnLogin() {
      let token = sessionStorage.getItem('token')
      if (!token) {
        this.$router.push("/login")
        return true
      } else {
        this.$store.state.userInfo.token = token
        this.$store.state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        return false
      }
    },
    /**
     * 重选单词
     * @param id 词书id
     * @param message 历史记录
     */
    resetWord(id, message) {

      let word = this.$store.state.word
      this.nowWord.title = word.wordValue
      this.bookId = id
      this.changeWrod = false
      if (word.learnWording) {
        this.learnWording = true
      } else {
        this.learnWording = false
      }
      if (message) {
        //console.log(message)
        this.mainMessage = this.formatMessage(message)

      } else {
        this.mainMessage = []
      }
      //console.log("这里开始运行了")
      this.initChatMessage();
      this.explain.isloading = true
      this.isSelectBook = true
      this.wordName = this.$store.state.wordName
    },
    formatMessage(message) {
      let msg = []
      for (let i = 0; i < message.length; i++) {
        let obj = {
          role: message[i].role == 'ai' ? 'sys' : 'user',
          message: message[i].content
        }
        msg.push(obj)
      }
      return msg
    },
    initChatMessage() {

      this.getWordExplain(res => {
        console.log(res, "-----")
        if (res.code == 0) {
          console.log(res)
          //console.log(res.data.replace(/\n/g, "&#10;"), "")
          this.explain = {
            isloading: false,
            tip: res.data
          }
        }
      })


    },
    copilotMessage(message, type, callback) {
      //type 1:纠错 0:对话
      // {role: 'user', message: 'Hello ,Recently I have met some problems with my English study.'},
      // {role: 'sys', message: 'Hi Highsen, What kind of help do you need from me?'}

      if (!this.isChangeW) return;
      this.isCopilotLoading = true
      let msg = type == 1 ? "check the sentence: " + message + "" : message;
      let obj = {
        bookId: this.bookId,
        word: this.nowWord.title,
        message: msg,
        type: 2,
      }
      let token = sessionStorage.getItem("token")
      learnWords(token, obj).then(res => {
        callback(res)
        this.isCopilotLoading = false
      })
    },

    /**
     * 单词解释
     * @param callback
     */
    getWordExplain(callback) {
      let token = sessionStorage.getItem("token")
      if (!token) return;
      let obj = {
        word: this.nowWord.title,
        groupId: 12,
        teacherId: 9
      }
      explainWord(token, obj).then(res => {
        callback(res)
      })
    },
    /**
     *
     * @param obj 当前用户输入的消息对象
     *
     */
    inputMessage(obj) {
      console.log("----", obj)
      if (!this.bookId) {
        this.$message({
          type: "warning",
          message: "请先选择词书后再聊天"
        })
        return;
      }
      if (!this.learnWording) {
        this.$message({
          type: "warning",
          message: "请先点击开始学习单词"
        })
        return;
      }
      this.mainMessage.push(obj)
      this.isMainLoading = true
      let data = {
        bookId: this.bookId,
        word: this.nowWord.title,
        message: obj.message,
        groupId: 9,
        teacherId: 6
      }
      let token = sessionStorage.getItem("token")
      if (!token) return;
      data.message = encodeURIComponent(data.message);
      learnWords(token, data).then(res => {
        console.log(res)
        if (res.code == 0) {
          let message = res.data.content
          let obj = {
            role: 'sys',
            message: message
          }
          this.mainMessage.push(obj)
        }
      })
      // this.copilotMessage(obj.message, 1, res => {
      //
      //   // {role: 'user', message: 'Hello ,Recently I have met some problems with my English study.'},
      //   // {role: 'sys', message: 'Hi Highsen, What kind of help do you need from me?'}
      //   this.copilotMessages.push({role: 'sys', message: res.data.replace(/\n/g, "<br/>")})
      // })

      // singleConversation(token, data).then(res => {
      //   this.isMainLoading = false
      //   let obj = {
      //     role: "sys",
      //     message: res.data
      //   }
      //   this.mainMessage.push(obj)
      //
      // })

    }
    ,
    copilotInputMsg(val) {
      if (!this.bookId) {
        this.$message({
          type: "warning",
          message: "请先选择词书后再聊天"
        })
        return;
      }
      if (val.replace(/\s/g, "") == "") {
        this.$message({
          type: "warning",
          message: "消息不能为空"
        })
        return;
      }
      this.copilotMessages.push({
        role: "user",
        message: val
      })
      this.copilotMessage(val, 0, res => {
        //console.log(res, "111")
        // {role: 'user', message: 'Hello ,Recently I have met some problems with my English study.'},
        // {role: 'sys', message: 'Hi Highsen, What kind of help do you need from me?'}
        this.copilotMessages.push({role: 'sys', message: res.data})
      })
    },
    /**
     * 用户点击开始学习或者下一个单词
     * @param
     * 1：开始学习
     * 2：下一个单词
     */
    nextWord(type) {
      let token = sessionStorage.getItem('token')
      if (!token) return;
      if (type == 1) {
        //开始学习
        let obj = {
          bookId: this.bookId,
          word: this.nowWord.title,
          groupId: 6,
          teacherId: 6
        }

        //console.log("开始学习", this.$store.state.allGroup, this.$store.state.allTeacher)
        this.changeWrod = true
        startLearnWords(token, obj).then(res => {
          if (res.code == 0) {
            let message = res.data.content
            let obj = {
              role: "sys",
              message: message
            }
            this.mainMessage.push(obj)
            this.changeWrod = false
            this.learnWording = true
          }
        })
        // for (let i = 0; i < 5; i++) {
        //
        // }

      } else if (type == 2) {
        //下一个
        this.changeWrod = true
        extractWords(token, {id: this.bookId, length: 1}).then(res => {
          if (res.code == 0) {
            this.$store.state.word = res.data[0]
            this.resetWord(this.bookId)
            this.changeWrod = false
          }


        })
      } else {
        this.dialogScore = true
        //console.log("结束学习")
      }

    },
    /**
     * 切换单词的时候loading效果
     */
    changeWrods() {
      this.closeBooks()
      this.changeWrod = true

    },

    /**
     * 结束当前单词学习
     */
    endNowWords() {
      this.dialogScore = false
      let token = sessionStorage.getItem('token')
      if (!token) return;
      let data = {
        bookId: this.bookId,
        word: this.nowWord.title,
        grade: this.wordRateVal
      }

      endLearnWords(token, data).then(res => {

        if (res.code == 0) {
          this.nextWord(2)
        } else {
          this.$message({
            type: "warning",
            message: "结束学习失败"
          })
        }
      })
    },
    /**
     *
     * @param val 念单词的内容
     */
    speakWord(val) {
      const msg = new SpeechSynthesisUtterance();
      const speech = window.speechSynthesis;
      msg.text = val;
      msg.pitch = 1;
      msg.rate = 0.5;
      msg.volume = 10;
      msg.lang = 'en';
      speech.speak(msg);
    },
    /**
     * 显示翻译的文字
     */
    showCopyText(left, top, text) {
      document.querySelector(".copyTranslate").style.left = left + 'px'
      document.querySelector(".copyTranslate").style.top = top + 'px'
      //document.querySelector(".copyTranslate").style.display = "block"
      document.querySelector(".copyTranslate pre").innerHTML = text
    },
    /**
     * 隐藏文本框
     */
    hiddenCopyText() {
      document.querySelector(".copyTranslate").style.display = "none"
    }
  }
}
</script>

<style scoped lang="less">

.content {
  background: #DEE9FB;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main {
  width: calc(100% - 200px);
  background: #F1F3F5;
  border-radius: 40px;
  //min-height: 1100px;
  min-width: 1400px;
  height: 1100px;
  margin: auto;
}

.webTitle {
  text-align: left;
  padding-left: 20px;
  margin-top: 40px;
}

.webTitleBlack {
  color: #000;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 57px; /* 237.5% */
}

.webTitleBlue {
  color: #4F6AFF;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 57px;
}

.mainContent {
  width: calc(100% - 30px);
  margin: 15px;
}

.mainHeader {
  padding-left: 20px;
}

.mainHeaderTip {
  color: #000;
  text-align: left;
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 68.75% */
}

.Progress {
  margin-top: 30px;
  text-align: left;

  span {
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    color: #a378fc;
  }
}

.mainShowWord {
  display: flex;
  margin-top: 50px;
}

.mainWord {
  flex: 1;
  max-width: 50%;
}

.wordTip {
  text-align: left;
  margin: 10px 0px;
  padding-left: 30px;
}

.copyTranslate {
  background: black;
  position: absolute;
  display: inline-block;
  color: white;
  z-index: 999;
  max-width: 200px;
  padding: 6px 10px 3px 10px;
  border-radius: 4px;
  display: none;
  transform: translate(-50%, 20px);

  .toptop {
    background: black;
    position: absolute;
    width: 12px;
    height: 12px;
    top: -6px;
    left: calc(50% - 6px);
    transform: rotate(45deg);
  }

  .copyContent {
    overflow-wrap: break-word;

    pre {
      margin: 0;
      padding: 0;
      white-space: normal;
      word-wrap: break-word;
      text-align: left;
      font-size: 12px;

    }
  }
}
</style>
