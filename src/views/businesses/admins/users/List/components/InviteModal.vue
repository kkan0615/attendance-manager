<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  >
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">
          Invite
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>

      <q-card-section>
        <div
          class="text-center text-h6"
        >
          <q-input
            v-model="email"
            outlined
            label="invite"
            @keydown.enter="invite"
          />
        </div>
        <!-- list of invite -->
        <div>
          <busi-admin-user-list-invite-item
            v-for="inviteItem in busiUserStore.BusiUserInviteList"
            :key="inviteItem.id"
            :invite-item="inviteItem"
          />
        </div>
      </q-card-section>
      <q-card-actions
        align="right"
      >
        <q-btn
          color="primary"
          label="invite"
          @click="invite"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserListInviteModal',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useBusiUserStore } from '@/store/busiUser'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import BusiAdminUserListInviteItem from '@/views/businesses/admins/users/List/components/InviteItem.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  }
})
const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()

const email = ref('')

const onUpdateModelValue = (bool: boolean) => {
  emits('update:modelValue', bool)
}

const invite = async () => {
  try {
    await busiUserStore.invite(email.value)
    email.value = ''
    await busiUserStore.loadBusiUserInviteList(currentStore.CurrentBusiness.id)
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
  }
}

</script>

