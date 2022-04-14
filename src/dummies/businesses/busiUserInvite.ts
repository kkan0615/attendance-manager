import { BusiUserInvite } from '@/types/models/users/busiInvite'
import dayjs from 'dayjs'

export let BusiUserInviteDummy: BusiUserInvite[] = []

export const initBusiUserInviteDummy = () => {
  BusiUserInviteDummy = [ ...Array(1).keys() ].map(i => {
    return {
      id: i + 1,
      userId: 2,
      invitorId: 1,
      busiId: 1,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiUserInvite
  })
}
