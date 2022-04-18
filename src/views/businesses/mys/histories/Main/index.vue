<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="History main"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-space-y-4"
    >
      <div>
        <div
          class="tw-flex tw-items-center"
        >
          <q-field
            class="tw-grow tw-max-w-sm tw-ml-auto"
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
      </div>
      <!-- Line chart -->
      <busi-history-main-line-chart />
      <q-card>
        <q-card-section
          class="q-py-sm text-h6"
        >
          Weekly Work Time
        </q-card-section>
        <q-card-section
          class="q-pt-sm"
        >
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
      <q-card>
        <q-card-section
          class="q-py-sm text-h6"
        >
          Work History
        </q-card-section>
        <q-card-section
          class="q-pt-none"
        >
          <dx-data-grid
            :data-source="busiUserWorkHistoryList"
            :columns="columns"
            :show-row-lines="true"
            :show-borders="true"
            :row-alternation-enabled="true"
          >
            <dx-column-chooser
              :enabled="busiUserWorkHistoryList.length"
              mode="select"
            />
            <dx-scrolling
              column-rendering-mode="virtual"
            />
          </dx-data-grid>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiHistoryMain',
}
</script>
<script setup lang="ts">
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import { DxDataGrid, DxColumnChooser, DxScrolling } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { BusiUserWorkHistory, TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { toCapitalize } from '@/utils/commons/stringUtil'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'
import BusiHistoryMainLineChart from '@/views/businesses/mys/histories/Main/components/LineChart.vue'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import { convertSeconds } from '@/utils/commons/datetime'

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const { currentBusiUser } = storeToRefs(currentStore)
const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)
const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'My Home',
    to: { name: 'BusiMyHome' }
  },
  {
    label: 'History',
  },
  {
    label: 'main'
  }
])
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

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))
// 144000 is 40 hours to seconds
const processValue = computed(() => timerSeconds.value / (currentStore.CurrentBusiness.maxWorkHour * 60 * 60))

const initFilterData = () => {
  /* Set the filter data */
  busiUserWorkHistoryListFilter.value.busiUserId = currentBusiUser.value.id
  busiUserWorkHistoryListFilter.value.rangeStartAt = dayjs(rangeDate.value[0]).toISOString()
  busiUserWorkHistoryListFilter.value.rangeEndAt = dayjs(rangeDate.value[1]).toISOString()
}

const initData = async () => {
  try {
    const rangeStartAt = dayjs(busiUserWorkHistoryListFilter.value.rangeStartAt).toISOString()
    const rangeEndAt = dayjs(busiUserWorkHistoryListFilter.value.rangeEndAt).toISOString()

    await currentStore.loadCurrentBusiUserWorkHistoryList({
      startDateAt: rangeStartAt,
      endDateAt: rangeEndAt,
    })

    await currentStore.loadCurrentBusiUserTotalWorkSeconds({
      startDateAt: rangeStartAt,
      endDateAt: rangeEndAt,
    })
    /* load list */
    await busiUserWorkHistoryStore.loadBusiUserWorkHistoryList(busiUserWorkHistoryListFilter.value)

    timerSeconds.value = currentStore.CurrentBusiUserTotalWorkSeconds
    if (currentStore.CurrentBusiUser.startWorkAt) {
      timerSeconds.value += dayjs().diff(dayjs(currentStore.CurrentBusiUser.startWorkAt), 'seconds')
    }
    if (currentStore.CurrentBusiUser.status === 'work'
        || currentStore.CurrentBusiUser.status === 'rest'
    ) {
      initTimer()
    }
  } catch (e) {
    console.error(e)
  }
}

const onClickSearchBtn = async () => {
  try {
    await initData()
  } catch (e) {
    console.error(e)
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

initFilterData()
initData()

onBeforeUnmount(() => {
  currentStore.resetCurrentBusiUserWorkHistoryList()
  clearTimer()
})
</script>
