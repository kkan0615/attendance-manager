<template>
  <q-card>
    <q-expansion-item
      v-model="isExpand"
      label="all work time"
      header-class="text-h6 tw-capitalize"
    >
      <div
        class="tw-p-2"
        :style="{
          height: `${30 * busiUserAdminList.length}px`
        }"
      >
        <vue-apex-charts
          height="100%"
          type="heatmap"
          :options="options"
          :series="series"
        />
      </div>
    </q-expansion-item>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminAnalysisMainHeatMap',
}
</script>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { getCssVar } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import dayjs from 'dayjs'

const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()
const busiUserStore = useBusiUserStore()

const { busiUserAdminList } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)
const isExpand = ref(true)

const series = computed(() => {
  const result = busiUserAdminList.value.map(busiUser => {
    let dataValues: number[] = []
    if (busiUserWorkHistoryListFilter.value
        && busiUserWorkHistoryListFilter.value.rangeStartAt
        && busiUserWorkHistoryListFilter.value.rangeEndAt
    ) {
      const rangeStartAt = dayjs(busiUserWorkHistoryListFilter.value.rangeStartAt)
      const rangeEndAt = dayjs(busiUserWorkHistoryListFilter.value.rangeEndAt)
      const diffDays = rangeEndAt.diff(rangeStartAt, 'days')

      dataValues = new Array(diffDays + 1).fill(0)
      for (let i = 0; i <= diffDays; i++) {
        const targetDateAt = rangeStartAt.add(i, 'day')
        /* Get all work history of target date */
        const filteredWorkHistoryList = busiUserWorkHistoryList.value.filter(workHistory => {
          const startedAt = dayjs(workHistory.startedAt)
          return startedAt.format('l') === targetDateAt.format('l')
              && workHistory.busiUserId === busiUser.id
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
              dataValues[i + 1] += -(dayjs(workHistory.startedAt).add(1, 'day').startOf('day')
                .diff(endedAt, 'hours'))
              endedAt = targetDateAt.add(1, 'day').startOf('day')
            }
            return endedAt.diff(startedAt, 'hours')
          }).reduce((a, b) => a + b, 0)
          dataValues[i] += sum
        }
      }
    }

    return {
      name: busiUser.name.length >= 15 ? `${busiUser.name.slice(0, 15)}...` : busiUser.name,
      min: 0,
      max: 24,
      data: dataValues,
    }
  })
  return result
})

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
    const isIncludeYear = rangeStartAt.get('month') !== rangeEndAt.get('month')
    for (let i = 0; i <= diffDays; i++) {
      if (isIncludeYear)
        result.push(rangeStartAt.add(i, 'day').format('L'))
      else
        result.push(rangeStartAt.add(i, 'day').format('DD'))
    }
  }

  return result
})

const options = computed(() => ({
  chart: {
    type: 'heatmap'
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 0,
            name: 'Off',
            color: '#6b7280'
          },
          {
            from: 1,
            to: 8,
            name: 'Worked',
            color: getCssVar('primary') || ''
          },
          {
            from: 9,
            to: 24,
            name: 'Over',
            color: '#ef4444'
          },
        ]
      },
    }
  },
  xaxis: {
    type: 'category',
    categories: dataLabels.value
  },
}))
</script>
