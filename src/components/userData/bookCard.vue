<template>
  <div class="bookCard" @click="selectBook" :class="index==activeIndex?'active':''">
    <div class="bookCardName" :class="index==activeIndex?'scoreActive':''">
      {{ data.name }}
    </div>
    <div class="score">
      <div class="_score" :class="index==activeIndex?'scoreActive':''">5.0<span><i class="el-icon-star-on"></i></span>
      </div>
      <div class="scoreTip">0 reviews</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookCard",
  props: {
    data: {
      type: Object
    },
    index: {
      type: Number
    },
    activeIndex: {
      type: Number
    }
  },
  methods: {
    selectBook() {
      this.$emit("selectBook")
    }
  }
}
</script>

<style scoped lang="less">
.bookCard {
  width: 200px;
  height: 200px;
  box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.10);
  background: #ffffff;
  border-radius: 20px;
  //color: white;
  position: relative;
  cursor: pointer;
  float: left;
  margin-right: 20px;
  transition: all 0.2s;

  .bookCardName {
    width: calc(100% - 40px);
    margin: auto;
    position: relative;
    top: 30px;
    text-align: center;
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .score {
    margin-top: 30px;
    width: calc(100% - 40px);
    margin: 30px auto;
    text-align: center;
    display: flex;

    ._score {
      color: #000;
      font-family: Poppins;
      font-size: 28px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      span {
        color: #e67100;
        font-size: 18px;
        position: relative;
        top: -2px;
      }
    }

    .scoreTip {
      line-height: 45px;
      margin-left: 20px;
    }
  }

}

.active {
  background: #7E4AEC;
  color: white;
}

.scoreActive {
  color: white !important;
}


</style>
