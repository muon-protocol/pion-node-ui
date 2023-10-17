import { SupportedChainId } from './chains.ts';

export type AddressMap = { [chainId: number]: `0x${string}` };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {};

export const ALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF43CD517385237fe7A48927073151D12f4eADC53',
  [SupportedChainId.MAINNET]: '0xF81dF93aB37D5b1396139F294418B2741143b280',
};

export const BONALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x834b6cE191BaB7F724983357eCD98EC1929A441a',
  [SupportedChainId.MAINNET]: '0x3EB5c60EC8b1D90321f280Ade4697cD31C3eE47E',
};

export const LP_TOKEN_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x13c42Aa47f15778155F5c48885bDdC3E1C72Acd7',
  // [SupportedChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [SupportedChainId.MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
};

export const REWARD_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xb5804aDe81Aa3C3738b0eF2e85a6Ce18898D6171',
  [SupportedChainId.MAINNET]: '0x2AcAe0C3098Ae2254D56a25A0cCD720956762F17',
};

export const MUON_NODE_STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xd788C2276A6f75a8B9360E9695028329C925b0AB',
  [SupportedChainId.MAINNET]: '0x349a34804F8740c3202baDdeC0216c66A40c02e5',
};

export const MUON_NODE_MANAGER_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x25B019d98CF6FBcD73C92C468A352449e2BB39C2',
  [SupportedChainId.MAINNET]: '0xD884634095AB3058264eE3143078F27D8fD78b9F',
};

export const BOOSTER_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF474C0B12BCf5323Ce032e12D93B57F177fE09BD',
  [SupportedChainId.MAINNET]: '0x4BC5D819715e7242a6a58a4903bc5a83CF66f9D8',
};

export const PANCAKE_PAIR_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xbeb80ffaf22e0e5ac45db8508268e45ff1f1689c',
};
