<template>
  <div>
    <div
      class="tw-text-lg"
    >
      main
    </div>
    <button
      class="btn btn-primary"
      @click="test"
    >
      test
    </button>
    <div>
      <router-link
        :to="{
          name: RouterNameEnum.GENERAL_HOME_MAIN,
          params: { busiId: DEMO_DUMMY_BUSINESS_ID }
        }"
      >
        to demo page
      </router-link>
    </div>
    <div>
      <router-link
        :to="{
          name: RouterNameEnum.AUTH_BUSINESS_LOGIN,
          params: { busiId: DEMO_DUMMY_BUSINESS_ID }
        }"
      >
        Demo login
      </router-link>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'Main',
}
</script>
<script setup lang="ts">
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import { PrototypeActionTypes } from '@/store/modules/systems/prototype/actions'
import { DEMO_DUMMY_BUSINESS_ID } from '@/dummies/businesses/business'

const store = useStore()

const test = async () => {
  try {
    await store.dispatch(PrototypeActionTypes.ADD_TEST)
  } catch (e) {
    console.error(e)
  }
}

</script>
