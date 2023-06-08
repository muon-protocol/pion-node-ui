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
