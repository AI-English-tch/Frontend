<template>
  <div class="wordChat">
    <img class="bg" src="./../../assets/bgcolor.svg" alt="">
    <div class="chatTime">
      <span>{{ date }}</span>
      <div class="bg1"></div>
      <div class="bg2"></div>
    </div>
    <div class="messageContent">
      <div class="message" v-for="(item,i) in messages" :key="i">
        <div class="_message " :class="item.role=='user'?'right':'left'">
          <div class="header" v-if="item.role!='user'">
            <img src="./../../assets/user.png" alt="">
          </div>
          <div class="messageChat">
            <pre style="padding: 0;margin: 0">{{ item.message }}</pre>
            <span class="messageRightTime">{{ item.time }}</span>
            <img src="./../../assets/sound1.svg" alt="" class="sound" @click="speakWord(item.message)">
          </div>
          <div class="header" v-if="item.role=='user'">
            <img src="./../../assets/user.png" alt="">
          </div>

        </div>
        <br style="clear: both">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "wordChat",
  data() {
    return {
      date: ""
    }
  },
  mounted() {
    this.date = this.formatDate()
  },
  methods: {
    formatDate() {
      const date = new Date();
      const month = date.toLocaleString('en-US', {month: 'long'});
      const day = date.getDate();
      return `${month} ${day}`;
    },
    speakWord(val) {
      this.$emit('speakWord', val)
    }
  },
  watch: {
    messages(val, oldval) {
      //console.log("-------")
      //此处让div回滚
      setTimeout(() => {
        let chatWindow = document.querySelector(".wordChat")
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 200)

    }
  },
  props: {
    messages: {
      type: Array
    }
  }
}
</script>

<style scoped lang="less">
.wordChat {
  width: 100%;
  height: 450px;
  border-radius: 30px;
  background: #FFF;
  position: relative;
  //overflow: hidden;
  overflow-y: auto;
}

.bg {
  position: absolute;
  top: 0px;
  left: 30px;
}

.chatTime {
  color: #CBCBCB;
  font-family: PingFang SC;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 10px;

  position: relative;
  top: 50px;

  .bg1 {
    position: absolute;
    bottom: 0px;
    width: 160px;
    border: #cbcbcb solid 1px;
    opacity: 0.2;
    left: 160px;
  }

  .bg2 {
    position: absolute;
    bottom: 0px;
    width: 160px;
    border: #cbcbcb solid 1px;
    opacity: 0.2;
    right: 160px;
  }


}

.messageContent {
  margin-top: 60px;
}

.message {
  width: 100%;
  height: auto;
  margin: 10px 0px;
}

._message {
  width: 60%;
  display: flex;

}

.right {
  float: right;

  .messageChat {
    background: #a378fc;
    border-radius: 10px 0px 10px 10px;
    position: relative;

    .messageRightTime {
      position: absolute;
      bottom: 0px;
      font-size: 10px;
      right: 10px;
    }
  }

}

.left {
  .messageChat {
    background: #f6f2f2;
    border-radius: 0px 10px 10px 10px;
    color: #0F1828;
    position: relative;

    .messageLeftTime {
      position: absolute;
      bottom: 0px;
      font-size: 10px;
      left: 10px;
    }
  }
}

.header {
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  flex: 2;
}

.messageChat {
  width: 100%;
  flex: 10;
  color: white;
  padding: 20px 10px;
  text-align: left;
  font-family: Mulish;


  /* 133.333% */

  pre {
    font-size: 22px;
    line-height: 24px;
    font-weight: 400;
    font-style: normal;
    white-space: pre-wrap;
  }
}

.sound {
  float: right;
  cursor: pointer;
}
</style>
