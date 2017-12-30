import { IRitualFormula } from './formulaModels'
import { ITime } from './timeModels'

export interface IMagic {
    name: string
    force: number
    created: ITime
}

export enum SpellCategory {
    COMBAT = 'COMBAT',
    DETECTION = 'DETECTION',
    HEALTH = 'HEALTH',
    ILLUSION = 'ILLUSION',
    MANIPULATION = 'MANIPULATION'
}

export interface IRitual extends IMagic {
    formla: IRitualFormula
    durationLength: 'Hour | Day | Week | Month | Year'
    durationInterval: number
}

export interface ISpirit extends IMagic {
    type: 'Fire | Water | Air | Earth | Beast | Man | Task | Guardian | Plant'
    bound: boolean
    services: number
}
