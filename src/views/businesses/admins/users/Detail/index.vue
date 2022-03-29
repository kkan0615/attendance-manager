<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="User Form"
      :breadcrumbs="breadcrumbs"
    />
    <div>
      <div>
        {{ busiUserStore.BusiUserAdmin }}
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetail',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import { useRoute, useRouter } from 'vue-router'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'

const route = useRoute()
const router = useRouter()
const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'Admin',
  },
  {
    label: 'User',
  },
  {
    label: 'Detail'
  }
])

const initData = async () => {
  try {
    const { id } = route.params
    if (id) {
      await busiUserStore.loadBusiUser(Number(id))
      if (!busiUserStore.BusiUserAdmin || !busiUserStore.BusiUserAdmin.id) {
        throw new Error('BusiUserAdmin is not found')
      }

      if (busiUserStore.BusiUserAdmin.busiId !== currentStore.CurrentBusiness.id) {
        throw new Error('Business id is not matched')
      }
    }
  } catch (e) {
    console.error(e)
    await router.push({ name: 'BusiMyLayout' })
  }
}

initData()
</script>
