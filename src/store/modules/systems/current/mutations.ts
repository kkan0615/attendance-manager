import { MutationTree } from 'vuex'
import { CurrentState } from './state'
import { User } from '@/types/model/user'
import { BusiUser } from '@/types/model/businesses/user'
import { Business } from '@/types/model/businesses/business'

export enum CurrentMutationTypes {
  SET_USER = 'current/SET_USER',
  SET_BUSI_USER = 'current/SET_BUSI_USER',
  SET_BUSINESS = 'current/SET_BUSINESS',
}
export type CurrentMutations<S = CurrentState> = {
  [CurrentMutationTypes.SET_USER](state: S, payload: User): void
  [CurrentMutationTypes.SET_BUSI_USER](state: S, payload: BusiUser): void
  [CurrentMutationTypes.SET_BUSINESS](state: S, payload: Business): void
}

export const currentMutations: MutationTree<CurrentState> & CurrentMutations = {
  [CurrentMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [CurrentMutationTypes.SET_BUSI_USER] (state, payload) {
    state.busiUser = payload
  },
  [CurrentMutationTypes.SET_BUSINESS] (state, payload) {
    state.business = payload
  },
}
