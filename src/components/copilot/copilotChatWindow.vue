<template>
  <div class="copilotChatWindow">
    <div class="chatTime">
      <span>{{ date }}</span>
      <div class="bg1"></div>
      <div class="bg2"></div>
    </div>
    <div class="chatwindow">
      <div class="chatMessage" v-for="(item,i) in messages" :key="i">
        <div class="chatMessageSysOrUser" :class="item.role!='sys'?'messageRight':'messageLeft'">
          <span v-html="item.message"></span>
        </div>
        <br style="clear: both"/>
      </div>
    </div>
    <div class="chatInput">
      <el-row>
        <el-col :span="3">
          <div class="add">
            <i class="el-icon-plus"></i>
          </div>
        </el-col>
        <el-col :span="18">
          <input type="text" class="inputMessage" placeholder="请输入" v-model="copilotMessage" @keyup.enter="sendMessage">
        </el-col>

        <el-col :span="3" class="btnUp">
          <div class="btn" @click="sendMessage">
            <img src="./../../assets/send.svg" alt="">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "copilotChatWindow",
  props: ["messages"],
  data() {
    return {
      copilotMessage: "",
      date: ""
    }
  },
  mounted() {
    this.date = this.formatDate()
  },
  watch: {
    messages(val, oldval) {
      //console.log("--动了动了-----")
      //此处让div回滚
      setTimeout(() => {
        let chatWindow = document.querySelector(".chatwindow")
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 200)

    }
  },
  methods: {
    sendMessage() {
      //向助手发送消息
      //console.log(this.copilotMessage)
      this.$emit('sendMessage', this.copilotMessage)
      this.copilotMessage = ""
    },
    formatDate() {
      const date = new Date();
      const month = date.toLocaleString('en-US', {month: 'long'});
      const day = date.getDate();
      return `${month} ${day}`;
    }
  }
}
</script>

<style scoped lang="less">
.copilotChatWindow {
  width: 100%;
  position: relative;
  height: auto;
}

.chatTime {
  color: #CBCBCB;
  font-family: PingFang SC;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 40px;
  position: relative;

  .bg1 {
    position: absolute;
    bottom: 0px;
    width: 130px;
    border: #cbcbcb solid 1px;
    opacity: 0.2;
    left: 20px;
  }

  .bg2 {
    position: absolute;
    bottom: 0px;
    width: 130px;
    border: #cbcbcb solid 1px;
    opacity: 0.2;
    right: 20px;
  }


}

.chatwindow {
  width: calc(100% - 40px);
  margin: auto;
  height: 345px;
  overflow-y: auto;
}

.chatMessage {
  margin-top: 30px;
}

.chatMessageSysOrUser {
  border: #e8e9eb solid 1px;
  padding: 10px 5px;
  width: 70%;
  text-align: left;

  span {
    color: #595F69;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

.messageRight {
  float: right;
  border-radius: 20px 20px 0px 20px;
}

.messageLeft {
  border-radius: 20px 20px 20px 0px;
  background: #a278fc;

  span {
    color: white !important;
  }

}

.chatInput {
  width: calc(100% - 40px);
  margin: auto;
  height: 30px;
}

.inputMessage {
  width: calc(100% - 40px);
  height: 24px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #f7f7fc;
  padding: 0px 20px;
}

.add {
  text-align: left;
  line-height: 25px;
  font-weight: 600;
  color: #ccc;
}

.btnUp {
  position: relative;

  .btn {
    position: absolute;
    right: 0px;

    img {
      position: relative;
      top: -1px;
    }
  }
}
</style>
