import { CustomDate } from '@/types/systems/date'

export interface DefaultAttributes {
  id: string
  createdAt: CustomDate
  updatedAt: CustomDate
  deletedAt?: CustomDate
}
