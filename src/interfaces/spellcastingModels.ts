import { SpellCategory, IMagic } from "./magicModels"
import { ICombatSpellFormula, ISpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula } from "./formulaModels"

export interface ISpell extends IMagic {
    category: SpellCategory
    formula: ISpellFormula
    sustainPenalty: boolean
}

export interface ICombatSpell extends ISpell {
  category: SpellCategory.COMBAT
  formula: ICombatSpellFormula
}

export interface IDetectionSpell extends ISpell {
  category: SpellCategory.DETECTION
  formula: IDetectionSpellFormula
}

export interface IHealthSpell extends ISpell {
  category: SpellCategory.HEALTH
  formula: IHealthSpellFormula
}

export interface IIllusionSpell extends ISpell {
  category: SpellCategory.ILLUSION
  formula: IIllusionSpellFormula
}

export interface IManipulationSpell extends ISpell {
  category: SpellCategory.MANIPULATION
  formula: IManipulationSpellFormula
}
