import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import useCollection from "hooks/useCollection";
import useSteadRent from "hooks/useSteadRent";
import { CollectionMint } from "contexts/Collection";
import * as anchor from "@project-serum/anchor";
import { COLLECTION_CLAIM_DELAY } from "../../constants";
import ExhibitionModal from "components/ExhibitionModal";
import { ExhibitionStatus } from "contexts/SteadRent";
import { useConnectedWallet } from "@saberhq/use-solana";

interface TokenCardProps {
  token: CollectionMint;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const wallet = useConnectedWallet();
  const {
    userAccount,
    claimToken,
    spendTokens,
    createAssociatedAccount,
    fetchMint,
  } = useCollection();
  const { exhibitions } = useSteadRent();

  const [amount, setAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const exhibition = useMemo(() => {
    const candidates = exhibitions.filter((e) =>
      e.property.equals(token.mint.mint)
    );
    if (candidates.length > 0) return candidates[0];
  }, [exhibitions, token]);

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

  const augmentedToken = useMemo(() => fetchMint(token), [token, fetchMint]);

  return (
    <Flex
      w="280px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderWidth="2px"
      rounded="lg"
      shadow="lg"
    >
      <Image
        src={augmentedToken.imageUri}
        rounded="lg"
        w="280px"
        maxH="400px"
      />
      <Text fontSize="2xl" fontWeight="bold" w="280px">
        {augmentedToken.metadata?.name}
      </Text>
      <Divider />
      <VStack spacing="8px" w="100%" p="15px">
        <Text fontSize="lg" fontWeight="bold">
          Rank {augmentedToken.rank + 1}
        </Text>
        <Flex direction="row" w="100%">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Points
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {augmentedToken.mint.received.toNumber() / 10 ** 9}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Link href={augmentedToken.solsteadsUrl} target="_blank">
            Check on Solsteads
          </Link>
        </Box>
        {exhibition && exhibition.status === ExhibitionStatus.Active && (
          <>
            <Button isFullWidth colorScheme="teal" onClick={onOpen}>
              Ckeck exhibition
            </Button>
            <ExhibitionModal
              exhibition={exhibition}
              property={augmentedToken}
              isOpen={isOpen}
              onClose={onClose}
            />
          </>
        )}
        {wallet && (
          <>
            {userAccount ? (
              <>
                <Flex gap="2px">
                  <Input onChange={(e) => setAmount(Number(e.target.value))} />
                  <Button
                    ml="5px"
                    colorScheme="blue"
                    disabled={
                      userAccount.amount.toNumber() / 10 ** 9 < amount ||
                      amount === 0
                    }
                    onClick={() =>
                      spendTokens(
                        augmentedToken,
                        new anchor.BN(amount * 10 ** 9)
                      )
                    }
                  >
                    Give
                  </Button>
                </Flex>
                {augmentedToken.owned && (
                  <>
                    <Button
                      colorScheme="green"
                      onClick={() => claimToken(augmentedToken)}
                      disabled={new anchor.BN(Date.now() / 1000)
                        .sub(augmentedToken.mint.claimed)
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
                <Button
                  colorScheme="teal"
                  onClick={createAssociatedAccount}
                  isFullWidth
                >
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
