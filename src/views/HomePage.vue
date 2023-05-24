<template>
    <div style="margin-top: 40px;" >
        <div class="chat_room"  >
            <div style="height:610px;overflow-y: auto" ref="bottom">
                <div v-for="item in history_message" :key="item"  class="messages" style="display: flex;">
                    <div v-if="'rbt'==item.target" class="message" style="margin-top: 20px;margin-left: 10px;background-color: transparent;">
                        <img style="border-radius: 50%;width: 50px;height: 50px;border: solid 0.01cm;" src="https://img95.699pic.com/element/40119/1268.png_300.png" alt="">
                        <div style="margin-top: -50px;background-color: rgb(254, 254, 254);max-width: 910px;margin-left: 60px;padding: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;">
                            <span style="white-space: normal; word-break:break-all;display: inline;">{{ item.text }}</span>
                        </div>
                    </div>
                    <div v-else style="width: 100%;margin-top: 20px;;">
                        <img style="display: inline;float:right;margin-right: 10px;border-radius: 50%;width: 50px;height: 50px;border: solid 0.01cm;" src="https://ts3.cn.mm.bing.net/th?id=OIP-C.z14sN0yiNEyPL7GjoAQ5kAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="">
                        <div style="display: inline;float:right;margin-right: 5px;margin-top: 10px;background-color: rgb(223, 244, 250);max-width: 500px;;padding: 10px;;border: solid rgb(202, 229, 250) 0.05cm;border-radius: 10px;">
                            <span style="white-space: normal; word-break: break-all;;">{{ item.text }}</span>
                        </div>
                    </div>
                </div>
                <br>
            </div>
            
            <div class="send" style="border-top: solid 0.01cm;;border-top: solid 0.01cm;height:max-content">
                <div class="input_line" style=";padding: 1px">
                    <img class="sendIcon" @click="toSubmit" style="float: right;margin-right: 20px;margin-top: 10px;width: 30px;height: 30px" src="https://s1.chu0.com/src/img/png/c3/c399e4dbae444a81a29d0da864e9a27f.png?imageMogr2/auto-orient/thumbnail/!240x240r/gravity/Center/crop/240x240/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:9SJ9o7A8uwy74jguR72g6MXOB_I=" alt="">
                </div>
                <el-input
                    v-model="textarea"
                    :rows="2"
                    type="textarea"
                    placeholder="请输入"
                    class="deep"
                    resize="none"
                    style=";width: 92%;margin-left:1%"
                    @keyup.enter="toSubmit"
                />
                
            </div>
        </div>
        <div class="key_words">
            <div class="dictionary" style="text-align: left;">
                <br>
                <div style="padding-left: 20px;padding-right: 20px;">
                    <div>
                        <el-tag class="ml-2" type="warning" size="large">单词预览：</el-tag>
                    </div>
                    <el-row :gutter="12"  v-for="word in word_list" :key="word">
                        <el-col style="height: 40px;">
                        <el-card class="word" shadow="hover" style="height: 40px;">
                            <span style="margin-top: 10px;">{{word}} </span>
                        </el-card>
                        </el-col>
                    </el-row>   
                    <div>
                        <el-button v-if="vis" type="primary" style="margin-left: 71%;margin-top: 10px" @click="change_word">换一换</el-button>
                    </div>
                </div>
            </div>
            <div class="deeppadding" style=";border-top: solid 0.05cm;margin-top: 10px;width: 100%;">
                <div style="text-align: center;">
                        <h4>助手tips</h4>
                    </div>
                <div ref="ad_btm" style="overflow-y: auto;height: 280px;width: 22.8%;padding: 0;position: absolute;">
                    
                    <div v-for="item in as_message" :key="item" >
                        <div style="margin-top: 20px;margin-left: 10px;background-color: transparent;">
                            <img style="border-radius: 50%;width: 50px;height: 50px;border: solid 0.01cm;" src="https://bpic.51yuansu.com/pic3/cover/02/57/45/59fb7bb94239b_610.jpg" alt="">
                            <div style="margin-top: -50px;background-color: rgb(223, 244, 250);max-width: 70%;margin-left: 60px;padding: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;">
                                <span style="white-space: normal; word-break: break-all;;">{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted,onUpdated } from 'vue'
const textarea = ref('')
const word_list = ref(['apple','flask','redis','surface','compute'])
const bottom = ref()
const ad_btm = ref()
const vis = ref('true')
const history_message = ref([
    // {
    //     target:'rbt',
    //     text:"Let's start learning the first word,could you give me a sentence include 'hello'"
    // },
    // {
    //     target:'user',
    //     text:'hello world'
    // },
    // {
    //     target:'user',
    //     text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    // },
    // {
    //     target:'rbt',
    //     text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    // },
])
const as_message = ref([
    // {
    //     text:"ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid",
    // },
    // {
    //     text:"ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid"
    // },
    // {
    //     text:"ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid"
    // },
    // {
    //     text:"ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid"
    // }
])
const scrollToBottom = () => {
      bottom.value.scrollTop = bottom.value.scrollHeight // 将滚动条设置到最底部
    }

const scrollToBottomAd = () => {
    ad_btm.value.scrollTop = ad_btm.value.scrollHeight
}
const toSubmit=()=>{
    if(!textarea.value){
        alert("发送内容为空！")
    }else{
        history_message.value.push({
            target:'user',
            text:textarea.value
        })
        getMessage()
        textarea.value =""
    }
    scrollToBottom()
    scrollToBottomAd()
    
}
onUpdated(() => {
    bottom.value.scrollTop = bottom.value.scrollHeight // 组件更新后也将滚动条设置到底部
    scrollToBottom()
    scrollToBottomAd()
})
onMounted(() => {
    scrollToBottom()
    axios({
        url:"/dev-api/word",
        method:'GET'
    }).then((res)=>{
        localStorage.setItem("token",res.data.data.token)
        word_list.value = res.data.data.words
        getMessage()
    })
})
const getMessage=()=>{
    axios({
        url:"/dev-api/ask",
        headers:{
            'token':localStorage.getItem("token"),
            'Content-Type':'application/json;charset=utf-8'
        },
        method:'POST',
        data:{
            ask:textarea.value
        }
    }).then((res)=>{
        let s = {
            'target':'rbt',
            'text':res.data.data.chat
        }
        history_message.value.push(s)
        let xx = {
            'text':res.data.data.check
        }
        if (xx.text != null) {
            as_message.value.push(xx)
        }
    })
}
const change_word=()=>{
    axios({
        url:"/dev-api/word",
        method:'GET',
        headers:{
            'token':localStorage.getItem("token")
        }
    }).then((res)=>{
        word_list.value = res.data.data.words
        vis.value = false
        history_message.value = []
        as_message.value = []
        getMessage()
    })
}
</script>

<style lang="scss" scoped>
.chat_room{
    margin-left: 3%;
    width: 70%;
    height: 670px;
    border: solid 0.01cm;
    border-top-left-radius: 20px;

    

    
}
.key_words{
    width: 23%;
    margin-top: -671px;
    margin-left: 73.5%;
    height: 670px;
    border: solid 0.01cm;
    border-top-right-radius: 20px;
}

.deep{
    :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    resize: none;
  }
}
.sendIcon:hover{
    cursor: pointer;
}
.word:hover{
    cursor: pointer;
}
:deep(.el-card__body){
    padding-top: 10px;
}
:deep(.data-v-c6bdc170){
    padding-bottom: 0;
}
</style>