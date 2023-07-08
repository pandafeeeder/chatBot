<template>
  <div
    style="width: 288px; margin: auto; margin-top: 40px"
    class="br-5"
    v-if="status === 'ok'"
  >
    <div class="alipay br-5">
      <div class="pay-head br-5">
        <img src="../assets/ap.svg" class="pay-logo" />
      </div>
      <div class="t-s m-t-10" style="font-weight: 600">请支付：{{ payPlan }}元</div>
      <div>
        <a :href="qrUrl" target="_blank"><img :src="qrImg" v-if="qrUrl" class="m-t-10 br-5" /></a>
      </div>
      <div class="pay-notice">请用支付宝扫码付款</div>
      <el-divider />
      <div class="pay-menu p-l-30 p-r-30 t-l">
        <span class="t-s f-12 p-b-30">
          支付后可在支付宝中查看密钥，我的>账单>本次交易账单详情>商家订单号（密钥），同一密钥可多人多台设备使用。
        </span>
      </div>
    </div>
    <div style="text-align: center" class="m-t-66">
      <el-button
        class="h-36 w-f br-4 custom-btn"
        :loading="queryFlag"
        @click="queryById"
        >{{ queryFlag ? "查询中，请稍后" : "我已支付:去查询(约1分钟)" }}</el-button
      >
    </div>
  </div>
  <div
    v-else-if="status === 'fail'"
    class="p-t-30 p-l-30 p-r-30 t-center f-12 p-b-30 t-c"
  >
    创建订单失败，请稍后再试！
  </div>
  <div v-else-if="status === 'paid'" class="p-t-30 p-l-30 p-r-30 t-c">
    支付成功！ 请保存好您的密码：<br><br>
    <span class="t-c">{{ key }}</span> <br><br>
    在<a href="/chats" class="t-c">ChatGPT</a>左上角点击设置，输入密码。
  </div>
  <product
    v-if="status == 'init' || status == 'pending'"
    @getQR="getQRCode"
    :loading="status === 'pending'"
  ></product>
</template>
<script setup>
import { ref } from "vue";

import QRCode from "qrcode";

import product from "../components/product.vue";
import { buy, getStatus } from "../service";

const qrUrl = ref("");
const status = ref("init");

const qrImg = ref("");

const payPlan = ref(10);
const key = ref("");

const getQRCode = (type) => {
  payPlan.value = type == 1 ? 10 : type == 2 ? 20 : 50;
  const timer = setTimeout(() => {
    status.value = "fail";
  }, 60000);
  status.value = "pending";
  buy(type)
    .then((res) => {
      clearTimeout(timer);
      res = res.data;
      if (res?.startsWith("https")) {
        qrUrl.value = res;
        QRCode.toDataURL(qrUrl.value).then((res) => {
          qrImg.value = res;
        });
        status.value = "ok";
        queryStatus();
      } else {
        status.value = "fail";
      }
    })
    .catch((e) => {
      status.value = "fail";
    });
};

let timer = 0;
let time=null
const queryFlag = ref(false);
const queryStatus = () => {
  let code = new URL(qrUrl.value).pathname;
  let query = async () => {
    timer++;
    let res = await getStatus(code, queryFlag.value);

    res = res.data;
    if (res.key && res.key !== "deactive") {
      key.value = res.key;
      status.value = "paid";
      return;
    }
    if (timer > 30) {
      queryFlag.value = false;
      return;
    }
    time = setTimeout(() => {
      query();
    }, 6000);
  };
  query();
};

const queryById = () => {
  queryFlag.value = true;
  clearTimeout(time);

  queryStatus(true);
};
</script>

<style lang="scss" scoped>
.alipay {
  text-align: center;
  background-color: #1969da;
  .pay-head {
    background-color: #fff;
  }
  .pay-notice {
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
}
.pay-logo {
  width: 266px;
}
.copy-btn {
  background: transparent;
  border: none;
  outline: none;
  img {
    width: 18px;
    position: relative;
    top: 2px;
  }
}
.custom-btn {
  background-color: #1969da;
  border: none;
  outline: none;
  font-weight: 600;
  color: var(--color-secondary);
  &:hover {
    background-color: #2a74dc;
    cursor: pointer;
  }
}
</style>
