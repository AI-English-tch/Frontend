<template>
  <div class="layout-main-side dark flex-shrink-0 overflow-x-hidden shadow h-full self-rt" style="width: 260px;">
    <div class="flex h-full min-h-0 flex-col ">
      <nav class="flex flex-col w-full h-full ">
        <div class="p-4">
            <a
            class="flex self-st py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 mb-1 flex-shrink-0">
            Choose Words
            <img src="../assets/images/choose-book.svg" class="book" alt="">
            </a>
        </div>

        <div class="flex flex-col flex-1  overflow-y-auto">
          <div class="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            <div>
              <div class="relative">
                <div class="sticky top-0 z-[16] mb-4 pr-4 pl-4">
                  <div class="line"></div>
                </div>
                <ol>
                    <div v-for="(item) in customerBookList" :key="item.id" :class="item.id === currentSelectedSideBarItem?.id ? 'active' : ''">
                        <li class="relative border mb-3 mr-1 ml-1" >
                            <div class="del-book-btn" @click="openDelBookBox(item)"><el-icon><CloseBold /></el-icon></div>
                            <a @click="changeBook(item)"
                            class="flex py-3 px-3 items-center justify-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all !hover:pr-4 bg-transparent group transition-colors group">
                            <div class="flex-1 align-center text-ellipsis max-h-5 overflow-hidden break-all relative" >
                                {{item.text}}
                            </div>
                            </a>
                        </li>
                    </div>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-center mb-16">
            <el-button @click="openAddBookBox">新增词书</el-button>
          </div>
          <div class="flex justify-between mb-4">
            <el-button :icon="User" class="ml-4">关于</el-button>
            <el-button :icon="Document" class="mr-4">教程</el-button>
          </div>
          <div class="border-t border-white/20 pt-2">
            <div class="group relative">
              <div
                class="flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors duration-200 group-ui-open:bg-gray-800">
                <el-avatar shape="square" class="-ml-0.5 w-5 flex-shrink-0" :size="20">A</el-avatar>
                <div class=" overflow-hidden text-ellipsis whitespace-nowrap text-left text-white" style="flex-grow: 1;">
                  {{userName}}
                </div>
                <button>
                  <el-icon @click="showWrapContent = !showWrapContent" class="relative h-4 w-4 flex-shrink-0 !text-gray-500">
                    <More />
                  </el-icon>
                </button>
                <button v-if="showWrapContent" @click="userLogout" class="wrapBox">退出登陆</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <!--  新增词书确认框-->
  <el-dialog v-model="addBoxVisible" :before-close="addBoxOnCancel" title="新增词书">
    <el-form :model="form">
      <el-form-item label="词书名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="选择词库" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择词库">
          <template v-for="(item) in bookSelectList">
            <el-option :label="item.label" :value="item.value" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addBoxOnCancel">取消</el-button>
        <el-button type="primary" @click="addBoxOnOk">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
<!--  删除词书确认框-->
  <el-dialog v-model="delBoxVisible" :before-close="delBoxOnCancel" title="删除词书">
    <span class="dialog-footer">
      确认删除当前词书吗
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delBoxOnCancel">取消</el-button>
        <el-button type="primary" @click="delBoxOnOk">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import useStore from "@/store/index"
import { addByStore,fetchList,fetchPublicBookList, delObjs } from "@/api/book";
import {getUserInfo} from "@/api/public/user";
import { useMessage } from '@/hooks/message';
import { More, User, Document } from "@element-plus/icons-vue"
import { Session } from "@/utils/storage";
import { CloseBold } from "@element-plus/icons-vue";
import {storeToRefs} from "pinia";
const router = useRouter();
const store = useStore();
const { sideBarStore } = store;
const { currentSelectedSideBarItem } = storeToRefs(sideBarStore)
const addBoxVisible = ref(false);
const delBoxVisible = ref(false);
const showWrapContent = ref(false);
const form = ref({});
const customerBookList = ref([]);
const bookSelectList = ref([]);
const userName = ref('');
const delBookIds = ref([]);
const formLabelWidth = '140px';

onMounted(async () => {
  const res = await getUserInfo();
  const val = res.data?.appUser?.username || '';
  userName.value = val
  await loadUserBook(val)
})

// 获取用户词书
const loadUserBook = (username) => {
  fetchList({createBy: username}).then(res => {
    const arr = [];
    res.data.forEach((item) => {
      arr.push({
        text: item.name,
        id: item.id,
        words:[], //词书缓存单词
      })
    })
    customerBookList.value = arr;
    // sideBarStore.handleChangeSide(customerBookList.value[0]); // 用户自己的词书初始默认选中第一个
  }).catch((err: any) => {
    useMessage().error(err.msg)
  })
}

const changeBook = (current) => { //切换词书
  sideBarStore.handleChangeSide(current); //将用户当前选中的词书存入全局变量
}

const openAddBookBox = () => {
  addBoxVisible.value = true;
  fetchPublicBookList({}).then(res => {
    const arr = [];
    res.data.forEach((item) => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    })
    bookSelectList.value = arr;
  })
}

const openDelBookBox = (current) => {
  delBookIds.value = [current.id];
  delBoxVisible.value = true;
}

const addBoxOnOk = () => {
  const data = {
    storeId: form.value.region,
    name:form.value.name,
  };
  addByStore(data).then(res => {
    useMessage().success('添加成功');
    loadUserBook(userName.value) // 刷新用户自己的词书列表
  })
  addBoxVisible.value = false;
}

const addBoxOnCancel = () => {
  addBoxVisible.value = false;
}

const delBoxOnOk = () => {
  delObjs(delBookIds.value).then(res => {
    useMessage().success('删除成功');
    loadUserBook(userName.value) // 刷新用户自己的词书列表
    if(delBookIds.value[0] === currentSelectedSideBarItem.value.id) {
      sideBarStore.handleChangeSide(''); //当前选中词书被删除时将全局变量置空
    }
  })
  delBoxVisible.value = false;
}

const delBoxOnCancel = () => {
  delBoxVisible.value = false;
}

const userLogout = () => { // TODO 退出登陆
  router.push('/login');
}

</script>
<style lang="scss">
.layout-main-side {
  background: linear-gradient(151.64103655387deg, rgba(0, 0, 0, 1) 18%, rgba(0, 40, 77, 1) 58%);
  border-radius: 19px 19px 0 0;
  .self-st {
    background-color: #02294c;
    position: relative;
    .book {
        width: 40px;
        position: absolute;
        right: 0;
    }
  }
  .line{
    width: 100%;
    height: 0;
    border-bottom: 1px solid rgba(243, 243, 243, 0.7058823529411765);
  }
  .active {
    a {
      background-color: rgba(42, 43, 50, 1);
    }
  }
  .border{
    border: 1px solid rgba(243, 243, 243, 0.7058823529411765);
    border-radius: 8px;
    text-align: center;
    position: relative;
    &:hover {
      .del-book-btn {
        display: block;
      }
    }
  }
  .del-book-btn {
    display: none;
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 3;
    cursor: pointer;
  }
  .wrapBox {
    position: absolute;
    background-color: #fff;
    top: -22px;
    right: 16px;
    line-height: 18px;
    padding: 6px 12px;
    border-radius: 4px;
  }
}
</style>
