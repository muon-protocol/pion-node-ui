import { Plan, SidebarItem } from '../types';

export const plans: Plan[] = [
  {
    id: 1,
    title: 'Pion Starter',
    requiredNodePower: '500 - 1000',
    verificationMethods: '6 methods',
    APR: '10% - 15%',
    profitability: '200 - 250 days',
    backgroundColor: '#F58E8E80',
    shadowColor: 'text-[#F58E8E59]',
  },
  {
    id: 2,
    title: 'Pion Pro',
    requiredNodePower: '1000 - 5000',
    verificationMethods: 'Aura Bronze',
    APR: '20% - 30%',
    profitability: '100 - 180 days',
    backgroundColor: '#F3C95D80',
    shadowColor: 'text-[#F3C95D59]',
  },
  {
    id: 3,
    title: 'Pion Master',
    requiredNodePower: '+5000',
    verificationMethods: 'Aura Silver',
    APR: '35% - 50%',
    profitability: '50 - 80 days',
    backgroundColor: '#918EF580',
    shadowColor: 'text-[#918EF559]',
  },
];

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    title: 'Create',
    icon: '/assets/images/actions/create-icon.svg',
    hoverIcon: '/assets/images/actions/create-hover-icon.svg',
    link: '/create',
  },
  {
    id: 2,
    title: 'Upgrade',
    icon: '/assets/images/actions/upgrade-icon.svg',
    hoverIcon: '/assets/images/actions/upgrade-hover-icon.svg',
    link: '/upgrade',
  },
  {
    id: 3,
    title: 'Merge',
    icon: '/assets/images/actions/merge-icon.svg',
    hoverIcon: '/assets/images/actions/merge-hover-icon.svg',
    link: '/merge',
  },
  {
    id: 4,
    title: 'Split',
    icon: '/assets/images/actions/split-icon.svg',
    hoverIcon: '/assets/images/actions/split-hover-icon.svg',
    link: '/split',
  },
  {
    id: 5,
    title: 'Transfer',
    icon: '/assets/images/actions/transfer-icon.svg',
    hoverIcon: '/assets/images/actions/transfer-hover-icon.svg',
    link: '/transfer',
  },
];
