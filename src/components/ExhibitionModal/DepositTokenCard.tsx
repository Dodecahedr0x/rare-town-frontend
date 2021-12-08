import { useCallback, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  WrapItem,
} from "@chakra-ui/react";
import { Exhibition } from "contexts/SteadRent";
import { BN, web3 } from "@project-serum/anchor";

import useSteadRent from "../../hooks/useSteadRent";
import { AugmentedExhibitionItem } from "./ExhibitionModal";

interface DepositTokenCardProps {
  exhibition: Exhibition;
  metadata: AugmentedExhibitionItem;
}

const DepositTokenCard: React.FC<DepositTokenCardProps> = ({
  exhibition,
  metadata,
}) => {
  const { depositToken } = useSteadRent();

  const [price, setPrice] = useState<number>();

  const handleDeposit = useCallback(
    (token: web3.PublicKey) => {
      if (!price) return;
      depositToken(exhibition.property, token, new BN(price * 10 ** 9));
    },
    [exhibition, price, depositToken]
  );

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
        <FormControl p="2">
          <FormLabel>Selling Price</FormLabel>
          <FormHelperText my="2">The price at which anyone looking at the gallery can buy this NFT</FormHelperText>
          <InputGroup my="1">
            <Input
              placeholder="Price..."
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <InputRightAddon children="SOL" />
          </InputGroup>
          <Button
            isFullWidth
            disabled={!price}
            colorScheme="green"
            onClick={() =>
              handleDeposit(new web3.PublicKey(metadata.metadata.mint))
            }
          >
            Add to the exhibition
          </Button>
        </FormControl>
      </Flex>
    </WrapItem>
  );
};

export default DepositTokenCard;
