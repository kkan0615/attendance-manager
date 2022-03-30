<template>
  <q-card>
    <q-card-section
      class="profile-container"
    >
      <div
        class="text-h6"
      >
        Schedule
      </div>
      <div>
        Scehdule table will be here
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailSchedule',
}
</script>
<script setup lang="ts">
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'

const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()
</script>
<style
    lang="scss"
    scoped
>

</style>
