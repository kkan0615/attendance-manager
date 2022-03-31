import { initBusiUserDummy } from '@/dummies/users/busiUser'
import { initUserDummy } from '@/dummies/users/user'
import { initBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'

export const initAllDummy = () => {
  initBusiUserDummy()
  initUserDummy()
  initBusiUserWorkHistoryDummy()
}
