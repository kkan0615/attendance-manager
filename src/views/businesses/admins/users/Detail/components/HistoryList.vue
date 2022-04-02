<template>
  <q-card>
    <q-card-section
      class="text-h6 q-py-sm"
    >
      Work History
    </q-card-section>
    <q-separator />
    <q-card-section
      class="q-pt-sm q-pb-none tw-text-lg"
    >
      <span>
        Total Work Time:
      </span>
      <span>
        {{ hours }}:{{ minutes }}:{{ seconds }}
      </span>
    </q-card-section>
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
          :data-source="busiUserStore.BusiUserAdminWorkHistoryList"
          :columns="columns"
          :show-row-lines="true"
          :show-borders="true"
          :row-alternation-enabled="true"
        >
          <template
            #statusCellTemplate="{ data }"
          >
            <busi-user-status-badge
              class="tw-text-sm tw-px-1"
              :status="data.data.status"
            />
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
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { useI18n } from 'vue-i18n'
import { toCapitalize } from '@/utils/commons/stringUtil'

const i18n = useI18n()
const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()

const rangeDate = ref([dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()])
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

const hours = computed(() => parseInt((busiUserStore.BusiUserAdminTotalWorkSeconds / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((busiUserStore.BusiUserAdminTotalWorkSeconds / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((busiUserStore.BusiUserAdminTotalWorkSeconds % 60).toString()).toString().padStart(2, '0'))

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
