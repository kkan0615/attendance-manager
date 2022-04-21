<template>
  <q-drawer
    side="right"
    show-if-above
    class="2xl:tw-visible tw-invisible tw-w-20 tw-h-screen"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm tw-pt-20">
        <q-list
          dense
        >
          <q-item-label header>
            {{ $t('Commons.Titles.contentNavigator') }}
          </q-item-label>
          <q-item
            :to="{ hash: '#header-information' }"
          >
            <q-item-section>
              information
            </q-item-section>
          </q-item>
          <q-item
            :to="{ hash: '#header-overview' }"
          >
            <q-item-section>
              overview
            </q-item-section>
          </q-item>
          <q-item
            :to="{ hash: '#header-config' }"
          >
            <q-item-section>
              config
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminBusinessMainNavigator',
}
</script>
<script setup lang="ts">
// const onClickElItem = () => {
//
// }
</script>
<style
  scoped
  lang="scss"
>

</style>
