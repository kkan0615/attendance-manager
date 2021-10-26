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
              id="user-input"
              class="form-label tw-mb-0"
            >
              User id
            </label>
            <c-base-input
              id="user-input"
              placeholder="User id"
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

const userId = ref('')
const password = ref('')
const isShowPassword = ref(false)

const onClickPasswordVisibilityBtn = () => {
  isShowPassword.value = !isShowPassword.value
}

const onClickLoginBtn = () => {
  console.log('onClickLoginBtn')
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
