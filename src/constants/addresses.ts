import { SupportedChainId } from './chains.ts';

export type AddressMap = { [chainId: number]: `0x${string}` };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {};

export const ALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF43CD517385237fe7A48927073151D12f4eADC53',
};

export const BONALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x834b6cE191BaB7F724983357eCD98EC1929A441a',
};

export const LP_TOKEN_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x13c42Aa47f15778155F5c48885bDdC3E1C72Acd7',
};

export const REWARD_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xb5804aDe81Aa3C3738b0eF2e85a6Ce18898D6171',
};

export const MUON_NODE_STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xd788C2276A6f75a8B9360E9695028329C925b0AB',
};

export const MUON_NODE_MANAGER_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x25B019d98CF6FBcD73C92C468A352449e2BB39C2',
};

export const BOOSTER_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF474C0B12BCf5323Ce032e12D93B57F177fE09BD',
};

export const PANCAKE_PAIR_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xbeb80ffaf22e0e5ac45db8508268e45ff1f1689c',
};
