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
export const busiUserAuthSelectOption: { label: string; value: BusiUserAuth; grade: number }[] = [
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.UserAuths.user')),
    value: 'user',
    grade: 1,
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.UserAuths.staff')),
    value: 'staff',
    grade: 2,
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.UserAuths.admin')),
    value: 'admin',
    grade: 3,
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.UserAuths.system')),
    value: 'system',
    grade: 4,
  },
  {
    label: toCapitalize(i18n.global.t('Types.Models.BusiUsers.UserAuths.superAdmin')),
    value: 'superAdmin',
    grade: 5,
  },
]

export type BusiUser = Pick<User, 'name' | 'nickname' | 'email' | 'img' | 'description'> & DefaultAttributes & {
  userId: number
  busiId: number
  status: BusiUserStatus
  startWorkAt: string | null
  auth: BusiUserAuth
  joinAt: string
}

/* Use for admin user page */
export type BusiUserAdminListInfo = BusiUser
export type BusiUserAdminInfo = BusiUser

export type CurrentBusiUserForm = Pick<BusiUser, 'userId' | 'busiId'>
export type BusiUserCreateForm = Omit<BusiUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiUserUpdateForm = Omit<BusiUser, 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiUserWorkForm = BusiUserUpdateForm & {
  latitude?: number
  longitude?: number
}
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
