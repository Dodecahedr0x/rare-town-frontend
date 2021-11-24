import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AccountInfo as TokenAccount } from "@solana/spl-token";

interface Bumps {}

export interface Collection {
  authority: PublicKey;
  upgradable: boolean;
  size: anchor.BN;
  token: PublicKey;
  tokenAuthority: PublicKey;
  bumps: Bumps;
  mints: CollectionItem[];
}

export interface CollectionItem {
  mint: PublicKey;
  received: anchor.BN;
  claimed: anchor.BN;
}

export interface CollectionMint {
  mint: CollectionItem;
  rank: number;
  imageUri?: string;
  solsteadsUrl?: string;
  metadata?: { name: string };
  owned: boolean;
}

export interface ContextValues {
  isFetchingOwned: boolean;
  collection?: Collection;
  mints: CollectionMint[];
  userAccount?: TokenAccount;
  createAssociatedAccount: () => Promise<void>;
  createAccount: () => Promise<void>;
  claimToken: (mint: CollectionMint) => Promise<void>;
  spendTokens: (mint: CollectionMint, amount: anchor.BN) => Promise<void>;
  fetchMint: (mint: CollectionMint) => CollectionMint;
}
