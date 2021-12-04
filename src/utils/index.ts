import { Account, AnyPublicKey, programs } from "@metaplex/js";
import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";

import constants from "../constants";

export const getAllAttributes = () => {
  const attributes: {[traitType: string]: {count: number, values: string[]}} = {};

  for (const key of Object.keys(constants.metadata)) {
    const metadata: any = (constants.metadata as any)[key];

    for (const attribute of metadata.attributes) {
      if (!attributes[attribute.trait_type]) {
        attributes[attribute.trait_type] = { count: 0, values: [] };
      }

      attributes[attribute.trait_type].count += 1;
      if (!attributes[attribute.trait_type].values.includes(attribute.value))
        attributes[attribute.trait_type].values.push(attribute.value);
    }
  }
  
  return attributes
};

export const shortAddress = (address: string | undefined): string => {
  if (!address) return "???";
  return address.substr(0, 4) + "..." + address.substr(address.length - 4, 4);
};

export const findTokenAddress = async (
  walletAddress: anchor.web3.PublicKey,
  tokenMintAddress: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      TOKEN_PROGRAM_ID
    )
  )[0];
};

export const findAssociatedTokenAddress = async (
  walletAddress: anchor.web3.PublicKey,
  tokenMintAddress: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
};

export const findDataByOwner = async (
  connection: anchor.web3.Connection,
  owner: AnyPublicKey
): Promise<programs.metadata.MetadataData[]> => {
  const accounts = await programs.TokenAccount.getTokenAccountsByOwner(
    connection,
    owner
  );

  const metadataPdaLookups = accounts
    .filter((e) => e.data.amount?.eq(new anchor.BN(1)))
    .map((e) => programs.metadata.Metadata.getPDA(e.data.mint));

  const metadataAddresses = await Promise.all(metadataPdaLookups);
  const tokenInfo = await Account.getInfos(connection, metadataAddresses);
  return Array.from(tokenInfo.values()).map((m) =>
    programs.metadata.MetadataData.deserialize(m.data)
  );
};
