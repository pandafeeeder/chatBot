<template>
    <div class="t-center l-28 p-t-60 bg-sec p-b-60">
        <div class="p-l-20 p-r-20 w-m m-auto t-l text-al">
            <el-text class="" size="large">欢迎来到这里！<br>
                本网站使用openai的ChatGPT模型api，支持AI对话和英语语法纠正。<br />
                点击下方链接即可使用！
                <br />
            </el-text>
            <br />
            <br />

            <el-row class="row-bg" justify="center" :gutter="12">
                <el-col :xs="12" :sm="8" class="t-center"><a class="t-c f-24 t-center " href="/chat">&#x1F916
                        ChatGPT&#x2197</a></el-col>
                <el-col :xs="12" :sm="8" class="t-center"><a class="t-c f-24 t-center " href="/edit">&#x1F4DD
                        ChatGPT-edit&#x2197</a></el-col>
            </el-row>
            <br />
            <el-text class="m-t-20" >
                运营和维护需要时间、精力，还有服务器和api的费用，全部用爱发电着实艰难。
            </el-text>
            <br />
            <el-text size="large" tag="b">
                如果您愿意慷慨解囊,可以通过下方的二维码进行赞助。&#x1F64F
            </el-text>
            <br/>
            <el-text>
                您的赞助和支持可以帮助我继续，以及改进网站的功能和服务。
            </el-text>
        </div>
        <img src="../assets/alipay.png" alt="" width="150" height="150" />
        <el-row class="row-bg p-t-30" justify="center" :gutter="12">
            <el-col :xs="8" :sm="4"><a class="t-c a-n" href="/Privacy">隐私说明</a></el-col>
            <el-col :xs="8" :sm="4"><a class="t-c a-n" href="/Feedback">问题反馈</a></el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
@media only screen and (min-width: 768px) {
    .text-al {
        text-align: center !important;
    }

    img {
        margin-top: 80px;
    }
}
</style>
