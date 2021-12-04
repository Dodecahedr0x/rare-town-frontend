import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import mainnetMetadata from "./all_metadata.json"
import devnetMetadata from "./devnet_metadata.json"

const MAINNET = false;

export const COLLECTION_CLAIM_DELAY = new anchor.BN(86400);

const devnetConstants = {
  network: WalletAdapterNetwork.Devnet,
  wrappedSol: new anchor.web3.PublicKey(
    "So11111111111111111111111111111111111111112"
  ),
  collection: new anchor.web3.PublicKey(
    "E2NETGR9NzqpgUFo1QYdm7BcFMwhydNnQBtUH1Cf8jxV"
  ),
  solsteadsCollection: new anchor.web3.PublicKey(
    "FKDLPYBrXu7dwBk5QEAuvc2xhTkeG1xYdDfcK29UbhB2"
  ),
  steadRent: new anchor.web3.PublicKey(
    "TrXDop6spRAwHDsSpvY51PxHkvZXKGNYC6bygXZLNC2"
  ),
  metadata: devnetMetadata
};

const mainnetConstants = {
  network: WalletAdapterNetwork.Mainnet,
  wrappedSol: new anchor.web3.PublicKey(
    "So11111111111111111111111111111111111111112"
  ),
  collection: new anchor.web3.PublicKey(
    "E2NETGR9NzqpgUFo1QYdm7BcFMwhydNnQBtUH1Cf8jxV"
  ),
  solsteadsCollection: new anchor.web3.PublicKey(
    "8Adt6ry4BPgK2c8WkVtcdZemwtABZNPThaLZ97wcYnwf"
  ),
  steadRent: new anchor.web3.PublicKey(
    "TrXDop6spRAwHDsSpvY51PxHkvZXKGNYC6bygXZLNC2"
  ),
  metadata: mainnetMetadata
};

const constants = MAINNET ? mainnetConstants : devnetConstants;

export default constants;
