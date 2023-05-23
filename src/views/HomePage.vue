<template>
    <div style="margin-top: 70px;" >
        <div class="chat_room"  >
            <div style="height:540px;overflow-y: auto" ref="bottom">
                <div v-for="item in history_message" :key="item"  class="messages" style="display: flex;">
                    <div v-if="'rbt'==item.target" class="message" style="margin-top: 20px;margin-left: 10px;background-color: transparent;">
                        <img style="border-radius: 50%;width: 50px;height: 50px;border: solid 0.01cm;" src="https://ts3.cn.mm.bing.net/th?id=OIP-C.z14sN0yiNEyPL7GjoAQ5kAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="">
                        <div style="margin-top: -50px;background-color: rgb(223, 244, 250);max-width: 500px;margin-left: 60px;padding: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;">
                            <span style="white-space: normal; word-break: break-all;;">{{ item.text }}</span>
                        </div>
                    </div>
                    <div v-else style="width: 100%;margin-top: 20px;;">
                        <img style="display: inline;float:right;margin-right: 10px;border-radius: 50%;width: 50px;height: 50px;border: solid 0.01cm;" src="https://ts3.cn.mm.bing.net/th?id=OIP-C.z14sN0yiNEyPL7GjoAQ5kAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="">
                        <div style="display: inline;float:right;margin-right: 5px;margin-top: 10px;background-color: rgb(223, 244, 250);max-width: 500px;;padding: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;">
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
                    style=";width: 93%;"
                    @keyup.enter="toSubmit"
                />
                
            </div>
        </div>
        <div class="key_words">
            <div class="dictionary" style="text-align: center;">
                <!-- <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                    <el-option
                    v-for="item in dictionaries"
                    :key="item"
                    :label="item"
                    placeholder="请选择"
                    :value="item"
                    />
                </el-select> -->
                <br>
                <div>
                    <div v-for="word in word_list" :key="word">
                        <span>{{ word }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted,onUpdated } from 'vue'
const textarea = ref('')
const word_list = ref(['apple','pine','okk','jkl','qwer'])
//const dictionaries = ref(['六级词典','四级词典','考研词典','考公词典'])
const bottom = ref()
const history_message = ref([
    {
        target:'rbt',
        text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    },
    {
        target:'user',
        text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    },
    {
        target:'user',
        text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    },
    {
        target:'rbt',
        text:'ifsnglnslkfsfksfnskglnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfsfksfnsk.fns.glnslkfs;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;;border: solid rgb(207, 229, 246) 0.05cm;border-radius: 10px;fksfnsk.fns..fnsglnslkfsfksfnsk.fns..fs'
    },
])
const scrollToBottom = () => {
      bottom.value.scrollTop = bottom.value.scrollHeight // 将滚动条设置到最底部
    }
const toSubmit=()=>{
    if(!textarea.value){
        alert("发送内容为空！")
    }else{
        history_message.value.push({
            target:'rbt',
            text:textarea.value
        })
        textarea.value =""
    }
    scrollToBottom()

    
}
onUpdated(() => {
    bottom.value.scrollTop = bottom.value.scrollHeight // 组件更新后也将滚动条设置到底部
    scrollToBottom()
})
onMounted(() => {
    scrollToBottom()
})
</script>

<style lang="scss" scoped>
.chat_room{
    margin-left: 7%;
    width: 60%;
    height: 600px;
    border: solid 0.01cm;
    border-top-left-radius: 20px;
    background-color: rgb(250, 250, 250);;
    

    
}
.key_words{
    width: 23%;
    margin-top: -601px;
    margin-left: 67.5%;
    height: 600px;
    border: solid 0.01cm;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
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
</style>