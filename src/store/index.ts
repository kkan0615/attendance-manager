import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { PrototypeState } from '@/store/modules/systems/prototype/state'
import { prototypeModule, PrototypeStore } from '@/store/modules/systems/prototype'
import { ApplicationActions } from '@/store/modules/systems/application/actions'
import { applicationModule } from '@/store/modules/systems/application'

// define your typings for the store state
export interface RootState {
  prototype: PrototypeState
  application: ApplicationActions
}

export type RootStore =
  PrototypeStore<Pick<RootState, 'prototype'>> &
  PrototypeStore<Pick<RootState, 'application'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    prototype: prototypeModule,
    application: applicationModule,
  }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
