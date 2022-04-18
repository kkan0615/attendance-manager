import { BusiUserWorkHistory, TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { rand, randNumber } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiUserStatus, BusiUserWorkOption } from '@/types/models/users/business'
import { BusiUserDummy } from '@/dummies/users/busiUser'

export let BusiUserWorkHistoryDummy: BusiUserWorkHistory[] = []
export let TempBusiUserWorkHistoryDummy: TempBusiUserWorkHistory[] = []

const _staticBusiUserStatus: BusiUserStatus[] = ['work', 'rest', 'off']
const _staticBusiUserWorkOption: BusiUserWorkOption[] = ['simple', 'qrCode', 'location']
export const initTempBusiUserWorkHistoryDummy = () => {
  const loopDays = (dayjs().diff(dayjs().startOf('week'), 'days') * 2) + 1
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
    BusiUserWorkHistoryDummy[BusiUserWorkHistoryDummy.length - 1].createdAt = dayjs().subtract(8, 'minute').toISOString()
    BusiUserWorkHistoryDummy[BusiUserWorkHistoryDummy.length - 1].updatedAt = dayjs().subtract(8, 'minute').toISOString()
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

export const initBusiUserWorkHistoryDummy = () => {
  const loopDays = (dayjs().diff(dayjs().startOf('week'), 'days')) + 1
  TempBusiUserWorkHistoryDummy = [ ...Array(loopDays).keys() ].map(i => {
    const workOption = rand(_staticBusiUserWorkOption)
    const addHours = randNumber({ min: 1, max: 8 })
    const startedAt = dayjs().startOf('week').startOf('day')
      .add(i, 'days') // For id order
      .add(10, 'hours')
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      userId: 1,
      workOption,
      startedAt: startedAt.isAfter(dayjs()) ? dayjs().toISOString() : startedAt.toISOString(),
      endedAt: i !== loopDays - 1 ? startedAt.add(addHours, 'hours').toISOString() : undefined,
      startLatitude: workOption !== 'qrCode' ? 37.6015565 : undefined,
      startLongitude: workOption !== 'qrCode' ? 126.7280587 : undefined,
      endLatitude: i !== loopDays - 1 && workOption !== 'qrCode' ? 37.6015565 : undefined,
      endLongitude: i !== loopDays - 1 && workOption !== 'qrCode' ? 126.7280587 : undefined,
      createdAt: startedAt.toISOString(),
      updatedAt: startedAt.toISOString(),
    } as TempBusiUserWorkHistory
  })
  // TempBusiUserWorkHistoryDummy.unshift({
  //   id: 1,
  //   busiId: 1,
  //   busiUserId: 1,
  //   userId: 1,
  //   workOption: 'simple',
  //   startedAt: dayjs().startOf('week').startOf('day').add(23, 'hours').toISOString(),
  //   endedAt: dayjs().startOf('week').startOf('day').add(1, 'day').add(2, 'hours').toISOString(),
  //   startLatitude: 37.6015565,
  //   startLongitude: 126.7280587,
  //   endLatitude: 37.6015565,
  //   endLongitude: 126.7280587,
  //   createdAt: dayjs().startOf('week').startOf('day').toISOString(),
  //   updatedAt: dayjs().startOf('week').startOf('day').toISOString(),
  // } as TempBusiUserWorkHistory)
  const found = BusiUserDummy.find(dummy => dummy.id === 1)
  if (found) {
    found.lastWorkHistoryId = TempBusiUserWorkHistoryDummy[loopDays - 1].id
  }
}
