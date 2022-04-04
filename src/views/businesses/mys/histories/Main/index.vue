<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="History main"
      :breadcrumbs="breadcrumbs"
    />
    <q-card
      class="q-mb-md"
    >
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
        class="q-pb-sm q-pt-none"
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
      </q-card-section>
      <q-card-section
        class="q-pt-none"
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
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { toCapitalize } from '@/utils/commons/stringUtil'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const i18n = useI18n()
const currentStore = useCurrentStore()

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

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))
// 144000 is 40 hours to seconds
const processValue = computed(() => timerSeconds.value / (currentStore.CurrentBusiness.maxWorkHour * 60 * 60))

const initData = async () => {
  try {
    await currentStore.loadCurrentBusiUserWorkHistoryList({
      startDateAt: dayjs(rangeDate.value[0]).toISOString(),
      endDateAt: dayjs(rangeDate.value[1]).toISOString(),
    })

    await currentStore.loadCurrentBusiUserTotalWorkSeconds({
      startDateAt: dayjs(rangeDate.value[0]).toISOString(),
      endDateAt: dayjs(rangeDate.value[1]).toISOString(),
    })

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

initData()

onBeforeUnmount(() => {
  currentStore.resetCurrentBusiUserWorkHistoryList()
  clearTimer()
})
</script>
