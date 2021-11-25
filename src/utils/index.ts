import { Account, AnyPublicKey, programs } from "@metaplex/js";
import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";

export const createSplAccount = async (
  instructions: anchor.web3.TransactionInstruction[],
  payer: anchor.web3.PublicKey,
  accountRentExempt: number,
  mint: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  space: number
) => {
  const account = await findTokenAddress(owner, mint);
  instructions.push(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: account,
      lamports: accountRentExempt,
      space,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  instructions.push(
    Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, account, owner)
  );

  return account;
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
