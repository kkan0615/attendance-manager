import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'

export enum CurrentActionTypes {
  LOAD_USER = 'current/LOAD_USER',
  RESET_USER = 'current/RESET_USER',
  LOAD_BUSI_USER = 'current/LOAD_BUSI_USER',
  RESET_BUSI_USER = 'current/RESET_BUSI_USER',
}

export type AugmentedActionContext = {
  commit<K extends keyof CurrentMutations>(
    key: K,
    payload: Parameters<CurrentMutations[K]>[1]
  ): ReturnType<CurrentMutations[K]>
} & Omit<ActionContext<CurrentState, RootState>, 'commit'>

export interface CurrentActions {
  [CurrentActionTypes.LOAD_USER] (
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [CurrentActionTypes.RESET_USER] (
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.LOAD_BUSI_USER] (
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [CurrentActionTypes.RESET_BUSI_USER] (
    { commit }: AugmentedActionContext,
  ): void
}

export const currentActions: ActionTree<CurrentState, RootState> & CurrentActions = {
  [CurrentActionTypes.LOAD_USER] ({ commit }, payload) {
    commit(CurrentMutationTypes.SET_USER, {})
  },
  [CurrentActionTypes.RESET_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_USER, {})
  },
  [CurrentActionTypes.LOAD_BUSI_USER] ({ commit }, payload) {
    commit(CurrentMutationTypes.SET_BUSI_USER, {})
  },
  [CurrentActionTypes.RESET_BUSI_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_BUSI_USER, {})
  },
}
