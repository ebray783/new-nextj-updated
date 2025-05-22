'use client';

import { useEffect } from 'react';
import { useConnect, useNetwork, useSwitchNetwork } from 'wagmi';

export function useWalletConnect() {
  const { connect, connectors } = useConnect({
    onSuccess(data) {
      // Handle successful connection
      console.log('Connected successfully', data);
    },
    onError(error) {
      console.error('Connection error:', error);
    },
  });
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      console.log('Switched network successfully', data);
    },
    onError(error) {
      console.error('Network switch error:', error);
    },
  });

  useEffect(() => {
    let mounted = true;

    const connectWallet = async () => {
      if (!mounted) return;

      const savedConnector = localStorage.getItem('wagmi.connector');
      if (!savedConnector) return;

      const connector = connectors.find(c => c.id === savedConnector);
      if (!connector) return;

      try {
        // Attempt to connect
        await connect({ connector });

        // Only proceed if component is still mounted
        if (!mounted) return;

        // Switch to BSC if on a different network
        if (chain?.id !== 56 && switchNetwork) {
          try {
            await switchNetwork(56);
          } catch (switchError) {
            console.warn('Network switch error:', switchError);
          }
        }
      } catch (error) {
        if (!mounted) return;

        console.warn('Wallet connection error:', error);
        
        // Clear saved connector if we get RPC errors
        if (
          error.toString().includes('Missing or invalid parameters') ||
          error.toString().includes('User rejected the request')
        ) {
          localStorage.removeItem('wagmi.connector');
        }
      }
    };

    connectWallet();

    // Cleanup function to prevent state updates after unmount
    return () => {
      mounted = false;
    };
  }, [connect, connectors, chain, switchNetwork]);
}
