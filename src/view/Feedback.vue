<template>
  <div class="p-l-20 p-r-20 p-t-60 w-f w-m bbox bg-sec">
    <el-text size="large">更多功能还在开发中。</el-text>
    <el-text size="large"
      >如果你有什么想法，欢迎在下方反馈,我将在本页面不定期回复。</el-text
    >
    <br />
    <div class="w-m m-auto footer-wrapper w-f bbox p-t-90">
        <el-text v-if="!showInput">收到，感谢！</el-text>
      <div class="footer w-m flex w-f bbox" v-if="showInput">
        <input-box
          v-if="showInput"
          :status="status"
          :max="100"
          :placeholder="'说点啥...'"
          class="flex-1"
          @send="send"
          ref="msgBox"
        ></input-box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputBox from "../components/InputBox.vue";
import { fd } from "../service";

const showInput = ref(true);
const status = ref(false);

const send = (msg) => {
  status.value = true;
  fd(msg.value).then((res) => {
    if (res.data == "ok") {
      showInput.value = false;
    }
  });
};
</script>

<style scoped>
.footer-wrapper {
  position: relative;
}

.footer {
  position: absolute;
  top: 40%;
}
</style>
