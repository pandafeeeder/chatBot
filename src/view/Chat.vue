<template>
  <div class="home main-bg t-c">
    <div class="header w-m">
      <div class="title t-c l-38">
        <span @click="showSetting = true">Chat{{ model }} <svg t="1708259417033" class="icon arrow-down"
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1444" width="88" height="88">
            <path
              d="M186.1632 373.418667a51.2 51.2 0 0 1 68.744533-3.345067l3.652267 3.310933 253.201067 253.201067 251.4944-254.8736a51.2 51.2 0 0 1 68.744533-3.754667l3.6864 3.2768a51.2 51.2 0 0 1 3.754667 68.744534l-3.2768 3.652266-287.744 291.566934a51.2 51.2 0 0 1-69.154134 3.413333l-3.4816-3.1744-289.621333-289.621333a51.2 51.2 0 0 1 0-72.430934z"
              p-id="1445"></path>
          </svg></span> <button class="setting f-22 w-26 bg-t" @click="showSetting = true"><svg t="1684194447686"
            class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3389" width="88"
            height="88">
            <path
              d="M463.68 59.52a96 96 0 0 1 96 0l320 184.64a96 96 0 0 1 48.32 83.2v369.28a96 96 0 0 1-48 83.2l-320 184.64a96 96 0 0 1-96 0l-320-184.64a96 96 0 0 1-48-83.2v-369.28a96 96 0 0 1 47.68-83.2z m64.32 55.68a32 32 0 0 0-32 0l-320 184.64a32 32 0 0 0-16 27.52v369.28a32 32 0 0 0 16 27.84l320 184.32a32 32 0 0 0 32 0l320-184.64a32 32 0 0 0 16-27.52v-369.28a32 32 0 0 0-16-27.84zM396.8 397.632a160 160 0 0 1 156.48-40.192A160.064 160.064 0 0 1 512 672a166.72 166.72 0 0 1-41.28-5.44A160 160 0 0 1 396.8 397.632zM595.2 464a96 96 0 1 0-166.272 96A96 96 0 0 0 595.2 464z"
              fill="#707070" p-id="3390"></path>
          </svg></button><span class="info f-12 l-40">{{ remain }}</span>
      </div>
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
                    <div v-html="mark(item.content)" v-if="item.done"></div>
                    <div v-text="item.content" v-else></div>
                  </div>
                </div>
                <div v-else class="a-end f-16 l-24 p-l-16 p-t-10 p-r-16 p-b-10 br-12" :class="{
          ' b-card1 t-c shadow t-l':
            item.role === 'error' || item.role === 'loading' || item.role === 'error-limit',
          'b-card2 t-s t-l': item.role === 'user',
        }">
                  <div v-if="item.role === 'error-limit'">{{ item.content }}<br>觉得有用可以<a href="/purchase"
                      class="tips">购买密码！</a>您的支持是我继续的动力！ &#x1F64F</div>
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
      <div class="footer p-l-10 p-r-10 bg-sec bbox w-s p-t-8">
        <div class=" p-b-10 p-l-10 p-r-10 bbox">
          <div class="flex row">
            <button @click="reset" class="bg-third flex j-center a-center m-r-10 w-45 h-45 br-25 custom-btn t-s">
              <img src="../assets/clear.svg" class="icon" alt="">
            </button>
            <input-box class="flex-1" @send="send" :status="status" ref="msgBox"></input-box>
          </div>
          <div class="f-12 t-c t-center m-t-10">ChatGPT-4已开放使用，<a href="/purchase" class="tips">购买密码</a>后可使用|<a
              href="/home">返回首页</a>|<a href="/help">使用帮助</a></div>
        </div>
      </div>
    </div>
    <el-dialog v-model="showSetting" :close-on-click-modal="false" title="设置" class="br-10"
      style="max-width:400px;min-width: 300px;" width="50%">
      <el-row>
        <el-col :span="4">角色：</el-col>
        <el-col :span="20">
          <select name="" id="" class="h-30 w-f el-input el-input__wrapper " style="outline: none;border: none;"
            v-model="systemRole">
            <option class="h-30 w-f" v-for="(item, index) in roles" :value="item.value" :key="index">{{ item.label }}
            </option>
          </select>
        </el-col>
      </el-row>
      <el-row class="m-t-20">
        <el-col :span="4">密码：</el-col>
        <el-col :span="20">
          <el-input v-model="accessKey"></el-input>
        </el-col>
      </el-row>
      <el-row class="m-t-20">
        <el-col :span="4" style="line-height: 38px;">模型：</el-col>
        <el-col :span="20">
          <el-radio-group v-model="model" class="ml-4">
            <el-radio label="GPT-3.5" value="GPT-3.5" size="large">GPT-3.5</el-radio>
            <el-radio label="GPT-4" value="GPT-3.5" size="large" :disabled="!keyStatus">{{ !keyStatus ?
          'GPT-4（购买key后可用）' :
          'GPT-4（一次消耗20个）'
              }}</el-radio>
            <el-radio label="GPT-4o" value="GPT-3.5" size="large" :disabled="!keyStatus">{{ !keyStatus ?
          'GPT-4o（购买key后可用）' :
          'GPT-4o（一次消耗20个）'
              }}</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" :loading="checking" @click="checkAccessKey">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import prism from 'prismjs';
import InputBox from "../components/InputBox.vue";
import { fd, qa, checkKey } from "../service";
import { ElMessage } from "element-plus";

import { fetchEventSource } from '@microsoft/fetch-event-source';

const ctrl = new AbortController();
let marked;
const messages = reactive([]);
const status = ref(false);
const msgBox = ref(null);
const ticket = ref(6);
const container = ref(null);
const showSetting = ref(false)
const model = ref('GPT-3.5')
const checking = ref(false)
const accessKey = ref('')
const keyStatus = ref(false)
const remain = ref(0)
const roles = reactive([{
  label: 'AI助手',
  value: 'You are an AI assistant that helps people find information.'
}, {
  label: '英语老师',
  value: 'You are an english coach, talk with user to help them fix grammar and spell mistakes.'
}, {
  label: '解梦师',
  value: 'I want you to act as a dream interpreter. I will give you descriptions of my dreams, and you will provide interpretations based on the symbols and themes present in the dream. Do not provide personal opinions or assumptions about the dreamer. Provide only factual interpretations based on the information given.'
},
{
  label: '心理学家',
  value: 'i want you to act a psychologist. i will provide you my thoughts. i want you to give me scientific suggestions that will make me feel better.'
},
{
  label: '翻译',
  value: "You are a translator.Translate user's input to chinese or english,No additional processing."
},
{
  label: '面试指导',
  value: "You are an interview consultant,Help people to improve their interview skills."
}
])

const systemRole = ref('You are an AI assistant that helps people find information.')

const checkAccessKey = () => {
  if (accessKey.value.trim() == '') {
    showSetting.value = false
    return
  }
  checking.value = true;
  checkKey(accessKey.value).then((res) => {
    let num = Number(res.data)
    if (num > 0) {
      ElMessage.success(`校验通过，剩余${num}`)
      remain.value = num
      localStorage.setItem('accessKey', accessKey.value)
      keyStatus.value = true
    } else if (num != -9999) {
      ElMessage.info('token已经用完啦.')
      remain.value = num
      keyStatus.value = false
    } else {
      ElMessage.error('密码不存在或已失效.')
      keyStatus.value = false
      remain.value = 0
    }
    checking.value = false
    showSetting.value = false
  }).catch(() => {
    ElMessage.error('密码不存在或已失效.')
    checking.value = false
    showSetting.value = false
    keyStatus.value = false
    remain.value = 0
  })

}

performance.mark("login-started");

performance.mark("login-finished");
const mark = (msg) => {
  if (marked) {
    return marked(msg, { silent: true })
  }
  return msg
}






const handleError = () => {

  const msg = "出错啦，换个话题试一试吧！";
  messages.pop();
  messages.push({ role: "error", content: msg });
  status.value = false;
  toBottom();
}

const handleExceed = () => {
  messages.pop()
  messages.push({ role: "error-limit", content: "因对话的token费用高，无力负担更多，免费版每天总额1000，每人限制5次，请谅解！", done: true });
  localStorage.setItem("879rhiw7e3", 1000);
  ticket.value = 1000
  status.value = false;
  toBottom();
}

class RetriableError extends Error { }
class FatalError extends Error { }
const send = (value) => {
  if (value.value === "") {
    messages.push({ role: "error", content: "请问有什么可以帮你！" });
    toBottom();
    nextTick(() => {
      value.value = ''
    })
    return;
  }
  messages.push({ role: "user", content: value.value, accessType: keyStatus.value ? 1 : 0 });
  messages.push({ role: "loading", content: null });
  status.value = true;
  if (!keyStatus.value && ticket.value > 5) {
    handleExceed()
    return;
  }


  value.value = ''


  let currentType = keyStatus.value ? 1 : 0
  const promots = messages
    .slice(1)
    .filter((e) => (e.role === "assistant" || e.role === "user") && (e.accessType === currentType));

  const param = promots.map((e) => {
    if (e.role === "assistant" || e.role === "user") {
      return { role: e.role, content: e.content };
    }
  })

  param.unshift({
    role: 'system',
    content: systemRole.value
  })

  let body = {
    model: model.value,
    messages: param.slice(-6),
    key: accessKey.value
  }
  let start = Date.now()
  let last = { role: 'assistant', content: '', done: false, accessType: 1 }
  let timer = 0
  let flag = false
  let API_URL =
    'https://chatplus.pandafeeder.xyz/chat';
  if (!keyStatus.value) {
    API_URL =
      'https://devs.pandafeeder.xyz/chat';
  }
  let retryCount = 0
  fetchEventSource(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    async onopen(response) {
      if (response.ok && response.headers.get('Content-Type') === 'text/event-stream') {
        return; // everything's good
      } else if (response.status == '507' || response.status == '403') {
        handleExceed()
      } else {
        handleError()

      }
    },
    onmessage(msg) {
      // if the server emits an error message, throw an exception
      // so it gets handled by the onerror callback below:
      if (msg.event === 'FatalError') {
        handleError()
        return
      } else {
        try {

          let data = JSON.parse(msg.data)
          if (!flag) {
            if (!keyStatus.value) {
              localStorage.setItem("879rhiw7e3", ++ticket.value);
            } else {
              remain.value -= (model.value == 'GPT-4'||model.value == 'GPT-4o' ? 20 : 1)
            }
            flag = true
            messages.pop()
            messages.push(last)
            toBottom();
          }
          timer += 16
          if (data.choices[0]?.delta?.content) {
            setTimeout(() => {
              last.content += data.choices[0]?.delta?.content
              messages.pop()
              messages.push(last)
            }, timer);
          }
          if (data.choices[0]?.finish_reason) {
            last.done = true;
            status.value = false;
          }

        } catch (e) {
          console.error(e)
        }

      }
    },
    onerror(err) {
      console.log(err)
      if (err instanceof FatalError || retryCount >= 3) {
        handleError()
        throw err; // rethrow to stop the operation
      } else {
        retryCount++;
        // do nothing to automatically retry
      }
    },
    onclose(res) {
    }
  });

  return
};



const reset = () => {
  messages.length = 0;
  messages.push({
    role: "assistant",
    content: "你好，我是ChatGPT！可以在左上角设置里更改角色哦！",
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
    content: "你好，我是ChatGPT！可以在左上角设置里更改角色哦！",
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
  if (localStorage.getItem('accessKey')) {
    accessKey.value = localStorage.getItem('accessKey')
    checkAccessKey()
  }

  import('marked')
    .then((module) => {
      marked = module.marked
      marked.setOptions({
        highlight: function (code, lang) {
          if (prism.languages[lang]) {
            return prism.highlight(code, prism.languages[lang], lang);
          } else {
            return code;
          }
        }
      })
    })
});
</script>

<style scoped lang="scss">
.title {
  position: relative;

  button {
    outline: none;
    border: none;
    position: absolute;
    left: 3px;
    top: 3px;
    cursor: pointer;

    &:hover {
      font-weight: 600;
    }
  }

  .info {
    position: absolute;
    left: 33px;
    font-weight: 400;
    color: var(--color-disabled);

  }
}

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

  .footer {
    background: none;
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

p {
  padding: 0;
  margin: 0;
}

.arrow-down {
  position: relative;
  top: 8px;
  left: -2px;
  width: 22px;
}
</style>
