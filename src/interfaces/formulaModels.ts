import { SpellCategory } from "./magicModels"

export interface IFormula {
    name: string
    drain: number
    effect: string
}

export interface ISpellFormula extends IFormula {
    type: 'PHYSICAL' | 'MANA'
    range: 'TOUCH' | 'LOS' | 'LOS (A)'
    duration: 'INSTANTANEOUS' | 'SUSTAINED' | 'PERMANANT'
}

export interface ICombatSpellFormula extends ISpellFormula {
    category: SpellCategory.COMBAT
    damage: 'STUN' | 'PHYSICAL'
    keywords: Array<'DIRECT' | 'INDIRECT' | 'ELEMENTAL'>
}

export interface IDetectionSpellFormula extends ISpellFormula {
    category: SpellCategory.DETECTION
    keywords: Array<'ACTIVE' | 'PASSIVE' | 'DIRECTIONAL' | 'PSYCHIC' | 'AREA' | 'EXTENDED_AREA'>
}

export interface IHealthSpellFormula extends ISpellFormula {
    category: SpellCategory.HEALTH
    kewords: Array<'ESSENCE'>
}

export interface IIllusionSpellFormula extends ISpellFormula {
    category: SpellCategory.ILLUSION
    keywords: Array<'OBVIOUS' | 'REALISTIC' | 'SINGLE_SENSE' | 'MULTI_SENSE'>
}

export interface IManipulationSpellFormula extends ISpellFormula {
    category: SpellCategory.MANIPULATION
    keywords: Array<'DAMAGING' | 'MENTAL' | 'ENVIRONMENTAL' | 'PHYSICAL' | 'AREA'>
}

export interface IRitualFormula extends IFormula {
    keywords: Array<'ANCHORED' | 'MATERIAL' | 'MINION' | 'SPELL' | 'SPOTTER'>
}