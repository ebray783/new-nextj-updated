'use client';

import { useEffect } from 'react';
import { useConnect } from 'wagmi';

export function useWalletConnect() {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const savedConnector = localStorage.getItem('wagmi.connector');
    if (savedConnector) {
      const connector = connectors.find(c => c.id === savedConnector);
      if (connector) {
        connect({ connector });
      }
    }
  }, [connect, connectors]);
}
