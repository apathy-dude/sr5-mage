import { IMageState } from './'
import { ITime } from '../interfaces/timeModels'
import { Module } from 'vuex'

const module: Module<ITime, IMageState> = {
  state: {
    year: 2075,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    combatTurn: 0
  },
  mutations: {
    TIME(state: ITime, time: ITime): void {
      state = { ...state, ...time }
    }
  }
}
