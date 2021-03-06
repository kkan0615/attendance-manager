<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :title="busiUserAdmin.name"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <div
        class="q-mb-md tw-flex tw-w-full"
      >
        <q-btn
          v-if="busiUserAdmin.status !== 'off'"
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
            @click="onClickEditBtn"
          />
          <q-btn
            outline
            color="negative"
            :label="$t('Commons.Buttons.delete')"
            @click="onClickDeleteBtn"
          />
        </div>
      </div>
      <busi-admin-user-detail-profile
        class="q-mb-md"
      />
      <busi-admin-user-detail-history-list
        class="q-mb-md"
      />
      <!-- @MEMO: Not use yet -->
      <!--      <busi-admin-user-detail-schedule />-->
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
import dayjs from 'dayjs'
import { toCapitalize, toCapitalizeFirstLetter } from '@/utils/commons/stringUtil'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const i18n = useI18n()
const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()
const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const { busiUserAdmin } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter } = storeToRefs(busiUserWorkHistoryStore)
// @TODO: Adjust i18n
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
      await busiUserStore.loadBusiUserAdmin(Number(id))
      if (!busiUserAdmin.value || !busiUserAdmin.value.id) {
        throw new Error('BusiUserAdmin is not found')
      }
      if (busiUserAdmin.value.busiId !== currentStore.CurrentBusiness.id) {
        throw new Error('Business id is not matched')
      }

      initFilterData()

      /* Load work history */
      await busiUserWorkHistoryStore.loadBusiUserWorkHistoryList({
        busiUserId: busiUserStore.BusiUserAdmin.id,
        rangeStartAt: busiUserWorkHistoryListFilter.value.rangeStartAt,
        rangeEndAt: busiUserWorkHistoryListFilter.value.rangeEndAt,
      })
    }
  } catch (e) {
    console.error(e)
    await router.push({ name: 'BusiMyLayout' })
  }
}

const initFilterData = () => {
  /* Set the filter data */
  busiUserWorkHistoryListFilter.value.busiUserId = busiUserAdmin.value.id
  busiUserWorkHistoryListFilter.value.rangeStartAt = dayjs().startOf('week').toISOString()
  busiUserWorkHistoryListFilter.value.rangeEndAt = dayjs().endOf('week').toISOString()
}

const onClickWorkOffBtn = () => {
  $q.dialog({
    title: toCapitalizeFirstLetter(i18n.t('Commons.Titles.getOffWork', { name: busiUserAdmin.value.name })),
    message: toCapitalizeFirstLetter(i18n.t('Commons.Messages.Questions.getOffWork', { name: busiUserAdmin.value.name })),
    cancel: true,
  }).onOk(async () => {
    try {
      await busiUserStore.updateBusiUser({
        ...busiUserStore.BusiUserAdmin,
        startWorkAt: null,
        status: 'off'
      })
      await busiUserStore.loadBusiUserAdmin(busiUserStore.BusiUserAdmin.id)
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
  })
}

const onClickEditBtn = () => {
  if (busiUserStore.BusiUserAdmin) {
    router.push({
      name: 'BusiAdminUserUpdateForm',
      params: { id: busiUserStore.BusiUserAdmin.id }
    })
  }
}

const onClickDeleteBtn = async () => {
  $q.dialog({
    title: `${toCapitalize(i18n.t('Commons.Titles.delete'))}`,
    message: `${i18n.t('Commons.Messages.Questions.delete')}`,
    cancel: true,
  }).onOk(async () => {
    try {
      /* delete busi user by id */
      await busiUserStore.deleteBusiUser(busiUserStore.BusiUserAdmin.id)
      /* Redirect to list */
      await router.push({ name: 'BusiAdminUserList' })
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
  })
}

initData()
</script>
