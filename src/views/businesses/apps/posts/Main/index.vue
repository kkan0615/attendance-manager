<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="Post"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="text-right"
    >
      <q-btn
        color="primary"
        :label="$t('Commons.Buttons.create')"
        @click="onClickCreateBtn"
      />
    </div>
    <div>
      <dx-data-grid
        :data-source="listRows"
        :columns="columns"
        :show-row-lines="true"
        :show-borders="true"
        :row-alternation-enabled="true"
      >
        <template
          #isNotificationCellTemplate="{ data }"
        >
          {{ data.data.isNotification }}
        </template>
      </dx-data-grid>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationMain',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useBusiPostStore } from '@/store/busiPost'
import { BusiPostListInfo } from '@/types/models/businesses/post'
import { useRouter } from 'vue-router'
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { toCapitalize } from '@/utils/commons/stringUtil'

const router = useRouter()
const busiPostStore = useBusiPostStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'App',
  },
  {
    label: 'Post',
  },
  {
    label: 'Main'
  }
])
const columns = ref<Column[]>([
  {
    caption: 'isNotification',
    dataField: 'isNotification',
    cellTemplate: 'isNotificationCellTemplate',
  },
  {
    caption: 'title',
    dataField: 'title',
  },
  {
    caption: 'isAttachment',
    dataField: 'isAttachment',
    dataType: 'boolean',
  },
  {
    caption: 'commentCount',
    dataField: 'commentCount',
    dataType: 'number',
  }
])

const listRows = computed(() => ([] as BusiPostListInfo[]).concat(busiPostStore.BusiNotificationPostList).concat(busiPostStore.BusiPostList))
// @TODO: Add notification list count + list count
const pageCount = computed(() => 0)

const initData = async () => {
  try {
    await busiPostStore.loadBusiNotificationPostList({})
    await busiPostStore.loadBusiPostList({})
  } catch (e) {
    console.error(e)
  }
}

const onClickCreateBtn = () => {
  router.push({ name: 'BusiAppPostCreateForm' })
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPostList()
})
</script>
