"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Use environment variables
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { chains, publicClient } = configureChains(
  [mainnet, bsc],
  [publicProvider()]
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