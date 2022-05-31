<template>
<!--  <div>-->
<!--    Prototype-->
<!--  </div>-->
</template>
<script lang="ts">
export default {
  name: 'CReloadPrompt',
}
</script>
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const intervalMS = 60 * 60 * 1000

const updateServiceWorker = useRegisterSW({
  onRegistered (r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  }
})
</script>
