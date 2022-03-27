import { User } from '@/types/models/users/index'

export type UserStatus = 'work' | 'off' | 'rest'

export const userStatusSelectOption: { label: string; value: UserStatus }[] = [
  {
    label: 'Work',
    value: 'work'
  },
  {
    label: 'Rest',
    value: 'rest'
  },
  {
    label: 'Off',
    value: 'off'
  }
]

export interface BusiUser extends User {
  userId: number
  busiId: number
  status: UserStatus
  startWorkAt: string | null
}

export type CurrentBusiUserForm = Pick<BusiUser, 'userId' | 'busiId'>
export type BusiUserUpdateForm = BusiUser
