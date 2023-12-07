import { defineConfig, loadEnv } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

// PION BSC Mainnet
import PION_MAINNET_TOKEN_ABI from './src/abis/PION/Mainnet/Token';
import PION_MAINNET_NFT_ABI from './src/abis/PION/Mainnet/NFT';
import PION_MAINNET_LP_TOKEN_ABI from './src/abis/PION/Mainnet/LPToken';
import PION_MAINNET_MUON_REWARD_MANAGER_ABI from './src/abis/PION/Mainnet/Reward';
import PION_MAINNET_MUON_NODE_STAKING_ABI from './src/abis/PION/Mainnet/MuonNodeStaking';
import PION_MAINNET_MUON_NODE_MANAGER_ABI from './src/abis/PION/Mainnet/MuonNodeManager';
import PION_MAINNET_BOOSTER_ABI from './src/abis/PION/Mainnet/Booster';
import PION_MAINNET_PANCAKE_PAIR_ABI from './src/abis/PION/Mainnet/PancakePair';
import { erc20ABI } from 'wagmi';

// ALICE BSC Testnet
import ALICE_TESTNET_TOKEN_ABI from './src/abis/ALICE/BSCTestnet/ALICE';
import ALICE_TESTNET_NFT_ABI from './src/abis/ALICE/BSCTestnet/BonALICE';
import ALICE_TESTNET_LP_TOKEN_ABI from './src/abis/ALICE/BSCTestnet/LPToken';
import ALICE_TESTNET_MUON_REWARD_MANAGER_ABI from './src/abis/ALICE/BSCTestnet/Reward';
import ALICE_TESTNET_MUON_NODE_STAKING_ABI from './src/abis/ALICE/BSCTestnet/MuonNodeStaking';
import ALICE_TESTNET_MUON_NODE_MANAGER_ABI from './src/abis/ALICE/BSCTestnet/MuonNodeManager';
import ALICE_TESTNET_BOOSTER_ABI from './src/abis/ALICE/BSCTestnet/Booster';
import ALICE_TESTNET_PANCAKE_PAIR_ABI from './src/abis/ALICE/BSCTestnet/PancakePair';

// PION BSC Testnet
import PION_TESTNET_TOKEN_ABI from './src/abis/PION/BSCTestnet/Token';
import PION_TESTNET_NFT_ABI from './src/abis/PION/BSCTestnet/NFT';
import PION_TESTNET_MUON_NODE_MANAGER_ABI from './src/abis/PION/BSCTestnet/MuonNodeManager';
import PION_TESTNET_MUON_NODE_STAKING_ABI from './src/abis/PION/BSCTestnet/MuonNodeStaking';
import PION_TESTNET_MUON_REWARD_MANAGER_ABI from './src/abis/PION/BSCTestnet/MuonRewardManager';
import PION_TESTNET_OLD_TOKEN_ABI from './src/abis/PION/BSCTestnet/OldToken';
import PION_TESTNET_MIGRRATE_HELPER_ABI from './src/abis/PION/BSCTestnet/MigrationHelper';

// PION BSC Mainnet
import PION_BSCMAINNET_TOKEN_ABI from './src/abis/PION/BSCMainnet/Token';
import PION_BSCMAINNET_NFT_ABI from './src/abis/PION/BSCMainnet/NFT';
import PION_BSCMAINNET_MUON_NODE_MANAGER_ABI from './src/abis/PION/BSCMainnet/MuonNodeManager';
import PION_BSCMAINNET_MUON_NODE_STAKING_ABI from './src/abis/PION/BSCMainnet/MuonNodeStaking';
import PION_BSCMAINNET_MUON_REWARD_MANAGER_ABI from './src/abis/PION/BSCMainnet/MuonRewardManager';
import PION_BSCMAINNET_BOOSTER_ABI from './src/abis/PION/BSCMainnet/Booster';

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  if (env.VITE_PROJECT_NAME === 'PION') {
    if (env.VITE_APP_CHAIN_ID === '1') {
      return {
        out: 'src/abis/types/generated.ts',
        contracts: [
          {
            name: 'erc20',
            abi: erc20ABI,
          },
          {
            name: 'Alice',
            abi: PION_MAINNET_TOKEN_ABI,
          },
          {
            name: 'BonALICE',
            abi: PION_MAINNET_NFT_ABI,
          },
          {
            name: 'LpToken',
            abi: PION_MAINNET_LP_TOKEN_ABI,
          },
          {
            name: 'Reward',
            abi: PION_MAINNET_MUON_REWARD_MANAGER_ABI,
          },
          {
            name: 'MuonNodeStaking',
            abi: PION_MAINNET_MUON_NODE_STAKING_ABI,
          },
          {
            name: 'MuonNodeManager',
            abi: PION_MAINNET_MUON_NODE_MANAGER_ABI,
          },
          {
            name: 'Booster',
            abi: PION_MAINNET_BOOSTER_ABI,
          },
          {
            name: 'PancakePair',
            abi: PION_MAINNET_PANCAKE_PAIR_ABI,
          },
        ],
        plugins: [react()],
      };
    } else if (env.VITE_APP_CHAIN_ID === '56') {
      return {
        out: 'src/abis/types/generated.ts',
        contracts: [
          {
            name: 'Alice',
            abi: PION_BSCMAINNET_TOKEN_ABI,
          },
          {
            name: 'BonALICE',
            abi: PION_BSCMAINNET_NFT_ABI,
          },
          {
            name: 'Reward',
            abi: PION_BSCMAINNET_MUON_REWARD_MANAGER_ABI,
          },
          {
            name: 'LpToken',
            abi: PION_MAINNET_LP_TOKEN_ABI,
          },
          {
            name: 'MuonNodeStaking',
            abi: PION_BSCMAINNET_MUON_NODE_STAKING_ABI,
          },
          {
            name: 'MuonNodeManager',
            abi: PION_BSCMAINNET_MUON_NODE_MANAGER_ABI,
          },
          {
            name: 'Booster',
            abi: PION_BSCMAINNET_BOOSTER_ABI,
          },
        ],
        plugins: [react()],
      };
    } else {
      // env.VITE_APP_CHAIN_ID === '97'
      return {
        out: 'src/abis/types/generated.ts',
        contracts: [
          {
            name: 'OldToken',
            abi: PION_TESTNET_OLD_TOKEN_ABI,
          },
          {
            name: 'erc20',
            abi: erc20ABI,
          },
          {
            name: 'Alice',
            abi: PION_TESTNET_TOKEN_ABI,
          },
          {
            name: 'BonALICE',
            abi: PION_TESTNET_NFT_ABI,
          },
          {
            name: 'LpToken',
            abi: PION_MAINNET_LP_TOKEN_ABI,
          },
          {
            name: 'Reward',
            abi: PION_TESTNET_MUON_REWARD_MANAGER_ABI,
          },
          {
            name: 'MuonNodeStaking',
            abi: PION_TESTNET_MUON_NODE_STAKING_ABI,
          },
          {
            name: 'MuonNodeManager',
            abi: PION_TESTNET_MUON_NODE_MANAGER_ABI,
          },
          {
            name: 'Booster',
            abi: PION_MAINNET_BOOSTER_ABI,
          },
          {
            name: 'PancakePair',
            abi: PION_MAINNET_PANCAKE_PAIR_ABI,
          },
          {
            name: 'MigrationHelper',
            abi: PION_TESTNET_MIGRRATE_HELPER_ABI,
          },
        ],
        plugins: [react()],
      };
    }
  } else {
    return {
      out: 'src/abis/types/generated.ts',
      contracts: [
        {
          name: 'Alice',
          abi: ALICE_TESTNET_TOKEN_ABI,
        },
        {
          name: 'BonALICE',
          abi: ALICE_TESTNET_NFT_ABI,
        },
        {
          name: 'LpToken',
          abi: ALICE_TESTNET_LP_TOKEN_ABI,
        },
        {
          name: 'Reward',
          abi: ALICE_TESTNET_MUON_REWARD_MANAGER_ABI,
        },
        {
          name: 'MuonNodeStaking',
          abi: ALICE_TESTNET_MUON_NODE_STAKING_ABI,
        },
        {
          name: 'MuonNodeManager',
          abi: ALICE_TESTNET_MUON_NODE_MANAGER_ABI,
        },
        {
          name: 'Booster',
          abi: ALICE_TESTNET_BOOSTER_ABI,
        },
        {
          name: 'PancakePair',
          abi: ALICE_TESTNET_PANCAKE_PAIR_ABI,
        },
      ],
      plugins: [react()],
    };
  }
});
