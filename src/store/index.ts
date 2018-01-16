import Vue from 'vue'
import Vuex, { Store, Module } from 'vuex'
import MagicianModule from './magician'
import AlchemyModule, { IAlchemyState } from './alchemy'
import { ITime } from '../interfaces/timeModels'
import { ICharacter } from '../interfaces/magicianModels'
import { IMessage } from '../interfaces/messageModels'
import { IMagicCreation } from '../interfaces/magicModels'

Vue.use(Vuex)

export const MAGICIAN_MODULE = 'magician'
export const ALCHEMY_MODULE = 'alchemy'

export const MESSAGE = 'MESSAGE'
export const MAGIC_CREATION = 'MAGIC_CREATION'

export interface IBasicMutation<T> {
  field: string
  value: T
}

export interface IMageState {
  currentTime: ITime
  message: IMessage | null
  magicCreation: IMagicCreation | null
}

const initialState: IMageState = {
  currentTime: {
    year: 2075,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    combatTurn: 0
  },
  message: null,
  magicCreation: null
}

const store = new Store<IMageState>({
  modules: {
    [MAGICIAN_MODULE]: MagicianModule as Module<ICharacter, IMageState>,
    [ALCHEMY_MODULE]: AlchemyModule as Module<IAlchemyState, IMageState>
  },
  mutations: {
    [MESSAGE](state, message: IMessage) {
      state.message = message
    },
    [MAGIC_CREATION](state, creation: IMagicCreation) {
      state.magicCreation = creation
    }
  },
  state: initialState,
  strict: true
})

export default store
