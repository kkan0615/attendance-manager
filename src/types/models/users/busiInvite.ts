import { DefaultAttributes } from '@/types/models/attributes'
import { Business } from '@/types/models/businesses'
import { User } from '@/types/models/users/index'

export interface BusiUserInvite extends DefaultAttributes {
  userId: number
  busiId: number
}

export interface BusiUserInviteListInfo extends BusiUserInvite {
  user: User
  business: Business
}
