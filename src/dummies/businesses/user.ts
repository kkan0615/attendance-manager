import { BusiUser } from '@/types/model/businesses/user'
import { v4 } from 'uuid'
import faker from 'faker'
import dayjs from 'dayjs'
import { DEMO_DUMMY_BUSINESS_ID } from '@/dummies/businesses/business'
import { dummyUsers, SUPER_ADMIN_USER_ID } from '@/dummies/user'

// eslint-disable-next-line
export let dummyBusiUsers: BusiUser[] = []

export const SUPER_ADMIN_BUSI_USER_ID = 'SUPER_ADMIN_BUSI_USER_ID'

export const initDummyBusiUsers = () => {
  dummyBusiUsers = [...Array(30).keys()].map(() => {
    const dummyUserListWithoutAdmin = dummyUsers.filter(dummyUser => dummyUser.id !== SUPER_ADMIN_USER_ID)

    const user = dummyUserListWithoutAdmin[Math.floor(Math.random() * dummyUserListWithoutAdmin.length)]

    return {
      id: v4(),
      busiId: DEMO_DUMMY_BUSINESS_ID,
      userId: user.id,
      nickname: faker.internet.userName(),
      auth: 'user',
      name: faker.internet.userName(),
      color: faker.internet.color(),
      img: faker.internet.avatar(),
      email: faker.internet.email(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as BusiUser
  })

  /* Add Super admin */
  dummyBusiUsers.unshift({
    id: SUPER_ADMIN_BUSI_USER_ID,
    busiId: DEMO_DUMMY_BUSINESS_ID,
    userId: SUPER_ADMIN_USER_ID,
    nickname: 'Demo Super Admin',
    auth: 'superAdmin',
    name: 'SuperAdmin name',
    color: faker.internet.color(),
    img: faker.internet.avatar(),
    email: faker.internet.email(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  } as BusiUser)
}
