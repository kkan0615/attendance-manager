<template>
  <q-card>
    <q-card-section>
      <div
        class="tw-flex"
      >
        <div>
          {{ hours }}:{{ minutes }}:{{ seconds }}
        </div>
        <div
          class="tw-ml-auto"
        >
          {{ currentStore.CurrentBusiness.maxWorkHour }}h
        </div>
      </div>
      <q-linear-progress
        rounded
        stripe
        size="15px"
        :value="processValue"
        color="primary"
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeTotalWorkTime',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { computed, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'

const currentStore = useCurrentStore()

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))
// 144000 is 40 hours to seconds
const processValue = computed(() => timerSeconds.value / (currentStore.CurrentBusiness.maxWorkHour * 60 * 60))

currentStore.$subscribe((mutation, state) => {
  // when use console.log, key is shown
  if ((mutation.events as any).key === 'currentBusiUserTotalWorkSeconds') {
    clearTimer()
    initData()
  }
})

const initData = () => {
  timerSeconds.value = currentStore.CurrentBusiUserTotalWorkSeconds
  if (currentStore.CurrentBusiUser.startWorkAt) {
    timerSeconds.value += dayjs().diff(dayjs(currentStore.CurrentBusiUser.startWorkAt), 'seconds')
  }
  if (currentStore.CurrentBusiUser.status === 'work'
    || currentStore.CurrentBusiUser.status === 'rest'
  ) {
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
