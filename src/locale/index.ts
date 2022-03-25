import { createI18n } from 'vue-i18n'
import { enDictionary } from '@/locale/langs/en'

export const DEFAULT_FALLBACK_LOCALE = 'en'

const messages = {
  /* english */
  en: enDictionary,
}

export const i18n = createI18n({
  locale: DEFAULT_FALLBACK_LOCALE,
  fallbackLocale: DEFAULT_FALLBACK_LOCALE,
  messages,
})
