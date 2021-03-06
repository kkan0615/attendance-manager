import { BusiUser, BusiUserAuth, BusiUserStatus } from '@/types/models/users/business'
import { rand, randEmail, randFirstName, randFullName, randUserName } from '@ngneat/falso'
import dayjs from 'dayjs'

const _staticBusiUserStatus: BusiUserStatus[] = ['work', 'rest', 'off']
const _staticBusiUserAuth: BusiUserAuth[] = ['user', 'staff', 'admin', 'system']
export let BusiUserDummy: BusiUser[] = []
export const initBusiUserDummy = () => {
  BusiUserDummy = [
    {
      id: 1,
      img: 'https://picsum.photos/id/1003/500/500',
      email: 'deer@demo.com',
      name: 'Deer',
      nickname: 'Sasum',
      userId: 1,
      busiId: 1,
      status: 'work',
      startWorkAt: dayjs().subtract(8, 'minutes').toISOString(),
      auth: 'superAdmin',
      joinAt: dayjs().toISOString(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiUser
  ].concat([ ...Array(20).keys() ].map(i => {
    // const status = rand(_staticBusiUserStatus)
    const auth = rand(_staticBusiUserAuth)
    const firstname = randFirstName({ length: 1 })
    return {
      id: i + 2,
      busiId: 1,
      userId: i + 3,
      name: randFullName(),
      nickname: randUserName(),
      email: randEmail({ firstName: firstname.join(''), lastName: '', suffix: '' }),
      status: 'off',
      auth: auth,
      joinAt: dayjs().toISOString(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiUser
  }))
  // .concat([ ...Array(20).keys() ].map(i => {
  //   return     {
  //     id: i + 22,
  //     img: 'https://picsum.photos/id/1003/500/500',
  //     email: 'hanamaru@demo.com',
  //     name: 'Hanamaru',
  //     nickname: 'Hanamaru',
  //     userId: 1,
  //     busiId: i + 2,
  //     status: 'off',
  //     startWorkAt: null,
  //     auth: 'superAdmin',
  //     joinAt: dayjs().toISOString(),
  //     createdAt: dayjs().toISOString(),
  //     updatedAt: dayjs().toISOString(),
  //   } as BusiUser
  // }))
}
