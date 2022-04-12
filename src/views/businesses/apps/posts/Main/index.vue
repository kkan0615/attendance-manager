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
        <div
          class="q-mb-sm"
        >
          @TODO: Filter will be here
        </div>
        <dx-data-grid
          :data-source="gridRows"
          :columns="columns"
          :show-row-lines="true"
          :show-borders="true"
          :on-row-prepared="onRowPrepared"
        >
          <dx-paging
            :page-size="gridPageSize"
          />
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
            <span
              v-else
            >
              {{ data.data.id }}
            </span>
          </template>
          <template
            #titleCellTemplate="{ data }"
          >
            <router-link
              :to="{ name: 'BusiAppPostDetail', params: { id: data.data.id } }"
            >
              <div>
                <span
                  class="hover:tw-underline"
                  :class="{
                    'tw-text-red-500': data.data.isNotification,
                  }"
                >
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
        <div
          class="q-mt-md tw-flex tw-justify-center"
        >
          <q-pagination
            :model-value="busiPostStore.BusiPostListFilter.page + 1"
            :max="maxPagination"
            :max-pages="6"
            @update:model-value="onUpdatePage"
          />
        </div>
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
import { DxDataGrid, DxPaging } from 'devextreme-vue/data-grid'
import { Column, RowPreparedEvent } from 'devextreme/ui/data_grid'
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
    caption: '#',
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

const gridRows = computed(() => ([] as BusiPostListInfo[]).concat(busiPostStore.BusiNotificationPostList).concat(busiPostStore.BusiPostList))
/* For grid page size for one page */
const gridPageSize = computed(() => busiPostStore.BusiPostListFilter.limit + busiPostStore.BusiNotificationPostList.length)
const maxPagination = computed(() => parseInt((busiPostStore.BusiPostListCount / busiPostStore.BusiPostListFilter.limit).toString()))

const initData = async () => {
  try {
    await busiPostStore.loadBusiNotificationPostList()
    await busiPostStore.loadBusiPostList()
  } catch (e) {
    console.error(e)
  }
}

const onRowPrepared = (row: RowPreparedEvent<BusiPostListInfo>) => {
  if (row.data && row.data.isNotification) {
    row.rowElement.classList.add('tw-bg-gray-100')
  }
}

/**
 * When q-pagination component's model value has been changed
 * @param newPage - new page number
 */
const onUpdatePage = (newPage: string) => {
  console.log(newPage)
  busiPostStore.setBusiPostListFilter({
    ...busiPostStore.BusiPostListFilter,
    page: parseInt(newPage) - 1
  })
}

const onClickCreateBtn = () => {
  router.push({ name: 'BusiAppPostCreateForm' })
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPostList()
})
</script>
