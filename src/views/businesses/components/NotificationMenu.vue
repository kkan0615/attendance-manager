<template>
  <q-btn
    flat
    round
    dense
    :color="currentStore.CurrentBusiUserNotificationList.length ? 'primary' : undefined"
    :icon="currentStore.CurrentBusiUserNotificationList.length ? 'notifications_active' : 'notifications'"
  >
    <q-badge
      v-if="currentStore.CurrentBusiUserNotificationList.length"
      color="red"
      floating
    >
      {{ currentStore.CurrentBusiUserNotificationList.length >= 100 ? '99+' : currentStore.CurrentBusiUserNotificationList.length }}
    </q-badge>
    <q-menu>
      <q-card
        class="scroll-y"
        style="width: 350px; height: 400px;"
      >
        <div
          v-if="!loading && currentStore.CurrentBusiUserNotificationList.length"
        >
          <q-card-section
            class="tw-flex items-center q-py-sm"
          >
            Notifications ({{ currentStore.CurrentBusiUserNotificationList.length }})
            <!-- Make all as read button -->
            <q-btn
              class="tw-ml-auto"
              flat
              color="primary"
              dense
              size="12px"
              label="mask all as read"
              @click="onClickMakeAllAsReadBtn"
            />
          </q-card-section>
          <q-separator />
          <q-list
            padding
            separator
          >
            <busi-layout-notification-menu-item
              v-for="notification in currentStore.CurrentBusiUserNotificationList"
              :key="notification.id"
              :notificaiton="notification"
            />
          </q-list>
        </div>
        <q-card-section
          v-else-if="!loading"
          class="tw-h-full tw-flex tw-items-center tw-justify-center text-h6"
        >
          No notification
        </q-card-section>
        <q-inner-loading
          :showing="loading"
          label="loading..."
        />
      </q-card>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutNotificationMenu',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BusiLayoutNotificationMenuItem from '@/views/businesses/components/NotificationMenuItem.vue'
import { showSnackbar } from '@/utils/libs/quasar/notify'

const i18n = useI18n()
const currentStore = useCurrentStore()

const loading = ref(false)

const initData = async () => {
  try {
    await currentStore.loadCurrentBusiUserNotificationList()
  } catch (e) {
    console.error(e)
  }
}

const onClickMakeAllAsReadBtn = async () => {
  try {
    loading.value = true
    for (let i = 0; i < currentStore.CurrentBusiUserNotificationList.length; i++) {
      const notification = currentStore.CurrentBusiUserNotificationList[i]
      await currentStore.readNotification(notification.id)
    }
    /* Reload */
    await currentStore.loadCurrentBusiUserNotificationList()
    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })
  } catch (e) {
    console.error()
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  } finally {
    loading.value = false
  }
}

initData()

onBeforeUnmount(() => {
  currentStore.resetCurrentBusiUserNotificationList()
})
</script>
