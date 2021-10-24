import { DefaultAttributes } from '@/types/model/attributes'

export interface Business extends DefaultAttributes {
  name: string
  logo?: string
  img?: string
}
