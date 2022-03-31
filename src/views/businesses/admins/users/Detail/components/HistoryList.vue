<template>
  <q-card>
    <q-card-section
      class="profile-container"
    >
      <div
        class="text-h6"
      >
        Work History
      </div>
      <div>
        history list will be here
        <div>
          {{ formattedStartDateAt }}
          {{ formattedSndDateAt }}
        </div>
        <div>
          {{ busiUserStore.BusiUserAdminWorkHistoryList }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailHistoryList',
}
</script>
<script setup lang="ts">
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()

const startDateAt = ref(dayjs().startOf('week').toISOString())
const endDateAt = ref(dayjs().endOf('week').toISOString())

const formattedStartDateAt = computed(() => dayjs(startDateAt.value).format('llll'))
const formattedSndDateAt = computed(() => dayjs(endDateAt.value).format('llll'))

</script>
<style
    lang="scss"
    scoped
>

</style>
