export function fromCamel(label: string): string {
  return label
    .substring(1)
    .split('')
    .map(a => a.match(/[A-Z]/) ? ' ' + a : a)
    .reduce((rLabel, a) => rLabel + a, label.charAt(0).toUpperCase())
}

export function fromCaps(label: string): string {
  return label.substring(1)
    .split('')
    .map(a => a.match(/_/) ? ' ' + a : a)
    .reduce((rLabel, a) => rLabel + (rLabel.endsWith(' ') ? a : a.toLowerCase()), label.charAt(0))
}
