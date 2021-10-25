import { Business } from '@/types/model/businesses/business'
import { BusiUser } from '@/types/model/businesses/user'
import { User } from '@/types/model/user'

export interface CurrentState {
  user: User
  busiUser: BusiUser
  business: Business
}

export const currentState: CurrentState = {
  user: {} as User,
  busiUser: {} as BusiUser,
  business: {} as Business,
}
