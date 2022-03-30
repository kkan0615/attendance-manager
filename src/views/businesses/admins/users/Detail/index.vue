<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="busiUserStore.BusiUserAdmin.name"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <div
        class="q-mb-md tw-flex tw-w-full"
      >
        <q-btn
          v-if="busiUserStore.BusiUserAdmin.status === 'work'"
          color="negative"
          :label="$t('Commons.Buttons.offWork')"
          @click="onClickWorkOffBtn"
        />
        <div
          class="tw-ml-auto tw-space-x-2"
        >
          <q-btn
            color="primary"
            :label="$t('Commons.Buttons.edit')"
          />
          <q-btn
            outline
            color="negative"
            :label="$t('Commons.Buttons.delete')"
          />
        </div>
      </div>
      <busi-admin-user-detail-profile
        class="q-mb-md"
      />
      <busi-admin-user-detail-history-list
        class="q-mb-md"
      />
      <busi-admin-user-detail-schedule />
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
import { QBreadcrumbsElProps, useQuasar } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import { useRoute, useRouter } from 'vue-router'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import BusiAdminUserDetailProfile from '@/views/businesses/admins/users/Detail/components/Profile.vue'
import BusiAdminUserDetailHistoryList from '@/views/businesses/admins/users/Detail/components/HistoryList.vue'
import BusiAdminUserDetailSchedule from '@/views/businesses/admins/users/Detail/components/Schedule.vue'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const i18n = useI18n()
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

const onClickWorkOffBtn = () => {
  $q.dialog({
    title: `Get off the work of ${busiUserStore.BusiUserAdmin.name}`,
    message: `Would you get off ${busiUserStore.BusiUserAdmin.name}`,
    cancel: true,
  }).onOk(() => {
    console.log('>>>> OK')
    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })
  }).onCancel(() => {
    console.log('>>>> Cancel')
  })
}

initData()
</script>
