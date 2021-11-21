import React, { useCallback, useMemo } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import { CollectionProvider } from "contexts/Collection";
import MySteads from "views/MySteads";

const Providers: React.FC = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const toast = useToast();

  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  const onError = useCallback(
    (error: WalletError) =>
      toast({
        title: "Error",
        description: error.message
          ? `${error.name}: ${error.message}`
          : error.name,
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    [toast]
  );

  return (
    <ChakraProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} onError={onError}>
          <WalletModalProvider>
            <CollectionProvider>{children}</CollectionProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
};

function App() {
  return (
    <Providers>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mysteads" element={<MySteads />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;