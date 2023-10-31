<template>
  <div class="card">
    <el-row>
      <el-col :span="10">
        <div class="score">
          <div class="_score">5.0<span><i class="el-icon-star-on"></i></span></div>
          <div class="scoreTip">0 reviews</div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="cardContent">
          <div class="cardTitle">
            <span>
              {{ data.name }}
            </span>
          </div>
        </div>
        <div class="cardOption">
          <div class="cardDelet" @click="deleteBook(data.id)">
            <i class="el-icon-delete"></i>
          </div>
          <div class="cardLink">
            <div class="yTrueCard" v-show="data.isComplete">
              <img src="./../../assets/yse.svg" alt="">
            </div>
            <div class="nTrueCard" v-show="!data.isComplete" @click="learnBook(data)"
                 :style="{background:selectBookId==data.id?'rgba(130, 67, 255, 0.7)':''}"><span
                :style="{color:selectBookId==data.id?'rgba(255, 255, 255, 1)':''}">学习此书</span></div>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "userCard",
  props: {
    data: {
      type: Object
    },
    selectBookId: {}
  },
  mounted() {
  },
  methods: {
    deleteBook(id) {
      this.$emit('deleteBooks', id)
    },
    learnBook(item) {

      this.$emit('learnBooks', item.id, item["name"])
    }
  }
}
</script>

<style scoped lang="less">
.card {
  border-radius: 24px;
  height: 100px;
  background: #FFF;
  box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.10);
  margin: 50px 0px;

}

._score {
  color: #000;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 20px;

  span {
    color: #e67100;
    font-size: 18px;
    position: relative;
    top: -2px;
  }
}

.scoreTip {
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px; /* 116.667% */
  opacity: 0.6000000238418579;
}

.cardTitle {
  color: #000;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 70% */
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cardOption {
  display: flex;
}

.cardDelet {
  flex: 1;
  color: #979797;
  line-height: 20px;
  font-size: 17px;
  text-align: left;
  cursor: pointer;
}

.cardLink {
  flex: 2;

  img {
    width: 17px;
    height: 17px;
  }

  .nTrueCard {
    color: #7E4AEC;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 140% */
    border-radius: 15px;
    background: rgba(162, 120, 252, 0.50);
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.5s;
  }
}

</style>
