import { MutationTree } from 'vuex'
import { CurrentState } from './state'

export enum CurrentMutationTypes {
  SET_USER = 'current/SET_USER',
  SET_BUSI_USER = 'current/SET_BUSI_USER',
}
export type CurrentMutations<S = CurrentState> = {
  [CurrentMutationTypes.SET_USER](state: S, payload: any): void
  [CurrentMutationTypes.SET_BUSI_USER](state: S, payload: any): void
}

export const currentMutations: MutationTree<CurrentState> & CurrentMutations = {
  [CurrentMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [CurrentMutationTypes.SET_BUSI_USER] (state, payload) {
    state.busiUser = payload
  },
}
