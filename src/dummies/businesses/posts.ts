import { randBoolean, randNumber, randSentence, randText } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiPost } from '@/types/models/businesses/post'

export let BusiPostDummy: BusiPost[] = []
export const initBusiPostDummy = () => {
  BusiPostDummy = [ ...Array(45).keys() ].map(i => {
    const randInterger = randNumber({ min: 0, max: 10 })
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      title: randText(),
      isNotification: false,
      notificationDate: undefined,
      content: randSentence(),
      createdAt: dayjs().subtract(randInterger, 'days').toISOString(),
      updatedAt: dayjs().subtract(randInterger, 'days').toISOString(),
    } as BusiPost
  }).concat([ ...Array(5).keys() ].map(i => {
    const randInterger = randNumber({ min: 0, max: 10 })
    return {
      id: i + 46,
      busiId: 1,
      busiUserId: 1,
      title: randText(),
      isNotification: true,
      notificationDate: randBoolean() ? dayjs().add(3, 'days').toISOString() : undefined,
      content: randSentence(),
      createdAt: dayjs().subtract(randInterger, 'days').toISOString(),
      updatedAt: dayjs().subtract(randInterger, 'days').toISOString(),
    } as BusiPost
  }))
}
