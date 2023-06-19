import { ethers } from 'ethers';

export function weiToEther(wei: string): string {
  return ethers.utils.formatEther(wei);
}
