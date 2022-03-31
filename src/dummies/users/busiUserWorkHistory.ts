import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { rand } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'

export let BusiUserWorkHistoryDummy: BusiUserWorkHistory[] = []

const _staticBusiUserStatus: BusiUserStatus[] = ['work', 'rest', 'off']
const _staticBusiUserWorkOption: BusiUserWorkOption[] = ['simple', 'qrCode', 'location']
export const initBusiUserWorkHistoryDummy = () => {
  BusiUserWorkHistoryDummy = [ ...Array(15).keys() ].map(i => {
    const status = rand(_staticBusiUserStatus)
    const workOption = rand(_staticBusiUserWorkOption)
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      status,
      workOption,
      createdAt: dayjs().endOf('week').subtract(parseInt((i / 2).toString()), 'day').toISOString(),
      updatedAt: dayjs().endOf('week').subtract(parseInt((i / 2).toString()), 'day').toISOString(),
    } as BusiUserWorkHistory
  }).concat([ ...Array(20 * 15).keys() ].map(i => {
    const status = rand(_staticBusiUserStatus)
    const workOption = rand(_staticBusiUserWorkOption)
    return {
      id: i + 16,
      busiId: 1,
      busiUserId: parseInt((i / 15).toString()) + 2,
      status,
      workOption,
      createdAt: dayjs().endOf('week').subtract(parseInt((i / 2 % 15).toString()), 'day').toISOString(),
      updatedAt: dayjs().endOf('week').subtract(parseInt((i / 2 % 15).toString()), 'day').toISOString(),
    } as BusiUserWorkHistory
  }))
}
