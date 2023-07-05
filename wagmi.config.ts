import { defineConfig } from '@wagmi/cli';
import { ALICE_ABI } from './src/abis/ALICE';
import { BONALICE_ABI } from './src/abis/BonALICE';
import { LP_TOKEN_ABI } from './src/abis/LPToken';
import { REWARD_ABI } from './src/abis/Reward';

export default defineConfig({
  out: 'src/abis/generated/index.ts',
  contracts: [
    {
      name: 'ALICE',
      abi: ALICE_ABI,
      address: {
        97: '0xF43CD517385237fe7A48927073151D12f4eADC53',
      },
    },
    {
      name: 'BonALICE',
      abi: BONALICE_ABI,
      address: {
        97: '0x834b6cE191BaB7F724983357eCD98EC1929A441a',
      },
    },
    {
      name: 'LPToken',
      abi: LP_TOKEN_ABI,
      address: {
        97: '0x998977f47C5eb2e8bC696815718B91140E307fC9',
      },
    },
    {
      name: 'Reward',
      abi: REWARD_ABI,
      address: {
        97: '0x50dB73A29349a37b496cA451E8D295Ee6C4265C0',
      },
    },
  ],
  plugins: [],
});
