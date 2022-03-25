import { defineStore } from 'pinia'

export interface BusiSettingState {
  isLeftDrawerOpen: boolean
}

export const useBusiSettingStore = defineStore('busiSetting', {
  state: (): BusiSettingState => {
    return {
      isLeftDrawerOpen: true,
    }
  },
  getters: {
    /**
     * Language
     * @param state
     */
    IsLeftDrawerOpen (state) {
      return state.isLeftDrawerOpen
    },
  },
  actions: {
    initBusiSetting () {
    //
    },
    /**
     * Set Language
     * @param payload - Language
     */
    setLeftDrawer (payload: boolean) {
      this.isLeftDrawerOpen = payload
    },

  }
})
