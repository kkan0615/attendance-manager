import { User } from '@/types/models/users/index'

export interface BusiUser extends User {
  userId: number
  busiId: number
}
