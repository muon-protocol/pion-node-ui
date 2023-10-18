import { ethers } from 'ethers';
import { W3bNumber } from '../types/wagmi.ts';

export function weiToEther(wei: string): string {
  return ethers.formatEther(wei);
}

export function w3bNumberFromBigint(bigint: bigint, decimals = 18): W3bNumber {
  return {
    hStr: ethers.formatEther(bigint * BigInt(10 ** 18 / 10 ** decimals)),
    dsp:
      Math.floor(
        Number(ethers.formatEther(bigint * BigInt(10 ** 18 / 10 ** decimals))) *
          100,
      ) / 100,
    big: bigint,
    bigStr: bigint.toString(),
  };
}

export function w3bNumberFromString(amount: string, decimals = 18): W3bNumber {
  if (!amount)
    return { dsp: 0, hStr: '', big: BigInt(0), bigStr: BigInt(0).toString() };

  const inputAsWei = ethers.parseUnits(amount, decimals);
  const inputAsBigInt = BigInt(inputAsWei.toString());
  const inputAsString = amount;
  const inputAsNumber = Math.floor(parseFloat(amount));

  return {
    dsp: inputAsNumber,
    hStr: inputAsString,
    big: inputAsBigInt,
    bigStr: inputAsBigInt.toString(),
  };
}

export function w3bNumberFromNumber(amount: number, decimals = 18): W3bNumber {
  const inputAsWei = ethers.parseUnits(amount.toString(), decimals);
  const inputAsBigInt = BigInt(inputAsWei.toString());
  const inputAsString = amount.toString();
  const inputAsNumber = parseFloat(parseFloat(amount.toString()).toFixed(2));

  return {
    dsp: inputAsNumber,
    hStr: inputAsString,
    big: inputAsBigInt,
    bigStr: inputAsBigInt.toString(),
  };
}

export function formatWalletAddress(
  walletAddress: string | `0x${string}` | null | undefined,
): string {
  if (!walletAddress) return '';
  return `${walletAddress.slice(0, 4)}...${walletAddress.slice(
    walletAddress.length - 4,
    walletAddress.length,
  )}`;
}
