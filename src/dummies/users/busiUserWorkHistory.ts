import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { rand, randNumber } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'

export let BusiUserWorkHistoryDummy: BusiUserWorkHistory[] = []

const _staticBusiUserStatus: BusiUserStatus[] = ['work', 'rest', 'off']
const _staticBusiUserWorkOption: BusiUserWorkOption[] = ['simple', 'qrCode', 'location']
export const initBusiUserWorkHistoryDummy = () => {
  BusiUserWorkHistoryDummy = [ ...Array(13).keys() ].map(i => {
    const workOption = rand(_staticBusiUserWorkOption)
    const addHours = randNumber({ min: 1, max: 8 })
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      status: i % 2 === 0 ? 'work' : 'off',
      workOption,
      latitude: workOption !== 'qrCode' ? 37.6015565 : undefined,
      longitude: workOption !== 'qrCode' ? 126.7280587 : undefined,
      createdAt: dayjs().startOf('week').add(parseInt((i / 2).toString()), 'day')
        .add(13, 'hours')
        .add(i % 2 === 1 ? addHours : 0, 'hours').toISOString(),
      updatedAt: dayjs().startOf('week').add(parseInt((i / 2).toString()), 'day')
        .add(13, 'hours')
        .add(i % 2 === 1 ? addHours : 0, 'hours').toISOString(),
    } as BusiUserWorkHistory
  }).concat([ ...Array(20 * 14).keys() ].map(i => {
    const workOption = rand(_staticBusiUserWorkOption)
    const addHours = randNumber({ min: 1, max: 8 })
    return {
      id: (i + 14),
      busiId: 1,
      busiUserId: parseInt((i / 14).toString()) + 2,
      status: i % 2 === 0 ? 'work' : 'off',
      workOption,
      latitude: workOption !== 'qrCode' ? 37.6015565 : undefined,
      longitude: workOption !== 'qrCode' ? 126.7280587 : undefined,
      createdAt: dayjs().startOf('week').add(parseInt((i / 2 % 7).toString()), 'day')
        .add(8, 'hours')
        .add(i % 2 === 1 ? addHours : 0, 'hours').toISOString(),
      updatedAt: dayjs().startOf('week').add(parseInt((i / 2 % 7).toString()), 'day')
        .add(8, 'hours')
        .add(i % 2 === 1 ? addHours : 0, 'hours').toISOString(),
    } as BusiUserWorkHistory
  }))
}
