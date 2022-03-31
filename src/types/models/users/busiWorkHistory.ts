import { DefaultAttributes } from '@/types/models/attributes'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'

export interface BusiUserWorkHistory extends DefaultAttributes {
  busiUserId: number
  workOption: BusiUserWorkOption
  status: BusiUserStatus
  latitude?: number
  longitude?: number
}

export type BusiUserWorkHistorySelectOption = Pick<BusiUserWorkHistory, 'busiUserId'> & {
  startDateAt: string
  endDateAt: string
}
