"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Use environment variables
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const ANKR_RPC_URL = 'https://rpc.ankr.com/bsc/94d6e3288ef23972866786bac45d4da5296c73fad7336ee164f186c646d25481';

// Configure BSC with Ankr RPC
const bscWithAnkr = {
  ...bsc,
  rpcUrls: {
    default: {
      http: [ANKR_RPC_URL],
    },
    public: {
      http: [ANKR_RPC_URL],
    },
  },
};

const { chains, publicClient } = configureChains(
  [bscWithAnkr], // Only use BSC
  [
    jsonRpcProvider({
      rpc: () => ({
        http: ANKR_RPC_URL
      })
    })
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'FPV Token',
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          initialChain={bsc}
          appInfo={{
            appName: 'FPV Token',
            learnMoreUrl: 'https://fpvtoken.com',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}