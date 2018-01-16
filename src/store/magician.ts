import { IMageState, IBasicMutation } from './'
import { ICharacter } from '../interfaces/magicianModels'
import { Module } from 'vuex'

import { ATTRIBUTE, EDGE, MAGIC } from '../interfaces/attributes'
import { SKILL, ALCHEMY, BINDING, RITUAL_SPELLCASTING, SPELLCASTING, SUMMONING } from '../interfaces/skills'
import { DAMAGE_TRACK_MAX, DAMAGE_TRACK_CURRENT, DAMAGE_TRACK_DAMAGE, DAMAGE_TRACK_PENALTY_DIVISOR, DAMAGE_TRACK_PENALTY_MODIFIER, PHYSICAL, STUN } from '../interfaces/damageTracks'

export const DRAIN_RESIST = 'DRAIN_RESIST'

export const ALCHEMY_DURATION_MULTIPLIER = 'ALCHEMY_DURATION_MULTIPLIER'
export const ALCHEMY_DURATION_MODIFIER = 'ALCHEMY_DURATION_MODIFIER'

export const CONJURING_SPIRIT_INDEX = 'CONJURING_SPIRIT_INDEX'

export const SPELLCASTING_SUSTAIN_PENALTY = 'SPELLCASTING_SUSTAIN_PENALTY'

const baseCharacter: ICharacter = {
  attributes: {
    [EDGE]: 3,
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
  alchemy: {
    durationMultiplier: 2,
    durationModifier: 0
  },
  conjuring: {
    spiritIndex: 0
  },
  spellcasting: {
    sustainPenalty: 2
  }
}

const module: Module<ICharacter, IMageState> = {
  namespaced: true,
  state: baseCharacter,
  mutations: {
    // Attributes
    [ATTRIBUTE](state: ICharacter, value: IBasicMutation<number>) { state.attributes[value.field] = value.value },
    [SKILL](state: ICharacter, value: IBasicMutation<number>) { state.skills[value.field] = value.value },

    // Damage Track
    [DAMAGE_TRACK_MAX](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].max = value.value },
    [DAMAGE_TRACK_CURRENT](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].current = value.value },
    [DAMAGE_TRACK_DAMAGE](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].current -= value.value },
    [DAMAGE_TRACK_PENALTY_DIVISOR](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].penaltyDivisor = value.value },
    [DAMAGE_TRACK_PENALTY_MODIFIER](state: ICharacter, value: IBasicMutation<number>) { state.damageTracks[value.field].penaltyModifier = value.value },

    // Alchemy
    [ALCHEMY_DURATION_MODIFIER](state: ICharacter, value: number) { state.alchemy.durationModifier = value },
    [ALCHEMY_DURATION_MULTIPLIER](state: ICharacter, value: number) { state.alchemy.durationMultiplier = value },

    // Conjuring
    [CONJURING_SPIRIT_INDEX](state: ICharacter, value: number) { state.conjuring.spiritIndex = value },

    // Spellcasting
    [SPELLCASTING_SUSTAIN_PENALTY](state: ICharacter, value: number) { state.spellcasting.sustainPenalty = value },

    // Other
    [DRAIN_RESIST](state: ICharacter, value: number) { state.drainResist = value },
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
