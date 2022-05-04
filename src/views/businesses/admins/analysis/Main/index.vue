<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="admin analysis"
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
          <q-tooltip
            class="tw-capitalize"
          >
            {{ $t('Commons.Tooltips.search') }}
          </q-tooltip>
        </q-btn>
      </div>
      <busi-admin-analysis-main-overviews />
      <!-- Heat map  -->
      <busi-admin-analysis-main-heat-map />
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminAnalysisMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import { useBusiUserStore } from '@/store/busiUser'
import BusiAdminAnalysisMainHeatMap from '@/views/businesses/admins/analysis/Main/components/Heatmap.vue'
import BusiAdminAnalysisMainOverviews from '@/views/businesses/mys/histories/Main/components/Overviews.vue'

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()
const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const { currentBusiness } = storeToRefs(currentStore)
const { busiUserAdminListFilter } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter, busiUserWorkHistoryList } = storeToRefs(busiUserWorkHistoryStore)
const rangeDate = ref([dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()])
const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'Admin',
  },
  {
    label: 'Analysis',
  },
  {
    label: 'Main'
  }
])

/**
 * Init the filter data
 */
const initFilterData = () => {
  /* Set the busi user filter data */
  busiUserAdminListFilter.value.busiId = currentBusiness.value.id
  /* Set the busi user work history filter data */
  busiUserWorkHistoryListFilter.value.busiUserId = currentBusiness.value.id
  busiUserWorkHistoryListFilter.value.rangeStartAt = dayjs(rangeDate.value[0]).toISOString()
  busiUserWorkHistoryListFilter.value.rangeEndAt = dayjs(rangeDate.value[1]).toISOString()
}

const initData = async () => {
  try {
    await busiUserStore.loadBusiUserAdminList(busiUserAdminListFilter.value)
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
</script>
