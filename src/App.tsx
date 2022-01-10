import React, { useCallback, useMemo } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { ModalStep } from "@gokiprotocol/walletkit/dist/cjs/components/WalletSelectorModal";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import { CollectionProvider } from "contexts/Collection";
import MySteads from "views/MySteads";
import Leaderboard from "views/Leaderboard";
import Rent from "views/Rent";
import { SteadRentProvider } from "contexts/SteadRent";
import constants from "./constants";
import { clusterApiUrl } from "@solana/web3.js";

const WalletProviders: React.FC = ({ children }) => {
  const network = constants.mainnet
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;

  const devnetEnpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = constants.mainnet
    ? "https://connect.runnode.com/?apikey=" +
      process.env.REACT_APP_RUN_NODE_API_KEY
    : devnetEnpoint;
  const toast = useToast();

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
    <WalletKitProvider
      app={{
        name: "The Jungle",
      }}
      initialStep={ModalStep.Select}
      defaultNetwork={network}
      networkConfigs={{
        devnet: { name: "RunNode", endpoint: endpoint },
      }}
      commitment="confirmed"
      onError={(e) => onError(new WalletError(e.message, e))}
    >
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletKitProvider>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ChakraProvider>
      <WalletProviders>
        <CollectionProvider>
          <SteadRentProvider>{children}</SteadRentProvider>
        </CollectionProvider>
      </WalletProviders>
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
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/mysteads" element={<MySteads />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
