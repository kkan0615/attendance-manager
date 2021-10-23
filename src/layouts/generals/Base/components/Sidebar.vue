<template>
  <c-sidebar-layout>
    <c-sidebar-layout-content>
      <c-sidebar-layout-menu-title>
        Title 1
      </c-sidebar-layout-menu-title>
      <c-sidebar-layout-menu-group
        active
        label="label 1"
      >
        <c-sidebar-layout-menu-item>
          <c-material-icon
            left
          >
            home
          </c-material-icon>
          Menu item 1
        </c-sidebar-layout-menu-item>
        <c-sidebar-layout-menu-item>
          Menu item 2
        </c-sidebar-layout-menu-item>
      </c-sidebar-layout-menu-group>
      <c-sidebar-layout-menu-group
        label="label 2"
      >
        <c-sidebar-layout-menu-item>
          Menu item 1
        </c-sidebar-layout-menu-item>
        <c-sidebar-layout-menu-item>
          Menu item 2
        </c-sidebar-layout-menu-item>
      </c-sidebar-layout-menu-group>
      <c-sidebar-layout-menu-title>
        Title 2
      </c-sidebar-layout-menu-title>
      <c-sidebar-layout-menu-list>
        <c-sidebar-layout-menu-item>
          Menu item 1
        </c-sidebar-layout-menu-item>
        <c-sidebar-layout-menu-item
          active
        >
          Menu item 2
        </c-sidebar-layout-menu-item>
      </c-sidebar-layout-menu-list>
    </c-sidebar-layout-content>
    <!--   footer   -->
    <div
      class="tw-mt-auto py-3"
    >
      <c-sidebar-layout-menu-item>
        <router-link :to="{ name: RouterNameEnum.ADMIN_HOME_MAIN, params: { busiId: 'test' } }">
          <c-material-icon
            size="2xl"
            left
          >
            admin_panel_settings
          </c-material-icon>
          Menu item 2
        </router-link>
      </c-sidebar-layout-menu-item>
    </div>
  </c-sidebar-layout>
</template>
<script
  lang="ts"
>
export default {
  name: 'BaseGeneralLayoutSidebar',
}
</script>
<script setup lang="ts">
import CSidebarLayout from '@/components/commons/layouts/Sidebar/index.vue'
import CSidebarLayoutContent from '@/components/commons/layouts/Sidebar/components/Content.vue'
import CSidebarLayoutMenuTitle from '@/components/commons/layouts/Sidebar/components/MenuTItle.vue'
import CSidebarLayoutMenuGroup from '@/components/commons/layouts/Sidebar/components/MenuGroup.vue'
import CSidebarLayoutMenuItem from '@/components/commons/layouts/Sidebar/components/MenuItem.vue'
import CSidebarLayoutMenuList from '@/components/commons/layouts/Sidebar/components/MenuList.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
</script>
