<!--
 * @Description: loading
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
-->
<script lang="ts" setup>
import anime from 'animejs'
import { NImage } from 'naive-ui'
import { onMounted, ref } from 'vue'

import Icon from '../renderer/src/assets/logo/icon.png'
import { getTip } from './tips'

const loadingText = ref('Loading...')

onMounted(() => {
  anime
    .timeline({
      loop: true,
      direction: 'alternate',
    })
    .add({
      targets: '#loadingText .letter',
      translateY: ['1.5em', 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => (750 / loadingText.value.length) * i,
    })

  anime
    .timeline({
      loop: true,
      direction: 'alternate',
    })
    .add({
      targets: '#logo',
      rotateZ: ['-10deg', '10deg'],
      duration: 2000,
      easing: 'cubicBezier(.5, .05, .1, .3)',
    })
})
</script>

<template>
  <div
    :style="{
      display: 'flex',
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      top: 0,
      left: 0,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 9999,
      color: 'white !important',
      // background: 'rgba(100,97,154,.75)',
      background: 'rgba(0,0,0,.75)',
      pointerEvents: 'none',
    }"
  >
    <NImage
      :src="Icon"
      alt="logo"
      :preview-disabled="true"
      object-fit="cover"
      :width="450"
      :height="450"
      :img-props="{
        id: 'logo',
        style: {
          userSelect: 'none',
          userDrag: 'none',
          transformOrigin: '54.2% 2.8%',
        },
      }"
    />
    <h2 id="loadingText" style="position: relative">
      <span style="position: relative; display: inline-block; overflow: hidden">
        <span
          v-for="(letter, index) in loadingText"
          :key="letter + index"
          class="letter"
          style="display: inline-block; line-height: 1em"
        >
          {{ letter }}
        </span>
      </span>
    </h2>
    <p id="tip">{{ getTip() }}</p>
  </div>
</template>
