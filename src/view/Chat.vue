<template>
  <div class="home main-bg t-c">
    <div class="header w-m">
      <div class="title t-c l-38">ChatGPT</div>
    </div>
    <div class="content">
      <div class="container talk-box of-h p-b-6" ref="container">
        <div class="p-b-150 of-h">
          <div class="">
            <div v-for="(item, index) in messages" :key="index" :class="{
              'm-t-15': item.role === 'user' && index !== 0,
              'm-b-15': item.role === 'user' && index !== messages.length - 1,
              'p-r-48': item.role !== 'user',
              'p-l-48': item.role === 'user',
            }" class="flex column m-b-20 w-m bbox">
              <div class="flex row t-c" :class="{
                ' p-r-20 j-end  ': item.role === 'user',
                'p-l-20': item.role !== 'user',
              }">
                <div v-if="item.role === 'assistant'"
                  class="shadow flex column br-12 p-l-16 p-t-10 p-r-16 p-b-10 br-12 b-card1 bbox">
                  <div class="l-24 f-16 sec-c">
                    <div v-html="mark(item.content)"></div>
                  </div>
                  <div class="l-24 w-f t-r f-12">
                    {{ index > 0 ? `${item.index - 1}/5` : "" }}
                  </div>
                </div>
                <div v-else class="a-end f-16 l-24 p-l-16 p-t-10 p-r-16 p-b-10 br-12" :class="{
                  ' b-card1 t-c shadow t-l':
                    item.role === 'error' || item.role === 'loading' || item.role === 'error-limit',
                  'b-card2 t-s t-l': item.role === 'user',
                }">
                  <div v-if="item.role === 'error-limit'">{{ item.content }}<br>觉得有用可以<a href="/home" class="tips"
                      @click="support">赞助一下！</a> 您的支持是我继续的动力！ &#x1F64F</div>
                  <div v-else-if="item.role !== 'loading'">{{ item.content }}</div>
                  <div v-if="item.role === 'loading'" class="loading">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                  <span v-if="item.role === 'error'" class="w-5 h-5 br-f bg-error dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer p-l-10 p-r-10 bg-sec bbox w-s">
        <div class="p-t-36 p-b-20 p-l-10 p-r-10 bbox">
          <div class="flex row">
            <button @click="reset" class="bg-third flex j-center a-center m-r-10 w-45 h-45 br-25 custom-btn t-s">
              <img src="../assets/clear.svg" class="icon" alt="">
            </button>
            <input-box class="flex-1" @send="send" :status="status" ref="msgBox"></input-box>
          </div>
        </div>
      </div>
    </div>
    <sponsor :showDialog="showDialog" @close="close"></sponsor>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import { marked } from 'marked';
import prism from 'prismjs';

import InputBox from "../components/InputBox.vue";
import sponsor from '../components/sponsor.vue';
import { fd, qa } from "../service";

const messages = reactive([]);
const status = ref(false);
const msgBox = ref(null);
const ticket = ref(6);
const container = ref(null);
const showDialog = ref(false)

let repeat = 0



marked.setOptions({
  highlight: function (code, lang) {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  }
})

const mark = (msg) => {
  return marked(msg)
}

const send = (value) => {
  if (value.value === "") {
    messages.push({ role: "error", content: "请问有什么可以帮你！" });
    toBottom();

    return;
  }

  if (ticket.value > 5) {
    messages.push({ role: "error-limit", content: "因对话的token费用高，无力负担更多，每天限制5次，请谅解！" });
    toBottom();
    repeat++
    reachEnd(repeat);
    return;
  }
  messages.push({ role: "user", content: value.value });
  messages.push({ role: "loading", content: null });
  status.value = true;
  value.value=''


  const promots = messages
    .slice(1)
    .filter((e) => e.role === "assistant" || e.role === "user");

  const param = promots.map((e) => {
    if (e.role === "assistant" || e.role === "user") {
      return { role: e.role, content: e.content };
    }
  })
  qa(param
  )
    .then((data) => {
      data = data.data;
      if (data.choices && data.choices.length > 0) {
        let answer = data.choices[0].message.content;
        const msg = answer.replace("\\n\\n", "\n");
        messages.pop();
        localStorage.setItem("879rhiw7e3", ++ticket.value);
        messages.push({ role: "assistant", content: msg, index: ticket.value });
      } else {
        const msg = "Oops! something went wrong,try again.";
        messages.pop();
        messages.push({ role: "error", content: msg });
      }
      status.value = false;
      msgBox.value.value = "";
      container.value.scrollTo(0, container.value.scrollHeight);
      toBottom();
    })
    .catch(() => {
      status.value = false;
      const msg = "Oops! something went wrong,try again later.";
      messages.pop();
      messages.push({ role: "error", content: msg });
      toBottom();
    });
};

const reachEnd = (repeat) => {
  fd('max', ticket.value + '-' + repeat)
}

const support = (e) => {
  e.preventDefault();
  showDialog.value = true
  fd('support', ticket.value).catch()
}
const close = () => {
  showDialog.value = false
}

const reset = () => {
  messages.length = 0;
  messages.push({
    role: "assistant",
    content: "你好！我是GPT！",
  });
};

const toBottom = () => {
  nextTick(() => {
    let scrollElem = container.value;
    scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: "smooth" });
  });
};

defineExpose({ messages, ticket });
onMounted(() => {
  messages.push({
    role: "assistant",
    content: "你好！我是ChatGPT！",
  });
  const tickets = localStorage.getItem("879rhiw7e3");
  const preDate = localStorage.getItem("879rhiw7e2");
  const date = new Date().getDate();
  if (date != preDate) {
    ticket.value = 1;
    localStorage.setItem("879rhiw7e2", date);
    localStorage.setItem("879rhiw7e3", 1);
  } else {
    ticket.value = Number(tickets) || 1;
  }
});
</script>

<style scoped lang="scss">
.home {
  margin: auto;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.header {
  height: 46px;
  position: sticky;
  top: 0;
  z-index: 10;
    top: 0px;
}

.content {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  flex: 1 1 0%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: stretch;

  .container {
    height: 100%;
    overflow-y: auto;
    width: 100%;
    flex: 1 1 0%;
  }
}

.talk-box {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  flex: 1;
  padding-bottom: 30px;
}

.bot {
  padding: 10px 20px 10px 10px;
  background-color: var(--el-bg-color-page);
  text-align: left;
  border-radius: 10px;
  margin-bottom: 5px;
  max-width: 100%;
  word-break: break-all;
  position: relative;
  display: flex;
}

.bot span {
  margin-left: 16px;
  padding-bottom: 16px;
}

.avator {
  width: 25px;
  height: 25px;
  background-color: rgb(31, 24, 70);
  border-radius: 2px;
}

.human {
  padding: 10px 0 10px 20px;
  background-color: #fff;
  text-align: right;
  border-radius: 10px;
  margin-bottom: 5px;
  max-width: 100%;
  word-break: break-all;
}

.bot span,
.human span {
  display: inline-block;
  text-align: left;
}

.bot::after {
  content: attr(data-current);
  color: #5e88ad;
}

.custom-btn {
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  text-overflow: clip;
  outline: none;
  cursor: pointer;
  border: none;

  &:active {
    transform: scale3d(0.8, 0.8, 0);
  }
}

.icon {
  width: 30px;
  height: 30px;
}

@media (min-width: 751px) {

  /* 当屏幕宽度大于或等于751px时，显示div */
  .custom-btn:hover {
    width: 100px;
  }
}


.el-avator {
  position: absolute;
  top: 8px;
}
.footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  

}

a {
  color: orange;
}

@media only screen and (min-width: 750px) {
  .footer {
    background: none;
  }
}

p {
  padding: 0;
  margin: 0;
}
</style>
