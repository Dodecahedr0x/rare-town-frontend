import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { useDisclosure, useToast } from "@chakra-ui/react";

import { Exhibition, ExhibitionStatus, State } from ".";
import { SteadRent, IDL } from "../../types/stead_rent";
import Context from "./Context";
import ConfirmationModal from "components/ConfirmationModal";
import { shortAddress } from "../../utils";
import constants from "../../constants";

const SteadRentProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const { connection } = useConnection();
  const wallet = useWallet();

  const { isOpen: confirming, onOpen, onClose } = useDisclosure();
  const [isFetching] = useState<boolean>(false);
  const [state, setState] = useState<State>();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  const provider = useMemo(
    () =>
      new anchor.Provider(connection, wallet as any, {
        preflightCommitment: "confirmed",
      }),
    [connection, wallet]
  );

  /**
   * Fetches the state of the program
   */
  const fetchState = useCallback(async () => {
    try {
      const [stateAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("state")],
        constants.steadRent
      );

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );
      const fetchedState: State = await program.account.state.fetch(
        stateAddress
      );
      setState(fetchedState);
    } catch (err) {
      console.log("Failed fetching state", err);
    }
  }, [provider]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  /**
   * Fetches all exhibitions
   */
  const fetchExhibitions = useCallback(async () => {
    const program = new anchor.Program<SteadRent>(
      IDL,
      constants.steadRent,
      provider
    );
    const accounts = await provider.connection.getProgramAccounts(
      constants.steadRent
    );
    const [stateAddress] = await PublicKey.findProgramAddress(
      [Buffer.from("state")],
      constants.steadRent
    );

    const newExhibitions = [];
    for (const account of accounts) {
      if (!account.pubkey.equals(stateAddress)) {
        try {
          const exhibition = await program.account.exhibition.fetch(
            account.pubkey
          );

          exhibition.status =
            "active" in exhibition.status
              ? ExhibitionStatus.Active
              : ExhibitionStatus.Cancelled;

          newExhibitions.push(exhibition);
        } catch (err) {
          console.log(account.pubkey.toString(), "is not an exhibition", err);
        }
      }
    }

    setExhibitions(newExhibitions as any);
  }, [provider]);

  useEffect(() => {
    fetchExhibitions();
  }, [fetchExhibitions]);

  const fetchExhibitionItem = useCallback(
    async (exhibition: Exhibition, mint: PublicKey) => {
      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );
      const [exhibitionItem] = await PublicKey.findProgramAddress(
        [Buffer.from("item"), exhibition.property.toBuffer(), mint.toBuffer()],
        constants.steadRent
      );
      return await program.account.exhibitionItem.fetch(exhibitionItem);
    },
    [provider]
  );

  const startExhibition = useCallback(
    async (property: PublicKey, exhibitor: PublicKey, renterFee: number) => {
      if (!wallet.publicKey) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [stateAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("state")],
        constants.steadRent
      );
      const [exhibitionAddress, exhibitionBump] =
        await PublicKey.findProgramAddress(
          [Buffer.from("exhibition"), property.toBuffer()],
          constants.steadRent
        );
      const [escrowAddress, escrowBump] = await PublicKey.findProgramAddress(
        [Buffer.from("escrow"), property.toBuffer()],
        constants.steadRent
      );
      const [escrowAccountAddress, escrowAccountBump] =
        await PublicKey.findProgramAddress(
          [Buffer.from("token_account"), property.toBuffer()],
          constants.steadRent
        );

      const exhibitionTokenUserAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        property,
        wallet.publicKey
      );

      const bumps = {
        exhibition: exhibitionBump,
        escrow: escrowBump,
        exhibitionToken: escrowAccountBump,
      };

      try {
        await program.rpc.initializeExhibition(bumps, renterFee, {
          accounts: {
            state: stateAddress,
            exhibition: exhibitionAddress,
            escrow: escrowAddress,
            exhibitionTokenMint: property,
            exhibitionTokenAccount: escrowAccountAddress,
            renter: wallet.publicKey,
            renterAccount: exhibitionTokenUserAccount,
            exhibitor: exhibitor,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
          },
        });

        toast({
          title: "Exhibition opened!",
          description: `Successfully started exhibition with ${shortAddress(
            exhibitor.toString()
          )}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        console.log("Failed starting exhibition", err, Object.keys(err));

        toast({
          title: "Spending failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [provider, toast, wallet, onClose, onOpen, fetchExhibitions]
  );

  const cancelExhibition = useCallback(
    async (property: PublicKey) => {
      if (!wallet.publicKey) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [exhibition] = await PublicKey.findProgramAddress(
        [Buffer.from("exhibition"), property.toBuffer()],
        constants.steadRent
      );

      const [escrow] = await PublicKey.findProgramAddress(
        [Buffer.from("escrow"), property.toBuffer()],
        constants.steadRent
      );

      const [escrowAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("token_account"), property.toBuffer()],
        constants.steadRent
      );

      const renterAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        property,
        wallet.publicKey
      );

      try {
        console.log({
          exhibition,
          renter: wallet.publicKey,
          renterAccount,
          escrow,
          escrowAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        });
        await program.rpc.cancelExhibition({
          accounts: {
            exhibition,
            property,
            renter: wallet.publicKey,
            renterAccount,
            escrow,
            escrowAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        });

        toast({
          title: "Exhibition cancelled!",
          description: `Successfully cancelled exhibition ${shortAddress(
            exhibition.toString()
          )}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        console.log("Failed cancelling exhibition", err, Object.keys(err));

        toast({
          title: "Cancelling failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [provider, toast, wallet, onClose, onOpen, fetchExhibitions]
  );

  const closeExhibition = useCallback(
    async (property: PublicKey) => {
      if (!wallet.publicKey) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [exhibitionAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("exhibition"), property.toBuffer()],
        constants.steadRent
      );

      try {
        await program.rpc.closeExhibition({
          accounts: {
            exhibition: exhibitionAddress,
            renter: wallet.publicKey,
          },
        });

        toast({
          title: "Exhibition closed!",
          description: `Successfully closed exhibition ${shortAddress(
            exhibitionAddress.toString()
          )}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        console.log("Failed closing exhibition", err, Object.keys(err));

        toast({
          title: "Closing failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [provider, toast, wallet, onClose, onOpen, fetchExhibitions]
  );

  const depositToken = useCallback(
    async (property: PublicKey, tokenMint: PublicKey, price: anchor.BN) => {
      if (!wallet.publicKey) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [exhibition] = await PublicKey.findProgramAddress(
        [Buffer.from("exhibition"), property.toBuffer()],
        constants.steadRent
      );

      const [escrow] = await PublicKey.findProgramAddress(
        [Buffer.from("escrow"), property.toBuffer()],
        constants.steadRent
      );

      const [exhibitionItem, itemBump] = await PublicKey.findProgramAddress(
        [Buffer.from("item"), property.toBuffer(), tokenMint.toBuffer()],
        constants.steadRent
      );

      const [depositedTokenAccount, tokenAccountBump] =
        await PublicKey.findProgramAddress(
          [Buffer.from("token_account"), tokenMint.toBuffer()],
          constants.steadRent
        );

      const exhibitorAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        tokenMint,
        wallet.publicKey
      );

      const bumps = {
        item: itemBump,
        tokenAccount: tokenAccountBump,
      };

      try {
        await program.rpc.depositToken(bumps, price, {
          accounts: {
            exhibition,
            exhibitionItem,
            escrow,
            mint: tokenMint,
            depositedTokenAccount,
            exhibitor: wallet.publicKey,
            exhibitorAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
          },
        });

        toast({
          title: "Token deposited!",
          description: `Successfully added token ${shortAddress(
            tokenMint.toString()
          )} to the exhibition at ${price} SOL`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        toast({
          title: "Depositing token failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [provider, toast, wallet, onClose, onOpen, fetchExhibitions]
  );

  const buyToken = useCallback(
    async (exhibition: Exhibition, tokenMint: PublicKey) => {
      if (!wallet.publicKey || !state) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [stateAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("state")],
        constants.steadRent
      );
      const [exhibitionAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("exhibition"), exhibition.property.toBuffer()],
        constants.steadRent
      );
      const [escrow] = await PublicKey.findProgramAddress(
        [Buffer.from("escrow"), exhibition.property.toBuffer()],
        constants.steadRent
      );
      const [exhibitionItem] = await PublicKey.findProgramAddress(
        [
          Buffer.from("item"),
          exhibition.property.toBuffer(),
          tokenMint.toBuffer(),
        ],
        constants.steadRent
      );

      const [depositedTokenAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("token_account"), tokenMint.toBuffer()],
        constants.steadRent
      );

      const buyerAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        tokenMint,
        wallet.publicKey
      );

      let instructions = [];
      // Create the account if it does not exist
      try {
        await connection.getTokenAccountBalance(buyerAccount);
      } catch (err) {
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            tokenMint,
            buyerAccount,
            wallet.publicKey,
            wallet.publicKey
          )
        );
      }
      const item = await program.account.exhibitionItem.fetch(exhibitionItem);

      try {
        await program.rpc.buyToken({
          accounts: {
            state: stateAddress,
            exhibition: exhibitionAddress,
            exhibitor: exhibition.exhibitor,
            exhibitionItem: exhibitionItem,
            escrow: escrow,
            mint: tokenMint,
            depositedTokenAccount,
            buyer: wallet.publicKey,
            buyerAccount,
            renter: exhibition.renter,
            dao: state.feeEarner,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          },
          instructions,
        });

        toast({
          title: "Token bought!",
          description: `Successfully bought token ${shortAddress(
            tokenMint.toString()
          )} for ${item.price.toNumber() / 10 ** 9} SOL`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        toast({
          title: "Buying token failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [connection, provider, toast, state, wallet, onClose, onOpen, fetchExhibitions]
  );

  const withdrawToken = useCallback(
    async (exhibition: Exhibition, tokenMint: PublicKey) => {
      if (!wallet.publicKey) return;

      onOpen();

      const program = new anchor.Program<SteadRent>(
        IDL,
        constants.steadRent,
        provider
      );

      const [exhibitionAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("exhibition"), exhibition.property.toBuffer()],
        constants.steadRent
      );
      const [exhibitionItem] = await PublicKey.findProgramAddress(
        [
          Buffer.from("item"),
          exhibition.property.toBuffer(),
          tokenMint.toBuffer(),
        ],
        constants.steadRent
      );
      const [escrow] = await PublicKey.findProgramAddress(
        [Buffer.from("escrow"), exhibition.property.toBuffer()],
        constants.steadRent
      );
      const [depositedTokenAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("token_account"), tokenMint.toBuffer()],
        constants.steadRent
      );

      const exhibitorAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        tokenMint,
        exhibition.exhibitor
      );

      try {
        await program.rpc.withdrawToken({
          accounts: {
            exhibition: exhibitionAddress,
            exhibitor: exhibition.exhibitor,
            exhibitorAccount: exhibitorAccount,
            exhibitionItem: exhibitionItem,
            escrow: escrow,
            mint: tokenMint,
            depositedTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        });

        toast({
          title: "Token withdraw!",
          description: `Successfully withdrew token ${shortAddress(
            tokenMint.toString()
          )}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        fetchExhibitions();
      } catch (err: any) {
        toast({
          title: "Withdrawing token failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [provider, toast, wallet, onClose, onOpen, fetchExhibitions]
  );

  return (
    <Context.Provider
      value={{
        isFetching,
        state,
        exhibitions,
        fetchExhibitionItem,
        startExhibition,
        cancelExhibition,
        closeExhibition,
        depositToken,
        buyToken,
        withdrawToken,
      }}
    >
      {children}
      <ConfirmationModal isOpen={confirming} onClose={onClose} />
    </Context.Provider>
  );
};

export default SteadRentProvider;
