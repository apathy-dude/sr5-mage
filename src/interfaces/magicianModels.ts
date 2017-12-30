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

    alchemy: {
        durationMultiplier: number
        durationModifier: number
    }

    conjuring: {
        spiritIndex: number
    }

    spellcasting: {
        sustainPenalty: number
    }
}
