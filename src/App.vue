<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  // 获取或创建theme-color的meta元素
  let metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (!metaThemeColor) {
    metaThemeColor = document.createElement("meta");
    metaThemeColor.setAttribute("name", "theme-color");
    document.head.appendChild(metaThemeColor);
  }

  // 获取CSS变量的值
  let primaryColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-secondary"
  );

  // 定义一个函数，根据当前的颜色模式设置状态栏颜色
  function setThemeColor() {
    metaThemeColor.setAttribute("content", primaryColor);
  }

  // 调用函数，设置初始的状态栏颜色
  setThemeColor();

  // 监听颜色模式的变化，动态更新状态栏颜色
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setThemeColor);
  }
});
</script>
