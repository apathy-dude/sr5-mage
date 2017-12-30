import { IMagic, SpellCategory } from './magicModels'
import { ISpellFormula, ICombatSpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula } from './formulaModels'

export enum PreparationTrigger {
    COMMAND = 'COMMAND',
    CONTACT = 'CONTACT',
    TIME = 'TIME'
}

export interface IPreparationTrigger {
    trigger: PreparationTrigger,
    drain: number
    effect: string
}

export interface IPreparation extends IMagic {
    category: SpellCategory
    formula: ISpellFormula
    trigger: IPreparationTrigger
    initialPotency: number
    currentPotency: number
}

export interface ICombatPreparation extends IPreparation {
    category: SpellCategory.COMBAT
    formula: ICombatSpellFormula
}

export interface IDetectionPreparation extends IPreparation {
    category: SpellCategory.DETECTION
    formula: IDetectionSpellFormula
}

export interface IHealthPreparation extends IPreparation {
    category: SpellCategory.HEALTH
    formula: IHealthSpellFormula
}

export interface IIllusionPreparation extends IPreparation {
    category: SpellCategory.ILLUSION
    formula: IIllusionSpellFormula
}

export interface IManipulationPreparation extends IPreparation {
    category: SpellCategory.MANIPULATION
    formula: IManipulationSpellFormula
}
