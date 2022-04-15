<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto"
  >
    <div>
      @TODO: Logo will be here
    </div>
    <div
      class="q-mt-md"
    >
      <div
        class="text-h6 q-mb-md"
      >
        Information
      </div>
      <q-form
        class="tw-space-y-4"
        @submit="onSubmitForm"
      >
        <q-avatar
          class="tw-ring tw-ring-q-primary"
          size="250px"
        >
          <q-img
            v-if="img"
            class="profile-image"
            fit="cover"
            :src="imgToUrl"
          />
          <div
            v-else
          >
            <div
              v-if="name"
            >
              {{ name[0] }}
            </div>
            <div
              v-else
              class="tw-text-xl"
            >
              Upload image 250 x 250
            </div>
          </div>
        </q-avatar>
        <q-file
          v-model="img"
          outlined
          dense
          label="Image"
          accept="image/*"
        />
        <!-- Email -->
        <q-input
          v-model="email"
          dense
          type="email"
          label="Email"
          outlined
          hide-bottom-space
          :rules="rules.email"
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Email
            </div>
          </template>
        </q-input>
        <!-- Password -->
        <q-input
          v-model="password"
          outlined
          dense
          hide-bottom-space
          label="password"
          :type="isDisplayPassword ? 'text' : 'password'"
          :rules="rules.password"
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Password
            </div>
          </template>
          <template #append>
            <q-icon
              :name="isDisplayPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isDisplayPassword = !isDisplayPassword"
            />
          </template>
        </q-input>
        <!-- Confirm password -->
        <q-input
          v-model="confirmPassword"
          outlined
          dense
          hide-bottom-space
          label="password"
          :type="isDisplayConfirmPassword ? 'text' : 'password'"
          :rules="rules.confirmPassword"
        >
          <template
            #label
          >
            <div
              class="c-required-label"
            >
              Confirm Password
            </div>
          </template>
          <template #append>
            <q-icon
              :name="isDisplayConfirmPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isDisplayConfirmPassword = !isDisplayConfirmPassword"
            />
          </template>
        </q-input>
        <!-- Name -->
        <q-input
          v-model="name"
          dense
          label="Email"
          outlined
          hide-bottom-space
          :rules="rules.name"
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
          label="nickname"
          outlined
          hide-bottom-space
          :rules="rules.nickname"
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
          label="Description"
          type="textarea"
          dense
          outlined
          :rules="rules.description"
          hide-bottom-space
        />
        <div
          class="text-right"
        >
          <q-btn
            type="submit"
            color="primary"
            label="Register"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AuthRegister',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCurrentStore } from '@/store/current'
import { useUserStore } from '@/store/user'

const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()
const userStore = useUserStore()

const img = ref<File | undefined>()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isDisplayPassword = ref(false)
const isDisplayConfirmPassword = ref(false)
const name = ref('')
const nickname = ref('')
const description = ref('')
const rules = ref({
  email: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Email' }),
    (val: string) => val.length <= 50 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 50 })
  ],
  password: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Password' }),
    (val: string) => val.length >= 8 || i18n.t('Commons.Messages.Validations.lengthMin', { length: 8 }),
    // eslint-disable-next-line no-useless-escape
    (val: string) => /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(val) || i18n.t('Commons.Messages.Validations.passwordRule1'),
    (val: string) => /[A-Z]/.test(val) || i18n.t('Commons.Messages.Validations.passwordRule2'),
  ],
  confirmPassword: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Password' }),
    (val: string) => password.value === val || i18n.t('Commons.Messages.Validations.notMatched', {  field1: 'Confirm Password', field2: 'Password' })
  ],
  name: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Name' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 }),
  ],
  nickname: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Nickname' }),
    (val: string) => val.length <= 20 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 20 }),
  ],
  description: [
    (val: string) => val.length <= 200 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 200 })
  ]
})

const imgToUrl = computed(() => img.value ? URL.createObjectURL(img.value) : undefined)

const onSubmitForm = async () => {
  try {
    /* Create user */
    const newId = await userStore.createUser({
      email: email.value,
      name: name.value,
      nickname: nickname.value,
      description: description.value,
    })
    /* Upload image to user */
    if (img.value) {
      await userStore.uploadUser({
        id: newId,
        file: img.value,
      })
    }
    /* Login */
    await currentStore.login({
      email: email.value,
      password: password.value
    })
    /* Redirect to profile page */
    await router.push({ name: 'ProfileLayout', params: { id: currentStore.CurrentUser.id } })
  } catch (e) {
    console.error(e)
  }
}
</script>
