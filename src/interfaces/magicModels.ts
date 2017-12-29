export interface IDamageTrack {
    max: number
    current: number
    penaltyDivisor: number
    penaltyModifier: number
}

export interface ICharacter {
    attributes: {
        [attribute: string]: number
    }
    skills: {
        [skill: string]: number
    }
    damageTracks: {
        [track: string]: IDamageTrack
    }

    drainResist: number
    sustainPenalty: number
}

export interface IMagic {
    name: string
    force: number
    created: Date
}

export interface ISpell extends IMagic {
    sustainPenalty: boolean
}

export interface IPreparation extends IMagic {
    initialPotency: number
    currentPotency: number
}

export interface IRitual extends IMagic {
    durationLength: 'Hour | Day | Week | Month | Year'
    durationInterval: number
}

export interface ISpirit extends IMagic {
    type: 'Fire | Water | Air | Earth | Beast | Man | Task | Guardian | Plant'
    bound: boolean
    services: number
}
