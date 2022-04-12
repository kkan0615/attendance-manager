import { randBoolean, randNumber, randSentence, randText } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiPost, BusiPostAttachment, BusiPostComment } from '@/types/models/businesses/post'

export let BusiPostDummy: BusiPost[] = []
export let BusiPostAttachmentDummy: BusiPostAttachment[] = []
export let BusiPostCommentDummy: BusiPostComment[] = []
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
  })).concat([ ...Array(1).keys() ].map(i => {
    return {
      id: i + 45 + 5 + 1,
      busiId: 1,
      busiUserId: 1,
      // title: randText({ charCount: randNumber({ min: 10, max: 50 }) }),
      title: 'test',
      isNotification: false,
      notificationDate: undefined,
      content: '<h1>ㅂㅂㅈㄷ</h1><div><br></div><div><b><u>하이</u></b></div>',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiPost
  }))
}

export const initBusiPostAttachmentDummy = () => {
  BusiPostAttachmentDummy = [ ...Array(6).keys() ].map(i => {
    return {
      id: i + 1,
      // file: new File(),
      busiPostId: 46,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiPostAttachment
  })
}

export const initBusiPostCommentDummy = () => {
  BusiPostCommentDummy = [ ...Array(5).keys() ].map(i => {
    return {
      id: i + 1,
      busiUserId: 2,
      busiPostId: 46,
      content: randSentence(),
      type: 'comment',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiPostComment
  })
}
