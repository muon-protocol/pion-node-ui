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
  [SupportedChainId.BSCTESTNET]: '0xb82ce77FE7BA7253f133B7B6935Df0545e33dBb9',
};

export const REWARD_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x9C033bB4CD12F1378E50ABcdD8FB1fE5923d9557',
};

export const MUON_NODE_STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF7688b8104Dfe59B381963582620Cd2d316bA7a5',
};

export const MUON_NODE_MANAGER_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x8BBBd06c72721fb64554ebdf2FCC8a64653Aa835',
};
