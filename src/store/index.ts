import Vue from 'vue'
import Vuex, { Store, Module } from 'vuex'
import MagicianModule from './magician'
import { ITime } from '../interfaces/timeModels'
import { ICharacter } from '../interfaces/magicModels'

Vue.use(Vuex)

export const MAGICIAN_MODULE = 'magician'

export interface IBasicMutation<T> {
  field: string
  value: T
}

export interface IMageState {
  currentTime: ITime
}

const state: IMageState = {
  currentTime: {
    year: 2075,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    combatTurn: 0
  }
}

const store = new Store<IMageState>({
  modules: {
    [MAGICIAN_MODULE]: MagicianModule as Module<ICharacter, IMageState>
  },
  state,
  strict: true
})

export default store
