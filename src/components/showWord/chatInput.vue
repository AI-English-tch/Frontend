<template>
  <div class="chatInputDiv">
    <el-row>
      <el-col :span="2">
        <div class="chatLeft">
          <img src="./../../assets/Chat.svg" alt="">
        </div>
      </el-col>
      <el-col :span="17">
        <input type="text" v-model="message" class="inputMessage" placeholder="请输入" @keyup.enter="sendWordMessage">
      </el-col>

      <el-col :span="5" class="btnUp">
        <button class="sendWordMessage" @click="sendWordMessage">发送</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chatInput",
  data() {
    return {
      message: ''
    }
  },
  props: {
    isMainLoading: {
      type: Boolean
    }
  },
  methods: {
    sendWordMessage() {
      //发送消息
      if (this.isMainLoading) {
        this.$message({
          type: "warning",
          message: "请先等机器人回复完"
        })
        return;
      }
      if (this.message == "") {
        this.$message({
          type: "warning",
          message: "发送消息不能为空"
        })
        return;
      }
      let obj = {
        message: this.message,
        role: 'user'
      }
      this.$emit('inputMessage', obj)
      this.message = ""
    }
  }
}
</script>

<style scoped lang="less">
.chatInputDiv {
  width: 100%;
  margin-top: 27px;
  position: relative;

  .chatLeft {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 14px;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.15);

    img {
      width: 24px;
      height: 24px;
      margin: 13px;
    }
  }

  .inputMessage {
    width: calc(100% - 40px);
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
    height: 50px;
    border-radius: 14px;
    outline: none;
    padding: 0px 20px;
  }

  .btnUp {
    position: relative;
  }

  .sendWordMessage {
    width: calc(100% - 20px);
    border-radius: 14px;
    background: linear-gradient(270deg, #8743FF 0%, #4136F1 100%);
    box-shadow: 0px 15px 30px 0px rgba(20, 102, 204, 0.16);
    border: none;
    color: white;
    height: 50px;
    cursor: pointer;
    position: absolute;
    right: 0px;
    transition: all 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }
}

</style>
