export function addressToShort(address) {
  const firstSTR = address.slice(0, 4);
  const lastSTR = address.slice(-4);
  return `${firstSTR}...${lastSTR}`;
}
