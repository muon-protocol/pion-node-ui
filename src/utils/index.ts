export function calculateRoundAmount(
  num1: number,
  percentage: number,
  round: number,
) {
  return Math.round(((num1 * percentage) / 100) * 10 ** round) / 10 ** round;
}
