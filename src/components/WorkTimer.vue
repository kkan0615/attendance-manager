<template>
  <div>
    <div
      class="text-h5"
    >
      <span>
        {{ convertedTime.hours }}:{{ convertedTime.minutes }}:{{ convertedTime.seconds }}
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
import { convertSeconds } from '@/utils/commons/datetime'

const props = defineProps({
  startTime: {
    type: String,
    required: true,
    default: '',
  }
})

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const convertedTime = computed(() => convertSeconds(timerSeconds.value))
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
