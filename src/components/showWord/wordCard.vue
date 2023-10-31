<template>
  <div class="wordCard">
    <div class="wordNum">
      <div class="wordLeft" v-show="isSelectBook">
        <div class="wordTip">今日复习</div>
        <div class="wordNums">
          0/150
        </div>
      </div>
      <div class="wordMiddle" v-show="isSelectBook">
        <div class="wordTip">今日复习</div>
        <div class="wordNums">
          0/50
        </div>
      </div>
      <div class="wordRight" v-show="isSelectBook">
        <div class="wordTip">今日复习</div>
        <div class="wordNums">
          5min
        </div>
      </div>
    </div>
    <div class="showWord">
      <div class="word">
        <span>{{ isSelectBook ? nowWord.title : '请选择一本词书' }}</span>
      </div>
      <div class="phonetic" @click="speakWord" v-show="isSelectBook">
        <img src="./../../assets/sound1.svg" alt="">
        <span>{{ nowWord.phonetic }}</span>
      </div>
    </div>
    <div class="wordBtn" v-show="isSelectBook">
      <div class="BtnOne" v-if="!learnWording">
        <button @click="next(1)">开始学习</button>
      </div>
      <div class="BtnTwo" v-if="!learnWording">
        <button @click="next(2)">下一个</button>
      </div>
      <div class="BtnOne" v-if="learnWording">
        <button @click="next(3)">结束学习</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wordCard",
  props: {
    nowWord: {
      type: Object
    },
    isSelectBook: {
      type: Boolean
    },
    learnWording: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  methods: {
    next(type) {
      this.$emit('nextWord', type)
    },
    speakWord() {
      this.$emit('speakWord', this.nowWord.title)

    }
  }
}
</script>

<style scoped lang="less">
.wordCard {
  width: calc(100% - 20px);
  height: 300px;
  border-radius: 30px;
  background: rgba(130, 67, 255, 0.70);
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);

  .wordNum {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      color: #FFF;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 4px;
    }
  }

  .showWord {
    margin-top: 40px;

    .word {
      color: #FFF;
      font-family: Poppins;
      font-size: 48px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .phonetic {
    img {
      position: relative;
      top: 2px;
      left: -5px;
      width: 30px;
      cursor: pointer;
    }

    span {
      color: #FFF;
      font-family: PingFang SC;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      line-height: 30px;
    }
  }

  .wordBtn {
    display: flex;
    margin-top: 20px;

    div {
      flex: 1;

      button {
        outline: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 20px;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(124, 106, 232, 0.50) 0%, rgba(215, 209, 251, 0.00) 100%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }
    }
  }
}

</style>
