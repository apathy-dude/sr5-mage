import { IMageState, IBasicMutation } from './'
import { ICharacter } from '../interfaces/magicModels'
import { Module } from 'vuex'

import { ATTRIBUTE, MAGIC } from '../interfaces/attributes'
import { SKILL, ALCHEMY, BINDING, RITUAL_SPELLCASTING, SPELLCASTING, SUMMONING } from '../interfaces/skills'
import { DAMAGE_TRACK_MAX, DAMAGE_TRACK_CURRENT, DAMAGE_TRACK_PENALTY_DIVISOR, DAMAGE_TRACK_PENALTY_MODIFIER, PHYSICAL, STUN } from '../interfaces/damageTracks'

export const DRAIN_RESIST = 'DRAIN_RESIST'
export const SUSTAIN_PENALTY = 'SUSTAIN_PENALTY'

const module: Module<ICharacter, IMageState> = {
  namespaced: true,
  state: {
    attributes: {
      [MAGIC]: 6
    },
    skills: {
      [ALCHEMY]: 6,
      [BINDING]: 6,
      [RITUAL_SPELLCASTING]: 6,
      [SPELLCASTING]: 6,
      [SUMMONING]: 6
    },
    damageTracks: {
      [STUN]: {
        max: 11,
        current: 11,
        penaltyDivisor: 3,
        penaltyModifier: 0
      },
      [PHYSICAL]: {
        max: 10,
        current: 10,
        penaltyDivisor: 3,
        penaltyModifier: 0
      }
    },
    drainResist: 12,
    sustainPenalty: 2
  },
  mutations: {
    // Attributes
    [ATTRIBUTE](state: ICharacter, value: IBasicMutation<number>) { state.attributes[value.field] = value.value },
    [SKILL](state: ICharacter, value: IBasicMutation<number>) { state.skills[value.field] = value.value },

    [DAMAGE_TRACK_MAX](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].max = value.value },
    [DAMAGE_TRACK_CURRENT](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].current = value.value },
    [DAMAGE_TRACK_PENALTY_DIVISOR](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].penaltyDivisor = value.value },
    [DAMAGE_TRACK_PENALTY_MODIFIER](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].penaltyModifier = value.value },

    // Other
    [DRAIN_RESIST](state: ICharacter, value: number) { state.drainResist = value },
    [SUSTAIN_PENALTY](state: ICharacter, value: number) { state.sustainPenalty = value },
  },
  getters: {
    damagePenalty(state: ICharacter, getters): number {
      return getters.stunPenalty + getters.physicalPenalty
    },
    stunPenalty(state): number {
      return Math.max(Math.floor((state.damageTracks.stun.max - state.damageTracks.stun.current) / state.damageTracks.stun.penaltyDivisor) - state.damageTracks.stun.penaltyModifier, 0)
    },
    physicalPenalty(state): number {
      return Math.max(Math.floor((state.damageTracks.physical.max - state.damageTracks.physical.current) / state.damageTracks.physical.penaltyDivisor) - state.damageTracks.physical.penaltyModifier, 0)
    }
  }
}

export default module
