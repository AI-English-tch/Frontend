<template>
  <div class="webContent">
    <div class="about">
      <el-button type="primary" class="btn" @click="turnHref(0)"><i class="el-icon-user"></i>反馈</el-button>
    </div>
    <div class="tutorial">
      <el-button type="primary" @click="turnHref(1)" class="btn"><i class="el-icon-collection"></i>教程</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    turnHref(type) {
      let href = "";
      if (type == 0) {
        href = "https://docs.qq.com/sheet/DV0ZGUnpEU0RzbVRR?tab=BB08J2"
      } else {
        href = "https://hadxu0mf6pn.feishu.cn/docx/JWD0dMW9sof2PCxPoiccE5cBnjg?from=from_copylink"
      }
      window.open(href, '_blank');
    }
  }
}
</script>

<style scoped lang="less">
.webContent {
  background: white;
  border-radius: 10px;
  width: clac(100% - 30px);
  margin: 60px 15px 0px 15px;
  height: 100px;
  display: flex;
}

.about, .tutorial {
  flex: 1;

  .btn {
    font-size: 17px;
    margin-top: 30px;
  }
}
</style>
