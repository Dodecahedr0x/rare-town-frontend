import React, { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  AccountInfo as TokenAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { programs } from "@metaplex/js";

import { Collection, CollectionItem, CollectionMint } from ".";
import idl from "../../constants/idls/collection.json";

import Context from "./Context";
import axios from "axios";
import ConfirmationModal from "components/ConfirmationModal";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { SOLSTEADS_COLLECTION } from "../../constants";
import { findAssociatedTokenAddress, findTokenAddress } from "utils";

const programID = new PublicKey(idl.metadata.address);

const CollectionProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const { connection } = useConnection();
  const wallet = useWallet();

  const { isOpen: confirming, onOpen, onClose } = useDisclosure();
  const [currentTransaction, setCurrentTransaction] = useState<string>("");
  const [ownedTokens, setOwnedTokens] = useState<string[]>([]);
  const [userAccount, setUserAccount] = useState<TokenAccount>();
  const [collection, setCollection] = useState<Collection>();
  const [mints, setMints] = useState<CollectionMint[]>([]);

  const fetchCollection = useCallback(async () => {
    if (!wallet) return;

    const provider = new anchor.Provider(connection, wallet as any, {
      preflightCommitment: "processed",
    });

    const program = new anchor.Program(idl as anchor.Idl, programID, provider);

    const fetchedCollection = (await program.account.collection.fetch(
      SOLSTEADS_COLLECTION
    )) as any;
    const zeroKey = new anchor.web3.PublicKey(0);
    fetchedCollection.mints = fetchedCollection.mints.filter(
      (item: CollectionItem) => !item.mint.equals(zeroKey)
    );
    setCollection(fetchedCollection);
  }, [connection, wallet]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  const fetchOwned = useCallback(async () => {
    if (!wallet || !collection || !wallet.publicKey) {
      setOwnedTokens([]);
    } else {
      setOwnedTokens(
        (
          await programs.metadata.Metadata.findByOwnerV2(
            connection,
            wallet.publicKey
          )
        ).map((e) => e.pubkey.toString())
      );
    }
  }, [connection, collection, wallet]);

  useEffect(() => {
    fetchOwned();
  }, [fetchOwned]);

  const fetchMints = useCallback(async () => {
    if (!collection || !connection) return;

    const ranks = new Array(collection.mints.length)
      .fill(0)
      .map((_, i) => i)
      .sort((a, b) =>
        collection.mints[b].received
          .sub(collection.mints[a].received)
          .toNumber()
      );

    for (const i in ranks) {
      const pda = await programs.metadata.Metadata.getPDA(
        collection.mints[ranks[i]].mint
      );
      const fetchedMetadata = await programs.metadata.Metadata.load(
        connection,
        pda
      );
      const response = await axios.get(fetchedMetadata.data.data.uri);
      setMints((old) => {
        let array = old?.slice();
        array[i] = {
          mint: collection.mints[ranks[i]],
          rank: Number(i),
          imageUri: response.data.image,
          solsteadsUrl: response.data.external_url,
          metadata: fetchedMetadata,
          owned: ownedTokens.includes(fetchedMetadata.pubkey.toString()),
        };
        return array;
      });
    }
  }, [connection, collection, ownedTokens]);

  useEffect(() => {
    fetchMints();
  }, [fetchMints]);

  const fetchUserAccount = useCallback(async () => {
    if (!collection || !connection || !wallet.publicKey) return;

    const collectionKey = new anchor.web3.PublicKey(collection.token);
    try {
      const associatedAddress = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        collectionKey,
        wallet.publicKey
      );
      const token = new Token(
        connection,
        collectionKey,
        TOKEN_PROGRAM_ID,
        wallet as any
      );
      setUserAccount(await token.getAccountInfo(associatedAddress));
    } catch (err) {
      console.log("User has no account yet");
    }
  }, [connection, collection, wallet]);

  useEffect(() => {
    fetchUserAccount();
  }, [fetchUserAccount]);

  const createAccount = useCallback(async () => {
    if (!wallet.publicKey || !wallet.signTransaction || !collection) return;

    onOpen();

    const collectionKey = new anchor.web3.PublicKey(collection.token);
    const associatedAddress = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      collectionKey,
      wallet.publicKey
    );
    const tokenAccountAddress = await findTokenAddress(
      wallet.publicKey,
      collectionKey
    );
    const instructions = [
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        collectionKey,
        associatedAddress,
        wallet.publicKey,
        wallet.publicKey
      ),
      Token.createInitAccountInstruction(
        TOKEN_PROGRAM_ID,
        collectionKey,
        tokenAccountAddress,
        wallet.publicKey
      ),
    ];

    try {
      const signature = await wallet.sendTransaction(
        new anchor.web3.Transaction().add(...instructions),
        connection
      );

      setCurrentTransaction(signature);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  }, [collection, connection, wallet, onClose, onOpen]);

  const claimToken = useCallback(
    async (mint: CollectionMint) => {
      console.log(userAccount, collection);
      if (!wallet || !collection || !userAccount || !wallet.publicKey) return;

      onOpen();

      const provider = new anchor.Provider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new anchor.Program(
        idl as anchor.Idl,
        programID,
        provider
      );

      const index = new anchor.BN(
        collection.mints
          .map((item) => item.mint.toString())
          .indexOf(mint.mint.mint.toString())
      );
      const tokenAccount = await findAssociatedTokenAddress(
        wallet.publicKey,
        mint.mint.mint
      );
      try {
        await program.rpc.claim(index, {
          accounts: {
            collection: SOLSTEADS_COLLECTION,
            claimedToken: mint.mint.mint,
            claimedTokenAccount: tokenAccount,
            owner: wallet.publicKey,
            tokenAccount: userAccount.address,
            mint: collection.token,
            mintAuthority: collection.tokenAuthority,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          },
        });

        toast({
          title: "Claim successful",
          description: `Successfully claimed $TOWN for "${mint.metadata.data.data.name}"`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Update balance
        await fetchCollection();
      } catch (err) {
        console.log("Failed claiming tokens", err);

        toast({
          title: "Claiming failed",
          description: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    },
    [
      connection,
      collection,
      toast,
      userAccount,
      wallet,
      onClose,
      onOpen,
      fetchCollection,
    ]
  );

  const spendTokens = useCallback(
    async (mint: CollectionMint, amount: anchor.BN) => {
      if (!wallet || !collection || !userAccount || !wallet.publicKey) return;

      onOpen();

      const provider = new anchor.Provider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new anchor.Program(
        idl as anchor.Idl,
        programID,
        provider
      );

      const index = new anchor.BN(
        collection.mints
          .map((item) => item.mint.toString())
          .indexOf(mint.mint.mint.toString())
      );
      try {
        await program.rpc.spend(index, amount, {
          accounts: {
            collection: SOLSTEADS_COLLECTION,
            targetToken: mint.mint.mint,
            spender: wallet.publicKey,
            tokenAccount: userAccount.address,
            mint: collection.token,
            mintAuthority: collection.tokenAuthority,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        });

        toast({
          title: "Spending successful",
          description: `Successfully gave ${
            amount.toNumber() / 10 ** 9
          } $TOWN for "${mint.metadata.data.data.name}"`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Update balance
        await fetchCollection();
      } catch (err: any) {
        console.log("Failed claiming tokens", err, Object.keys(err));

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
    [
      connection,
      collection,
      toast,
      userAccount,
      wallet,
      onClose,
      onOpen,
      fetchCollection,
    ]
  );

  return (
    <Context.Provider
      value={{
        collection,
        mints,
        userAccount,
        createAccount,
        claimToken,
        spendTokens,
      }}
    >
      {children}
      <ConfirmationModal
        isOpen={confirming}
        onClose={onClose}
        transaction={currentTransaction}
      />
    </Context.Provider>
  );
};

export default CollectionProvider;