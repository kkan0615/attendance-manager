<template>
  <div
    class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 md:tw-space-x-4 md:tw-space-y-0 tw-space-y-4 q-mb-md"
  >
    <q-card>
      <q-item>
        <q-item-section
          avatar
        >
          <q-icon
            color="primary"
            name="add"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label
            class="c-text-first-uppercase"
          >
            summary
          </q-item-label>
          <q-item-label caption>
            {{ sumWorkTime }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card>
      <q-item>
        <q-item-section
          avatar
        >
          <q-icon
            color="primary"
            name="horizontal_distribute"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label
            class="c-text-first-uppercase"
          >
            average
          </q-item-label>
          <q-item-label caption>
            {{ avgWorkTime }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card>
      <q-item>
        <q-item-section
          avatar
        >
          <q-icon
            color="primary"
            name="trending_up"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label
            class="c-text-first-uppercase"
          >
            Top worker
          </q-item-label>
          <q-item-label caption>
            {{ topWorkerWithTime.name }} / {{ topWorkerWithTime.time }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card>
      <q-item>
        <q-item-section
          avatar
        >
          <q-icon
            color="primary"
            name="trending_down"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label
            class="c-text-first-uppercase"
          >
            ?
          </q-item-label>
          <q-item-label caption>
            ?
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminAnalysisMainOverviews',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { useBusiUserStore } from '@/store/busiUser'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { convertSeconds } from '@/utils/commons/datetime'

const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()
const busiUserStore = useBusiUserStore()

const { busiUserAdminList } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)

const sumWorkTime = computed(() => {
  if (!busiUserAdminList.value || !busiUserAdminList.value.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = busiUserWorkHistoryList.value
  // .filter(workHistory => workHistory.endedAt)
  const totalSeconds = filteredWorkHistoryList
    .map(workHistory => {
      const startedAt = dayjs(workHistory.startedAt)
      const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
      return endedAt.diff(startedAt, 'seconds')
    })
    .reduce((a, b) => a + b, 0)
  const { hours, minutes, seconds } = convertSeconds(totalSeconds)
  return `${hours}:${minutes}:${seconds}`
})

const avgWorkTime = computed(() => {
  if (!busiUserAdminList.value || !busiUserAdminList.value.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = busiUserWorkHistoryList.value
  // .filter(workHistory => workHistory.endedAt)
  const totalSeconds = filteredWorkHistoryList
    .map(workHistory => {
      const startedAt = dayjs(workHistory.startedAt)
      const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
      return endedAt.diff(startedAt, 'seconds')
    })
    .reduce((a, b) => a + b, 0)
  const { hours, minutes, seconds } = convertSeconds(totalSeconds / filteredWorkHistoryList.length)
  return `${hours}:${minutes}:${seconds}`
})

const topWorkerWithTime = computed(() => {
  if (!busiUserAdminList.value || !busiUserAdminList.value.length) {
    return { name: '', time: 0, }
  }

  const busiUserListWithTotal = busiUserAdminList.value.map(busiUser => {
    let result = busiUserWorkHistoryList.value
      .filter(workHistory => workHistory.busiUserId === busiUser.id)
      .map(workHistory => {
        const startedAt = dayjs(workHistory.startedAt)
        const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
        return endedAt.diff(startedAt, 'seconds')
      })
      .reduce((a, b) => a + b, 0)
    return {
      name: busiUser.name,
      totalSeconds: result,
    }
  })
  // ref: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
  const topWorker = busiUserListWithTotal.reduce((a, b)=>a.totalSeconds > b.totalSeconds ? a : b)
  const { hours, minutes, seconds } = convertSeconds(topWorker.totalSeconds)
  return {
    name: topWorker.name,
    time: `${hours}:${minutes}:${seconds}`
  }
})
</script>
