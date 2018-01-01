import { Module } from 'vuex'

import { IMageState } from './'
import { SpellCategory } from '../interfaces/magicModels'
import { ICombatSpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula, ISpellFormula } from '../interfaces/formulaModels'
import { IPreparation, IPreparationTrigger, ICombatPreparation, PreparationTrigger } from '../interfaces/preparationModels'

import { Guid } from '../services/guidService'
import { roll } from '../services/diceService'

import { ICharacter } from '../interfaces/magicianModels'
import { ALCHEMY } from '../interfaces/skills'
import { MAGIC } from '../interfaces/attributes'

export const CREATE_PREP = 'ADD_PREP'
export const DELETE_PREP = 'DELETE_PREP'
export const USE_PREP = 'USE_PREP'

export const ADD_FORMULA = 'ADD_FORMULA'
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
}

export interface IAlchemyState {
  knownFormula: { [key: string]: ICombatSpellFormula | IDetectionSpellFormula | IHealthSpellFormula | IIllusionSpellFormula | IManipulationSpellFormula }
  knownTriggers: { [key: string]: IPreparationTrigger }
  preparations: { [key: string]: IPreparation }
}

const formula: ICombatSpellFormula = {
    name: 'Punch',
    drain: 0,
    effect: '',
    type: 'PHYSICAL',
    range: 'LOS',
    duration: 'INSTANTANEOUS',
    category: SpellCategory.COMBAT,
    damage: 'PHYSICAL',
    keywords: [ 'DIRECT' ]
}

const prep: ICombatPreparation = {
  name: 'Punch',
  force: 0,
  postEdgeDrainDice: 0,
  drainRecieved: 0,
  created: {
    year: 2075,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    combatTurn: 0
  },
  category: SpellCategory.COMBAT,
  formula,
  trigger: {
    trigger: PreparationTrigger.COMMAND,
    drain: 1,
    effect: ''
  },
  initialPotency: 6,
  currentPotency: 6,
  durationModifier: 0,
  durationMultiplier: 2
}

const module: Module<IAlchemyState, IMageState> = {
  namespaced: true,
  state: {
    knownFormula: {
      asd: formula
    },
    knownTriggers: {},
    preparations: {
      asd: prep
    }
  },
  mutations: {
    // TODO: Figure out proper handling of edge.  Perhaps make it a setting?  Prompt for edge?  Then will need multiple functions one for popups and one without
    [CREATE_PREP](state: IAlchemyState, preparationOptions: ICreatePrep) {
      const diePool = preparationOptions.magician.skills[ALCHEMY] + preparationOptions.magician.attributes[MAGIC] + preparationOptions.bonusDice
      const drainPool = preparationOptions.magician.drainResist
      const drainAmount = preparationOptions.force +  preparationOptions.formula.drain + preparationOptions.trigger.drain
      const dieLimit = preparationOptions.reagentLimit ? preparationOptions.reagentLimit : preparationOptions.force

      const diceResults: number[] = roll(diePool)
      const resistResults: number[] = roll(preparationOptions.force)
      const drainResults: number[] = roll(drainPool)

      const diceHits: number = diceResults.filter(d => d > 4).length
      const actualHits: number = diceHits > dieLimit ? dieLimit : diceHits
      const drainHits = drainResults.filter(d => d > 4).length
      const potency: number = diceResults.filter(d => d > 4).length - resistResults.filter(d => d > 4).length

      const preparation: IPreparation = {
        name: preparationOptions.formula.name,
        force: preparationOptions.force,
        postEdgeDrainDice: drainPool - drainHits,
        drainRecieved: drainAmount > drainHits ? drainAmount - drainHits : 0,
        drainTypeRecieved: actualHits > preparationOptions.magician.attributes[MAGIC] ? 'PHYSICAL' : 'STUN',
        created: {}, // TODO: Time management
        category: preparationOptions.formula.category,
        formula: preparationOptions.formula,
        trigger: preparationOptions.trigger,
        initialPotency: potency,
        currentPotency: potency,
        durationModifier: preparationOptions.magician.alchemy.durationModifier,
        durationMultiplier: preparationOptions.magician.alchemy.durationMultiplier
      }

      // TODO: Message effects
      // TODO: Apply drain

      state.preparations[Guid.newGuid()] = preparation
    },
    CREATE_PREP_PRE(state: IAlchemyState, preparationOptions: ICreatePrep) {
      // TODO
    },
    [DELETE_PREP](state: IAlchemyState, id: string) { delete state.preparations[id] },
    [USE_PREP](state: IAlchemyState, id: string) {
      // TODO: Use prep
      // TODO: Log all dice rolls of prep
      delete state.preparations[id]
    }
  }
}

export default module
