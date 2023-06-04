import { Plan } from '../types';

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
