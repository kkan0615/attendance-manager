import { randBoolean, randNumber, randSentence, randText } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiPost, BusiPostAttachment } from '@/types/models/businesses/post'

export let BusiPostDummy: BusiPost[] = []
export const BusiPostAttachmentDummy: BusiPostAttachment[] = []
export const initBusiPostDummy = () => {
  BusiPostDummy = [ ...Array(45).keys() ].map(i => {
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      title: randText({ charCount: randNumber({ min: 10, max: 50 }) }),
      isNotification: false,
      notificationDate: undefined,
      content: randSentence(),
      createdAt: dayjs().subtract(i / 7, 'days').toISOString(),
      updatedAt: dayjs().subtract(i / 7, 'days').toISOString(),
    } as BusiPost
  }).concat([ ...Array(5).keys() ].map(i => {
    const randInt = randNumber({ min: 0, max: 10 })
    return {
      id: i + 46,
      busiId: 1,
      busiUserId: 1,
      title: randText({ charCount: randNumber({ min: 10, max: 50 }) }),
      isNotification: true,
      notificationDate: randBoolean() ? dayjs().add(3, 'days').toISOString() : undefined,
      content: randSentence(),
      createdAt: dayjs().subtract(randInt, 'days').toISOString(),
      updatedAt: dayjs().subtract(randInt, 'days').toISOString(),
    } as BusiPost
  }))
}

export const initBusiPostAttachmentDummy = () => {
  BusiPostDummy = [ ...Array(6).keys() ].map(i => {
    return {
    //
    } as BusiPost
  })
}
