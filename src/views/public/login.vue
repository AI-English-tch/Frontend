<template>
    <div class="login_page flex flex-col justify-center items-center relative">
        <div class="login_container flex flex-1 relative overflow-hidden h-full">
            <div class="left relative z-2 flex justify-center items-center">
                <!-- <img class="absolute bg" src="@/assets/login_bg.png"> -->
                <div class="logo relative">
                    <img src="@/assets/user.jpg">
                    <p class="font-bold text-white">Word Talk</p>
                </div>
            </div>
            <div class="right flex flex-col flex-1 items-center justify-center relative bg-white">
                <h1 class="mb-1">欢迎!</h1>
                <p class="mb-5">WordTalk AI英语学习助手</p>
                <el-form size="large" ref="loginFormRef" :rules="loginRules" :model="state.ruleForm" @keyup.enter="onSignIn">
                    <div class="account w-120">
                        <el-form-item class="login-animation1" prop="username">
                            <div class="label">账号</div>
                            <el-input class="my-2 w-100" size="large" v-model="state.ruleForm.username" placeholder="Email" autocomplete="off" :prefix-icon="Message"/>
                        </el-form-item>
                        <el-form-item class="login-animation1" prop="password">
                            <div class="label">密码</div>
                            <el-input class="my-2 2-100" size="large" v-model="state.ruleForm.password" placeholder="Password" :prefix-icon="Lock" show-password />
                        </el-form-item>
                    </div>
                    <div class="login-btn w-120 flex justify-between items-center p-1">
                        <el-switch v-model="keep" style="--el-switch-on-color: #283961;--el-switch__label-color: #283961;" active-text="Keep me signed in" />
                        <a class="forget">Forget your Password?</a>
                    </div>
                    <el-form-item>
                        <el-button color="#283961" class="sign w-120 mt-5" size="large" :disabled="state.ruleForm.username === '' || state.ruleForm.password === ''" @click="onSignIn">Sign In</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <p class="absolute text-gray-300 bottom-0 py-3">English conversations that bring you the best experience</p>
    </div>
</template>
<script lang="ts" setup>
import { Message, Lock } from '@element-plus/icons-vue'
import { useUserInfo } from '@/stores/userinfo';
import { formatAxis } from '@/utils/formatTime';
import { useMessage } from '@/hooks/message';
const router = useRouter();
const loading = ref(false);
const keep = ref(true)

const state = reactive({
	isShowPassword: false, // 是否显示密码
	ruleForm: {
		// 表单数据
		username: '', // 用户名
		password: '', // 密码
	},
});

const loginRules = reactive({
	username: [{ required: true, trigger: 'blur', message: '请输入用户名' }], // 用户名校验规则
	password: [{ required: true, trigger: 'blur', message: '请输入密码' }], // 密码校验规则
});


// 账号密码登录
const onSignIn = async () => {
	loading.value = true; // 正在登录中
	try {
		await useUserInfo().login(state.ruleForm); // 调用登录方法
		signInSuccess(); // 触发事件
	} finally {
		loading.value = false; // 登录结束
	}
};
// 登录成功后的跳转处理事件
const signInSuccess = async () => {
    // 初始化登录成功时间问候语
    let currentTimeInfo = formatAxis(new Date());
    router.push('/home');
    // 登录成功提示
    const signInText = '登录成功';
    useMessage().success(`${currentTimeInfo}，${signInText}`);
};
</script>
<style lang="scss">
.login_page {
    background-color: #efffff;
    min-height: 100vh;
    height: 100%;
    .login_container {
        background: #fff;
        box-shadow: 0 2px 12px rgba(0, 0, 0, .06);
        border-radius: 20px;
        width: 100%;
        height: 100%;
        max-width: 1010px;
        max-height: 616px;

        .left {
            background: #f2f5f8;
            background-image: linear-gradient(to right bottom, #222653, #3fbcbc);
            width: 434px;
            z-index: 2;

            .logo {
                background-image: linear-gradient(#70a2e0, #5eb3bd);
                padding: 20px;
                border-radius: 70px;
                text-align: center;
                font-size: 32px;
            }

            .bg {
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
            }
        }

        .right {
            padding: 16px 16px 28px;
            .el-switch__label{
                color: #dcdfe6;
            }
            .el-switch__label.is-active{
                color: #222653;
            }
            h1 {
                font-size: 42px;
                line-height: 56px;
                font-weight: 700;
            }

            p {
                font-size: 20px;
            }
            .sign{
                height: 45px;
            }
        }
    }
}
</style>
