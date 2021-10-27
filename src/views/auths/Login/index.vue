<template>
  <div
    class="login-background"
  >
    <div
      class="background-container"
    >
      <img
        class="tw-h-full tw-w-full"
        src="@/assets/auth/background.jpg"
        alt="background"
      >
    </div>
    <div
      class="login-form-card"
    >
      <div
        class="tw-flex tw-items-center tw-justify-center"
      >
        <img
          class="tw-w-5 tw-h-5 tw-mr-2"
          src="@/assets/logo.png"
          alt="logo"
        >
        <div
          class="tw-text-lg"
        >
          Logo
        </div>
      </div>
      <div
        class="tw-text-center tw-my-4 tw-text-sm"
      >
        Sign into your account
      </div>
      <c-form>
        <div
          class="tw-flex tw-flex-col tw-space-y-3"
        >
          <div>
            <label
              id="email-input"
              class="form-label tw-mb-0"
            >
              Email
            </label>
            <c-base-input
              id="email-input"
              v-model="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label
              id="password-input"
              class="form-label tw-mb-0"
            >
              Password
            </label>
            <c-base-input
              id="password-input"
              v-model="password"
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="Password"
            >
              <template
                #append
              >
                <span
                  class="input-group-text tw-cursor-pointer"
                  @click="onClickPasswordVisibilityBtn"
                >
                  <c-material-icon
                    v-if="isShowPassword"
                    size="base"
                  >
                    visibility
                  </c-material-icon>
                  <c-material-icon
                    v-else
                    size="base"
                  >
                    visibility_off
                  </c-material-icon>
                </span>
              </template>
            </c-base-input>
          </div>
          <div>
            remember me will be here
          </div>
        </div>
      </c-form>
      <div
        class="tw-flex tw-items-center"
      >
        <button
          type="button"
          class="btn btn-primary tw-ml-auto"
          @click="onClickLoginBtn"
        >
          Login
        </button>
      </div>
      <div>
        Don't have an account ?
        <a
          href="#"
          class="text-primary"
        >
          Signup now
        </a>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'LoginAuth',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import CForm from '@/components/commons/Form/index.vue'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const isShowPassword = ref(false)

const onClickPasswordVisibilityBtn = () => {
  isShowPassword.value = !isShowPassword.value
}

const onClickLoginBtn = async () => {
  try {
    await store.dispatch(CurrentActionTypes.LOGIN, {
      email: email.value,
      password: password.value,
    })

    if (route.name === RouterNameEnum.AUTH_BUSINESS_LOGIN) {
      const { busiId } = route.params
      console.log(busiId)
      console.log('RouterNameEnum.AUTH_BUSINESS_LOGIN')
      await router.push({ name: RouterNameEnum.GENERAL_HOME_MAIN, params: { busiId, } })
    } else if (route.name === RouterNameEnum.AUTH_LOGIN) {
      console.log('AUTH_LOGIN')
    } else if (route.name === RouterNameEnum.AUTH_BUSINESS_ADMIN_LOGIN) {
      console.log('RouterNameEnum.AUTH_BUSINESS_ADMIN_LOGIN')
    }
  } catch (e) {
    console.error(e)
  }
}

</script>
<style
  lang="scss"
  scoped
>
.login-background {
  @apply tw-h-full tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-y-hidden;

  .login-form-card {
    @apply tw-w-11/12 sm:tw-w-96 tw-bg-white tw-absolute tw-z-10 tw-rounded tw-shadow-2xl tw-p-4;
  }

  .background-container {
    @apply tw-h-full tw-w-full tw-select-none;
  }
}
</style>
