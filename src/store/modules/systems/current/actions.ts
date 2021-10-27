import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'
import { User } from '@/types/model/user'
import { BusiUser } from '@/types/model/businesses/user'
import { Business } from '@/types/model/businesses/business'
import { dummyUsers } from '@/dummies/user'
import { dummyBusiUsers } from '@/dummies/businesses/user'
import { dummyBusinesses } from '@/dummies/businesses/business'
import { LocalStorageKeyEnum } from '@/types/systems/localstorages/key'
import { v4 } from 'uuid'

export enum CurrentActionTypes {
  LOAD_USER = 'current/LOAD_USER',
  RESET_USER = 'current/RESET_USER',
  LOAD_BUSI_USER = 'current/LOAD_BUSI_USER',
  RESET_BUSI_USER = 'current/RESET_BUSI_USER',
  LOAD_BUSINESS = 'current/LOAD_BUSINESS',
  RESET_BUSINESS = 'current/RESET_BUSINESS',
  LOGIN = 'current/LOGIN',
}

export type AugmentedActionContext = {
  commit<K extends keyof CurrentMutations>(
    key: K,
    payload?: Parameters<CurrentMutations[K]>[1]
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
    payload: { businessId: string; userId: string }
  ): void
  [CurrentActionTypes.RESET_BUSI_USER] (
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.LOAD_BUSINESS] (
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [CurrentActionTypes.RESET_BUSINESS] (
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.LOGIN] (
    { commit }: AugmentedActionContext,
    payload: { email: string; password: string }
  ): void
}

export const currentActions: ActionTree<CurrentState, RootState> & CurrentActions = {
  [CurrentActionTypes.LOAD_USER] ({ commit }, payload) {
    const userRes = dummyUsers.find(user => user.id === payload)
    if (userRes) {
      commit(CurrentMutationTypes.SET_USER, userRes)
    } else {
      throw new Error('')
    }
  },
  [CurrentActionTypes.RESET_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_USER, {} as User)
  },
  [CurrentActionTypes.LOAD_BUSI_USER] ({ commit }, payload) {
    const busiUserRes = dummyBusiUsers.find(busiUser => busiUser.userId === payload.userId)
    if (busiUserRes) {
      commit(CurrentMutationTypes.SET_BUSI_USER, busiUserRes)
    } else {
      throw new Error('')
    }
  },
  [CurrentActionTypes.RESET_BUSI_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_BUSI_USER, {} as BusiUser)
  },
  [CurrentActionTypes.LOAD_BUSINESS] ({ commit }, payload) {
    const businessRes = dummyBusinesses.find(business => business.id === payload)
    if (businessRes) {
      commit(CurrentMutationTypes.SET_BUSINESS, businessRes)
    } else {
      throw new Error('')
    }
  },
  [CurrentActionTypes.RESET_BUSINESS] ({ commit }) {
    commit(CurrentMutationTypes.SET_BUSINESS, {} as Business)
  },
  [CurrentActionTypes.LOGIN] ({ commit }, payload) {
    const userRes = dummyUsers.find(user => user.email === payload.email)
    if (userRes) {
      const accessToken = userRes.id
      /* Set user Res */
      localStorage.setItem(LocalStorageKeyEnum.CURRENT_USER, accessToken)
      commit(CurrentMutationTypes.SET_USER, userRes)
    } else {
      throw new Error('No matched email and password')
    }
  },
}
