import { GetterTree } from 'vuex'
import { ApplicationState } from './state'
import { RootState } from '@/store'

export type ApplicationGetters<S = ApplicationState> = {
  test2(state: S): any
}

export const applicationGetters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  test2: (state) => state.test,
}
