<template>
  <div>
    <div
      class="text-h5"
    >
      <span>
        {{ hours }}:{{ minutes }}:{{ seconds }}
      </span>
    </div>
    <div
      class="text-caption"
    >
      {{ formattedStartedAt }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WorkTimer',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  startTime: {
    type: String,
    required: true,
    default: '',
  }
})

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))
const formattedStartedAt = computed(() => props.startTime ? dayjs(props.startTime).format('LTS') : '')

const initData = () => {
  if (props.startTime && props.startTime) {
    timerSeconds.value = dayjs().diff(dayjs(props.startTime), 'seconds')
    initTimer()
  }
}

const initTimer = () => {
  timer.value = setInterval(() => {
    timerSeconds.value += 1
  }, 1000)
}

const clearTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = undefined
  }
}

initData()

onBeforeUnmount(() => {
  clearTimer()
})
</script>
