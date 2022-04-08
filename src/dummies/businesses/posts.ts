import { randSentence, randText } from '@ngneat/falso'
import dayjs from 'dayjs'
import { BusiPost } from '@/types/models/businesses/post'

export let BusiPostDummy: BusiPost[] = []
export const initBusiPostDummy = () => {
  BusiPostDummy = [ ...Array(30).keys() ].map(i => {
    return {
      id: i + 1,
      busiId: 1,
      busiUserId: 1,
      title: randText(),
      content: randSentence(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiPost
  })
}
