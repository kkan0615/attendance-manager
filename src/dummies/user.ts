import { User } from '@/types/model/user'
import { v4 } from 'uuid'
import * as faker from 'faker'
import dayjs from 'dayjs'

// eslint-disable-next-line
export let dummyUsers: User[] = []

export const DEMO_SUPER_ADMIN_USER_ID = 'SUPER_ADMIN_USER_ID'

export const initDummyUsers = () => {
  dummyUsers = [...Array(30).keys()].map(() => {
    return {
      id: v4(),
      nickname: faker.internet.userName(),
      auth: 'user',
      name: faker.internet.userName(),
      color: faker.internet.color(),
      img: faker.internet.avatar(),
      email: faker.internet.email(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as User
  })

  /* Add Super admin id */
  dummyUsers.unshift({
    id: DEMO_SUPER_ADMIN_USER_ID,
    nickname: 'Demo Super Admin',
    auth: 'superAdmin',
    name: 'SuperAdmin name',
    color: faker.internet.color(),
    img: faker.internet.avatar(),
    email: faker.internet.email(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  } as User)
}
