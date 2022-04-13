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
          @click="onClickDeleteBtn"
        />
      </div>
      <!-- Title -->
      <div
        class="text-h4"
      >
        {{ busiPostStore.BusiPost.title }}
      </div>
      <q-item
        v-if="busiPostStore.BusiPost.busiUser"
        class="q-px-none"
      >
        <!-- Left side -->
        <q-item-section
          top
          avatar
        >
          <q-avatar
            class="tw-ring tw-ring-q-primary tw-ring-2"
          >
            <q-img
              v-if="busiPostStore.BusiPost.busiUser.img"
              :src="busiPostStore.BusiPost.busiUser.img"
              fit="contain"
              height="100%"
              width="100%"
            />
            <span
              v-else
            >
              {{ busiPostStore.BusiPost.busiUser.name[0] }}
            </span>
          </q-avatar>
        </q-item-section>
        <!-- Middle side -->
        <q-item-section>
          <q-item-label
            class="tw-font-semibold"
          >
            {{ busiPostStore.BusiPost.busiUser.name }}
          </q-item-label>
          <q-item-label
            caption
          >
            {{ formattedUpdatedAt }}
          </q-item-label>
        </q-item-section>
        <!-- Right side -->
        <q-item-section
          side
          top
        >
          <q-item-label>
            <q-btn
              class="tw-text-black"
              dense
              flat
              :label="$t('Commons.Buttons.copyURL')"
              @click="onClickCopyURL"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator
        class="q-mb-md"
      />
      <div
        class="c-form-editor-content tw-mb-16"
        v-html="busiPostStore.BusiPost.content"
      />
      <div
        v-if="busiPostStore.BusiPost.attachments && busiPostStore.BusiPost.attachments.length"
        class="q-py-md"
      >
        <div
          class="text-subtitle1"
        >
          {{ $t('Commons.Titles.attachment') }}s
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
      <q-separator
        class="q-my-md"
      />
      <busi-app-notification-detail-comment-form
        class="q-mt-md"
      />
      <q-list
        class="tw-space-y-2"
      >
        <q-item-label
          class="q-pa-none"
        >
          <q-icon
            left
            name="comment"
          />
          <span>
            {{ $t('Commons.Titles.comment') }}
          </span>
          <span
            class="tw-font-semibold q-ml-sm"
          >
            {{ busiPostStore.BusiPostCommentList.length }}
          </span>
        </q-item-label>
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
import { QBreadcrumbsElProps, useQuasar } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import BusiAppNotificationDetailCommentForm from '@/views/businesses/apps/posts/Detail/components/CommentForm.vue'
import BusiAppNotificationDetailCommentItem from '@/views/businesses/apps/posts/Detail/components/CommentItem.vue'
import { useCurrentStore } from '@/store/current'
import CFilePreview from '@/components/commons/FilePreview/index.vue'
import dayjs from 'dayjs'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const $q = useQuasar()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

const { busiPost } = storeToRefs(busiPostStore)
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
  busiPost.value.busiUserId === currentStore.CurrentBusiUser.id
  || currentStore.CurrentBusiUser.auth === 'superAdmin'
  || currentStore.CurrentBusiUser.auth === 'admin'
)
const formattedUpdatedAt = computed(() => {
  const updatedAt = dayjs(busiPost.value.updatedAt)
  return dayjs().diff(updatedAt, 'hours') <= (24 * 7) ? updatedAt.fromNow() : updatedAt.format('ll')
})

const onClickEditBtn = () => {
  router.push({ name: 'BusiAppPostUpdateForm', params: { id: busiPostStore.BusiPost.id } })
}

const onClickDeleteBtn = async () => {
  $q.dialog({
    title: 'Delete',
    message: 'Would you like to delete this post?',
    cancel: true,
  }).onOk(async () => {
    try {
      /* delete busi user by id */
      await busiPostStore.deleteBusiPost(busiPost.value.id)
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
      router.back()
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
  })
}

const onClickCopyURL = () => {
  // @ref: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API (clipboard)
  // @ref: https://www.w3schools.com/js/js_window_location.asp (window.location)
  navigator.clipboard.writeText(window.location.href)
}

onMounted(() => {
  initData()
})

onBeforeUnmount(() => {
  busiPostStore.resetBusiPost()
})
</script>
