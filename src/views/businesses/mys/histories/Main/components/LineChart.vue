<template>
  <q-card>
    <q-card-section>
      <line-chart
        class="tw-h-72"
        v-bind="lineChartProps"
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiHistoryMainLineChart',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { getCssVar, useQuasar } from 'quasar'

/* To use chart */
Chart.register(...registerables)

const $q = useQuasar()
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

    for (let i = 0; i <= diffDays; i++) {
      result.push(rangeStartAt.add(i, 'day').format('L'))
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
          // console.log(targetDateAt.format('llll'))
          // console.log(startedAt.format('llll'))
          // console.log(endedAt.format('llll'))
          // console.log('----------------------------------')
          return endedAt.diff(startedAt, 'hours')
        }).reduce((a, b) => a + b, 0)
        result[i] += sum
      }
    }
  }
  return result
})
const chartData = computed<ChartData<'line'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      label: 'Work Hours',
      data: dataValues.value,
      backgroundColor: getCssVar('primary') || '',
    },
  ],
}))
const options = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
}))

const { lineChartProps } = useLineChart({
  chartData,
  options,
})
</script>
