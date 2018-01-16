import { IRitualFormula, ISpellFormula } from './formulaModels'
import { ITime } from './timeModels'
import { DamageTracks, PHYSICAL, STUN } from './damageTracks'

export interface IMagic {
    id: string
    name: string
    force: number
    created: ITime
}

export interface IMagicCreation {
    name: string
    force: number
    limit: number
    roll: {
        roll: number[]
        preEdge: number[]
        postEdge: number[]
        oppositionDiePool: number
        opposition: number[]
    }
    drain: {
        details: Array<{ label: string, value: number }>
        oppositionDrainMultiplier: number
        drainResistDice: number
        drainType: DamageTracks,
        roll: number[]
        preEdge: number[]
        postEdge: number[]
    }
    details: any
    createdAction: string
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
