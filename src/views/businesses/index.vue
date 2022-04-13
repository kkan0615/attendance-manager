<template>
  <q-layout
    view="lHh Lpr lFf"
    class="shadow-2 rounded-borders"
  >
    <!--  header  -->
    <busi-layout-header />
    <!--  left drawer  -->
    <busi-layout-left-drawer />
    <q-page-container>
      <!--      <transition-->
      <!--          enter-active-class="animate__animated animate__fadeIn animate__faster"-->
      <!--      >-->
      <!--        <router-view />-->
      <!--      </transition>-->
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
  name: 'BusinessHome',
}
</script>
<script setup lang="ts">
import BusiLayoutHeader from '@/views/businesses/components/Header.vue'
import BusiLayoutLeftDrawer from '@/views/businesses/components/LeftDrawer.vue'
import { useCurrentStore } from '@/store/current'
import { onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { useBusiSettingStore } from '@/store/businessSetting'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()
const busiSettingStore = useBusiSettingStore()
const $q = useQuasar()

if (!$q.platform.is.desktop) {
  busiSettingStore.setLeftDrawer(false)
}

/* Check auth user */
if (!currentStore.CurrentBusiUser
    || !currentStore.CurrentBusiUser.id
    || currentStore.CurrentBusiUser.busiId !== currentStore.CurrentBusiness.id
) {
  showSnackbar({
    message: i18n.t('Commons.Messages.unAuthUser'),
    color: 'negative'
  })
  router.push({ name: 'AuthLogin' })
}

onBeforeUnmount(() => {
  currentStore.resetCurrentBusiness()
  currentStore.resetCurrentBusiUser()
})

</script>
