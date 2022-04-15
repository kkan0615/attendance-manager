import { DefaultAttributes } from '@/types/models/attributes'

export interface User extends DefaultAttributes {
  name: string
  nickname: string
  email: string
  img?: string
  description?: string
}

export type UserLoginForm = Pick<User, 'email'> & {
  password: string
}
export type UserUploadImageForm = Pick<User, 'id'> & {
  file: File
}
export type UserCreateForm = Omit<User, 'id' | 'img' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type UserUpdateForm = Omit<User, 'email' | 'createdAt' | 'updatedAt' | 'deletedAt'>
