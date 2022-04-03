import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { rand, randNumber } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'
import { BusiUserDummy } from '@/dummies/users/busiUser'

export let BusiUserWorkHistoryDummy: BusiUserWorkHistory[] = []

const _staticBusiUserStatus: BusiUserStatus[] = ['work', 'rest', 'off']
const _staticBusiUserWorkOption: BusiUserWorkOption[] = ['simple', 'qrCode', 'location']
export const initBusiUserWorkHistoryDummy = () => {
  // console.log(dayjs().add(5, 'days').format('ll'), dayjs().startOf('week').format('ll'))
  // console.log(dayjs().add(5, 'days').diff(dayjs().startOf('week'), 'days'))
  const loopDays = (dayjs().diff(dayjs().startOf('week'), 'days') * 2) + 1
  // console.log(loopDays)
  BusiUserWorkHistoryDummy = [ ...Array(loopDays).keys() ].map(i => {
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
  })

  const found = BusiUserDummy.find(dummy => dummy.id === 1)
  if (found) {
    found.startWorkAt = dayjs(BusiUserWorkHistoryDummy[BusiUserWorkHistoryDummy.length - 1].updatedAt).toISOString()
  }

  for (let j = loopDays; j <= (20 * loopDays); j++) {
    BusiUserWorkHistoryDummy = BusiUserWorkHistoryDummy.concat([ ...Array(loopDays).keys() ].map(i => {
      const workOption = rand(_staticBusiUserWorkOption)
      const addHours = randNumber({ min: 1, max: 8 })
      return {
        id: j + i + 1,
        busiId: 1,
        busiUserId: (j / loopDays) + 1,
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
    }))
  }
}
