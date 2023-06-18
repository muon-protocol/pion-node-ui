/**
 * List of all the networks supported by the PION Interface
 */
export enum SupportedChainId {
  BSCTESTNET = 97,
  BSCMAINNET = 56,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.BSCMAINNET]: 'bscmainnet',
  [SupportedChainId.BSCTESTNET]: 'bsctestnet',
};

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId,
).filter((id) => typeof id === 'number') as SupportedChainId[];

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
  SupportedChainId.BSCMAINNET,
  SupportedChainId.BSCTESTNET,
];

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [SupportedChainId.BSCTESTNET] as const;

export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number];

export const L2_CHAIN_IDS: readonly SupportedChainId[] = [] as const;

export function isSupportedChain(
  chainId: number | null | undefined,
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}
