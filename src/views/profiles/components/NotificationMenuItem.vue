<template>
  <q-item
    :clickable="notificaiton.busiId"
    :to="notificaiton.busiId ? { name: 'BusiMyLayout', params: { busiId: notificaiton.busiId } } : undefined"
  >
    <q-item-section
      top
      avatar
    >
      <q-avatar
        size="sm"
        class="text-white"
        :color="notificaiton.status"
      >
        <q-icon
          :name="iconName"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ notificaiton.content }}
      </q-item-label>
      <q-item-label
        class="text-right"
        caption
      >
        {{ formattedUpdatedAt }}
      </q-item-label>
    </q-item-section>
    <q-item-section
      top
      side
    >
      <q-item-label caption>
        <q-btn
          size="sm"
          flat
          dense
          round
          icon="close"
          @click="onClickCloseBtn"
        />
      </q-item-label>
    </q-item-section>
    <q-inner-loading
      :showing="loading"
      label="loading..."
    />
  </q-item>
</template>
<script lang="ts">
export default {
  name: 'ProfileLayoutNotificationMenuItem',
}
</script>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import { UserNotification } from '@/types/models/users/notification'
import { showSnackbar } from '@/utils/libs/quasar/notify'

const props = defineProps({
  notificaiton: {
    type: Object as PropType<UserNotification>,
    required: true,
    default: () => {}
  }
})

const i18n = useI18n()
const currentStore = useCurrentStore()

const loading = ref(false)

const iconName = computed(() => {
  let result = 'notifications'
  if (props.notificaiton) {
    if (props.notificaiton.status === 'primary') {
      result = 'notifications_none'
    } else if (props.notificaiton.status === 'positive') {
      result = 'done'
    } else if (props.notificaiton.status === 'warning') {
      result = 'warning'
    } else if (props.notificaiton.status === 'info') {
      result = 'info'
    } else if (props.notificaiton.status === 'negative') {
      result = 'error'
    }
  }
  return result
})
const formattedUpdatedAt = computed(() => props.notificaiton ? dayjs((props.notificaiton?.updatedAt)).format('llll') : '')

const onClickCloseBtn = async () => {
  if (props.notificaiton) {
    try {
      loading.value = true
      /* Make as read */
      await currentStore.readNotification(props.notificaiton.id)
      /* Reload */
      await currentStore.loadCurrentBusiUserNotificationList()
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    } finally {
      loading.value = false
    }
  }
}

</script>
