<template>
  <div
    class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 md:tw-space-x-4 md:tw-space-y-0 tw-space-y-4 q-mb-md"
  >
    <q-card
      :flat="flat"
    >
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
    <q-card
      :flat="flat"
    >
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
    <q-card
      :flat="flat"
    >
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
            max
          </q-item-label>
          <q-item-label caption>
            {{ maxWorkTime }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card
      :flat="flat"
    >
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
            min
          </q-item-label>
          <q-item-label caption>
            {{ minWorkTime }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WorkHistoryOverviews',
}
</script>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import dayjs from 'dayjs'
import { convertSeconds } from '@/utils/commons/datetime'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'


const props = defineProps({
  workHistoryList: {
    type: Array as PropType<TempBusiUserWorkHistory[]>,
    required: true,
    default: () => []
  },
  flat: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const sumWorkTime = computed(() => {
  if (!props.workHistoryList || !props.workHistoryList.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = props.workHistoryList
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
  if (!props.workHistoryList || !props.workHistoryList.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = props.workHistoryList
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

const maxWorkTime = computed(() => {
  if (!props.workHistoryList || !props.workHistoryList.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = props.workHistoryList
  // .filter(workHistory => workHistory.endedAt)
  const max = Math.max(...filteredWorkHistoryList
    .map(workHistory => {
      const startedAt = dayjs(workHistory.startedAt)
      const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
      return endedAt.diff(startedAt, 'seconds')
    }))
  const { hours, minutes, seconds } = convertSeconds(max)
  return `${hours}:${minutes}:${seconds}`
})

const minWorkTime = computed(() => {
  if (!props.workHistoryList || !props.workHistoryList.length) {
    return '00:00:00'
  }
  const filteredWorkHistoryList = props.workHistoryList
  // .filter(workHistory => workHistory.endedAt)
  const min = Math.min(...filteredWorkHistoryList
    .map(workHistory => {
      const startedAt = dayjs(workHistory.startedAt)
      const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
      return endedAt.diff(startedAt, 'seconds')
    }))
  const { hours, minutes, seconds } = convertSeconds(min)
  return `${hours}:${minutes}:${seconds}`
})
</script>
