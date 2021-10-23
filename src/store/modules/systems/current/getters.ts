import { GetterTree } from 'vuex'
import { CurrentState } from './state'
import { RootState } from '@/store'

export type CurrentGetters<S = CurrentState> = {
  user(state: S): any
}

export const currentGetters: GetterTree<CurrentState, RootState> & CurrentGetters = {
  user: (state) => state.user,
}
