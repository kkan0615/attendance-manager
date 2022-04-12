<template>
  <q-form
    @submit="onSubmitForm"
  >
    <q-input
      v-model="content"
      placeholder="Comment"
      autogrow
      type="textarea"
      dense
      outlined
      :rules="rules.content"
      hide-bottom-space
    />
    <div
      class="q-mt-sm text-right"
    >
      <q-btn
        color="primary"
        type="submit"
        :label="$t('Commons.Buttons.send')"
      />
    </div>
  </q-form>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationDetailCommentForm',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useCurrentStore } from '@/store/current'
import { useBusiPostStore } from '@/store/busiPost'

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

const content = ref('')
const rules = ref({
  content: [
    (val: string) => val.length <= 200 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 200 })
  ],
})

const onSubmitForm = async () => {
  try {
    await busiPostStore.createBusiPostComment({
      busiUserId: currentStore.CurrentBusiUser.id,
      busiPostId: busiPostStore.BusiPost.id,
      type: 'comment',
      content: content.value,
    })

    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })
    await busiPostStore.loadBusiPostCommentList(busiPostStore.BusiPost.id)
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  }
}
</script>
