import { PreparationTrigger, IPreparationTrigger } from '../interfaces/preparationModels'

export const command: IPreparationTrigger = {
  trigger: PreparationTrigger.COMMAND,
  drain: 2,
  effect: ''
}

export const time: IPreparationTrigger = {
  trigger: PreparationTrigger.TIME,
  drain: 2,
  effect: ''
}

export const contact: IPreparationTrigger = {
  trigger: PreparationTrigger.CONTACT,
  drain: 1,
  effect: ''
}
