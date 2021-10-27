import { DefaultAttributes } from '@/types/model/attributes'

export type UserAuthType = 'user' | 'admin' | 'superAdmin'

export interface User extends DefaultAttributes {
  userId: string
  email: string
  name: string
  nickname: string
  auth: UserAuthType
  phone?: string
  img?: string
  color?: string
}
