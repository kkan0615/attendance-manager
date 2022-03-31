import { randEmail, randFullName, randUserName } from '@ngneat/falso'
import dayjs from 'dayjs'
import { User } from '@/types/models/users'

export let UserDummy: User[] = []
export const initUserDummy = () => {
  UserDummy = [
    {
      id: 1,
      img: 'https://64.media.tumblr.com/b5d68d4fb992a1ba0013b5dc412b0eaa/0d1853ff26639c9c-0b/s400x600/7a458c9896d9fecb13dcb5381b10ec34a97075ad.png',
      email: 'hanamaru@demo.com',
      name: 'Hanamaru',
      nickname: 'Hanamaru',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as User
  ].concat([
    {
      id: 2,
      img: 'https://64.media.tumblr.com/9ba38177a1ad24e9eb21012168737422/6ea1bb0d8de983d6-7c/s500x750/3e21f9f66789b9bfde58c0835c16d95e799c27d5.jpg',
      email: 'you@demo.com',
      name: 'Watanbe you',
      nickname: 'you zzang',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as User
  ]).concat([ ...Array(20).keys() ].map(i => {
    return {
      id: i + 3,
      name: randFullName(),
      nickname: randUserName(),
      email: randEmail(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as User
  }))
}
