<template>
  <!-- List -->
  <q-card>
    <q-card-section
      class="q-py-sm"
    >
      <div
        class="text-h6 tw-capitalize"
      >
        {{ $t('Pages.Businesses.Mys.Homes.Titles.weeklyWorkHistory') }}
      </div>
      <div
        class="tw-font-light tw-text-sm"
      >
        {{ formattedStartDateAt }} ~ {{ formattedEndDateAt }}
      </div>
    </q-card-section>
    <q-separator />
    <!-- Overviews -->
    <q-card-section
      class="q-pb-none"
    >
      <work-history-overviews
        flat
        :work-history-list="currentBusiUserWorkHistoryList"
      />
    </q-card-section>
    <q-separator />
    <q-card-section
      class="tw-w-full"
    >
      <dx-data-grid
        class="tw-w-full"
        :data-source="currentBusiUserWorkHistoryList"
        :columns="columns"
        :show-row-lines="true"
        :show-borders="true"
        :row-alternation-enabled="true"
        :column-auto-width="true"
      >
        <dx-column-chooser
          :enabled="!!currentBusiUserWorkHistoryList.length"
          mode="select"
        />
        <dx-scrolling
          column-rendering-mode="virtual"
        />
      </dx-data-grid>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeWorkHistory',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxDataGrid, DxColumnChooser, DxScrolling } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { convertSeconds } from '@/utils/commons/datetime'
import WorkHistoryOverviews from '@/components/WorkHistoryOverviews..vue'

const i18n = useI18n()
const currentStore = useCurrentStore()
const { currentBusiUserWorkHistoryList } = storeToRefs(currentStore)

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
const formattedStartDateAt = ref(dayjs().startOf('week').format('ll'))
const formattedEndDateAt = ref(dayjs().endOf('week').format('ll'))
</script>
