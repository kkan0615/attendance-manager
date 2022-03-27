import { DefaultAttributes } from '@/types/models/attributes'

export interface User extends DefaultAttributes {
  name: string
  nickname: string
  email: string
  img?: string
}

export type UserLoginForm = Pick<User, 'email'> & {
  password: string
}
