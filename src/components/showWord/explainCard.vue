<template>
  <div class="explainCard">
    <div class="explainTitle">
      <span>单词解释</span>
    </div>
    <div class="showExplain" v-loading="explain.isloading" v-html="marke(explain.tip)">
      <!--      <span></span>-->
      <!--      <pre style="padding: 0;margin: 0"></pre>-->
    </div>
  </div>
</template>

<script>
import {marked} from 'marked'

export default {
  name: "explainCard",

  props: {
    explain: {
      type: Object
    }
  },
  mounted() {
    //console.log(marked("# Hello World"))
  },
  methods: {
    marke(val) {

      if (!val) return "";
      //console.log(val)
      let str = marked(val).replace("<code>", "<span>")
      //console.log(str)
      str = str.replace(/<p>/g, "<p style='margin-block-start: 0;margin-block-end: 0;'>")
      // str = str.replace("</pre>", "")
      // str = str.replace("<pre>", "")
      // str = str.replace(/\*\*([^\*]+)\*\*/g, '<span class="em">$1</span>');
      // //console.log(str.replace(/\n/g, "&#10;"))
      // str = str.replace(/\n/g, "<br/>")
      console.log(str)
      return str

      //return marked.parse(val)
    }
  }
}
</script>

<style scoped lang="less">
.explainCard {
  width: calc(100% - 20px);
  height: 300px;
  margin-left: 20px;
  border-radius: 30px;
  background: #FFF;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);

  .explainTitle {
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: 60px; /* 91.667% */
  }

  .showExplain {
    width: calc(100% - 60px);
    margin: auto;
    min-height: 50px;
    height: auto;
    border-radius: 3px;
    //border-left: #a378fc solid 3px;
    //background: #f5f9ff;
    text-align: left;
    max-height: 200px;
    overflow: auto;
    position: relative;
    font-size: 23px;

    span {
      color: #a378fc;
    }


  }


}

.p {
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
}

.em {
  font-style: italic !important;
  font-size: 25px !important;
  font-weight: 600 !important;
}
</style>
