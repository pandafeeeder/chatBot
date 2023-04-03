<template>
  <div class="home main-bg t-c">
    <div class="header">
      <div class="title t-c l-38">GPT-3.5</div>
    </div>
    <div class="content">
      <div class="container talk-box of-h p-b-6" ref="container">
        <div class="p-b-90 of-h">
          <div class="">
            <div
              v-for="(item, index) in messages"
              :key="index"
              :class="{
                'm-t-15': item.role === 'user' && index !== 0,
                'm-b-15': item.role === 'user' && index !== messages.length - 1,
                'p-r-48': item.role !== 'user',
                'p-l-48': item.role === 'user',
              }"
              class="flex column m-b-20 w-m"
            >
              <div
                class="flex row t-c"
                :class="{
                  ' p-r-20 j-end  ': item.role === 'user',
                  'p-l-20': item.role !== 'user',
                }"
              >
                <div
                  v-if="item.role === 'assistant'"
                  class="shadow flex column br-12 p-l-10 p-t-10 p-r-10 p-b-10 br-12 b-card1"
                >
                  <div class="l-24 f-16 sec-c">
                    <Markdown :source="item.content"></Markdown>
                  </div>
                  <div class="l-24 w-f t-r f-12">
                    {{ index > 0 ? `${item.index - 1}/10` : "" }}
                  </div>
                </div>
                <div
                  v-else
                  class="a-end f-16 l-24 p-l-10 p-t-10 p-r-10 p-b-10 br-12"
                  :class="{
                    ' b-card1 t-c shadow t-l': item.role === 'error',
                    'b-card2 t-s t-l': item.role === 'user',
                  }"
                >
                  <!-- <span>{{ item.content }}</span
                  > -->
                  <Markdown :source="item.content"></Markdown>
                  <span
                    v-if="item.role === 'error'"
                    class="w-5 h-5 br-f bg-error dot"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer p-l-10 p-r-10 bg-sec bbox w-s">
        <Loader v-show="status"></Loader>
        <div
          class="p-t-20 p-b-20 p-l-10 p-r-10 bbox"
          
        >
          <input-box @send="send" :status="status" ref="msgBox"></input-box>
          <div class="tips">
            因openai的token数量有限，所以对功能有一些限制。如果回答不完整，可以发送“继续”来获取剩余回答。
            <a href="./future" target="_blank">更多功能</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import Markdown from "vue3-markdown-it";
import InputBox from "../components/InputBox.vue";
import Loader from "../components/Loader.vue";
import { qa } from "../service";

const messages = reactive([]);
const status = ref(false);
const msgBox = ref(null);
const ticket = ref(11);
const container = ref(null);

const send = (value) => {
  // messages.push({ role: "user", content: value });
  // messages.push({role:'assistant',content:'我i福哦方洪伟i黑i欧服哦iu送iu让我额若u哦入欧哦iu哦iu哦iu偶偶偶哦'})
  // return
  if (value.value === "") {
    messages.push({ role: "error", content: "请问有什么可以帮你！" });
    toBottom();

    return;
  }

  if (ticket.value > 10) {
    messages.push({ role: "error", content: "因token有限，每天只有10次哦！" });
    toBottom();
    return;
  }
  messages.push({ role: "user", content: value.value });
  status.value = true;
  localStorage.setItem("879rhiw7e3", ++ticket.value);
  const promots = messages.slice(1);
  qa({
    content: promots.map((e) => {
      if (e.role === "assistant" || e.role === "user") {
        return { role: e.role, content: e.content };
      }
    }),
  })
    .then((data) => {
      data = data.data;

      if (data.choices && data.choices.length > 0) {
        let answer = data.choices[0].message.content;
        const msg = answer.replace("\\n\\n", "");
        messages.push({ role: "assistant", content: msg, index: ticket.value });
      } else {
        const msg = "oops! something went wrong,try again.";
        messages.push({ role: "error", content: msg });
      }
      status.value = false;
      msgBox.value.value = "";
      container.value.scrollTo(0, container.value.scrollHeight);
      toBottom();
    })
    .catch(() => {
      status.value = false;
      const msg = "oops! something went wrong,try again.";
      messages.push({ role: "error", content: msg });
      toBottom();
    });
};

const toBottom = () => {
  nextTick(() => {
    let scrollElem = container.value;
    scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: "smooth" });
  });
};

const getCount = (index) => {
  console.log(index);
  let i = 0;
  for (let j = 0; j < messages.length; j++) {
    if (j === index) {
      break;
    }
    if (messages[j].role === "assistant") {
      i++;
      console.log("---", i);
    }
  }
  return i;
};

defineExpose({ messages, ticket });
onMounted(() => {
  messages.push({
    role: "assistant",
    content: "你好！我是GPT！",
  });
  const tickets = localStorage.getItem("879rhiw7e3");
  const preDate = localStorage.getItem("879rhiw7e2");
  const date = new Date().getDate();
  console.log(date, ticket.value, "-----", ticket.value);
  if (date != preDate) {
    ticket.value = 0;
    localStorage.setItem("879rhiw7e2", date);
  } else {
    ticket.value = Number(tickets) || 0;
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
  height: 38px;
  position: sticky;
  top: 0;
  z-index: 10;
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
  max-height: calc(100vh - 150px);
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

.el-avator {
  position: absolute;
  top: 8px;
}
.footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  .tips {
    margin-top: 5px;
    color: #a59c94;
    font-size: 12px;
    text-align: center;
  }

  a {
    color: orange;
  }
}

@media only screen and (min-width: 1184px) {
  .footer {
    background: none;
  }
}
</style>
