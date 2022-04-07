<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
  >
    <q-form
      class="tw-space-y-4"
      @submit="onSubmitForm"
    >
      <div
        class="text-h6"
      >
        Edit Information
      </div>
      <q-avatar
        class="tw-ring tw-ring-q-primary"
        size="250px"
      >
        <q-img
          v-if="imgToUrl || currentStore.CurrentBusiUser.img"
          class="profile-image"
          fit="cover"
          :src="imgToUrl || currentStore.CurrentBusiUser.img"
        />
        <span
          v-else
          class="tw-text-2xl"
        >
          250px x 250px
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
      <!-- Nickname -->
      <q-input
        v-model="nickname"
        dense
        label="Nickname"
        outlined
        :rules="rules.nickname"
        hide-bottom-space
      >
        <template
          #label
        >
          <div
            class="c-required-label"
          >
            Nickname
          </div>
        </template>
      </q-input>
      <!-- Description -->
      <q-input
        v-model="description"
        dense
        label="Description"
        outlined
        :rules="rules.description"
        type="textarea"
        hide-bottom-space
      />
      <!-- Email -->
      <q-input
        v-model="email"
        dense
        label="Email"
        outlined
        filled
        readonly
        hide-bottom-space
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
        class="tw-flex"
      >
        <q-btn
          color="negative"
          :label="$t('Commons.Buttons.delete')"
          @click="onClickDeleteBtn"
        />
        <div
          class="tw-ml-auto tw-flex tw-space-x-2"
        >
          <q-btn
            color="primary"
            type="submit"
            :label="$t('Commons.Buttons.save')"
          />
          <q-btn
            color="primary"
            outline
            :label="$t('Commons.Buttons.cancel')"
            @click="onClickCancelBtn"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'ProfileForm',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { randWord } from '@ngneat/falso'
import { useBusiUserStore } from '@/store/busiUser'

const router = useRouter()
const i18n = useI18n()
const $q = useQuasar()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()

const img = ref<File | undefined>()
const name = ref('')
const nickname = ref('')
const email = ref('')
const description = ref('')
const createdAt = ref('')
const updatedAt = ref('')
const rules = ref({
  name: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Name' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 })
  ],
  nickname: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Name' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 })
  ],
  description: [
    (val: string) => val.length <= 200 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 200 })
  ],
})

const imgToUrl = computed(() => img.value ? URL.createObjectURL(img.value) : undefined)

const onSubmitForm = async () => {
  try {
    if (img.value) {
      /* Upload */
      busiUserStore.uploadBusiUser({
        id: currentStore.CurrentBusiUser.id,
        busiId: currentStore.CurrentBusiUser.busiId,
        file: img.value
      })
    }
    /* Update */
    await busiUserStore.updateBusiUser({
      ...currentStore.CurrentBusiUser,
      name: name.value,
      nickname: nickname.value,
      description: description.value
    })
    /* Reload current user data */
    await currentStore.loadCurrentBusiUser({
      userId: currentStore.CurrentBusiUser.userId,
      busiId: currentStore.CurrentBusiUser.busiId,
    })
    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })
    // await router.push({ name: 'ProfileMain' })
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  }
}

const onClickCancelBtn = () => {
  $q.dialog({
    title: i18n.t('Commons.Tittles.cancel'),
    message: i18n.t('Commons.Messages.cancelSave'),
    cancel: true,
  }).onOk(() => {
    router.back()
  })
}

const onClickDeleteBtn = () => {
  const words = randWord({ length: 5 }).join('-')
  $q.dialog({
    title: 'Delete',
    message: `Type following sentence \n [ ${words} ]`,
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
  }).onOk(async (data) => {
    if (data === words) {
      try {
        /* delete */
        await busiUserStore.deleteBusiUser(currentStore.CurrentBusiUser.id)
        await router.push({ name: 'AuthLogout' })
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
    } else {
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
  })
}

const initData = async () => {
  try {
    name.value = currentStore.CurrentBusiUser.name
    nickname.value = currentStore.CurrentBusiUser.nickname
    email.value = currentStore.CurrentBusiUser.email
    description.value = currentStore.CurrentBusiUser.description || ''
    createdAt.value = dayjs(currentStore.CurrentBusiUser.createdAt).format('ll')
    updatedAt.value = dayjs(currentStore.CurrentBusiUser.updatedAt).format('ll')
  } catch (e) {
    console.error(e)
  }
}

initData()
</script>
