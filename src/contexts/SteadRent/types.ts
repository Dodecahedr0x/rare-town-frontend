import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export interface State {
  bump: number;
  feeEarner: PublicKey;
  feeAmount: number;
}

export enum ExhibitionStatus {
  Active = 1,
  Cancelled = 2,
}

export interface ExhibitionBumps {
  exhibition: number;
  escrow: number;
  exhibitionToken: number;
}

export interface Exhibition {
  renter: PublicKey;
  property: PublicKey;
  renterFee: number;
  exhibitor: PublicKey;
  nPieces: anchor.BN;
  totalVolume: anchor.BN;
  status: ExhibitionStatus;
  bumps: ExhibitionBumps;
}

export interface ExhibitionItem {
  price: anchor.BN
  mint: PublicKey
}

export interface ContextValues {
  isFetching: boolean;
  state?: State;
  exhibitions: Exhibition[];
  fetchExhibitionItem: (exhibition: Exhibition, mint: PublicKey) => Promise<ExhibitionItem>,
  startExhibition: (
    property: PublicKey,
    exhibitor: PublicKey,
    renterFee: number
  ) => Promise<void>;
  cancelExhibition: (property: PublicKey) => Promise<void>;
  closeExhibition: (property: PublicKey) => Promise<void>;
  depositToken: (property: PublicKey, tokenMint: PublicKey, price: anchor.BN) => Promise<void>;
  buyToken: (exhibition: Exhibition, tokenMint: PublicKey) => Promise<void>;
  withdrawToken: (exhibition: Exhibition, tokenMint: PublicKey) => Promise<void>;
}
