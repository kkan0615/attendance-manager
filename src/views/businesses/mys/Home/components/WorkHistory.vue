<template>
  <q-card>
    <q-card-section
      class="q-py-sm"
    >
      <div
        class="text-h6"
      >
        Weekly Work History
      </div>
      <div
        class="tw-font-light tw-text-sm"
      >
        {{ formattedStartDateAt }} ~ {{ formattedEndDateAt }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section
      class="q-pt-sm"
    >
      <dx-data-grid
        :data-source="currentStore.CurrentBusiUserWorkHistoryList"
        :columns="columns"
        :show-row-lines="true"
        :show-borders="true"
        :row-alternation-enabled="true"
      >
        <template
          #statusCellTemplate="{ data }"
        >
          <busi-user-status-badge
            class="tw-text-xs tw-px-1"
            :status="data.data.status"
          />
        </template>
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
import { ref } from 'vue'
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { toCapitalize } from '@/utils/commons/stringUtil'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const i18n = useI18n()
const currentStore = useCurrentStore()

const columns = ref<Column[]>([
  {
    caption: 'Status',
    dataField: 'status',
    cellTemplate: 'statusCellTemplate',
    width: '100px',
  },
  {
    caption: 'Last Update',
    dataField: 'updatedAt',
    width: '250px',
    calculateDisplayValue: (row: BusiUserWorkHistory) => {
      return dayjs(row.updatedAt).format('llll')
    },
  },
  {
    caption: 'Work option',
    dataField: 'workOption',
    width: '150px',
    calculateDisplayValue: (row: BusiUserWorkHistory) => {
      return row.workOption ? toCapitalize(i18n.t(`Types.Models.BusiUsers.WorkOptions.${row.workOption}`)) : ''
    }
  },
  {
    caption: 'Coordination (lat, long)',
    dataField: 'coordination',
    width: '100%',
    minWidth: 200,
    calculateDisplayValue: (row: BusiUserWorkHistory) => {
      return row.latitude && row.longitude ? `${row.latitude}, ${row.longitude}` : ''
    }
  }
])

const formattedStartDateAt = ref(dayjs().startOf('week').format('ll'))
const formattedEndDateAt = ref(dayjs().endOf('week').format('ll'))
</script>
