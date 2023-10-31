<template>
  <div class="content">
    <div class="loginBox">
      <div class="loginLeft">
        <div class="loginLeftTip">
          <img src="./../assets/user-915e1721.jpg" alt="">
          <p class="tip">Word Talk</p>
        </div>
      </div>
      <!--      登录-->
      <div class="loginRight" v-show="loginOrSgin">
        <div class="rightContent">
          <div class="loginRightTip">
            <h1>欢迎!</h1>
          </div>
          <div class="loginRightTiptip">
            <p>WordTalk AI英语学习助手</p>
          </div>
          <div class="account">
            <div class="text">
              <span>邮箱</span>
            </div>
            <div class="input">
              <el-input
                  placeholder="邮箱"
                  v-model="account">
                <i slot="prefix" class="el-input__icon el-icon-message"></i>
              </el-input>
            </div>
          </div>
          <div class="password">
            <div class="text">
              <span>密码</span>
            </div>
            <div class="input">
              <el-input
                  class="_input"
                  placeholder="密码"
                  show-password
                  v-model="password">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
          </div>
          <div class="option">
            <div class="optionRight">
              <el-switch
                  disabled
                  v-model="keepSign"
                  active-color="#283961"
                  active-text="保持登录">
              </el-switch>
            </div>
            <div class="optionLeft" @click="loginOrSgin=false">
              <span>没有账号，点击注册</span>
            </div>
          </div>
          <div class="loginBtn">
            <el-button class="signIn" type="info" @click="sigin">登录
            </el-button>
          </div>
        </div>
      </div>
      <!--      注册-->
      <div class="loginRight sign" v-show="!loginOrSgin">
        <div class="rightContent">
          <div class="loginRightTip" style="margin-top: 50px">
            <h1>注册</h1>
          </div>

          <div class="account">
            <div class="text">
              <span>邮箱</span>
            </div>
            <div class="input">
              <el-input
                  placeholder="邮箱"
                  v-model="registerEmail">
                <i slot="prefix" class="el-input__icon el-icon-message"></i>
              </el-input>
            </div>
          </div>
          <div class="account">
            <div class="text">
              <span>验证码</span>
            </div>
            <div class="input">
              <el-row>
                <el-col :span="8">
                  <el-input
                      placeholder="验证码"
                      v-model="code">

                  </el-input>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="8">
                  <el-button type="info" @click="sendCode" :disabled="sendCodeDis">{{ sendCodeTip }}</el-button>
                </el-col>
              </el-row>


            </div>
          </div>
          <div class="password">
            <div class="text">
              <span>密码</span>
            </div>
            <div class="input">
              <el-input
                  class="_input"
                  placeholder="密码"
                  show-password
                  v-model="registerPwd">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
          </div>
          <div class="password">
            <div class="text">
              <span>确认密码</span>
            </div>
            <div class="input">
              <el-input
                  class="_input"
                  placeholder="确认密码"
                  show-password
                  v-model="aginRegisterPwd">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
          </div>
          <div class="option">

            <div class="optionLeft" @click="loginOrSgin=true">
              <span>登录</span>
            </div>
          </div>
          <div class="loginBtn">
            <el-button class="signIn" type="info" @click="register">
              注册
            </el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as CryptoJS from 'crypto-js';
import {login, getCode, register} from "../../api";

export default {
  name: "login",
  data() {
    return {
      account: '',
      password: '',
      keepSign: '',
      isloading: false,
      loginOrSgin: true,
      registerEmail: "",
      registerPwd: "",
      aginRegisterPwd: "",
      code: "",
      sendCodeTip: "发送验证码",
      sendCodeTime: 0,
      sendCodeDis: false
    }
  },
  methods: {
    sigin() {
      this.isloading = true
      let that = this;

      let obj = {
        username: this.account,
        password: this.passwordEncryption(this.password),
        //password: "ejgFewoG",
        scope: "server"
      }
      login(obj).then((res) => {
        console.log(res)
        sessionStorage.setItem("token", res.access_token)
        sessionStorage.setItem("userInfo", JSON.stringify(res))
        this.$store.state.userInfo = res;
        this.$router.push("/")
        this.isloading = false
      }).catch(err => {
        this.$message({
          type: "warning",
          message: "账号密码错误"
        })
        this.isloading = false
      })

    },
    passwordEncryption(pwd) {
      const key = "lexilexilexilexi"
      const iv = CryptoJS.enc.Utf8.parse(key)


      const encrypted = CryptoJS.AES.encrypt(pwd, iv, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      });
      console.log(encrypted)
      return encrypted

    },
    register() {
      if (!this.isValidEmail(this.registerEmail)) {
        this.$message({
          type: "warning",
          message: "邮箱格式错误"
        })
        return;
      }
      if (this.registerPwd == "" || this.aginRegisterPwd == "") {
        this.$message({
          type: "warning",
          message: "密码不能为空"
        })
        return;
      }
      if (this.registerPwd != this.aginRegisterPwd) {
        this.$message({
          type: "warning",
          message: "两次密码不一致"
        })
        return;
      }
      if (this.code == "") {
        this.$message({
          type: "warning",
          message: "验证码不能为空"
        })
        return;
      }
      let obj = {
        username: this.registerEmail,
        registration: {
          email: this.registerEmail,
          code: this.code
        },
        password: this.registerPwd
      }
      console.log(obj);
      register(obj).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: "注册成功"
          })
          this.loginOrSgin = true
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          })
        }
      })
    },
    sendCode() {
      if (!this.isValidEmail(this.registerEmail)) {
        this.$message({
          type: "warning",
          message: "邮箱格式错误"
        })
        return;
      }
      this.sendCodeTime = 60
      this.sendCodeDis = true
      let time = setInterval(() => {
        this.sendCodeTime--;
        this.sendCodeTip = this.sendCodeTime + 's'
        if (this.sendCodeTime == 0) {
          clearInterval(time)
          this.sendCodeDis = false
          this.sendCodeTip = "重新获取验证码"
        }
      }, 1000)
      getCode(this.registerEmail).then(res => {
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: "发送成功"
          })
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          })
        }
      })

    },
    isValidEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #efffff;
  height: 100vh;

  .loginBox {
    background: #fff;
    box-shadow: 0 2px 12px #0000000f;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    max-width: 1010px;
    max-height: 616px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;

    .loginLeft {
      background: #f2f5f8;
      background-image: linear-gradient(to right bottom, #222653, #3fbcbc);
      width: 434px;
      z-index: 2;
      height: 100%;
      position: relative;
      flex: 4;

      .loginLeftTip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        width: 60%;
        overflow: hidden;
        background-image: linear-gradient(#70a2e0, #5eb3bd);
        border-radius: 70px;
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        padding-top: 20px;

        .tip {
          color: white;
        }

        img {

        }
      }
    }

    .rightContent {
      width: 80%;
      margin: auto;
    }


  }

  .loginRight {
    width: 100%;
    flex: 5;

    .loginRightTip {
      margin-top: 100px;

      h1 {
        font-size: 42px;
        line-height: 56px;
        font-weight: 700;
      }
    }

    .loginRightTiptip {
      font-size: 20px;
      margin-bottom: 40px;
    }
  }

  .account, .password, .option {
    display: flex;
    height: 90px;
    text-align: left;
  }

  .sign .account {
    height: 70px;
  }

  .sign .password {
    height: 70px;
  }

  .text {
    flex: 1;
    line-height: 40px;
  }

  .input {
    flex: 5;
  }

  .optionRight {
    flex: 1;
  }

  .optionLeft {
    flex: 1;
    text-align: right;

    span {
      cursor: pointer;

      &:hover {
        color: #409EFF;
      }
    }
  }

  .signIn {
    width: 100%;
  }


}

.grid-content {
  width: 10px;
  height: 10px;
}
</style>
