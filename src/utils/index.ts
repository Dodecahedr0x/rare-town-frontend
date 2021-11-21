import * as anchor from "@project-serum/anchor"
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
  AccountInfo as TokenAccount,
  AccountLayout
} from "@solana/spl-token";
import { WRAPPED_SOL_MINT } from "../constants";

const accountsCache = new Map<string, TokenAccount>();

export const getCachedAccount = (
  predicate: (account: TokenAccount) => boolean
) => {
  for (const account of accountsCache.values()) {
    if (predicate(account)) {
      return account as TokenAccount;
    }
  }
};

export const createSplAccount = async(
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
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      mint,
      account,
      owner
    )
  );

  return account;
}

export const shortAddress = (address: string | undefined): string => {
  if(!address) return "???"
  return address.substr(0, 4) + "..." + address.substr(address.length - 4, 4);
};

export const findTokenAddress = async (
  walletAddress: anchor.web3.PublicKey,
  tokenMintAddress: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (await anchor.web3.PublicKey.findProgramAddress(
      [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
      ],
      TOKEN_PROGRAM_ID
  ))[0];
}

export const findAssociatedTokenAddress = async (
  walletAddress: anchor.web3.PublicKey,
  tokenMintAddress: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (await anchor.web3.PublicKey.findProgramAddress(
      [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
  ))[0];
}

export const findOrCreateAccountByMint = async (
  payer: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  instructions: anchor.web3.TransactionInstruction[],
  cleanupInstructions: anchor.web3.TransactionInstruction[],
  accountRentExempt: number,
  mint: anchor.web3.PublicKey, // use to identify same type
  signers: anchor.web3.Keypair[],
  excluded?: Set<string>
): Promise<anchor.web3.PublicKey> => {
  const accountToFind = mint.toBase58();
  const account = getCachedAccount(
    (acc) =>
      acc.mint.toBase58() === accountToFind &&
      acc.owner.toBase58() === owner.toBase58() &&
      (excluded === undefined || !excluded.has(acc.address.toBase58()))
  );
  const isWrappedSol = accountToFind === WRAPPED_SOL_MINT.toBase58();

  let toAccount: anchor.web3.PublicKey;
  if (account && !isWrappedSol) {
    toAccount = account.address;
  } else {
    // creating depositor pool account
    const newToAccount = await createSplAccount(
      instructions,
      payer,
      accountRentExempt,
      mint,
      owner,
      AccountLayout.span
    );

    toAccount = newToAccount;
    console.log("to account", newToAccount.toString())
    // signers.push(newToAccount);

    if (isWrappedSol) {
      cleanupInstructions.push(
        Token.createCloseAccountInstruction(
          TOKEN_PROGRAM_ID,
          toAccount,
          payer,
          payer,
          []
        )
      );
    }
  }

  return toAccount;
}