<template>
  <q-card>
    <q-card-section
      class="text-h6 q-py-sm"
    >
      Work History
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div
        class="tw-flex tw-justify-end"
      >
        <q-field
          class="tw-grow tw-max-w-sm"
          dense
          outlined
        >
          <date-picker
            v-model="rangeDate"
            range
            class="tw-w-full tw-mt-0.5"
            text-input
            :enable-time-picker="false"
            :clearable="false"
          />
        </q-field>
        <q-btn
          color="primary"
          flat
          rounded
          dense
          icon="search"
          @click="onClickSearchBtn"
        >
          <q-tooltip>
            Search
          </q-tooltip>
        </q-btn>
      </div>
      <div
        class="q-mt-sm"
      >
        <dx-data-grid
          :data-source="busiUserAdminWorkHistoryList"
          :columns="columns"
          :show-row-lines="true"
          :show-borders="true"
          :row-alternation-enabled="true"
        >
          <dx-column-chooser
            :enabled="busiUserAdminWorkHistoryList.length"
            mode="select"
          />
          <dx-scrolling
            column-rendering-mode="virtual"
          />
        </dx-data-grid>
      </div>
    </q-card-section>
    <q-card-section
      class="q-pt-none tw-flex tw-items-center tw-space-x-4"
    >
      <div
        class="tw-flex tw-items-center tw-space-x-2"
      >
        <div
          class="c-text-first-uppercase"
        >
          average
        </div>
        <div>
          {{ avgWorkTime }}
        </div>
      </div>
      <div class="tw-flex tw-items-center tw-space-x-2">
        <div class="c-text-first-uppercase">
          summary
        </div>
        <div>
          {{ sumWorkTime }}
        </div>
      </div>
      <div class="tw-flex tw-items-center tw-space-x-2">
        <div class="c-text-first-uppercase">
          max
        </div>
        <div>
          {{ maxWorkTime }}
        </div>
      </div>
      <div class="tw-flex tw-items-center tw-space-x-2">
        <div class="c-text-first-uppercase">
          min
        </div>
        <div>
          {{ minWorkTime }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailHistoryList',
}
</script>
<script setup lang="ts">
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { DxDataGrid, DxColumnChooser, DxScrolling } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { useI18n } from 'vue-i18n'
import { convertSeconds } from '@/utils/commons/datetime'
import { storeToRefs } from 'pinia'

const busiUserStore = useBusiUserStore()

const { busiUserAdminWorkHistoryList } = storeToRefs(busiUserStore)
const rangeDate = ref([dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()])
const columns = ref<Column[]>([
  {
    caption: 'Option',
    dataField: 'workOption',
    width: 80,
  },
  {
    caption: 'Started At',
    dataField: 'startedAt',
    minWidth: 180,
    calculateDisplayValue: (row: TempBusiUserWorkHistory) => {
      return dayjs(row.startedAt).format('llll')
    },
  },
  {
    caption: 'Ended at',
    dataField: 'endedAt',
    minWidth: 180,
    calculateDisplayValue: (row: TempBusiUserWorkHistory) => {
      return row.endedAt ? dayjs(row.endedAt).format('llll') : ''
    },
  },
  {
    caption: 'Time',
    dataField: 'time',
    minWidth: 100,
    calculateDisplayValue: (row: TempBusiUserWorkHistory) => {
      if (row.endedAt) {
        const startedAt = dayjs(row.startedAt)
        /* If there is no endedAt, set to now. */
        // @TODO: Consider to add or not....
        const endedAt = row.endedAt ? dayjs(row.endedAt) : dayjs()
        const diffSeconds = endedAt.diff(startedAt, 'seconds')
        const { hours, minutes, seconds } = convertSeconds(diffSeconds)

        return `${hours}:${minutes}:${seconds}`
      } else {
        return ''
      }
    },
  },
  {
    caption: 'Start (lat, long)',
    dataField: 'startCoordination',
    calculateDisplayValue: (row: TempBusiUserWorkHistory) => {
      return row.startLatitude && row.startLongitude ? `${row.startLatitude}, ${row.startLongitude}` : ''
    }
  },
  {
    caption: 'End (lat, long)',
    dataField: 'endCoordination',
    visible: false,
    calculateDisplayValue: (row: TempBusiUserWorkHistory) => {
      return row.endLatitude && row.endLongitude ? `${row.endLatitude}, ${row.endLongitude}` : ''
    }
  }
])

const hours = computed(() => parseInt((busiUserStore.BusiUserAdminTotalWorkSeconds / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((busiUserStore.BusiUserAdminTotalWorkSeconds / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((busiUserStore.BusiUserAdminTotalWorkSeconds % 60).toString()).toString().padStart(2, '0'))

const sumWorkTime = computed(() => {
  const filteredWorkHistoryList = busiUserAdminWorkHistoryList.value
    .filter(workHistory => workHistory.endedAt)
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
  const filteredWorkHistoryList = busiUserAdminWorkHistoryList.value
    .filter(workHistory => workHistory.endedAt)
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
  const filteredWorkHistoryList = busiUserAdminWorkHistoryList.value
    .filter(workHistory => workHistory.endedAt)
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
  const filteredWorkHistoryList = busiUserAdminWorkHistoryList.value
    .filter(workHistory => workHistory.endedAt)
  const min = Math.min(...filteredWorkHistoryList
    .map(workHistory => {
      const startedAt = dayjs(workHistory.startedAt)
      const endedAt = workHistory.endedAt ? dayjs(workHistory.endedAt) : dayjs()
      return endedAt.diff(startedAt, 'seconds')
    }))
  const { hours, minutes, seconds } = convertSeconds(min)
  return `${hours}:${minutes}:${seconds}`
})

const onClickSearchBtn = async () => {
  try {
    /* Load work history */
    await busiUserStore.loadBusiUserAdminWorkHistoryList({
      busiUserId: busiUserStore.BusiUserAdmin.id,
      startDateAt: dayjs(rangeDate.value[0]).toISOString(),
      endDateAt: dayjs(rangeDate.value[1]).toISOString(),
    })

    /* Load work total work seconds  */
    await busiUserStore.loadBusiUserAdminTotalWorkSeconds({
      busiUserId: busiUserStore.BusiUserAdmin.id,
      startDateAt: dayjs(rangeDate.value[0]).toISOString(),
      endDateAt: dayjs(rangeDate.value[1]).toISOString(),
    })
  } catch (e) {
    console.error(e)
  }
}

</script>
<style
    lang="scss"
    scoped
>

</style>
