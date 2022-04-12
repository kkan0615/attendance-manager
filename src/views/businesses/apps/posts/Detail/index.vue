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
      <!-- Buttons -->
      <div
        class="text-right tw-space-x-2"
      >
        <q-btn
          v-if="isAllowEdit"
          color="primary"
          :label="$t('Commons.Buttons.edit')"
          @click="onClickEditBtn"
        />
        <q-btn
          v-if="isAllowDelete"
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
        class="c-form-editor-content"
        v-html="busiPostStore.BusiPost.content"
      />
      <div
        class="q-py-md"
      >
        <div
          class="text-subtitle1"
        >
          Attachments
        </div>
        <div
          class="tw-grid tw-grid-cols-5 tw-gap-4"
        >
          <c-file-preview
            v-for="attachment in busiPostStore.BusiPost.attachments"
            :key="attachment.id"
            :file="attachment.file"
            enable-download
          />
        </div>
      </div>
      <busi-app-notification-detail-comment-form
        class="q-mt-md"
      />
      <q-list
        class="tw-space-y-2"
      >
        <busi-app-notification-detail-comment-item
          v-for="comment in busiPostStore.BusiPostCommentList"
          :key="comment.id"
          :comment="comment"
        />
      </q-list>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import BusiAppNotificationDetailCommentForm from '@/views/businesses/apps/posts/Detail/components/CommentForm.vue'
import BusiAppNotificationDetailCommentItem from '@/views/businesses/apps/posts/Detail/components/CommentItem.vue'
import { useCurrentStore } from '@/store/current'
import CFilePreview from '@/components/commons/FilePreview/index.vue'

const route = useRoute()
const router = useRouter()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

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
    await busiPostStore.loadBusiPostCommentList(Number(id))
  } catch (e) {
    console.error()
  }
}

const isAllowEdit = computed(() =>
  busiPostStore.BusiPost.busiUserId === currentStore.CurrentBusiUser.id
)
const isAllowDelete = computed(() =>
  busiPostStore.BusiPost.busiUserId === currentStore.CurrentBusiUser.id
  || currentStore.CurrentBusiUser.auth === 'superAdmin'
  || currentStore.CurrentBusiUser.auth === 'admin'
)

const onClickEditBtn = () => {
  router.push({ name: 'BusiAppPostUpdateForm', params: { id: busiPostStore.BusiPost.id } })
}

onMounted(() => {
  initData()
})

onBeforeUnmount(() => {
  busiPostStore.resetBusiPost()
})
</script>
