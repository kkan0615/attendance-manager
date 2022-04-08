<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="User Form"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <q-form
        class="tw-space-y-4"
        @submit="onSubmitForm"
      >
        <!-- Image Upload -->
        <q-avatar
          class="tw-ring-4 tw-ring-q-primary"
          size="250px"
        >
          <q-img
            v-if="imgToUrl || busiUserStore.BusiUserAdmin.img"
            class="profile-image"
            fit="cover"
            :src="imgToUrl || busiUserStore.BusiUserAdmin.img"
          />
          <span
            v-else
          >
            {{ name ? name[0] : '' }}
          </span>
        </q-avatar>
        <q-file
          v-model="img"
          outlined
          dense
          label="Image"
          accept="image/*"
        />
        <!-- Name -->
        <q-input
          v-model="name"
          label="Name"
          dense
          outlined
          :rules="rules.name"
          hide-bottom-space
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Name
            </div>
          </template>
        </q-input>
        <!-- Email -->
        <q-input
          v-if="isEditMode"
          :model-value="busiUserStore.BusiUserAdmin.email"
          label="Email"
          dense
          readonly
          filled
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
          :rules="rules.auth"
          hide-bottom-space
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Auth
            </div>
          </template>
        </q-select>
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
          :rules="rules.description"
          hide-bottom-space
        />
        <q-separator />
        <div
          class="text-right tw-space-x-2"
        >
          <q-btn
            color="primary"
            type="submit"
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
const img = ref<File | undefined>()
const name = ref('')
const auth = ref<BusiUserAuth>('user')
const joinAt = ref<Date>(new Date())
const description = ref('')
const rules = ref({
  name: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Name' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 })
  ],
  auth: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Max Work Hour' }),
  ],
  description: [
    (val: string) => val.length <= 200 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 200 })
  ]
})

const currentBusiUserAuthGrade = computed(() => {
  const found = busiUserAuthSelectOption.find(option => option.value === currentStore.CurrentBusiUser.auth)
  return found ? found.grade : 1
})
const isEditMode = computed(() => route.name === 'BusiAdminUserUpdateForm')
const imgToUrl = computed(() => img.value ? URL.createObjectURL(img.value) : undefined)

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

/**
 * Only allow to change under current user auth
 */
const authOptionDisable = (opt: { label: string; value: BusiUserAuth; grade: number }) => {
  return opt.grade > currentBusiUserAuthGrade.value
}

const onSubmitForm = async () => {
  try {
    let id: number
    if (isEditMode.value) {
      /* Upload image */
      if (img.value) {
        await busiUserStore.uploadBusiUser({
          id: busiUserStore.BusiUserAdmin.id,
          busiId: currentStore.CurrentBusiness.id,
          file: img.value
        })
      }

      /* Update busi user */
      await busiUserStore.updateBusiUser({
        ...busiUserStore.BusiUserAdmin,
        name: name.value,
        joinAt: dayjs(joinAt.value).toISOString(),
        auth: auth.value,
        description: description.value,
      })

      /* if it changed current busi user data */
      if (currentStore.CurrentBusiUser.id === busiUserStore.BusiUserAdmin.id) {
        /* Reload current busi user data */
        await currentStore.loadCurrentBusiUser({
          userId: currentStore.CurrentUser.id,
          busiId: currentStore.CurrentBusiness.id,
        })
      }

      id = busiUserStore.BusiUserAdmin.id
    } else {
      //  @TODO: Add new logic (But not now)
      id = 1
    }

    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })

    await router.push({ name: 'BusiAdminUserDetail', params: { id: id } })
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  }
}

const onClickCancelBtn = async () => {
  $q.dialog({
    title: i18n.t('Commons.Titles.cancel'),
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
