import * as anchor from "@project-serum/anchor";

import collectionIdl from "./idls/collection.json"

export const COLLECTION_CLAIM_DELAY = new anchor.BN(86400)

export const WRAPPED_SOL_MINT = new anchor.web3.PublicKey(
  "So11111111111111111111111111111111111111112"
);
export const SOLSTEADS_COLLECTION = new anchor.web3.PublicKey(
  "8Adt6ry4BPgK2c8WkVtcdZemwtABZNPThaLZ97wcYnwf"
);
export const COLLECTION_ADDRESS = new anchor.web3.PublicKey(
  collectionIdl.metadata.address
);
