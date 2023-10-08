export function calculateRoundAmount(
  num1: number,
  percentage: number,
  round: number,
) {
  return Math.floor(((num1 * percentage) / 100) * 10 ** round) / 10 ** round;
}

export function getTier(nodePower: number) {
  if (nodePower < 500) {
    return '-';
  } else if (nodePower < 5000) {
    return 'Tier 1';
  } else if (nodePower < 25000) {
    return 'Tier 2';
  } else if (nodePower < 50000) {
    return 'Tier 3';
  } else {
    return 'POA';
  }
}
