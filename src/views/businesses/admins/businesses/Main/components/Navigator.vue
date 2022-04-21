<template>
  <q-drawer
    side="right"
    show-if-above
    class="2xl:tw-visible tw-invisible tw-w-20 tw-h-screen"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm tw-pt-20">
        <q-list
          class="tw-space-y-2"
          dense
        >
          <q-item-label header>
            {{ $t('Commons.Titles.contentNavigator') }}
          </q-item-label>
          <q-item
            id="header-information-nav"
            :to="{ hash: '#header-information' }"
          >
            <q-item-section>
              information
            </q-item-section>
          </q-item>
          <q-item
            id="header-overview-nav"
            :to="{ hash: '#header-overview' }"
          >
            <q-item-section>
              overview
            </q-item-section>
          </q-item>
          <q-item
            id="header-config-nav"
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
import { onBeforeUnmount, onMounted, ref } from 'vue'

const elItemList = ref<HTMLDivElement[]>([])
const observer = ref<IntersectionObserver | undefined>(undefined)

onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id')
      if (id) {
        const headerInformationEl = document.getElementById(`${id}-nav`)
        console.log(entry.intersectionRatio)
        if (headerInformationEl) {
          if (entry.intersectionRatio > 0) {
            (headerInformationEl as HTMLDivElement).classList.add('busi-admin-busi-main-nav--active')
          } else {
            (headerInformationEl as HTMLDivElement).classList.remove('busi-admin-busi-main-nav--active')
          }
        }
      }
    })
  })
  console.log(document.querySelectorAll('div[name="header"]'))
  document.querySelectorAll('div[name="header"]').forEach((section) => {
    if (observer.value) {
      observer.value.observe(section)
    }
  })

  /**/
  const headerInformationEl = document.getElementById('header-information')
  if (headerInformationEl)
    elItemList.value.push(headerInformationEl as HTMLDivElement)
  /**/
  const headerOverviewEl = document.getElementById('header-overview')
  if (headerOverviewEl)
    elItemList.value.push(headerOverviewEl as HTMLDivElement)
  /**/
  const headerConfigEl = document.getElementById('header-config')
  if (headerConfigEl)
    elItemList.value.push(headerConfigEl as HTMLDivElement)
})

onBeforeUnmount(() => {
  observer.value = undefined
})
</script>
<style
  scoped
  lang="scss"
>
.busi-admin-busi-main-nav--active {
  @apply tw-bg-q-primary tw-text-white tw-rounded-l-full;
}
</style>
