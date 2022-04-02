<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="User Form"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <q-form
        class="tw-space-y-4"
      >
        <!-- Name -->
        <q-input
          v-model="name"
          label="Name"
          dense
          outlined
        />
        <q-select
          v-model="auth"
          label="Role"
          dense
          outlined
          :options="authOption"
          emit-value
          map-options
          :option-disable="authOptionDisable"
        />
        <!-- Join At-->
        <q-field
          v-model="joinAt"
          label="Join at"
          dense
          outlined
        >
          <date-picker
            v-model="joinAt"
            class="tw-w-full tw-my-0.5"
            text-input
            input-class-name="dp__input--with-label"
            :enable-time-picker="false"
            auto-apply
            :clearable="false"
          />
        </q-field>
        <!-- Description -->
        <q-input
          v-model="description"
          label="Description"
          type="textarea"
          dense
          outlined
        />
        <q-separator />
        <div
          class="text-right tw-space-x-2"
        >
          <q-btn
            color="primary"
            :label="$t('Commons.Buttons.save')"
          />
          <q-btn
            v-if="isEditMode"
            color="primary"
            outline
            :label="$t('Commons.Buttons.cancel')"
            @click="onClickCancelBtn"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserList',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'
import { QBreadcrumbsElProps, useQuasar } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import { useRoute, useRouter } from 'vue-router'
import { BusiUserAuth, busiUserAuthSelectOption } from '@/types/models/users/business'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const $q = useQuasar()
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
    label: 'List'
  }
])
const authOption = ref(busiUserAuthSelectOption)
const img = ref('')
const name = ref('')
const auth = ref<BusiUserAuth>('user')
const joinAt = ref<Date>(new Date())
const description = ref('')

const currentBusiUserAuthGrade = computed(() => {
  const found = busiUserAuthSelectOption.find(option => option.value === currentStore.CurrentBusiUser.auth)
  return found ? found.grade : 1
})
const isEditMode = computed(() => route.name === 'BusiAdminUserUpdateForm')

const initData = async () => {
  try {
    const { id } = route.params
    if (id) {
      await busiUserStore.loadBusiUserAdmin(Number(id))
      if (!busiUserStore.BusiUserAdmin || !busiUserStore.BusiUserAdmin.id) {
        throw new Error('BusiUserAdmin is not found')
      }

      if (busiUserStore.BusiUserAdmin.busiId !== currentStore.CurrentBusiness.id) {
        throw new Error('Business id is not matched')
      }
      /* Set default data if it's edit mode */
      if (isEditMode.value) {
        img.value = busiUserStore.BusiUserAdmin.img || ''
        name.value = busiUserStore.BusiUserAdmin.name
        auth.value = busiUserStore.BusiUserAdmin.auth
        joinAt.value = dayjs(busiUserStore.BusiUserAdmin.joinAt).toDate()
        description.value = busiUserStore.BusiUserAdmin.description || ''
      }
    }
  } catch (e) {
    console.error(e)
    await router.push({ name: 'BusiMyLayout' })
  }
}

const authOptionDisable = (opt: { label: string; value: BusiUserAuth; grade: number }) => {
  return opt.grade > currentBusiUserAuthGrade.value
}

const onSubmitForm = async () => {
  try {
  // @TODO: Add save logic
    if (isEditMode.value) {
      busiUserStore.updateBusiUser({
        ...busiUserStore.BusiUserAdmin,
        name: name.value,
        joinAt: dayjs(joinAt.value).toISOString(),
        auth: auth.value,
        description: description.value,
      })
      //  @TODO: Add edit logic
    } else {
      //  @TODO: Add new logic (But no now)
    }
  } catch (e) {
    console.error(e)
  }
}

const onClickCancelBtn = async () => {
  $q.dialog({
    title: i18n.t('Commons.Tittles.cancel'),
    message: i18n.t('Commons.Messages.cancelSave'),
    cancel: true,
  }).onOk(() => {
    router.back()
  })
}

initData()

onBeforeUnmount(() => {
  busiUserStore.resetBusiUserAdmin()
})
</script>
