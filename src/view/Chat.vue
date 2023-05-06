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
        <div class="p-t-20 p-b-20 p-l-10 p-r-10 bbox">
          <div class="flex row">
            <button @click="reset" class="bg-third flex j-center a-center m-r-10 w-45 h-45 br-25 custom-btn t-s">
              <svg t="1680674192807" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3094" width="160" height="160">
                <path
                  d="M906.446808 412.044326c-49.850377-22.91411-99.578871-45.096918-149.916782-66.792192a120.055309 120.055309 0 0 0-114.204899 7.069246 117.861405 117.861405 0 0 0-48.753425 55.578905q187.700687 83.368357 375.27949 166.858598c1.70637-5.240993 3.41274-9.994452 5.240993-14.626028a121.883563 121.883563 0 0 0-67.645377-148.088529zM1019.432871 22.626343A63.257569 63.257569 0 0 0 978.967528 1.052952a29.373939 29.373939 0 0 0-35.102466 17.551233c-48.753425 91.290789-97.50685 182.825344-146.260276 274.603667-1.096952 2.925206-2.925206 5.850411-4.022157 8.775617l2.315787 2.315788c39.246507 16.941815 78.371131 34.493048 117.617639 52.044281a10.847637 10.847637 0 0 0 1.828253-4.631576c36.565069-100.066405 73.130138-200.864112 108.842022-300.930516a26.083082 26.083082 0 0 0-4.753459-28.155103zM217.926561 550.138403a98.603802 98.603802 0 1 0-97.50685-100.675823 100.432056 100.432056 0 0 0 97.50685 100.675823zM61.54995 155.60131a58.869761 58.869761 0 1 0 0 117.617638 59.479179 59.479179 0 0 0 58.625994-58.50411 58.625994 58.625994 0 0 0-58.625994-59.113528zM239.012418 274.437784a40.70911 40.70911 0 0 0 39.124623-39.246508A39.368391 39.368391 0 0 0 239.012418 195.457235a38.880857 38.880857 0 0 0-39.246508 39.246507 40.099692 40.099692 0 0 0 39.246508 39.734042zM883.532698 633.262993c-3.534623 8.8975-6.459829 17.673117-9.385034 26.448733-7.556781 20.476439-15.113562 42.049829-24.376713 63.135685A1195.555868 1195.555868 0 0 1 733.737799 944.797379a30.714658 30.714658 0 0 1-26.448733 15.235446 20.354555 20.354555 0 0 1-6.337945 0c-12.188356-2.315788-22.91411-4.144041-34.614932-5.850411s-22.792226-3.534623-34.493048-5.850411c-9.385034-1.70637-18.160651-4.144041-26.936268-5.850411-4.144041-1.218836-7.678664-1.70637-12.188356-2.925206l-25.229897-5.850411 14.626027-21.085856c18.160651-26.32685 32.177261-48.022124 43.390549-66.182775a388.564798 388.564798 0 0 1-77.274179 45.096918 118.227056 118.227056 0 0 1-48.753425 12.188357A86.90298 86.90298 0 0 1 453.405605 890.193543a451.700484 451.700484 0 0 0-43.390549-22.182808c-7.069247-3.534623-14.01661-6.459829-20.476438-9.994452l-20.476439-10.481987 15.235446-17.063699a211.224214 211.224214 0 0 0 16.941815-19.86702 304.708907 304.708907 0 0 1-43.878083 13.529075 40.587226 40.587226 0 0 1-7.678664 0 36.565069 36.565069 0 0 1-21.695274-7.069246c-18.770069-14.138493-38.637089-28.764521-59.113528-45.706337-7.678664-5.850411-14.138493-12.188356-21.695275-19.257602-2.925206-2.925206-6.459829-5.850411-9.994452-9.385035L211.466733 719.556555l38.027671-7.069246a9.750685 9.750685 0 0 1 3.534623 0 636.475965 636.475965 0 0 0 214.271304-70.81435 384.17699 384.17699 0 0 0 114.204898-93.119042c8.775617-11.091404 16.332397-22.792226 24.376713-35.102467a129.074693 129.074693 0 0 1 7.678664-11.091404 2.193904 2.193904 0 0 1 0.731302-2.193904l2.315788-3.534623c-18.160651-10.481986-35.711884-19.867021-52.6537-29.861473-12.188356 16.454281-21.695274 32.786678-34.005514 46.925172a365.650689 365.650689 0 0 1-156.864145 103.601028 602.957986 602.957986 0 0 1-206.105105 39.977809 39.00274 39.00274 0 0 0-37.540137 22.914109 40.587226 40.587226 0 0 0 7.069246 44.487501 811.622645 811.622645 0 0 0 348.343223 243.767126 918.51453 918.51453 0 0 0 233.041372 54.847603 47.90024 47.90024 0 0 0 48.753425-21.695274c5.362877-7.678664 11.213288-15.235445 16.454281-22.792227a1320.48652 1320.48652 0 0 0 148.088529-299.833564c4.753459-12.188356 8.775617-25.108014 12.919658-38.027672-18.770069-6.459829-37.540137-13.529075-56.188323-19.867021z"
                  fill="#ffffff" p-id="3095"></path>
              </svg>
            </button>
            <input-box class="flex-1" @send="send" :status="status" ref="msgBox"></input-box>
          </div>
          <div class="tips">
            因openai的token费用较高，所以对功能有一些限制。如果回答不完整，可以发送“继续”来获取剩余回答。
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
import { get_encoding } from "@dqbd/tiktoken";




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
const encoding = get_encoding("cl100k_base");



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



  const promots = messages
    .slice(1)
    .filter((e) => e.role === "assistant" || e.role === "user");

    const param = promots.map((e) => {
    if (e.role === "assistant" || e.role === "user") {
      return { role: e.role, content: e.content };
    }
  })
  console.log(encoding.encode(JSON.stringify(param)).length)
  qa(param
  )
    .then((data) => {
      data = data.data;
      if (data.choices && data.choices.length > 0) {
        let answer = data.choices[0].message.content;
        const msg = answer.replace("\\n\\n", "\n");
        messages.pop();
        localStorage.setItem("879rhiw7e3", ++ticket.value);
        console.log(encoding.encode(msg).length)
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

.custom-btn:hover {
  width: 100px;
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


}

a {
  color: orange;
}

@media only screen and (min-width: 1184px) {
  .footer {
    background: none;
  }
}

p {
  padding: 0;
  margin: 0;
}
</style>
