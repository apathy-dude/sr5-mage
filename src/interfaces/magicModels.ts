import { IRitualFormula } from './formulaModels'
import { ITime } from './timeModels'

export interface IMagic {
    name: string
    force: number
    reagentLimit?: number // TODO: Concider moving to Magic this can affect
    postEdgeDrainDice: number // Hack to allow for post edge drain
    drainRecieved: number // Hack to limit amount of drain healed when post edging.  Probably make a button on a message only while last in mesage queue
    drainTypeRecieved: 'PHYSICAL' | 'STUN'
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
