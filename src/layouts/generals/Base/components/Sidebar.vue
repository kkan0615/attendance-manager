<template>
  <c-sidebar-layout>
    <c-sidebar-layout-content>
      <c-sidebar-layout-menu-title>
        Title 1
      </c-sidebar-layout-menu-title>
      <c-sidebar-layout-menu-group
        label="label 1"
      >
        <c-sidebar-layout-menu-item>
          test
        </c-sidebar-layout-menu-item>
      </c-sidebar-layout-menu-group>
      <c-sidebar-layout-menu-title>
        Title 2
      </c-sidebar-layout-menu-title>
    </c-sidebar-layout-content>
  </c-sidebar-layout>
</template>
<script
    lang="ts"
>
export default {
  name: 'SidebarBaseGeneralLayout',
}
</script>
<script setup lang="ts">
import CSidebarLayout from '@/components/commons/layouts/Sidebar/index.vue'
import CSidebarLayoutContent from '@/components/commons/layouts/Sidebar/components/Content.vue'
import CSidebarLayoutMenuTitle from '@/components/commons/layouts/Sidebar/components/MenuTItle.vue'
import CSidebarLayoutMenuGroup from '@/components/commons/layouts/Sidebar/components/MenuGroup.vue'
import CSidebarLayoutMenuItem from '@/components/commons/layouts/Sidebar/components/MenuItem.vue'
</script>
