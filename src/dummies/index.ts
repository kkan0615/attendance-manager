import { initBusiUserDummy } from '@/dummies/users/busiUser'
import { initUserDummy } from '@/dummies/users/user'
import { initBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import { initBusinessAllowedLocationDummy, initBusinessDummy } from '@/dummies/users/businesses'

export const initAllDummy = () => {
  initBusinessDummy()
  initBusinessAllowedLocationDummy()
  initBusiUserDummy()
  initUserDummy()
  initBusiUserWorkHistoryDummy()
}
