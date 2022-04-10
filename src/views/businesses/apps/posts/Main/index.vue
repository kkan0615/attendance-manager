<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="Post"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <div
        class="text-right q-mb-md"
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
        >
          <template
            #isNotificationCellTemplate="{ data }"
          >
            <q-badge
              v-if="data.data.isNotification"
            >
              <div
                class="c-text-first-uppercase"
              >
                {{ $t('Types.Models.BusiPost.Badges.isNotification') }}
              </div>
            </q-badge>
          </template>
          <template
            #titleCellTemplate="{ data }"
          >
            <router-link
              :to="{ name: 'BusiAppPostDetail', params: { id: data.data.id } }"
            >
              <div>
                <span class="hover:tw-underline">
                  {{ data.data.title }}
                </span>
                <q-icon
                  v-if="data.data.isAttachment"
                  class="q-ml-sm"
                  name="attachment"
                />
                <span
                  class="tw-text-red-500"
                >
                  [{{ data.data.commentCount }}]
                </span>
              </div>
            </router-link>
          </template>
        </dx-data-grid>
      </div>
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
import dayjs from 'dayjs'

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
    caption: '',
    dataField: 'isNotification',
    width: '80px',
    cellTemplate: 'isNotificationCellTemplate',
  },
  {
    caption: 'title',
    dataField: 'title',
    minWidth: 500,
    cellTemplate: 'titleCellTemplate',
  },
  {
    caption: 'user',
    dataField: 'busiUser.name',
    width: '100px',
  },
  {
    caption: 'updatedAt',
    dataField: 'updatedAt',
    width: '120px',
    calculateDisplayValue: (row: BusiPostListInfo) => {
      const updatedAt = dayjs(row.updatedAt)
      return dayjs().diff(updatedAt, 'hours') <= (24 * 7) ? updatedAt.fromNow() : updatedAt.format('ll')
    },
  },
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
