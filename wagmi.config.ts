import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

import ALICE_ABI from './src/abis/ALICE';
import BONALICE_ABI from './src/abis/BonALICE';
import LP_TOKEN_ABI from './src/abis/LPToken';
import REWARD_ABI from './src/abis/Reward';
import MUON_NODE_STAKING from './src/abis/MuonNodeStaking';
import MUON_NODE_MANAGER from './src/abis/MuonNodeManager';
import BOOSTER from './src/abis/Booster';
import PANCAKE_PAIR from './src/abis/PancakePair';

export default defineConfig({
  out: 'src/abis/types/generated.ts',
  contracts: [
    {
      name: 'ALICE',
      abi: ALICE_ABI,
    },
    {
      name: 'BonALICE',
      abi: BONALICE_ABI,
    },
    {
      name: 'LPToken',
      abi: LP_TOKEN_ABI,
    },
    {
      name: 'Reward',
      abi: REWARD_ABI,
    },
    {
      name: 'MuonNodeStaking',
      abi: MUON_NODE_STAKING,
    },
    {
      name: 'MuonNodeManager',
      abi: MUON_NODE_MANAGER,
    },
    {
      name: 'Booster',
      abi: BOOSTER,
    },
    {
      name: 'PancakePair',
      abi: PANCAKE_PAIR,
    },
  ],
  plugins: [react()],
});
