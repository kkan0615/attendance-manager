import { User } from '@/types/models/users/index'
import { DefaultAttributes } from '@/types/models/attributes'
import { i18n } from '@/locale'
import { toCapitalize } from '@/utils/commons/stringUtil'

/**
 * Status of business user
 */
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

/**
 * Business auth
 */
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
export type BusiUserCreateForm = Omit<BusiUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiUserUpdateForm = Omit<BusiUser, 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiUserQRCodeUpdateForm = BusiUser & {
  readerTime: string
}

export type BusiUserWorkOption = 'simple' | 'qrCode' | 'location'
export const busiUserWorkOptionSelectOption: { label: string; value: BusiUserWorkOption }[] = [
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.WorkOptions.simple')),
    value: 'simple'
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.WorkOptions.qrCode')),
    value: 'qrCode'
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.WorkOptions.location')),
    value: 'location'
  }
]
