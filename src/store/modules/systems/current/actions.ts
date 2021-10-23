import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'

export enum CurrentActionTypes {
  LOAD_USER = 'current/ADD_TOAST',
  RESET_USER = 'current/REMOVE_TOAST',
}

export type AugmentedActionContext = {
  commit<K extends keyof CurrentMutations>(
    key: K,
    payload: Parameters<CurrentMutations[K]>[1]
  ): ReturnType<CurrentMutations[K]>
} & Omit<ActionContext<CurrentState, RootState>, 'commit'>

export interface CurrentActions {
  [CurrentActionTypes.LOAD_USER](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [CurrentActionTypes.RESET_USER](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
}

export const currentActions: ActionTree<CurrentState, RootState> & CurrentActions = {
  [CurrentActionTypes.LOAD_USER] ({ commit }, payload) {
    commit(CurrentMutationTypes.SET_USER, {})
  },
  [CurrentActionTypes.RESET_USER] ({ commit }, payload) {
    commit(CurrentMutationTypes.SET_USER, {})
  },
}
