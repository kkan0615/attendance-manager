import { User } from '@/types/models/users/index'
import { DefaultAttributes } from '@/types/models/attributes'

export type BusiUserStatus = 'work' | 'off' | 'rest'

export const userStatusSelectOption: { label: string; value: BusiUserStatus }[] = [
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

export type BusiUserAuth = 'user' | 'staff' | 'admin' | 'system' | 'superAdmin'

export type BusiUser = Pick<User, 'name' | 'nickname' | 'email' | 'img'> & DefaultAttributes & {
  userId: number
  busiId: number
  status: BusiUserStatus
  startWorkAt: string | null
  auth: BusiUserAuth
}

/* Use for admin user page */
export type BusiUserAdminListInfo = BusiUser
export type BusiUserAdminInfo = BusiUser

export type CurrentBusiUserForm = Pick<BusiUser, 'userId' | 'busiId'>
export type BusiUserUpdateForm = BusiUser
export type BusiUserQRCodeUpdateForm = BusiUser & {
  readerTime: string
}
