<template>
  <div class="copilot">
    <div class="copilotTitle">
      <span class="webTitleBlack" style="font-size: 40px">Your</span>&nbsp;&nbsp;&nbsp;
      <span class="webTitleBlue" style="font-size: 40px">Copilot</span>
    </div>
    <div class="bg1">
      <img src="./../../assets/Group.png" alt="">
    </div>
    <div class="copilotMain">
      <copilotChat @changeVal="changeVal" :messages="messages" @sendMessage="sendMessage"
                   :isCopilotLoading="isCopilotLoading"></copilotChat>
    </div>
    <div class="bg"><img src="./../../assets/Group1.svg" alt=""></div>
  </div>
</template>

<script>
import copilotChat from "@/components/copilot/copilotChat";

export default {
  name: "index",
  components: {
    copilotChat
  },
  props: ["messages", "isCopilotLoading"],
  data() {
    return {}
  },
  methods: {
    changeVal(val) {
      this.$emit("changeVal", val)
    },
    sendMessage(val) {
      this.$emit("copilotInputMsg", val)
    }
  }
}
</script>

<style scoped lang="less">
.copilot {
  background: white;
  width: calc(100% - 30px);
  height: 1042px;
  border-radius: 20px;
  margin: 15px;
  position: relative;
  overflow: hidden;

  .bg {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 0;
  }

  .copilotTitle {
    width: 100%;
    position: absolute;
    top: 30px;
    z-index: 2;
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

  .bg1 {
    margin-top: 150px;
    height: 200px;
    width: 100%;

    img {
      object-fit: fill;
    }
  }

  .copilotMain {
    margin-top: 40px;
  }

}
</style>
