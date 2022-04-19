<template>
  <div
    class="tw-h-screen tw-flex tw-items-center tw-justify-center tw-p-2"
  >
    <q-card
      class="tw-w-full tw-max-w-xl"
    >
      <q-card-section
        class="tw-flex tw-justify-center"
      >
        <comp-logo />
      </q-card-section>
      <q-card-section>
        <div
          class="text-h6 q-mb-md"
        >
          Login
        </div>
        <q-banner
          v-if="errorMessage"
          class="bg-negative text-white q-mb-md"
        >
          <template #avatar>
            <q-icon
              name="error"
            />
          </template>
          {{ errorMessage }}
        </q-banner>

        <q-form
          class="tw-space-y-2"
          @submit="onSubmitForm"
        >
          <q-input
            v-model="email"
            outlined
            label="Email"
            type="email"
            :rules="rules.email"
          />
          <div>
            <q-input
              v-model="password"
              outlined
              label="password"
              :type="isDisplayPassword ? 'text' : 'password'"
              :rules="rules.password"
            >
              <template #append>
                <q-icon
                  :name="isDisplayPassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="isDisplayPassword = !isDisplayPassword"
                />
              </template>
            </q-input>
            <div
              class="text-right"
            >
              <router-link
                class="tw-text-purple-500"
                to=""
              >
                Forgot your password?
              </router-link>
            </div>
          </div>
          <div
            class="tw-text-lg"
          >
            <router-link
              class="tw-text-purple-500 tw-underline"
              :to="{ name: 'AuthRegister' }"
            >
              Click here to Create new account
            </router-link>
          </div>
          <q-btn
            type="submit"
            color="primary"
            class="tw-w-full"
            label="login"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AuthLogin',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CompLogo from '@/components/Logo.vue'

const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()

const email = ref('')
const password = ref('')
const isDisplayPassword = ref(false)
const errorMessage = ref('')
const rules = ref({
  email: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Email' })
  ],
  password: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Password' })
  ],
})

const onSubmitForm = async () => {
  try {
    /* Login */
    await currentStore.login({
      email: email.value,
      password: password.value
    })
    /* Redirect to profile page */
    await router.push({ name: 'ProfileLayout', params: { id: currentStore.CurrentUser.id } })
  } catch (e) {
    console.error(e)
    if ((e as  { code: number; remark?: string }).code === 403) {
      errorMessage.value = 'Email and Password is not matched'
    }
  }
}
</script>
