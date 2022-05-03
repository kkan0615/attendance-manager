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
      <div
        class="q-pt-md"
      >
        <work-history-overviews
          flat
          :work-history-list="busiUserWorkHistoryList"
        />
      </div>
      <!-- Table -->
      <div>
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
          <dx-toolbar>
            <dx-item
              location="after"
              template="createDialogTemplate"
            />
            <dx-item
              name="columnChooserButton"
            />
          </dx-toolbar>
          <template
            #createDialogTemplate
          >
            <busi-admin-user-detail-work-history-form-dialog />
          </template>
          <template
            #actionsCellTemplate="{ data }"
          >
            <div
              v-if="data.data.endedAt"
              class="tw-text-center"
            >
              <busi-admin-user-detail-work-history-form-dialog
                is-update
                :work-history="data.data"
              />
            </div>
          </template>
        </dx-data-grid>
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
import dayjs from 'dayjs'
import { ref } from 'vue'
import { DxDataGrid, DxColumnChooser, DxScrolling, DxToolbar, DxItem } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { convertSeconds } from '@/utils/commons/datetime'
import { storeToRefs } from 'pinia'
import WorkHistoryOverviews from '@/components/WorkHistoryOverviews..vue'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import BusiAdminUserDetailWorkHistoryFormDialog
  from '@/views/businesses/admins/users/Detail/components/WorkHistoryFormDialog.vue'

const busiUserStore = useBusiUserStore()
const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const { busiUserAdmin } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)
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
  },
  {
    caption: 'Actions',
    dataField: 'actions',
    alignment: 'center',
    cellTemplate: 'actionsCellTemplate',
    allowEditing: false,
    allowExporting: false,
    allowFiltering: false,
    allowGrouping: false,
    allowSearch: false,
    allowSorting: false
  },
  {
    caption: 'Description',
    dataField: 'description',
    visible: false,
  },
])

const onClickSearchBtn = async () => {
  try {
    /* Set the filter data */
    busiUserWorkHistoryListFilter.value.busiUserId = busiUserAdmin.value.id
    busiUserWorkHistoryListFilter.value.rangeStartAt = dayjs(rangeDate.value[0]).toISOString()
    busiUserWorkHistoryListFilter.value.rangeEndAt = dayjs(rangeDate.value[1]).toISOString()

    /* Load work history */
    await busiUserWorkHistoryStore.loadBusiUserWorkHistoryList({
      busiUserId: busiUserStore.BusiUserAdmin.id,
      rangeStartAt: busiUserWorkHistoryListFilter.value.rangeStartAt,
      rangeEndAt: busiUserWorkHistoryListFilter.value.rangeEndAt,
    })
  } catch (e) {
    console.error(e)
  }
}

</script>
