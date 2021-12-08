import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import mainnetMetadata from "./all_metadata.json";
import devnetMetadata from "./devnet_metadata.json";

const MAINNET = true;

export type StaticMetadata = {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  collection: {
    name: string;
    family: string;
  };
  properties: {
    category: string;
    files: {
      uri: string;
      type: string;
    }[];
    creators: {
      address: string;
      share: number;
    }[];
  };
};

export const COLLECTION_CLAIM_DELAY = new anchor.BN(86400);

const devnetConstants = {
  mainnet: MAINNET,
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
    "FWC3cdov6TNgCmW8kHwQxLPoWcgHxXPJB2Uhpcdrr8uM"
  ),
  metadata: devnetMetadata as { [mint: string]: StaticMetadata },
};

const mainnetConstants = {
  mainnet: MAINNET,
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
    "FWC3cdov6TNgCmW8kHwQxLPoWcgHxXPJB2Uhpcdrr8uM"
  ),
  metadata: mainnetMetadata as { [mint: string]: StaticMetadata },
};

const constants = MAINNET ? mainnetConstants : devnetConstants;

export default constants;
