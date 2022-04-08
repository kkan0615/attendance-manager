import { initBusiUserDummy } from '@/dummies/users/busiUser'
import { initUserDummy } from '@/dummies/users/user'
import { initBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import { initBusinessAllowedLocationDummy, initBusinessDummy } from '@/dummies/users/businesses'
import { initUserNotificationDummy } from '@/dummies/users/notifications'
import { initBusiPostDummy } from '@/dummies/businesses/posts'

export const initAllDummy = () => {
  initBusinessDummy()
  initBusinessAllowedLocationDummy()
  initBusiUserDummy()
  initUserDummy()
  initBusiUserWorkHistoryDummy()
  initUserNotificationDummy()
  initBusiPostDummy()
}
