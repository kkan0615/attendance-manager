<template>
  <q-card>
    <q-card-section>
      {{ hours }}:{{ minutes }}:{{ seconds }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeTotalWorkTime',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { computed, ref } from 'vue'

const currentStore = useCurrentStore()

const hours = computed(() => parseInt((currentStore.CurrentBusiUserTotalWorkSeconds / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((currentStore.CurrentBusiUserTotalWorkSeconds / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((currentStore.CurrentBusiUserTotalWorkSeconds % 60).toString()).toString().padStart(2, '0'))
</script>
