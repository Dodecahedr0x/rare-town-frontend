import React, { useMemo } from "react";
import {
  Button,
  Divider,
  Flex,
  Box,
  Link,
  VStack,
  Image,
  Text,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import useCollection from "hooks/useCollection";
import useSteadRent from "hooks/useSteadRent";
import { Exhibition, ExhibitionStatus } from "contexts/SteadRent";
import { shortAddress } from "utils";
import ExhibitionModal from "components/ExhibitionModal";

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition }) => {
  const { mints, fetchMint } = useCollection();
  const { state, cancelExhibition, closeExhibition } = useSteadRent();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const augmentedToken = useMemo(() => {
    return fetchMint(
      mints.filter((mint) => mint.mint.mint.equals(exhibition.property))[0]
    );
  }, [mints, exhibition, fetchMint]);

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
      <Text fontSize="2xl" fontWeight="bold" w="280px" textAlign="center">
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
              Exhibitor
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {shortAddress(exhibition.exhibitor.toString())}
            </Text>
          </Box>
        </Flex>
        <Flex direction="row" w="100%">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Total fee
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {((state?.feeAmount || 0) + exhibition.renterFee) / 100}%
            </Text>
          </Box>
        </Flex>
        <Flex direction="row" w="100%">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Exposed pieces
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {exhibition.nPieces.toNumber()}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Link href={augmentedToken.solsteadsUrl} target="_blank">
            Check on Solsteads
          </Link>
        </Box>
        <Button isFullWidth colorScheme="teal" onClick={onOpen}>
          Ckeck exhibition
        </Button>
        <ExhibitionModal
          exhibition={exhibition}
          property={augmentedToken}
          isOpen={isOpen}
          onClose={onClose}
        />
        {exhibition.status === ExhibitionStatus.Active ? (
          <Button
            colorScheme="red"
            isFullWidth
            onClick={() => cancelExhibition(exhibition.property)}
          >
            Cancel exhibition
          </Button>
        ) : (
          <Button
            colorScheme="red"
            isFullWidth
            onClick={() => closeExhibition(exhibition.property)}
            disabled={exhibition.nPieces.toNumber() > 0}
          >
            Close exhibition
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

export default ExhibitionCard;
