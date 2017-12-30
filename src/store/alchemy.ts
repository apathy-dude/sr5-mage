import { IMageState } from './'
import { Module } from 'vuex'
import { SpellCategory } from '../interfaces/magicModels'
import { ICombatSpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula } from '../interfaces/formulaModels'
import { IPreparation, IPreparationTrigger, ICombatPreparation, PreparationTrigger } from '../interfaces/preparationModels'

export interface IAlchemyState {
  knownPreparations: {
    combat?: ICombatSpellFormula[]
    detection?: IDetectionSpellFormula[]
    health?: IHealthSpellFormula[]
    illusion?: IIllusionSpellFormula[]
    manipulation?: IManipulationSpellFormula[]
  }
  knownTriggers: IPreparationTrigger[]
  preparations: { [key: string]: IPreparation }
}

const prep: ICombatPreparation = {
  name: 'Punch',
  force: 0,
  created: {
    year: 2075,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    combatTurn: 0
  },
  category: SpellCategory.COMBAT,
  formula: {
    name: 'Punch',
    drain: 0,
    effect: '',
    type: 'PHYSICAL',
    range: 'LOS',
    duration: 'INSTANTANEOUS',
    category: SpellCategory.COMBAT,
    damage: 'PHYSICAL',
    keywords: [ 'DIRECT' ]
  },
  trigger: {
    trigger: PreparationTrigger.COMMAND,
    drain: 1,
    effect: ''
  },
  initialPotency: 6,
  currentPotency: 6
}

const module: Module<IAlchemyState, IMageState> = {
  namespaced: true,
  state: {
    knownPreparations: {},
    knownTriggers: [],
    preparations: {
      asd: prep
    }
  }
}

export default module
