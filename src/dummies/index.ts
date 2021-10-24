import { initDummyUsers } from '@/dummies/user'
import { initDummyBusinesses } from '@/dummies/businesses/business'
import { initDummyBusiUsers } from '@/dummies/businesses/user'

export const initDummyData = () => {
  initDummyUsers()
  initDummyBusinesses()
  initDummyBusiUsers()
}
