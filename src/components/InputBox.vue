<template>
  <div class="box bg shadow w-m" style="margin: auto" @click="focus">
    <textarea
      id="message"
      @input="adjustTextareaHeight"
      style="max-height: 200px; min-height: 24px; overflow-y: hidden"
      rows="1"
      class="message-box bg t-c"
      :maxlength="props.max || 200"
      v-model="value"
      @keydown.enter="send"
      :disabled="props.status"
      :placeholder="props.placeholder || '问点什么...'"
      ref="msgBox"
      type="text"
      enterkeyhint="send"
      dir=""
      autofocus=""
      autocapitalize="off"
      autocomplete="off"
      aria-autocomplete="both"
      spellcheck="false"
      aria-label="问点什么"
      autocorrect="off"
    ></textarea
    ><button class="btn" @click="send" :disabled="props.status">
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-1"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
    <div class="hint t-c p-t-5 f-14" :style="`height:${value.trim() !== '' ? 20 : 0}px`">
      {{ value.length }}/200
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["status", "max", "placeholder"]);

const value = ref("");
const msgBox = ref(null);
const emit = defineEmits(["send"]);

defineExpose({
  value,
});
const focus=()=>{
  msgBox.value.focus()
}
const send = (e) => {
  if (e.shiftKey) {
    return;
  }
  emit("send", value);
};

const adjustTextareaHeight = () => {
  msgBox.value.style.height = "auto";
  msgBox.value.style.height = msgBox.value.scrollHeight + "px";
};
</script>
<style lang="scss" scoped>
.box {
  -webkit-text-size-adjust: 100%;
  font-family: Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
    Cantarell, Noto Sans, sans-serif, Helvetica Neue, Arial, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  tab-size: 4;

  border: 0 solid #d9d9e3;
  box-sizing: border-box;

  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  padding-left: 1rem;
  position: sticky;
  bottom: 20px;
  border-radius: 22px;
  &:hover {
    border-radius: 12px;
  }
  .hint {
    height: 0px;
    overflow: hidden;
    color: var(--text-disabled);
  }
  &:hover {
    .hint {
      height: 20px !important;
    }
  }
}

.message-box {
  font-family: inherit;
  font-weight: inherit;
  appearance: none;
  border-color: #8e8ea0;
  border-radius: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0;
  width: calc(100% - 30px);
  resize: none;
  border-width: 0;
  padding: 0;
  padding-right: 1.75rem;
  padding-left: 0;
  max-height: 200px;
  overflow-y: hidden;

  &:hover + .hint {
    height: 20px;
  }
}

.btn {
  border: none;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  margin: 0;
  text-transform: none;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  position: absolute;
  border-radius: 12px;
  padding: 0.25rem;
  color: rgba(142, 142, 160, var(--tw-text-opacity));
  bottom: 0.625rem;
  right: 0.5rem;
}

.btn:disabled {
  filter: blur(1px);
}

.tip {
  color: #a59c94;
  font-size: 12px;
  text-align: center;
}

a {
  color: orange;
}
</style>
