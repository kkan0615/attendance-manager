import { DefaultAttributes } from '@/types/models/attributes'
import { Business } from '@/types/models/businesses'
import { User } from '@/types/models/users/index'
import { BusiUser } from '@/types/models/users/business'

export interface BusiUserInvite extends DefaultAttributes {
  userId: number
  busiId: number
  invitorId: number
}

export interface BusiUserInviteListInfo extends BusiUserInvite {
  user: User
  business: Business
  invitor: BusiUser
}
