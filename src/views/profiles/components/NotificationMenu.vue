<template>
  <q-btn
    flat
    round
    dense
    :icon="currentStore.CurrentUserNotificationList.length ? 'notifications_active' : 'notifications'"
  >
    <q-badge
      v-if="currentStore.CurrentUserNotificationList.length"
      color="red"
      floating
    >
      {{ currentStore.CurrentUserNotificationList.length >= 100 ? 99 : currentStore.CurrentUserNotificationList.length }}
    </q-badge>
    <q-menu>
      <q-card
        class="scroll-y"
        style="width: 350px; height: 400px;"
      >
        <div
          v-if="!loading && currentStore.CurrentUserNotificationList.length"
        >
          <q-card-section
            class="tw-flex items-center q-py-sm"
          >
            Notifications ({{ currentStore.CurrentUserNotificationList.length }})
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
            <profile-layout-notification-menu-item
              v-for="notification in currentStore.CurrentUserNotificationList"
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
  name: 'ProfileLayoutNotificationMenu',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import ProfileLayoutNotificationMenuItem from '@/views/profiles/components/NotificationMenuItem.vue'

const i18n = useI18n()
const currentStore = useCurrentStore()

const loading = ref(false)

const initData = async () => {
  try {
    await currentStore.loadCurrentUserNotificationList()
  } catch (e) {
    console.error(e)
  }
}

const onClickMakeAllAsReadBtn = async () => {
  try {
    loading.value = true
    for (let i = 0; i < currentStore.CurrentUserNotificationList.length; i++) {
      const notification = currentStore.CurrentUserNotificationList[i]
      await currentStore.readNotification(notification.id)
    }
    /* Reload */
    await currentStore.loadCurrentUserNotificationList()
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
  currentStore.resetCurrentUserNotificationList()
})
</script>
