<template>
  <div class="userContent">
    <div class="userHeader">
      <div class="userHeaderImage">
        <img src="./../../assets/user-915e1721.jpg" alt="">
      </div>
      <div class="userHeaderText">
        <div class="_userHeader">
          <div class="_userHeaderImage">
            <img :src="userInfo.userImage" alt="">
            <div class="username">
              <span class="dot"></span>
              <span>{{ userInfo.name }}</span>
            </div>

          </div>

        </div>
        <div class="userOut">
          <span @click="logOut">退出登录</span>
        </div>
      </div>
    </div>
    <div class="showCard" v-loading="isDeleteing">
      <userCard style="width: calc(100% - 30px);margin:20px 15px" v-for="(item,i) in userBooks" :key="i" :data="item"
                @deleteBooks="deleteBook"
                :selectBookId="selectBookId"
                @learnBooks="learnBook"></userCard>
      <p style="font-size: 12px;color: #ccc" v-if="userBooks.length==0">还没有词书哟，请点击新增词书吧</p>
      <button class="addCard" @click="addBook">新增词书</button>
      <el-dialog
          title="添加词书"
          :visible.sync="showAddBook"
          width="50%"
          center>
        <div class="_bookCardContent">
          <div class="bookCardContent" :style="{width:allBooks.length*220+100+'px'}">

            <book-card v-for="(item,i) in allBooks" :key="i" :data="item" @selectBook="selectBook(i)"
                       :activeIndex="activeIndex" :index="i"></book-card>

            <br style="clear: both"/>
          </div>

        </div>


        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddBook = false">取 消</el-button>
           <el-button type="primary" @click="addUserBook"
                      :disabled="activeIndex==-1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import userCard from "@/components/userData/userCard";//词书卡片
import bookCard from "@/components/userData/bookCard";//添加单词卡片
import {
  getBookData,
  deleteBook,
  getAllBooks,
  addSignBook,
  openWords,
  extractWords,
  continueLearnWords
} from "../../../api";

export default {
  name: "userData",
  components: {
    userCard,
    bookCard
  },
  data() {
    return {
      userInfo: {
        userImage: require('./../../assets/user.png'),
        name: "XXX",
        token: ""
      },
      userBooks: [],
      showAddBook: false,
      addBookData: {
        name: "",
        thesaurus: null,
      },
      allBooks: [],
      selectBookId: null,
      isDeleteing: false,
      activeIndex: -1,

    }
  },
  mounted() {
    this.$store.state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    this.initUserData();
    this.getBooks();

  },
  methods: {
    logOut() {
      //跳转登陆
      this.$store.state.userInfo = {};
      this.$router.push('/login')
    },
    deleteBook(id) {
      let token = sessionStorage.getItem("token")
      let arry = []
      arry.push(id)
      this.isDeleteing = true
      deleteBook(token, arry).then(res => {
        if (res.code == 0 && res.data) {
          this.userBooks.splice(this.deleteArryBook(id), 1)
          this.$message({
            type: "success",
            message: "删除图书成功"
          })

        } else {
          this.$message({
            type: "warning",
            message: "删除图书失败"
          })
        }
        this.isDeleteing = false
      })
    },
    deleteArryBook(id) {
      for (let i = 0; i < this.userBooks.length; i++) {
        let item = this.userBooks[i];
        if (item.id == id) {
          return i;
        }
      }
    },
    initUserData() {
      this.userInfo.name = this.$store.state.userInfo.username
    },
    getBooks() {
      let token = sessionStorage.getItem("token")
      if (!token) {
        return
      }
      // let obj = {
      //   createBy: this.$store.state.userInfo.username
      // }
      //console.log("开始请求词书", token)
      getBookData(token).then(res => {
        //console.log(res)
        if (res.code == 0) {
          this.userBooks = res.data
        } else {
          this.$message({
            type: "warning",
            message: "获取词书失败"
          })
        }
      })

    },
    addBook() {
      //新增词书
      this.showAddBook = true;
      let token = sessionStorage.getItem("token")
      getAllBooks(token).then(res => {
        if (res.code == 0) {
          //console.log(res.data.records)
          this.allBooks = res.data.records
          // this.options = res.data
        } else {
          this.$message({
            type: "warning",
            message: "官方词库获取失败"
          })
        }
      })
    },
    selectBook(i) {
      if (i == this.activeIndex) {
        this.activeIndex = -1
      } else {
        this.activeIndex = i
      }

    },
    addUserBook() {
      let item = this.allBooks[this.activeIndex]
      let token = sessionStorage.getItem("token")
      let data = {
        baseId: item.id,
        name: item.name,
        open: 0,
        type: "custom"
      }
      addSignBook(token, data).then(res => {
        //console.log(res, "----")
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: "新增成功"
          })
          this.getBooks()

        } else {
          this.$message({
            type: "warning",
            message: "新增失败"
          })
        }
        this.showAddBook = false
      })
    },
    learnBook(id, name) {
      if (id == this.selectBookId) {
        return;
      }
      this.selectBookId = id
      this.$emit('changeWrods')
      this.initUserSign(name)
    },
    initUserSign(name) {
      let token = sessionStorage.getItem('token')

      openWords(token, {id: this.selectBookId}).then(res => {
        //console.log(res)
        if (res.code == 0) {

          this.$store.state.wordName = name


          if (res.msg.indexOf("正在学习") == -1) {
            extractWords(token, {id: this.selectBookId, length: 1}).then(res => {
              if (res.code == 0) {
                this.$store.state.word = res.data[0]
                this.$emit("resetWord", this.selectBookId)
              }
              //console.log(res.data[0])


            })
          } else if (res.msg.indexOf("正在学习") != -1) {
            this.$store.state.historyUser = res
            let data = {
              id: this.selectBookId
            }
            continueLearnWords(token, data).then(resp => {

              if (resp.code == 0) {
                let item = res.data
                item.learnWording = true
                this.$store.state.word = item
                this.$emit("resetWord", this.selectBookId, resp.data)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.userContent {
  background: white;
  border-radius: 10px;
  width: 100%;
  margin: auto;
  height: 780px;
  position: relative;

  .userHeader {
    height: 200px;
    border-bottom: 2px solid #dfdfdf;
  }

  .userHeaderImage {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 10px;
    margin: auto;
    position: relative;
    top: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .userHeaderText {
    display: flex;
    position: relative;
    top: 55px;
  }

  ._userHeader {

    flex: 1;

    ._userHeaderImage {
      width: 40px;
      height: 40px;
      margin: auto;

      span {
        color: #979797;
        text-align: center;
        font-family: Cairo;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
      }

      .username {
        position: relative;
      }

      .dot {
        display: inline-block;
        border-radius: 50%;
        width: 3px !important;
        height: 3px !important;
        background: #65c57e;
        border: #d7ffe1 solid 2px;
        position: absolute;
        top: 7px;
        left: -10px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }

  .userOut {
    flex: 1;
    line-height: 40px;
    color: #000;
    text-align: center;
    font-family: Mulish;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;

    span {
      &:hover {
        color: #ccc;
        cursor: pointer;
      }
    }
  }

  .showCard {
    width: 100%;
    margin: auto;
    height: 550px;
    overflow-y: auto;

  }

  .addCard {
    border-radius: 10px;
    background: #8959F0;
    box-shadow: 0px 4px 0.2px 0px rgba(0, 0, 0, 0.25);
    border: none;
    color: #FFF;
    font-family: PingFang SC;
    font-size: 17px;
    width: 120px;
    height: 40px;
    position: absolute;
    bottom: 20px;
    left: calc(50% - 50px);
    cursor: pointer;
  }
}

._bookCardContent {
  width: 100%;
  overflow-y: auto;
}

.bookCardContent {
  height: 200px;
  padding: 50px;


}


</style>
