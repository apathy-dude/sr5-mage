export function roll(numDice: number): number[] {
  if (isNaN(numDice)) {
    console.error('Number of dice for a roll is NaN')
    return []
  }

  if (typeof(numDice) === 'number' && numDice < 1)
    return []

  numDice = numDice || 1

  return new Array<number>(numDice)
    .fill(0)
    .map(() => Math.floor(Math.random() * 6 + 1))
}
