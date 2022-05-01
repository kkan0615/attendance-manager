<template>
  <q-btn
    size="sm"
    flat
    dense
    round
    padding="0"
    color="primary"
    icon="edit"
    @click="onClickOpenBtn"
  />
  <q-dialog
    v-model="isOpen"
  >
    <q-card>
      <q-card-section class="row items-center q-py-sm">
        <div class="text-h6">
          Tittle
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
      <q-separator />
      <q-form>
        <q-card-section>
          {{ workHistory }}
        </q-card-section>
        <q-separator />
        <q-card-section
          class="text-right"
        >
          <q-btn
            color="primary"
            type="submit"
            :label="$t('Commons.Buttons.save')"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailWorkHistoryFormDialog',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  workHistory: {
    type: Object,
    required: true,
    default: () => {},
  }
})

const isOpen = ref(false)

const onClickOpenBtn = () => {
  isOpen.value = true
}
</script>
