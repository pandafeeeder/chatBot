<template>
  <div>
    <el-dialog
      v-model="props.showDialog"
      style="max-width: 388px"
      width="90%"
      title=""
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row class="sponsor">
        <el-col :xs="24" :sm="24">
          <a href="https://qr.alipay.com/fkx14031qhnk4rcrofztpff">
            <!-- <img src="../assets/alipay.png" alt="" width="200" height="200" /> -->
          </a>
        </el-col>
        <!-- <el-col :xs="12" :sm="12"
          ><img src="../assets/wechat.png" alt="" width="150" height="150"
        /></el-col> -->
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">下次吧</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps(["showDialog"]);
const emit = defineEmits(["close"]);
const close = () => {
  emit("close", false);
};
</script>

<style scoped lang="scss">
.sponsor .el-col {
  img {
    display: inline-block;
  }
  text-align: center;
}
</style>
