import Vue from 'vue'

import { Module } from 'vuex'

import { IMageState, MESSAGE, MAGIC_CREATION, ALCHEMY_MODULE, MAGICIAN_MODULE } from './'
import { IMagicCreation } from '../interfaces/magicModels'
import { ICombatSpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula, ISpellFormula } from '../interfaces/formulaModels'
import { IPreparation, IPreparationTrigger } from '../interfaces/preparationModels'

import { Guid } from '../services/guidService'
import { roll } from '../services/diceService'
import { IHasId } from '../interfaces/util'

import { ICharacter } from '../interfaces/magicianModels'
import { ALCHEMY } from '../interfaces/skills'
import { EDGE, MAGIC } from '../interfaces/attributes'
import { DamageTracks, DAMAGE_TRACK_DAMAGE } from '../interfaces/damageTracks'

import { command, time, contact } from '../data/triggers'
import { IMessage } from '../interfaces/messageModels'

import RollMagicCardComponent from '../components/magic/RollMagicCard.vue'

export const CREATE_PREP = 'CREATE_PREP'
export const ADD_PREP = 'ADD_PREP'
export const DELETE_PREP = 'DELETE_PREP'
export const USE_PREP = 'USE_PREP'

export const FORMULA = 'FORMULA'
export const DELETE_FORMULA = 'DELETE_FORMULA'

export const ADD_TRIGGER = 'ADD_TRIGGER'
export const DELETE_TRIGGER = 'DELETE_TRIGGER'

export interface ICreatePrep {
  magician: ICharacter
  force: number
  reagentLimit?: number
  preEdgeCreation: boolean
  formula: ISpellFormula
  trigger: IPreparationTrigger

  bonusDice: number
  bonusDrainDice: number
  drainMod: number

  durationModifier: number
  durationMultiplier: number
}

export interface IAlchemyState {
  knownFormula: Array<ICombatSpellFormula | IDetectionSpellFormula | IHealthSpellFormula | IIllusionSpellFormula | IManipulationSpellFormula | ISpellFormula>
  knownTriggers: { [key: string]: IPreparationTrigger }
  preparations: IPreparation[]
}

const triggers: { [key: string]: IPreparationTrigger } = [ command, time, contact ]
  .reduce((a: { [key: string]: IPreparationTrigger }, t: IPreparationTrigger) => {
    a[t.trigger] = t
    return a
  }, {})

const module: Module<IAlchemyState, IMageState> = {
  namespaced: true,
  state: {
    knownFormula: [],
    knownTriggers: triggers,
    preparations: []
  },
  mutations: {
    [ADD_PREP](state: IAlchemyState, preparation: IPreparation) {
      state.preparations.push(preparation)
    },
    [DELETE_PREP](state: IAlchemyState, id: string) { delete state.preparations[id] },
    [USE_PREP](state: IAlchemyState, id: string) {
      // TODO: Use prep
      // TODO: Log all dice rolls of prep
      delete state.preparations[id]
    },

    [FORMULA](state: IAlchemyState, data: ISpellFormula & IHasId) {
      const idx: number = state.knownFormula.findIndex(f => f.id === data.id)

      if (idx > -1) {
        Object.keys(data)
          .forEach(key => state.knownFormula[idx][key] = data[key])

        return
      }

      state.knownFormula.push(data)
    },
    [DELETE_FORMULA](state: IAlchemyState, id: string) {
      const idx = state.knownFormula.findIndex(f => f.id === id)

      if (idx > -1) {
        state.knownFormula.splice(idx, 1)
      }
    }
  },
  actions: {
    [CREATE_PREP]({ commit }, data: ICreatePrep) {
      // TODO: Get damage modifiers better
      const stunDamage = Math.max(Math.floor((data.magician.damageTracks.stun.max - data.magician.damageTracks.stun.current) / data.magician.damageTracks.stun.penaltyDivisor) - data.magician.damageTracks.stun.penaltyModifier, 0)
      const physDamage = Math.max(Math.floor((data.magician.damageTracks.physical.max - data.magician.damageTracks.physical.current) / data.magician.damageTracks.physical.penaltyDivisor) - data.magician.damageTracks.physical.penaltyModifier, 0)
      const diePool = data.magician.skills[ALCHEMY] + data.magician.attributes[MAGIC] + data.bonusDice - stunDamage - physDamage
      const edgePool = data.magician.attributes[EDGE]
      const dieLimit = data.reagentLimit ? data.reagentLimit : data.force
      const drainResistDice = data.magician.drainResist + data.bonusDrainDice
      const oppositionDiePool = data.force

      const message: IMessage = {
        persistent: true,
        message: RollMagicCardComponent
      }

      const preparation: IMagicCreation = {
        name: data.formula.name,
        force: data.force,
        limit: data.preEdgeCreation ? 0 : dieLimit,
        roll: {
          roll: roll(diePool),
          preEdge: data.preEdgeCreation ? roll(edgePool) : [],
          postEdge: [],
          oppositionDiePool,
          opposition: []
        },
        drain: {
          details: [
            { label: 'Force', value: data.force },
            { label: 'Formula', value: data.formula.drain },
            { label: 'Trigger', value: data.trigger.drain },
            { label: 'Other', value: data.drainMod }
          ],
          oppositionDrainMultiplier: 0,
          drainResistDice,
          drainType: DamageTracks.STUN,
          roll: [],
          preEdge: [],
          postEdge: []
        },
        details: {
          durationModifier: data.durationModifier,
          durationMultiplier: data.durationMultiplier,
          formula: data.formula,
          trigger: data.trigger
        },
        createdAction: `${ALCHEMY_MODULE}/${ADD_PREP}`
      }

      commit(MAGIC_CREATION, preparation, { root: true })
      commit(MESSAGE, message, { root: true })
    },
    [ADD_PREP]({ commit }, data: IMagicCreation) {
      const limit: number = data.limit || Number.MAX_VALUE
      const hits: number = data.roll.roll
        .concat(data.roll.preEdge)
        .concat(data.roll.postEdge)
        .filter(r => r > 4).length
      const opp: number = data.roll.opposition.filter(r => r > 4).length
      const net: number = (hits > limit ? hits : limit) - opp
      const potency: number = data.details.durationMultiplier * net + data.details.durationModifier

      const drainAmount: number = data.drain.details
        .map(d => {
          if (typeof(d.value) === 'string')
            d.value = parseInt(d.value, 10)

          return d
        })
        .reduce((total, d) => total + d.value, 0)
      const drainResist: number = data.drain.roll
        .concat(data.drain.preEdge)
        .concat(data.drain.postEdge)
        .filter(d => d > 4).length
      const totalDrain: number = drainAmount - drainResist > 0
        ? drainAmount - drainResist
        : 0

      commit(`${MAGICIAN_MODULE}/${DAMAGE_TRACK_DAMAGE}`, { field: data.drain.drainType, value: totalDrain }, { root: true })

      if (potency > 0) {
        const prep: IPreparation = {
          id: Guid.newGuid(),
          name: data.name,
          force: data.force,
          created: {}, // TODO now
          category: data.details.formula.category,
          formula: data.details.formula,
          trigger: data.details.trigger,
          initialPotency: potency,
          currentPotency: potency,
          durationModifier: data.details.durationModifier,
          durationMultiplier: data.details.durationMultiplier
        }

        commit(ADD_PREP, prep)
        // TODO: Show created preparation
      }
      else {
        // TODO: Show failed to make preparation
      }
    }
  }
}

export default module
