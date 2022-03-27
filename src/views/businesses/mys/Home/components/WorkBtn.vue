<template>
  <div
    class="tw-w-full"
  >
    <!-- timer -->
    <div
      v-if="currentStore.CurrentBusiUser.startWorkAt"
      class="tw-text-center text-h5 tw-mb-2"
    >
      {{ hours }}:{{ minutes }}:{{ seconds }}
    </div>
    <q-select
      v-if="!currentStore.CurrentBusiUser.startWorkAt"
      v-model="workOption"
      class="tw-mb-2"
      dense
      outlined
      rounded
      :options="options"
    />
    <!-- On the job button -->
    <q-btn
      v-if="!currentStore.CurrentBusiUser.startWorkAt"
      color="primary"
      rounded
      icon="login"
      label="Go to Work"
      class="tw-w-full"
      @click="onCLickWorkBtn"
    />
    <q-btn
      v-else
      color="negative"
      rounded
      icon="logout"
      label="Get off the work"
      class="tw-w-full"
      @click="onCLickGetOffBtn"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeWorkBtn',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'

const currentStore = useCurrentStore()

const workOption = ref('Simple')
const options = ref(['Simple', 'Qrcode', 'Location'])
const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))

const initData = () => {
  if (currentStore.CurrentBusiUser && currentStore.CurrentBusiUser.id) {
    if (currentStore.CurrentBusiUser.startWorkAt) {
      timerSeconds.value = dayjs().diff(dayjs(currentStore.CurrentBusiUser.startWorkAt), 'seconds')
      initTimer()
    }
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
/**
 * On Click go to work button
 */
const onCLickWorkBtn = async () => {
  try {
    await currentStore.startWork({
      ...currentStore.CurrentBusiUser,
    })

    timerSeconds.value = 0
    initTimer()
  } catch (e) {
    console.error(e)
  }
}

/**
 * On Click get off the work button
 */
const onCLickGetOffBtn = async () => {
  try {
    await currentStore.getOffWork({
      ...currentStore.CurrentBusiUser,
    })

    timerSeconds.value = 0
    clearTimer()
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(() => {
  clearTimer()
})
</script>
