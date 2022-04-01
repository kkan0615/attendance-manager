import { DefaultAttributes } from '@/types/models/attributes'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'

export interface BusiUserWorkHistory extends DefaultAttributes {
  busiUserId: number
  status: BusiUserStatus
  workOption?: BusiUserWorkOption
  latitude?: number
  longitude?: number
}

export type BusiUserWorkHistorySelectOption = Pick<BusiUserWorkHistory, 'busiUserId'> & {
  startDateAt: string
  endDateAt: string
}

export type BusiUserWorkHistoryCreateForm = Omit<BusiUserWorkHistory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
