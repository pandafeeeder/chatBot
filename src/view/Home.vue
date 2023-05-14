<template>
  <div class="head"></div>
  <div class="t-center l-28 p-t-6 bg-sec p-b-36">
    <div class="p-l-20 p-r-20 w-m m-auto t-l text-al t-center t-c">
    <div style="height:300px">
      <img src="../assets/logo.png" width="300" height="300" alt="" />
    </div>
      <h1 class="t-c main-title">Pandafeeder.AI</h1>
    </div>
    <br />
    <el-row>
      <el-col :xs="24" class="m-t-18"><a href="/Chat" class="t-c f-26">ChatGpt</a></el-col>
      <el-col :xs="24" class="m-t-36"
        ><a href="/Purchase" class="t-c f-26">付费计划</a></el-col
      >
    </el-row>
    <el-row class="row-bg p-t-30" justify="center" :gutter="12">
      <el-col :xs="24" :sm="24" class="t-c"
        >使用前请阅读<a class="t-c a-n" href="/Privacy">《隐私说明》</a> <a href="/help" class="t-c a-n">《帮助说明》</a> </el-col
      >
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
.main-title {
  font-family: Arial, Georgia, Roboto, Lato;
}
.head{
  background: red;
}
</style>
