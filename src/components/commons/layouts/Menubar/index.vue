<template>
  <div
    class="row q-mb-md items-center"
  >
    <div
      class="text-h5 text-capitalize"
    >
      {{ title }}
    </div>
    <div
      class="q-ml-auto"
    >
      <q-breadcrumbs>
        <q-breadcrumbs-el
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="`breadcrumb-${index}`"
          v-bind="breadcrumb"
          :class="{
            'tw-text-q-primary': breadcrumb.to
          }"
        />
      </q-breadcrumbs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CLayoutMenubar',
}
</script>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  breadcrumbs: {
    type: Array as PropType<QBreadcrumbsElProps[]>,
    required: false,
    default: () => [],
  }
})
</script>
