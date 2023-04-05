<template>
    <div class="t-center l-28 p-t-60 bg-sec p-b-60">
        <div class="p-l-20 p-r-20 w-m m-auto t-l text-al">
            <el-text class="" size="large">欢迎来到我的个人网站！ 我非常感激您的访问和支持。
                本网站是使用openai公司的api来调用chatgpt模型，致力于帮助大家了解和试用最先进的AI技术。<br />
                最近openai在大面积封禁账号，且用且珍惜！
                <br />
            </el-text>
            <br />
            <br />

            <el-row class="row-bg" justify="center" :gutter="12">
                <el-col :xs="12" :sm="8" class="t-center"><a class="t-c f-24 t-center a-n" href="/#/chat">&#x1F916 进入对话&#x2197</a></el-col>
            </el-row>
            <br />
            <br />
            <br />
            <el-text class="m-t-20" size="large" tag="b">
                网站的运营和维护需要时间、精力，当然还有服务器和api的费用，全部用爱发电着实艰难。<br />
                如果您认可本网站的服务并愿意慷慨解囊可以通过下方的二维码进行赞助。&#x1F64F<br />
                您的赞助和支持可以帮助我继续提供高质量的内容和服务，以及改进我的网站的功能和服务。
            </el-text>
        </div>
        <img src="../assets/alipay.png" alt="" width="150" height="150" />
        <el-row class="row-bg p-t-30" justify="center" :gutter="12">
            <el-col :xs="8" :sm="4"><a class="t-c" href="/#/Privacy">隐私说明</a></el-col>
            <el-col :xs="8" :sm="4"><a class="t-c" href="/#/Chat">问题反馈</a></el-col>
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
