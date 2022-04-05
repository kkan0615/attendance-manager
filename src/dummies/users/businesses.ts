import { randCompanyName, randNumber, randUrl } from '@ngneat/falso'
import dayjs from 'dayjs'
import { Business } from '@/types/models/businesses'
import { BusiAllowedLocation } from '@/types/models/businesses/allowedLocation'

export let BusinessDummy: Business[] = []
export let BusinessAllowedLocationDummy: BusiAllowedLocation[] = []
export const initBusinessDummy = () => {
  BusinessDummy = [
    {
      id: 1,
      smallLogo: 'https://cdn-icons-png.flaticon.com/512/7188/7188223.png',
      logo: 'http://placehold.jp/ffffff/000000/300x150.png?text=Lorem%20Logo',
      homepage: randUrl(),
      name: 'Demo Business',
      maxWorkHour: 40,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as Business
  ].concat([ ...Array(10).keys() ].map(i => {
    return {
      id: i + 2,
      smallLogo: 'https://cdn-icons-png.flaticon.com/512/7188/7188223.png',
      logo: 'http://placehold.jp/ffffff/000000/300x150.png?text=Lorem%20Logo',
      homepage: randUrl(),
      name: randCompanyName(),
      maxWorkHour: randNumber({ min: 40, max: 52 }),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as Business
  }))
}
export const initBusinessAllowedLocationDummy = () => {
  BusinessAllowedLocationDummy = [
    {
      id: 1,
      busiId: 1,
      lat: 37.596415,
      lon: 126.722546,
      meter: 10,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    },
    {
      id: 2,
      busiId: 1,
      lat: 37.601544,
      lon: 126.728071,
      meter: 10,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    },
    {
      id: 3,
      busiId: 1,
      lat: 37.596312,
      lon: 126.722515,
      meter: 10,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    },
  ]
}
