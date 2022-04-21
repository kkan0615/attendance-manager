<template>
  <q-drawer
    :model-value="busiSettingStore.IsLeftDrawerOpen"
    :width="250"
    show-if-above
    class="tw-bg-sidenav-dark tw-text-white"
    @update:model-value="onUpdateModelValue"
  >
    <q-scroll-area
      class="fit"
    >
      <div class="q-pa-sm">
        <!-- Logo -->
        <router-link
          :to="{ name: 'BusiMyHome' }"
        >
          <q-img
            v-if="currentStore.CurrentBusiness.logo"
            class="tw-rounded q-mb-md logo"
            fit="cover"
            :src="currentStore.CurrentBusiness.logo"
          />
        </router-link>
        <!-- My menu list -->
        <div
          class="text-subtitle2 text-grey-4"
        >
          My
        </div>
        <q-list
          padding
        >
          <q-item
            :to="{ name: 'BusiMyHome' }"
            clickable
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <!-- Not use yet -->
          <!--          <q-item-->
          <!--            clickable-->
          <!--            :to="{ name: 'BusiMyScheduleLayout' }"-->
          <!--            active-class="active-router"-->
          <!--          >-->
          <!--            <q-item-section avatar>-->
          <!--              <q-icon name="schedule" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section>-->
          <!--              <div-->
          <!--                class="c-text-first-uppercase"-->
          <!--              >-->
          <!--                schedule-->
          <!--              </div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <q-item
            clickable
            :to="{ name: 'BusiMyHistoryLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                history
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- App menu list -->
        <div
          class="text-subtitle2 text-grey-4"
        >
          App
        </div>
        <q-list
          padding
        >
          <q-item
            clickable
            :to="{ name: 'BusiAppUserLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                user
              </div>
            </q-item-section>
          </q-item>
          <!-- Not use yet -->
          <!--          <q-item-->
          <!--            clickable-->
          <!--          >-->
          <!--            <q-item-section avatar>-->
          <!--              <q-icon name="schedule" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section>-->
          <!--              <div-->
          <!--                class="c-text-first-uppercase"-->
          <!--              >-->
          <!--                schedule-->
          <!--              </div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <q-item
            clickable
            :to="{ name: 'BusiAppPostLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                post
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- App menu list -->
        <div
          v-if="isAdmin"
          class="text-subtitle2 text-grey-4"
        >
          Admin
        </div>
        <q-list
          v-if="isAdmin"
          padding
        >
          <!-- QR code scanner (Camera is required) -->
          <q-item
            v-if="currentBusiness.busiConfig.isEnableQrcode"
            clickable
            :to="{ name: 'BusiAdminQRCodeLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="qr_code_scanner" />
            </q-item-section>
            <q-item-section>QR code scanner</q-item-section>
          </q-item>
          <q-item
            v-if="currentStore.CurrentBusiUser.auth !== 'system'"
            clickable
            :to="{ name: 'BusiAdminBusinessLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                business
              </div>
            </q-item-section>
          </q-item>
          <q-item
            v-if="currentStore.CurrentBusiUser.auth !== 'system'"
            clickable
            :to="{ name: 'BusiAdminUserLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="people_alt" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                user
              </div>
            </q-item-section>
          </q-item>
          <q-item
            v-if="currentStore.CurrentBusiUser.auth !== 'system'"
            clickable
            :to="{ name: 'BusiAdminAnalysisLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="analytics" />
            </q-item-section>
            <q-item-section>
              <div
                class="c-text-first-uppercase"
              >
                analysis
              </div>
            </q-item-section>
          </q-item>
          <!-- Not use yet -->
          <!--          <q-item-->
          <!--            clickable-->
          <!--          >-->
          <!--            <q-item-section avatar>-->
          <!--              <q-icon name="settings" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section>Settings</q-item-section>-->
          <!--          </q-item>-->
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutLeftDrawer',
}
</script>
<script setup lang="ts">
import { useBusiSettingStore } from '@/store/businessSetting'
import { useCurrentStore } from '@/store/current'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const currentStore = useCurrentStore()
const busiSettingStore = useBusiSettingStore()

const { currentBusiness } = storeToRefs(currentStore)

const isAdmin = computed(() =>
  currentStore.CurrentBusiUser.auth === 'admin'
    || currentStore.CurrentBusiUser.auth === 'superAdmin'
    || currentStore.CurrentBusiUser.auth === 'system'
)

const onUpdateModelValue = (bool: boolean) => {
  busiSettingStore.setLeftDrawer(bool)
}
</script>
<style
  lang="scss"
  scoped
>
/*
   active router
 */
.active-router {
  @apply tw-bg-q-primary tw-rounded-r-full tw-mr-2;
}

.q-item {
  min-height: 40px;
}
</style>
