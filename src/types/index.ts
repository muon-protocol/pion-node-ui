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

export type BonPION = {
  id: number;
  title: string;
  nodePower: string;
  tier: string;
};

export type UserWallet = {
  id: number;
  title: string;
  address: string;
  balance: string;
  verified: boolean;
};
