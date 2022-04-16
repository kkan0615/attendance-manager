import { initBusiUserDummy } from '@/dummies/users/busiUser'
import { initUserDummy } from '@/dummies/users/user'
import { initBusiUserWorkHistoryDummy, initTempBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import { initBusinessAllowedLocationDummy, initBusinessDummy } from '@/dummies/users/businesses'
import { initUserNotificationDummy } from '@/dummies/users/notifications'
import { initBusiPostCommentDummy, initBusiPostDummy } from '@/dummies/businesses/posts'
import { initBusiUserInviteDummy } from '@/dummies/businesses/busiUserInvite'

export const initAllDummy = () => {
  initBusinessDummy()
  initBusinessAllowedLocationDummy()
  initBusiUserDummy()
  initUserDummy()
  initTempBusiUserWorkHistoryDummy()
  initBusiUserWorkHistoryDummy()
  initUserNotificationDummy()
  initBusiPostDummy()
  initBusiPostCommentDummy()
  initBusiUserInviteDummy()
}
