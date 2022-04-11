<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :title="busiPostStore.BusiPost.title"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <div
        class="text-right tw-space-x-2"
      >
        <q-btn
          color="primary"
          :label="$t('Commons.Buttons.edit')"
        />
        <q-btn
          outline
          color="negative"
          :label="$t('Commons.Buttons.delete')"
        />
      </div>
      <div
        class="text-h4 q-mb-md"
      >
        {{ busiPostStore.BusiPost.title }}
      </div>
      <div
        ref="contentRef"
        class="c-form-editor-content"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationDetail',
}
</script>
<script setup lang="ts">
import { useBusiPostStore } from '@/store/busiPost'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'

const route = useRoute()
const router = useRouter()
const busiPostStore = useBusiPostStore()
const contentRef = ref<HTMLDivElement>()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'App',
  },
  {
    label: 'Post',
  },
  {
    label: 'Detail'
  }
])

const initData = async () => {
  try {
    const { id } = route.params
    await busiPostStore.loadBusiPost(Number(id))
    /* Add Html data */
    if (contentRef.value) {
      contentRef.value?.append(busiPostStore.BusiPost.content)
    }
  } catch (e) {
    console.error()
  }
}

onMounted(() => {
  initData()
})

onBeforeUnmount(() => {
  busiPostStore.resetBusiPost()
})
</script>
