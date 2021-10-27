import { router } from '@/router'
import { store } from '@/store'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'
import { LocalStorageKeyEnum } from '@/types/systems/localstorages/key'

export default router.beforeEach(async (to, from, next) => {
  if (to.meta.isBusiness) {
    const { busiId } = to.params
    console.log('test', busiId)
    try {
      const { busiId } = to.params
      const accessUserToken = localStorage.getItem(LocalStorageKeyEnum.CURRENT_USER)
      await store.dispatch(CurrentActionTypes.LOAD_USER, accessUserToken)
      await store.dispatch(CurrentActionTypes.LOAD_BUSI_USER, { busiId, userId: accessUserToken })
      await store.dispatch(CurrentActionTypes.LOAD_BUSINESS, busiId)
    } catch (e) {
      console.error(e)
    }
  }

  next()
})
