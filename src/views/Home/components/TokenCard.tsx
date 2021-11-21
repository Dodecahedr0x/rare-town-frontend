import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Divider,
  Flex,
  Box,
  Link,
  Input,
  VStack,
  Image,
  Text,
  Spacer,
} from "@chakra-ui/react";
import useCollection from "hooks/useCollection";
import { CollectionMint } from "contexts/Collection";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { COLLECTION_CLAIM_DELAY } from "../../../constants";

interface TokenCardProps {
  token: CollectionMint;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const wallet = useWallet();
  const { userAccount, claimToken, spendTokens, createAssociatedAccount } =
    useCollection();

  const [amount, setAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  const timeBeforeClaim = useCallback(() => {
    const difference =
      86400 -
      new anchor.BN(Date.now() / 1000).sub(token.mint.claimed).toNumber();
    const hours = Math.floor((difference / (60 * 60)) % 24);
    const minutes = Math.floor((difference / 60) % 60);
    const seconds = Math.floor(difference % 60);

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeBeforeClaim());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <Flex
      maxW="350px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderWidth="2px"
      rounded="lg"
      shadow="lg"
    >
      <Image src={token.imageUri} rounded="lg" maxW="280px" maxH="400px" />
      <Text fontSize="2xl" fontWeight="bold" maxW="280px">
        {token.metadata.data.data.name}
      </Text>
      <Divider />
      <VStack spacing="8px" w="100%" p="15px">
        <Text fontSize="lg" fontWeight="bold">Rank {token.rank + 1}</Text>
        <Flex direction="row" w="100%">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Points
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {token.mint.received.toNumber() / 10 ** 9}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Link href={token.solsteadsUrl} target="_blank">Check on Solsteads</Link>
          </Box>
        {wallet.connected && (
          <>
            {userAccount ? (
              <>
                <Flex gap="2px">
                  <Input onChange={(e) => setAmount(Number(e.target.value))} />
                  <Button
                    ml="5px"
                    colorScheme="blue"
                    disabled={
                      userAccount.amount.toNumber() / (10**9) < amount || amount === 0
                    }
                    onClick={() =>
                      spendTokens(token, new anchor.BN(amount * 10 ** 9))
                    }
                  >
                    Give
                  </Button>
                </Flex>
                {token.owned && (
                  <>
                    <Button
                      colorScheme="green"
                      onClick={() => claimToken(token)}
                      disabled={new anchor.BN(Date.now() / 1000)
                        .sub(token.mint.claimed)
                        .lt(COLLECTION_CLAIM_DELAY)}
                      isFullWidth
                    >
                      {new anchor.BN(Date.now() / 1000)
                        .sub(token.mint.claimed)
                        .lt(COLLECTION_CLAIM_DELAY)
                        ? `Claimable in ${timeLeft}`
                        : "Claim"}
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Flex>
                <Button colorScheme="teal" onClick={createAssociatedAccount} isFullWidth>
                  Initialize
                </Button>
              </Flex>
            )}
          </>
        )}
      </VStack>
    </Flex>
  );
};

export default TokenCard;
