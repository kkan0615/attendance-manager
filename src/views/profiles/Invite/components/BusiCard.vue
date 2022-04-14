<template>
  <q-card>
    <img
      :src="invite.business.logo"
      :alt="invite.business.name"
    >
    <q-separator />
    <q-card-section>
      <div
        class="text-h6"
      >
        {{ invite.business.name }}
      </div>
    </q-card-section>
    <q-item>
      <q-item-section
        avatar
      >
        <q-avatar>
          <q-img
            v-if="invite.invitor.img"
            class="profile-image"
            fit="cover"
            :src="invite.invitor.img"
          />
          <span
            v-else
          >
            {{ invite.invitor.name[0] }}
          </span>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ invite.invitor.name }}</q-item-label>
        <q-item-label
          caption
          lines="2"
        >
          {{ invite.invitor.email }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-actions>
      <q-btn
        color="primary"
        flat
        round
        dense
        icon="done"
        @click="onClickAcceptBtn"
      >
        <q-tooltip
          class="c-text-first-uppercase"
        >
          {{ $t('Commons.Tooltips.ok') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        color="negative"
        flat
        round
        dense
        icon="close"
        @click="onClickRejectBtn"
      >
        <q-tooltip
          class="c-text-first-uppercase"
        >
          {{ $t('Commons.Tooltips.reject') }}
        </q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'ProfileInviteBusiCard',
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import { BusiUserInviteListInfo } from '@/types/models/users/busiInvite'
import { useBusiUserStore } from '@/store/busiUser'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'

const props = defineProps({
  invite: {
    type: Object as PropType<BusiUserInviteListInfo>,
    required: true,
    default: () => {}
  }
})

const i18n = useI18n()
const busiUserStore = useBusiUserStore()
const userStore = useUserStore()

const onClickAcceptBtn = async () => {
  try {
    if (props.invite) {
      await busiUserStore.acceptInvite(props.invite.id)
      await userStore.loadUserInviteList()
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

const onClickRejectBtn = async () => {
  try {
    if (props.invite) {
      await busiUserStore.deleteInvite(props.invite.id)
      await userStore.loadUserInviteList()

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
