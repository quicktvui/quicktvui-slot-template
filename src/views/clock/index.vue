<template>
  <div class="slot-clock" :focusable="true" :enableFocusBorder="true" :showDefaultBg="showDefaultBg"
    :clipChildren="false" ref="cardDiv" @click="onCardClick">
    <div class="text_box">
      <div class="time-text-css-box">
        <qt-text class="time-text-css" :focusable="false"  :fontSize="150" :text="hours1" gravity="center" />
      </div>
      <div class="time-text-css-box" style="margin-right: 10;">
        <qt-text class="time-text-css" :focusable="false"  :fontSize="150" :text="hours2" gravity="center" />
      </div>
      
      <qt-text class="time-text1-css" :focusable="false"  :fontSize="150" text=":" gravity="center" :opacity="opacity"></qt-text>
      <div class="time-text-css-box">
        <qt-text class="time-text-css" :focusable="false"  :fontSize="150" :text="minutes1" gravity="center" />
      </div>
      <div class="time-text-css-box" style="margin-right: 0;">
        <qt-text class="time-text-css" :focusable="false"  :fontSize="150" :text="minutes2" gravity="center" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useESNativeRouter } from '@extscreen/es3-router'
import { useESLog, ESData, useESLocalStorage } from '@extscreen/es3-core'
  const nativeRouter = useESNativeRouter()
  const cardDiv = ref();
  let showDefaultBg = ref<boolean>(true);
  let hours = ref<any>('')
  let hours1 = ref<any>('')
  let hours2 = ref<any>('')
  let minutes = ref<any>('')
  let minutes1 = ref<any>('')
  let minutes2 = ref<any>('')
  let timer: NodeJS.Timeout
  let opacity = ref(1)

  function onESCreate() {
    timer = setInterval(() => {
      dateFormat()
      if(opacity.value == 1) opacity.value = 0
      else opacity.value = 1
    }, 1000)
  }
  function dateFormat() {
    const date = new Date()
    hours.value = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    minutes.value = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    hours1.value = Math.floor(hours.value / 10) % 10
    hours2.value = hours.value % 10
    minutes1.value = Math.floor(minutes.value / 10) % 10
    minutes2.value = minutes.value % 10
  }
  
  function onCardClick() {
    nativeRouter.push({
      pkg: "es.com.sjsj.tv"
    }).then(() => {
    })
  }

  function onESBind(data: ESData) {
    
  }

defineExpose({ onESCreate, onESBind, })
</script>

<style scoped>
.slot-clock {
  width: 850px;
  height: 400px;
  position: absolute;
  /* background-color: #000; */
  background-color: rgba(255,255,255,0.2);
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.text_box{
  width: 777px;
  height: 337px;
  /* background-color: rgba(255,255,255,0.2); */
  background-color: transparent;
  border-radius: 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.time-text-css-box{
  width: 150px;
  height: 200px;
  color: rgba(255, 255, 255,1);
  background-color: rgba(255,255,255,0.3);
  text-align: center;
  margin-right: 20px;
  border-radius: 20px;
}
.time-text-css {
  width: 150px;
  height: 200px;
  color: rgba(255, 255, 255,1);
  text-align: center;
}
.time-text1-css{
  width: 50px;
  height: 200px;
  color: rgba(255, 255, 255,1);
  background-color: transparent;
  text-align: center;
  margin-top: -25px;
  margin-right: 10px;
}
</style>
