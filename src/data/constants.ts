import { ActionType, Plan, SidebarItem, Step, UserWallet } from '../types';

export const plans: Plan[] = [
  {
    id: 1,
    title: 'Tier 1',
    requiredNodePower: '500 - 5K',
    verificationMethods: 'Beginner Verification',
    APR: '10% - 15%',
    minNodePower: '500 PION',
    maxNodePower: '5K PION',
    profitability: '200 - 250 days',
    backgroundColor: '#F58E8E80',
    shadowColor: 'text-[#ed8080]',
    verificationLink:
      'https://docs.muon.net/muon-network/muon-nodes/pion/uniqueness-verification/tier-1',
  },
  {
    id: 2,
    title: 'Tier 2',
    requiredNodePower: '5K - 25K',
    minNodePower: null,
    maxNodePower: '25K PION',
    verificationMethods: 'Aura Bronze',
    APR: '20% - 30%',
    profitability: '100 - 180 days',
    backgroundColor: '#F3C95D80',
    shadowColor: 'text-[#e6bf5a]',
    verificationLink:
      'https://docs.muon.net/muon-network/muon-nodes/pion/uniqueness-verification/tier-2',
  },
  {
    id: 3,
    title: 'Tier 3',
    requiredNodePower: '25K - 50K',
    minNodePower: null,
    maxNodePower: '50K PION',
    verificationMethods: 'Aura Silver',
    APR: '35% - 50%',
    profitability: '50 - 80 days',
    backgroundColor: '#918EF5',
    shadowColor: 'text-[#8c8aed]',
    verificationLink:
      'https://docs.muon.net/muon-network/muon-nodes/pion/uniqueness-verification/tier-3',
  },
  {
    id: 4,
    title: 'Proof of Authority (PoA)',
    requiredNodePower: 'unlimited',
    minNodePower: null,
    maxNodePower: 'Unlimited',
    verificationMethods: 'Aura Silver',
    APR: '35% - 50%',
    profitability: '50 - 80 days',
    backgroundColor: '#918EF580',
    shadowColor: 'text-[#8c8aed]',
    verificationLink:
      'https://docs.muon.net/muon-network/muon-nodes/pion/uniqueness-verification/pion-poa-network',
  },
];

export const steps: Step[] = [
  {
    id: 1,
    title: 'Buy $PION',
    description:
      'First you need to buy PION to create your bonPION NFT, minimum amount for starting is 1000 PION',
    buttonText: 'Buy PION',
    buttonLink:
      'https://app.uniswap.org/swap?theme=dark&exactField=input&exactAmount=10&inputCurrency=ETH&outputCurrency=0xf81df93ab37d5b1396139f294418b2741143b280',
    buttonLinkTarget: '_blank',
    buttonDisabled: true,
  },
  {
    id: 2,
    title: 'Create bonPION',
    description: 'Lock your PION into bonPION and gain node power',
    buttonText: 'Create bonded PION',
    buttonLink: '/bonPION/create',
    buttonLinkTarget: '_self',
    buttonDisabled: false,
  },
  {
    id: 3,
    title: 'Setup Node',
    description:
      'When you have your bonPION ready, it’s time to setup your node and start earning',
    buttonText: 'Setup Node',
    buttonLink: '/setup-node',
    buttonLinkTarget: '_self',
    buttonDisabled: false,
  },
];

export const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    title: 'View',
    icon: '/assets/images/actions/view-icon.svg',
    hoverIcon: '/assets/images/actions/view-colored-icon.svg',
    link: ActionType.VIEW,
    grayIcon: '/assets/images/actions/view-gray-icon.svg',
    disabled: false,
  },
  {
    id: 1,
    title: 'Create',
    icon: '/assets/images/actions/create-icon.svg',
    hoverIcon: '/assets/images/actions/create-colored-icon.svg',
    link: ActionType.CREATE,
    grayIcon: '/assets/images/actions/create-gray-icon.svg',
    disabled: false,
  },
  {
    id: 2,
    title: 'Increase',
    icon: '/assets/images/actions/upgrade-icon.svg',
    hoverIcon: '/assets/images/actions/upgrade-colored-icon.svg',
    link: ActionType.UPGRADE,
    grayIcon: '/assets/images/actions/upgrade-gray-icon.svg',
    disabled: false,
  },
  {
    id: 3,
    title: 'Merge',
    icon: '/assets/images/actions/merge-icon.svg',
    hoverIcon: '/assets/images/actions/merge-colored-icon.svg',
    link: ActionType.MERGE,
    grayIcon: '/assets/images/actions/merge-gray-icon.svg',
    disabled: false,
  },
  {
    id: 4,
    title: 'Split',
    icon: '/assets/images/actions/split-icon.svg',
    hoverIcon: '/assets/images/actions/split-colored-icon.svg',
    link: ActionType.SPLIT,
    grayIcon: '/assets/images/actions/split-gray-icon.svg',
    disabled: true,
  },
  {
    id: 5,
    title: 'Transfer',
    icon: '/assets/images/actions/transfer-icon.svg',
    hoverIcon: '/assets/images/actions/transfer-colored-icon.svg',
    link: ActionType.TRANSFER,
    grayIcon: '/assets/images/actions/transfer-gray-icon.svg',
    disabled: true,
  },
];

export const userWallets: UserWallet[] = [
  {
    id: 1,
    title: 'Deus Presale',
    address: '0x1234567890123456789012345678901234567890',
    balance: '+600 PION',
    verified: true,
  },
  {
    id: 2,
    title: 'Muon Presale',
    address: '0x1234567890123456789012345678901234567890',
    balance: '+400 PION',
    verified: false,
  },
  {
    id: 3,
    title: 'PION Operator',
    address: '0x1234567890123456789012345678901234567890',
    balance: '+200 PION',
    verified: false,
  },
];
