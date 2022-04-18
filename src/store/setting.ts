import { defineStore } from 'pinia'
import { LocalStorageKeyEnum } from '@/types/commons/storage'
import { ALLOW_LOCALE_LIST, AllowLocaleList, DEFAULT_LOCALE } from '@/types/commons/locale'
import { i18n } from '@/locale'
import dayjs from 'dayjs'

export interface SettingState {
  locale: string
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      locale: '',
    }
  },
  getters: {
    /**
     * Language
     * @param state
     */
    Locale (state) {
      return state.locale
    },
  },
  actions: {
    initSetting () {
      this.setLanguage(DEFAULT_LOCALE)
    },
    /**
     * Set Language
     * @param payload - Language
     */
    setLanguage (payload: AllowLocaleList) {
      this.locale = payload
      localStorage.setItem(LocalStorageKeyEnum.LOCALE, payload)
      i18n.global.locale = payload
      dayjs.locale(payload)
    },
    /**
     * Reset to default language
     */
    resetLanguage () {
      const preFixLang = navigator.language.split('-')[0]
      if (ALLOW_LOCALE_LIST.includes(preFixLang))
        this.locale = navigator.language.split('-')[0]
      else this.locale = 'en'
    },
  }
})
