<template>
  <q-card>
    <q-card-section
      class="q-py-sm"
    >
      <div
        class="text-h6"
      >
        Notification post
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section
      class="q-pt-sm"
    >
      <dx-data-grid
        :data-source="busiPostHomeList"
        :columns="columns"
        :show-row-lines="true"
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
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeNotificationPostList',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { DxDataGrid } from 'devextreme-vue/data-grid'
import { Column } from 'devextreme/ui/data_grid'
import dayjs from 'dayjs'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'
import { BusiPostListInfo } from '@/types/models/businesses/post'
import { useBusiPostStore } from '@/store/busiPost'
import { storeToRefs } from 'pinia'

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

const { busiPostHomeList } = storeToRefs(busiPostStore)
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

const initData = async () => {
  try {
    await busiPostStore.loadBusiPostHomeList()
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPostHomeList()
})
</script>
