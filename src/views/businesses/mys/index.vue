<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'BusinessMyLayout',
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toCapitalize } from '@/utils/commons/stringUtil'

const i18n = useI18n()

onMounted(() => {
  document.title = toCapitalize(i18n.t('Pages.Businesses.Mys.title'))

})
</script>
