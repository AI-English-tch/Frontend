<template>
  <div class="copilotChat">
    <div class="bg">
      <img src="./../../assets/6323a6a5ed516738feb2689c_Testimonial.png" alt="">
    </div>
    <div class="copilotTip">
      <span>"Be the change you wish to see in the world."</span>
    </div>
    <div class="copilotTiptip">
      <span>-Mahatma Gandhi</span>
    </div>
    <div class="copilotChatBtn">
      <div class="_copilotChatBtn">
        <span>关闭纠错</span>
        <el-switch
            class="copilotChatSwith"
            v-model="value"
            active-color="#acabeb"
            @change="changeVal"
        >
        </el-switch>
        <span>开启纠错</span>
      </div>
    </div>
    <div class="_copilotChatWindow">
      <copilotChatWindow :messages="messages" @sendMessage="sendMessage"
                         v-loading="isCopilotLoading"></copilotChatWindow>
    </div>
  </div>
</template>

<script>
import copilotChatWindow from "@/components/copilot/copilotChatWindow";

export default {
  name: "copilotChat",
  props: ["messages", "isCopilotLoading"],
  data() {
    return {
      value: true//是否开启纠错
    }
  },
  components: {
    copilotChatWindow
  },
  methods: {
    changeVal() {
      this.$emit("changeVal", this.value)
    },
    sendMessage(val) {
      this.$emit('sendMessage', val)
    }
  }
}
</script>

<style scoped lang="less">
.copilotChat {
  width: calc(100% - 20px);
  margin: auto;
  border-radius: 15px;
  border: 2px solid #D1C7BE;
  height: 645px;
  position: relative;

  .bg {
    position: absolute;
    width: 60px;
    height: 40px;
    background: #FDF3EA;
    top: -20px;
    left: 30px;
  }

  .copilotTip {
    margin-top: 40px;
    text-align: left;
    padding: 0px 20px;

    span {
      color: #58595D;
      font-family: Inter;
      font-size: 17px;
      font-style: italic;
      font-weight: 500;
      line-height: 30px; /* 187.5% */
    }
  }

  .copilotTiptip {
    color: #A89B90;
    font-family: Roboto;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    text-align: left;
    margin-top: 20px;
    padding: 0px 20px;
    text-align: right;
  }

  .copilotChatBtn {
    width: calc(100% - 40px);
    padding: 0px 20px;
  }

  ._copilotChatBtn {
    margin-top: 30px;

    span {
      border: #a278fc 1px solid;
      color: #a278fc;
      border-radius: 10px;
      padding: 4px 10px;
      font-size: 10px;
    }

    .copilotChatSwith {
      margin: 0px 20px;
    }
  }

  ._copilotChatWindow {
    margin-top: 30px;
  }
}
</style>
