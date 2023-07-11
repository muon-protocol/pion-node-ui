import { W3bNumber } from './wagmi.ts';

export type Plan = {
  id: number;
  title: string;
  requiredNodePower: string;
  verificationMethods: string;
  APR: string;
  profitability: string;
  backgroundColor: string;
  shadowColor: string;
};

export enum ActionType {
  CREATE = 'Create',
  UPGRADE = 'Upgrade',
  MERGE = 'Merge',
  SPLIT = 'Split',
  TRANSFER = 'Transfer',
}

export type SidebarItem = {
  id: number;
  title: string;
  icon: string;
  hoverIcon: string;
  link: ActionType;
};

export type UserWallet = {
  id: number;
  title: string;
  address: string;
  balance: string;
  verified: boolean;
};

export type RawRewards = {
  alice_operator: RawRewardSection;
  deus_presale: RawRewardSection;
  early_alice_operator: RawRewardSection;
  muon_presale: RawRewardSection;
  alice_operator_bounce: RawRewardSection;
};

export type Contributor = {
  contributor: string;
  reward: number;
  message: string;
};

export type RawRewardSection = {
  contributors: Contributor[];
  reward: number;
};

export type RewardWallet = {
  walletAddress: string;
  signature: string | null;
  wasInMuonPresale: boolean;
  wasInDeusPresale: boolean;
  wasAliceOperator: boolean;
  wasAliceOperatorEarly: boolean;
};

export enum NotificationSources {
  ALLOWANCE = 'allowance',
  MINT_AND_LOCK = 'mint_and_lock',
}

export type Notification = {
  id: string;
  source: NotificationSources;
  hash: `0x${string}` | null;
  type: NotificationType;
  status: NotificationStatuses;
  message: string;
};

export enum NotificationStatuses {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
}

export enum NotificationType {
  PROMISE = 'promise',
  PENDING = 'pending',
  TIMEOUT = 'timeout',
}

export type RawBonALICE = {
  __typename?: 'AccountTokenId';
  account: any;
  latestTimestamp: any;
  tokenId: any;
};

export type BonALICE = {
  __typename?: 'AccountTokenId';
  account: any;
  latestTimestamp: any;
  tokenId: any;
  ALICELockAmount: W3bNumber;
  LPTokenLockAmount: W3bNumber;
  nodePower: number;
};

export type WalletWithSignature = {
  walletAddress: `0x${string}`;
  signature: string | null;
};

export type StateMessages = {
  pending: string;
  success: string;
  failed: string;
};
