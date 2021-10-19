import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { PrototypeState, prototypeState } from '@/store/modules/systems/prototype/state'
import { prototypeModule, PrototypeStore } from '@/store/modules/systems/prototype'

// define your typings for the store state
export interface RootState {
  prototype: PrototypeState
  // user: UserState
  // home: HomeState
  // guild: GuildState
  // guildUser: GuildUserState
  // guildCalendar: GuildCalendarState
  // guildNotice: GuildNoticeState
  // guildPost: GuildPostState
  // guildAdminApp: GuildAdminAppState
  // guildAdminUser: GuildAdminUserState
  // guildAdminRole: GuildAdminRoleState
  // guildAdminCalendar: GuildAdminCalendarState
  // count: number
}

export type RootStore =
  PrototypeStore<Pick<RootState, 'prototype'>>
  // UserStore<Pick<RootState, 'user'>> &
  // HomeStore<Pick<RootState, 'home'>> &
  // GuildStore<Pick<RootState, 'guild'>> &
  // GuildUserStore<Pick<RootState, 'guildUser'>> &
  // GuildCalendarStore<Pick<RootState, 'guildCalendar'>> &
  // GuildNoticeStore<Pick<RootState, 'guildNotice'>> &
  // GuildPostStore<Pick<RootState, 'guildPost'>> &
  // GuildAdminAppStore<Pick<RootState, 'guildAdminApp'>> &
  // GuildAdminUserStore<Pick<RootState, 'guildAdminUser'>> &
  // GuildAdminCalendarStore<Pick<RootState, 'guildAdminCalendar'>> &
  // GuildAdminRoleStore<Pick<RootState, 'guildAdminRole'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    prototype: prototypeModule,
  }
  // state: {
  //   count: 50
  // },
  // mutations: {
  //   setCount: (state, payload) => {
  //     state.count = payload
  //   }
  // },
  // actions: {
  //   increaseCount: ({ commit, state }) => {
  //     commit('setCount', state.count + 1)
  //   }
  // }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
