import { router } from '@/router/index'
import { useCurrentStore } from '@/store/current'

router.beforeEach(async (to, from, next) => {
  const currentStore = useCurrentStore()
  try {
    if (to.meta && to.meta.isBusi) {
      if (!to.params.busiId) {
        throw new Error('no business id')
      }
      /* Check current user data */
      if (!currentStore.CurrentUser || !currentStore.CurrentUser.id) {
        await currentStore.loadCurrentUser()
      }

      /* Check current business data */
      if (!currentStore.CurrentBusiness || !currentStore.CurrentBusiness.id) {
        await currentStore.loadCurrentBusiness(1)
      }

      if (!currentStore.CurrentBusiUser || !currentStore.CurrentBusiUser.id) {
        /* Check current business user data */
        await currentStore.loadCurrentBusiUser({
          userId: currentStore.CurrentUser.id,
          busiId: currentStore.CurrentBusiness.id,
        })
      }
    }
    next()
  } catch (e) {
    console.error(e)
    currentStore.logout()
    next({ name: 'AuthLogin' })
  }
})
