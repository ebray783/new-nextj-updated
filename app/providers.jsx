"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  connectorsForWallets,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWalletConnect } from './hooks/useWalletConnect';

const ANKR_RPC_URL = 'https://rpc.ankr.com/bsc/94d6e3288ef23972866786bac45d4da5296c73fad7336ee164f186c646d25481';

const bsc = {
  id: 56,
  name: 'BNB Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: [ANKR_RPC_URL]
    },
    public: {
      http: [ANKR_RPC_URL]
    }
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
};

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'ff2db6544a529027450c74a34fc4fb74';

const { chains, provider } = configureChains(
  [bsc],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: ANKR_RPC_URL
      })
    })
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains, shimDisconnect: true }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      rainbowWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  provider
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  useWalletConnect();

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          initialChain={bsc}
          showRecentTransactions={true}
          appInfo={{
            appName: 'FPV Token',
            learnMoreUrl: 'https://fpvtoken.com',
          }}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
