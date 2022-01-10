import { useCallback } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { Exhibition } from "contexts/SteadRent";
import { web3 } from "@project-serum/anchor";

import useSteadRent from "../../hooks/useSteadRent";
import { AugmentedExhibitionItem } from "./ExhibitionModal";
import { useConnectedWallet } from "@saberhq/use-solana";

interface DepositTokenCardProps {
  exhibition: Exhibition;
  metadata: AugmentedExhibitionItem;
}

const ExhibitedTokenCard: React.FC<DepositTokenCardProps> = ({
  exhibition,
  metadata,
}) => {
  const wallet = useConnectedWallet();
  const { state, buyToken, withdrawToken } = useSteadRent();

  const handleBuy = useCallback(() => {
    buyToken(exhibition, new web3.PublicKey(metadata.metadata.mint));
  }, [exhibition, metadata, buyToken]);

  const handleWithdraw = useCallback(() => {
    withdrawToken(exhibition, new web3.PublicKey(metadata.metadata.mint));
  }, [exhibition, metadata, withdrawToken]);

  return (
    <WrapItem>
      <Flex
        maxW="250px"
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderWidth="2px"
        rounded="lg"
        shadow="lg"
      >
        <Image src={metadata.uri} rounded="lg" maxW="250px" maxH="250px" />
        <FormControl p="2" align="start">
          <FormLabel>{metadata.metadata.data.name}</FormLabel>
          <FormHelperText my="2">
            {(state?.feeAmount || 0) / 100}% DAO fee
          </FormHelperText>
          <FormHelperText my="2">
            {exhibition.renterFee / 100}% renter fee
          </FormHelperText>
          <Button
            isFullWidth
            colorScheme="green"
            disabled={!wallet || !metadata.item}
            onClick={handleBuy}
          >
            Buy for{" "}
            {metadata.item
              ? (metadata.item?.price.toNumber() || 0) / 10 ** 9
              : "???"}{" "}
            SOL
          </Button>
          {wallet?.publicKey.equals(exhibition.exhibitor) && (
            <Button isFullWidth colorScheme="red" mt="2" onClick={handleWithdraw}>
              Withdraw
            </Button>
          )}
        </FormControl>
      </Flex>
    </WrapItem>
  );
};

export default ExhibitedTokenCard;
