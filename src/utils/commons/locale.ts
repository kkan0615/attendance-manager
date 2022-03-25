import { LocalStorageKeyEnum } from '@/types/commons/storage'
import { ALLOW_LOCALE_LIST, DEFAULT_LOCALE } from '@/types/commons/locale'

export const getLocale = () => {
  const storedLocale = localStorage.getItem(LocalStorageKeyEnum.LOCALE)
  if (storedLocale && ALLOW_LOCALE_LIST.includes(storedLocale)) {
    return storedLocale
  } else {
    const preFixLang = navigator.language.split('-')[0]
    if (ALLOW_LOCALE_LIST.includes(preFixLang))
      return preFixLang
    else
      return DEFAULT_LOCALE
  }
}
