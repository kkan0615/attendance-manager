import { router } from '@/router'
import { store } from '@/store'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'

export default router.beforeEach(async (to, from, next) => {
  if (to.meta.isBusiness) {
    const { busiId } = to.params
    console.log('test', busiId)
    try {
      // await store.dispatch(CurrentActionTypes.LOAD_USER, busiId)
      // await store.dispatch(CurrentActionTypes.LOAD_BUSI_USER, busiId)
      await store.dispatch(CurrentActionTypes.LOAD_BUSINESS, busiId)
    } catch (e) {
      console.error(e)
    }
  }

  next()
})
