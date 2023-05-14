<template>
  <div style="max-width: 1080px; text-align: center; margin: auto">
    <el-row v-if="true">
      <el-col :xs="24" :sm="12" class="xs-block">
        <div style="width: 288px; text-align: left; margin: auto; margin-top: 40px">
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">token：</span>
            付费版每次对话消耗token，购买后立即生效，有效期3个月，可根据使用频率购买不同套餐。 </el-text
          ><br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">1k token：</span>
            即1000token，大约750英文单词或500汉字，具体以OpenAI接口为准。 </el-text
          ><br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">Prompt与Completion：</span>
            Prompt即是输入，Completion是指模型根据prompt生成的输出，连续对话会消耗更多token。
          </el-text>
          <br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">模型：</span>
            GPT-3.5为上一代模型，最大输出为4k token；GPT-4为最新模型，GPT-4
            分为8k与32k版本，表示最大输出token；对比GPT-3.5，相同对话，8k消耗量为其20倍，32k为40倍。
          </el-text>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-radio-group v-model="radio1" class="radio">
          <el-row>
            <el-col :span="24" style="text-align: center; padding-top: 30px">
              <el-radio
                label="1"
                size="large"
                Key="1"
                border
                style="height: 60px; width: 288px; text-align: left"
              >
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">基础版</h4>
                      <p style="margin: 0; padding: 0">200k token（约500次对话）</p>
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
              <el-radio
                label="2"
                size="large"
                Key="2"
                border
                style="height: 60px; width: 288px; text-align: left"
              >
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">升级版</h4>
                      <p style="margin: 0; padding: 0">400k token（约1000次对话）</p>
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
              <el-radio
                label="3"
                size="large"
                Key="3"
                border
                style="height: 60px; width: 288px; text-align: left"
              >
                <el-row>
                  <el-col :span="20">
                    <div>
                      <h4 style="margin: 0; padding: 0">超级版</h4>
                      <p style="margin: 0; padding: 0">1000k token（约2500次对话）</p>
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
            <el-button
              type="primary"
              :loading="loading"
              style="position: relative; top: -23px"
              @click="preCreate"
              >{{ loading ? "请稍后" : "购买" }}</el-button
            >
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" class="sm-block">
        <div style="width: 288px; text-align: left; margin: auto; margin-top: 60px">
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">token：</span>
            付费版每次对话消耗token，购买后立即生效，有效期3个月，可根据使用频率购买不同套餐。 </el-text
          ><br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">1k token：</span>
            大约750英文单词或500汉字，具体以OpenAI接口为准。 </el-text
          ><br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">Prompt与Completion：</span>
            Prompt即是输入，Completion是指模型根据prompt生成的输出。
          </el-text>
          <br />
          <el-text size="small" type="info">
            <span style="font-weight: 500; color: #333">模型：</span>
            GPT-3.5为上一代模型，最大输出为4k token；GPT-4为最新模型，GPT-4
            分为8k与32k版本，表示最大输出token；对比GPT-3.5，相同对话，8k消耗量为其20倍，32k为40倍。
          </el-text>
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
