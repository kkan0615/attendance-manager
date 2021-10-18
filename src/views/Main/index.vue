<template>
  <div>
    main
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

</script>
