import { DefaultAttributes, DefaultSelectListQuery } from '@/types/models/attributes'
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

export interface TempBusiUserWorkHistory extends DefaultAttributes {
  busiId: number
  userId: number
  busiUserId: number
  startedAt: string
  endedAt?: string
  workOption: BusiUserWorkOption
  startLatitude?: number
  startLongitude?: number
  endLatitude?: number
  endLongitude?: number
}

export type TempBusiUserWorkHistoryCreateForm = Omit<TempBusiUserWorkHistory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type TempBusiUserWorkHistoryUpdateForm = Omit<TempBusiUserWorkHistory, 'createdAt' | 'updatedAt' | 'deletedAt'>
export interface TempBusiUserWorkHistorySelectListQuery extends DefaultSelectListQuery {
  busiUserId?: number
  rangeStartAt?: string
  rangeEndAt?: string
}
export type TempBusiUserWorkHistoryListInfo = TempBusiUserWorkHistory
