<template>
  <div
    class="tw-h-full tw-w-full tw-relative"
  >
    <q-btn
      v-if="enableDownload"
      size="sm"
      class="tw-absolute tw-right-0 tw-z-10"
      outline
      color="primary"
      dense
      round
      icon="download"
    />
    <q-avatar
      v-if="fileType === 'image'"
      class="tw-h-full tw-max-h-52 tw-w-full"
      square
    >
      <q-img
        fit="fill"
        :src="imgToUrl"
      />
    </q-avatar>
    <q-icon
      v-else
      size="xl"
      class="tw-h-full tw-w-full"
      name="description"
    />
    <div
      class="tw-truncate"
    >
      {{ file.name }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CFilePreview',
}
</script>
<script setup lang="ts">
import { computed, PropType } from 'vue'
const props = defineProps({
  file: {
    type: Object as PropType<File>,
    required: false,
    default: () => {}
  },
  enableDownload: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const fileType = computed(() => props.file ? props.file.type.split('/')[0] : '')
const imgToUrl = computed(() => props.file ? URL.createObjectURL(props.file) : undefined)

</script>
