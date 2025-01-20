<template>
  <div class="index-root-view-css">
    <qt-image class="index-root-logo-css" :src="logo"></qt-image>
    <qt-text class="index-root-text-view-css" gravity="center" text="Hello JsView!"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/runtime-core'
import logo from '../assets/logo.png'
import {ESData, ESSlotEvent, ESSlotEventName} from "@extscreen/es3-core";

export default defineComponent({
  name: 'home',
  emits: [],
  setup() {
    function onESCreate(params) {
    }

    function onESStart() {
    }

    function onESRestart() {
    }

    function onESResume() {
    }

    function onESPause() {
    }

    function onESStop() {
    }

    function onESDestroy() {
    }

    function onESBind(data: ESData) {
    }

    function onESRecycle() {
    }

    function onESAttached(data: ESData) {
    }

    function onESDetached(data: ESData) {
    }

    function onESSlotEvent(event: ESSlotEvent) {
      if (event.eventName == ESSlotEventName.ES_SLOT_EVENT_NAME_FOCUS) {
        if (event.eventData.isFocused) {
        }
        //
        else {
        }
      }
    }

    return {
      logo,
      onESCreate,
      onESStart,
      onESResume,
      onESPause,
      onESStop,
      onESDestroy,
      onESRestart,
      onESBind,
      onESRecycle,
      onESAttached,
      onESDetached,
      onESSlotEvent
    }
  }
})
</script>

<style>
.index-root-view-css {
  width: 1920px;
  height: 1080px;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.index-root-text-view-css {
  width: 400px;
  height: 60px;
  font-size: 50px;
  color: black;
  text-align: center;
}

.index-root-logo-css {
  width: 128px;
  height: 128px;
  margin-bottom: 30px;
}
</style>
