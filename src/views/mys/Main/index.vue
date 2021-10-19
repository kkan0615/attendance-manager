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
    <router-link
      :to="{
        name: RouterNameEnum.GENERAL_HOME_MAIN,
        params: { busiId: 'test' }
      }"
    >
      test
    </router-link>
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

const store = useStore()

const test = async () => {
  try {
    await store.dispatch(PrototypeActionTypes.ADD_TEST)
  } catch (e) {
    console.error(e)
  }
}

</script>
