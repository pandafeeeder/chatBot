<template>
  <div style="max-width: 1080px; text-align: center; margin: auto">
    <el-row v-if="true">

      <el-col :span="24" class="p-t-30">
        <el-radio-group v-model="radio1" class="radio">
          <el-row>
            <el-col :span="24" style="text-align: center; padding-top: 10px">
              <el-radio label="1" size="large" Key="1" border style="height: 60px; width: 288px; text-align: left">
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">基础版</h4>
                      <p style="margin: 0; padding: 0">GPT-3.5模型（500次对话）</p>
                    </div>
                  </el-col>
                  <el-row :span="4">
                    <div style="line-height: 38px; position: relative; left: 36px">
                      ￥10
                    </div>
                  </el-row>
                </el-row>
              </el-radio>
            </el-col>
            <el-col :span="24" style="text-align: center; padding-top: 10px">
              <el-radio label="2" size="large" Key="2" border style="height: 60px; width: 288px; text-align: left">
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">升级版</h4>
                      <p style="margin: 0; padding: 0">GPT-3.5模型（1200次对话）</p>
                    </div>
                  </el-col>
                  <el-row :span="4">
                    <div style="line-height: 38px; position: relative; left: 26px">
                      ￥20
                    </div>
                  </el-row>
                </el-row>
              </el-radio>
            </el-col>
            <el-col :span="24" style="text-align: center; padding-top: 10px">
              <el-radio label="3" size="large" Key="3" border style="height: 60px; width: 288px; text-align: left">
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">超级版</h4>
                      <p style="margin: 0; padding: 0">GPT-3.5模型（3000次对话）</p>
                    </div>
                  </el-col>
                  <el-row :span="4">
                    <div style="line-height: 38px; position: relative; left: 22px">
                      ￥50
                    </div>
                  </el-row>
                </el-row>
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
        <div style="margin-top: 20px">
          <div style="width: 288px; margin: auto; text-align: right">
            <img src="../assets/ap.svg" height="50" alt="" srcset="" />
            <el-button type="primary" :loading="loading" style="position: relative; top: -23px" @click="preCreate">{{
              loading ? "请稍后" : "购买" }}</el-button>
            <div class="t-c f-14 t-r">
              购买前请务必查看<a href="/help" target="_blank" class="a-n t-c">《帮助说明》</a>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

const prop = defineProps(["status"]);
const loading = ref(false);

const emit = defineEmits(["getQR"]);
const preCreate = () => {
  loading.value = true;
  emit("getQR", radio1.value);
};

const radio1 = ref("1");
</script>
<style scoped>
@media (max-width: 750px) {

  /* 当屏幕宽度小于或等于750px时，隐藏div */
  .xs-block {
    display: none !important;
  }
}

@media (min-width: 751px) {

  /* 当屏幕宽度大于或等于751px时，显示div */
  .sm-block {
    display: none !important;
  }
}

* {
  transition: none !important;
}
</style>
