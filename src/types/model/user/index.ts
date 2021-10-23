import { DefaultAttributes } from '@/types/model/attributes'

export interface User extends DefaultAttributes {
  name: string
  nickname: string
}
