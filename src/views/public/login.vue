<template>
    <div class="login_page flex justify-center items-center">
        <div class="login_container flex flex-1 relative overflow-hidden h-full">
            <div class="left relative z-2">12</div>
            <div class="right flex flex-col flex-1 items-center justify-center relative bg-white">
                <h1 class="font-bold">欢迎!</h1>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {

}
</script>
<style lang="scss">
.login_page {
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
            width: 434px;
            z-index: 2;
        }

        .right {
            padding: 16px 16px 28px;
            h1 {
                font-size: 38px;
                line-height: 56px;
            }
        }
    }
}
</style>