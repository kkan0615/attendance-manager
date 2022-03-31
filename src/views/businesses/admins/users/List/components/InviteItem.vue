<template>
  <q-item>
    <q-item-section
      avatar
    >
      <q-avatar>
        <q-img
          v-if="inviteItem.user.img"
          class="profile-image"
          fit="cover"
          :src="inviteItem.user.img"
        />
        <span
          v-else
        >
          {{ inviteItem.user.name[0] }}
        </span>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ inviteItem.user.name }}</q-item-label>
      <q-item-label
        caption
        lines="2"
      >
        {{ inviteItem.user.email }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      side
      top
    >
      <q-item-label caption>
        {{ updatedAtAgo }}
      </q-item-label>
      <q-btn
        rounded
        flat
        icon="close"
        @click="onClickRemoveBtn"
      />
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserListInviteItem',
}
</script>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { BusiUserInviteListInfo } from '@/types/models/users/busiInvite'
import { useBusiUserStore } from '@/store/busiUser'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'

const props = defineProps({
  inviteItem: {
    type: Object as PropType<BusiUserInviteListInfo>,
    required: true,
    default: () => {}
  }
})

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()

const updatedAtAgo = computed(() => props.inviteItem ? dayjs(props.inviteItem.updatedAt).fromNow() : '')

const onClickRemoveBtn = async () => {
  try {
    if (props.inviteItem) {
      await busiUserStore.deleteInvite(props.inviteItem.id)
      /* Reload */
      await busiUserStore.loadBusiUserInviteList(currentStore.CurrentBusiness.id)
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
    }
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  }
}
</script>
