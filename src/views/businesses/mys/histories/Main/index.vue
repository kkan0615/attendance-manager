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
            week-start="0"
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
      <!-- Overviews -->
      <work-history-overviews
        :work-history-list="busiUserWorkHistoryList"
      />
      <!-- Line chart -->
      <busi-history-main-line-chart />
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
              :enabled="!!busiUserWorkHistoryList.length"
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
import { onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import { DxDataGrid, DxColumnChooser, DxScrolling } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import { convertSeconds } from '@/utils/commons/datetime'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import BusiHistoryMainLineChart from '@/views/businesses/mys/histories/Main/components/LineChart.vue'
import WorkHistoryOverviews from '@/components/WorkHistoryOverviews..vue'

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

const initFilterData = () => {
  /* Set the filter data */
  busiUserWorkHistoryListFilter.value.busiUserId = currentBusiUser.value.id
  busiUserWorkHistoryListFilter.value.rangeStartAt = dayjs(rangeDate.value[0]).toISOString()
  busiUserWorkHistoryListFilter.value.rangeEndAt = dayjs(rangeDate.value[1]).toISOString()
}

const initData = async () => {
  try {
    /* load list */
    await busiUserWorkHistoryStore.loadBusiUserWorkHistoryList(busiUserWorkHistoryListFilter.value)
  } catch (e) {
    console.error(e)
  }
}

const onClickSearchBtn = async () => {
  try {
    initFilterData()
    await initData()
  } catch (e) {
    console.error(e)
  }
}

initFilterData()
initData()

onBeforeUnmount(() => {
  busiUserWorkHistoryStore.resetBusiUserWorkHistoryList()
  busiUserWorkHistoryStore.resetBusiUserWorkHistoryListFilter()
})
</script>
