import { defineConfig, loadEnv } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

import PION_ABI from './src/abis/ALICE';
import BONPION_ABI from './src/abis/BonALICE';
import LP_TOKEN_ABI from './src/abis/LPToken';
import REWARD_ABI from './src/abis/Reward';
import MUON_NODE_STAKING_ABI from './src/abis/MuonNodeStaking';
import MUON_NODE_MANAGER_ABI from './src/abis/MuonNodeManager';
import BOOSTER_ABI from './src/abis/Booster';
import PANCAKE_PAIR_ABI from './src/abis/PancakePair';
import { erc20ABI } from 'wagmi';
import OLD_TOKEN_ABI from './src/abis/PION/OldToken';

import ALICE_ABI from './src/abis/ALICE/ALICE';
import BONALICE_ABI from './src/abis/ALICE/BonALICE';
import ALICE_LP_TOKEN_ABI from './src/abis/ALICE/LPToken';
import ALICE_REWARD_ABI from './src/abis/ALICE/Reward';
import ALICE_MUON_NODE_STAKING_ABI from './src/abis/ALICE/MuonNodeStaking';
import ALICE_MUON_NODE_MANAGER_ABI from './src/abis/ALICE/MuonNodeManager';
import ALICE_BOOSTER_ABI from './src/abis/ALICE/Booster';
import ALICE_PANCAKE_PAIR_ABI from './src/abis/ALICE/PancakePair';
import MIGRRATE_HELPER_ABI from './src/abis/PION/MigrationHelper';

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });
  if (env.VITE_PROJECT_NAME === 'PION') {
    return {
      out: 'src/abis/types/generated.ts',
      contracts: [
        {
          name: 'erc20',
          abi: erc20ABI,
        },
        {
          name: 'Alice',
          abi: PION_ABI,
        },
        {
          name: 'BonALICE',
          abi: BONPION_ABI,
        },
        {
          name: 'LpToken',
          abi: LP_TOKEN_ABI,
        },
        {
          name: 'Reward',
          abi: REWARD_ABI,
        },
        {
          name: 'MuonNodeStaking',
          abi: MUON_NODE_STAKING_ABI,
        },
        {
          name: 'MuonNodeManager',
          abi: MUON_NODE_MANAGER_ABI,
        },
        {
          name: 'Booster',
          abi: BOOSTER_ABI,
        },
        {
          name: 'PancakePair',
          abi: PANCAKE_PAIR_ABI,
        },
      ],
      plugins: [react()],
    };
  } else {
    return {
      out: 'src/abis/types/generated.ts',
      contracts: [
        {
          name: 'OldToken',
          abi: OLD_TOKEN_ABI,
        },
        {
          name: 'Alice',
          abi: ALICE_ABI,
        },
        {
          name: 'BonALICE',
          abi: BONALICE_ABI,
        },
        {
          name: 'LpToken',
          abi: ALICE_LP_TOKEN_ABI,
        },
        {
          name: 'Reward',
          abi: ALICE_REWARD_ABI,
        },
        {
          name: 'MuonNodeStaking',
          abi: ALICE_MUON_NODE_STAKING_ABI,
        },
        {
          name: 'MuonNodeManager',
          abi: ALICE_MUON_NODE_MANAGER_ABI,
        },
        {
          name: 'Booster',
          abi: ALICE_BOOSTER_ABI,
        },
        {
          name: 'PancakePair',
          abi: ALICE_PANCAKE_PAIR_ABI,
        },
        {
          name: 'MigrationHelper',
          abi: MIGRRATE_HELPER_ABI,
        },
      ],
      plugins: [react()],
    };
  }
});
