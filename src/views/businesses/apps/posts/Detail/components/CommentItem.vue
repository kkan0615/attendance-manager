<template>
  <q-item>
    <!-- Left side -->
    <q-item-section
      top
      avatar
    >
      <q-avatar
        class="tw-ring tw-ring-q-primary tw-ring-2"
      >
        <q-img
          v-if="comment.busiUser.img"
          :src="comment.busiUser.img"
          fit="contain"
          height="100%"
          width="100%"
        />
        <span
          v-else
        >
          {{ comment.busiUser.name[0] }}
        </span>
      </q-avatar>
    </q-item-section>
    <!-- Middle side -->
    <q-item-section>
      <q-item-label>{{ comment.busiUser.name }}</q-item-label>
      <q-item-label
        class="tw-whitespace-pre-line"
        caption
      >
        {{ comment.content }}
      </q-item-label>
    </q-item-section>
    <!-- Right side -->
    <q-item-section
      side
      top
    >
      <q-item-label caption>
        {{ formattedUpdatedAt }}
      </q-item-label>
      <!-- Delete button -->
      <q-btn
        v-if="isCreator"
        color="negative"
        dense
        flat
        round
        size="sm"
        icon="delete"
        @click="onClickDeleteBtn"
      />
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationDetailCommentItem',
}
</script>
<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useCurrentStore } from '@/store/current'
import { useBusiPostStore } from '@/store/busiPost'
import { BusiPostCommentListInfo } from '@/types/models/businesses/post'
import dayjs from 'dayjs'
import { useQuasar } from 'quasar'

const i18n = useI18n()
const $q = useQuasar()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

const props = defineProps({
  comment: {
    type: Object as PropType<BusiPostCommentListInfo>,
    required: true,
    default: () => {}
  }
})

const isCreator = computed(() =>  props.comment
    && props.comment.busiUserId === currentStore.CurrentBusiUser.id
    || currentStore.CurrentBusiUser.auth === 'superAdmin'
    || currentStore.CurrentBusiUser.auth === 'admin')
const formattedUpdatedAt = computed(() => {
  if (props.comment) {
    const updatedAt = dayjs(props.comment.updatedAt)
    return dayjs().diff(updatedAt, 'hours') <= (24 * 7) ? updatedAt.fromNow() : updatedAt.format('ll')
  } else {
    return ''
  }
})

const onClickDeleteBtn = async () => {
  $q.dialog({
    title: 'Delete Comment',
    message: 'Would you like to delete this comment?',
    cancel: true,
  }).onOk(async () => {
    try {
      if (props.comment) {
        /* delete busi user by id */
        await busiPostStore.deleteBusiPostComment(props.comment.id)
        showSnackbar({
          message: i18n.t('Commons.Messages.saved'),
          color: 'positive'
        })
      }
      await busiPostStore.loadBusiPostCommentList(busiPostStore.BusiPost.id)
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
  })
}
</script>
