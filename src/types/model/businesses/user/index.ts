import { DefaultAttributes } from '@/types/model/attributes'
import { User } from '@/types/model/user'

export interface BusiUser extends DefaultAttributes, User {
  busiId: string
}
