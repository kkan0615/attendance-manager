<template>
  <q-card>
    <q-card-section>
      <div
        class="tw-h-72"
      >
        <vue-apex-charts
          height="100%"
          type="line"
          :options="options"
          :series="series"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'ProfileAnalysisLineChart',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { getCssVar } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'

/* To use chart */

const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)

const dataLabels = computed(() => {
  let result: string[] = []
  if (busiUserWorkHistoryListFilter.value
      && busiUserWorkHistoryListFilter.value.rangeStartAt
      && busiUserWorkHistoryListFilter.value.rangeEndAt
  ) {
    const rangeStartAt = dayjs(busiUserWorkHistoryListFilter.value.rangeStartAt)
    const rangeEndAt = dayjs(busiUserWorkHistoryListFilter.value.rangeEndAt)
    const diffDays = rangeEndAt.diff(rangeStartAt, 'days')

    /* If same years, year is not required to include */
    const isIncludeYear = rangeStartAt.get('year') !== rangeEndAt.get('year')
    for (let i = 0; i <= diffDays; i++) {
      if (isIncludeYear)
        result.push(rangeStartAt.add(i, 'day').format('L'))
      else
        result.push(rangeStartAt.add(i, 'day').format('MM-DD'))
    }
  }

  return result
})
const dataValues = computed(() => {
  let result: number[] = []
  if (busiUserWorkHistoryListFilter.value
      && busiUserWorkHistoryListFilter.value.rangeStartAt
      && busiUserWorkHistoryListFilter.value.rangeEndAt
  ) {
    const rangeStartAt = dayjs(busiUserWorkHistoryListFilter.value.rangeStartAt)
    const rangeEndAt = dayjs(busiUserWorkHistoryListFilter.value.rangeEndAt)
    const diffDays = rangeEndAt.diff(rangeStartAt, 'days')

    result = new Array(diffDays + 1).fill(0)
    for (let i = 0; i <= diffDays; i++) {
      const targetDateAt = rangeStartAt.add(i, 'day')
      /* Get all work history of target date */
      const filteredWorkHistoryList = busiUserWorkHistoryList.value.filter(workHistory => {
        const startedAt = dayjs(workHistory.startedAt)
        return startedAt.format('l') === targetDateAt.format('l')
      })
      /* If there is work history */
      if (filteredWorkHistoryList.length) {
        const sum = filteredWorkHistoryList.map(workHistory => {
          const startedAt = dayjs(workHistory.startedAt)
          let endedAt = dayjs(workHistory.endedAt)
          /* If no ended at, */
          if (!workHistory.endedAt) {
            if (dayjs().format('l') !== targetDateAt.format('l')) {
              endedAt = targetDateAt.add(1, 'day').startOf('day')
            }
            /* If it over date (like night work) */
          } else if (startedAt.format('l') !== endedAt.format('l')) {
            result[i + 1] += -(dayjs(workHistory.startedAt).add(1, 'day').startOf('day')
              .diff(endedAt, 'hours'))
            endedAt = targetDateAt.add(1, 'day').startOf('day')
          }
          return endedAt.diff(startedAt, 'hours')
        }).reduce((a, b) => a + b, 0)
        result[i] += sum
      }
    }
  }
  return result
})
const series = computed(() => [
  {
    name: 'Work Hours',
    data: dataValues.value,
  }
])
const options = computed(() => ({
  chart: {
    type: 'line'
  },
  colors: [getCssVar('primary') || ''],
  xaxis: {
    categories: dataLabels.value
  }
}))

</script>
