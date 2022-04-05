<!--
@TODO: Add
-->
<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="Admin Business"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto"
    >
      <q-form
        class="tw-space-y-4"
        @submit="onSubmitForm"
      >
        <div
          class="text-h6"
        >
          Information
        </div>
        <!-- logo -->
        <div
          class="tw-flex tw-space-x-4 tw-items-end"
        >
          <!-- small logo -->
          <q-avatar
            class="tw-border tw-flex tw-justify-center items-center"
            size="38px"
          >
            <q-img
              v-if="smallLogoToUrl || businessStore.BusinessAdmin.smallLogo"
              fit="cover"
              height="80%"
              width="80%"
              :src="smallLogoToUrl || businessStore.BusinessAdmin.smallLogo"
            />
            <span
              v-else
              class="tw-text-xs"
            >
              38px x 38px
            </span>
          </q-avatar>
          <!-- medium logo -->
          <div
            class="tw-border tw-flex tw-justify-center items-center logo"
            style="max-width: 250px;"
          >
            <q-img
              v-if="logoToUrl || businessStore.BusinessAdmin.logo"
              height="100%"
              width="100%"
              fit="cover"
              :src="logoToUrl || businessStore.BusinessAdmin.logo"
            />
            <span
              v-else
            >
              250px x 100px
            </span>
          </div>
        </div>
        <q-file
          v-model="smallLogo"
          outlined
          dense
          label="Small Logo"
          accept="image/*"
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Small logo
            </div>
          </template>
        </q-file>
        <q-file
          v-model="logo"
          outlined
          dense
          label="Logo"
          accept="image/*"
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Main logo
            </div>
          </template>
        </q-file>
        <!-- Name -->
        <q-input
          v-model="name"
          dense
          label="Name"
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
        <!-- Max work hour -->
        <q-input
          v-model="maxWorkHour"
          label="Max work hour"
          type="number"
          dense
          outlined
          :rules="rules.maxWorkHour"
          hide-bottom-space
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Max work hour
            </div>
          </template>
        </q-input>
        <!-- Homepage -->
        <q-input
          v-model="homepage"
          label="Homepage"
          dense
          outlined
        />
        <q-separator />
        <div
          class="text-h6"
        >
          Overview
        </div>
        <!-- User count -->
        <q-input
          :model-value="businessStore.BusinessAdmin.userCount"
          label="User Count"
          dense
          filled
          readonly
          outlined
        />
        <!-- Updated At -->
        <q-input
          v-model="createdAt"
          label="Created At"
          dense
          filled
          readonly
          outlined
        />
        <!-- Created At -->
        <q-input
          v-model="updatedAt"
          label="Updated At"
          dense
          filled
          readonly
          outlined
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
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminBusinessMain',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps, useQuasar } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import { useBusinessStore } from '@/store/business'

const router = useRouter()
const i18n = useI18n()
const $q = useQuasar()
const currentStore = useCurrentStore()
const businessStore = useBusinessStore()

const logo = ref<File | undefined>()
const smallLogo = ref<File | undefined>()
const name = ref('')
const homepage = ref('')
const maxWorkHour = ref(40)
const createdAt = ref('')
const updatedAt = ref('')
const rules = ref({
  name: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Name' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 })
  ],
  maxWorkHour: [
    (val: number) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Max Work Hour' }),
    (val: number) => !!val || i18n.t('Commons.Messages.Validations.integer', { field:'Max Work Hour' })
  ],
})
const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'Admin',
  },
  {
    label: 'Business',
  },
  {
    label: 'Main'
  }
])

const logoToUrl = computed(() => logo.value ? URL.createObjectURL(logo.value) : undefined)
const smallLogoToUrl = computed(() => smallLogo.value ? URL.createObjectURL(smallLogo.value) : undefined)

const initData = async () => {
  try {
    await businessStore.loadBusinessAdmin(currentStore.CurrentBusiness.id)
    name.value = businessStore.BusinessAdmin.name
    homepage.value = businessStore.BusinessAdmin.homepage || ''
    createdAt.value = dayjs(businessStore.BusinessAdmin.createdAt).format('ll')
    updatedAt.value = dayjs(businessStore.BusinessAdmin.updatedAt).format('ll')
  } catch (e) {
    console.error(e)
  }
}

const onSubmitForm = async () => {
  try {
    if (smallLogo.value && logo.value) {
      await businessStore.uploadLogoBusiness({
        id: currentStore.CurrentBusiness.id,
        logoFile: logo.value,
        smallLogoFile: smallLogo.value
      })
    }

    await businessStore.updateBusiness({
      id: currentStore.CurrentBusiness.id,
      name: name.value,
      homepage: homepage.value,
      maxWorkHour: maxWorkHour.value
    })

    /* Reload current store */
    await currentStore.loadCurrentBusiness(currentStore.CurrentBusiness.id)
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
}

initData()

onBeforeUnmount(() => {
  businessStore.resetBusinessAdmin()
})
</script>
