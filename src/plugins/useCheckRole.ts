import { BusiUserAuth } from '@/types/models/users/business'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'

export const useCheckRole = () => {
  const router = useRouter()
  const route = useRoute()
  const i18n = useI18n()
  const currentStore = useCurrentStore()

  const checkRouteRole = async () => {
    /* Check auth user */
    if (!currentStore.CurrentBusiUser
      || !currentStore.CurrentBusiUser.id
      || !(route.meta.roles as BusiUserAuth[]).includes(currentStore.CurrentBusiUser.auth)
    ) {
      showSnackbar({
        message: i18n.t('Commons.Messages.unAuthUser'),
        color: 'negative'
      })
      await router.push({ name: 'BusiMyLayout' })
    }
  }
  return {
    checkRouteRole,
  }
}
