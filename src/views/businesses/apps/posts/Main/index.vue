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
      {{ listRows }}
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

const listRows = computed(() => ([] as BusiPostListInfo[]).concat(busiPostStore.BusiNotificationPostList).concat(busiPostStore.BusiPostList)
)

const initData = async () => {
  try {
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
