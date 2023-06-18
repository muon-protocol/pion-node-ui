import { SupportedChainId } from './chains.ts';

export type AddressMap = { [chainId: number]: string };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {};

export const PION_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x0807653124F773dF22C5365ce86e2c7CE12B8e85',
};

export const BON_PION_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x290892A4511F7652e972C506E1B0b4ac3B141737',
};
