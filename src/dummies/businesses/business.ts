import { Business } from '@/types/model/businesses/business'
import { v4 } from 'uuid'
import faker from 'faker'
import dayjs from 'dayjs'

// eslint-disable-next-line
export let dummyBusinesses: Business[] = []

export const DEMO_DUMMY_BUSINESS_ID = 'demo-business-id'

export const initDummyBusinesses = () => {
  dummyBusinesses = [...Array(30).keys()].map(() => {
    return {
      id: v4(),
      name: faker.company.companyName(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as Business
  })

  /* Add demo site */
  dummyBusinesses.unshift({
    id: DEMO_DUMMY_BUSINESS_ID,
    name: 'Demo Business',
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  } as Business)
}
