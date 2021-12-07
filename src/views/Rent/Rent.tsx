import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Input,
  Image,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Select,
  Skeleton,
  Wrap,
} from "@chakra-ui/react";

import useCollection from "../../hooks/useCollection";
import useSteadRent from "../../hooks/useSteadRent";
import { shortAddress } from "utils";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import ExhibitionCard from "./ExhibitionCard";

const Rent: React.FC = (props) => {
  const wallet = useWallet();
  const { mints: allMints, fetchMint } = useCollection();
  const { state, exhibitions, startExhibition } = useSteadRent();

  const owned = useMemo(
    () => allMints.filter((mint) => mint.owned),
    [allMints]
  );

  const userExhibitions = useMemo(() => {
    return exhibitions.filter(
      (e) => wallet.publicKey && e.renter.equals(wallet.publicKey)
    );
  }, [exhibitions, wallet]);

  const [selectedStead, setSelectedStead] = useState<string>();
  const [exhibitor, setExhibitor] = useState<string>();
  const [renterFee, setRenterFee] = useState<number>();

  const property = useMemo(() => {
    if (!selectedStead) return;
    return fetchMint(
      owned.filter((mint) => mint.mint.mint.toString() === selectedStead)[0]
    );
  }, [selectedStead, owned, fetchMint]);

  const handleStartExhibition = useCallback(() => {
    if (!property || !exhibitor || !renterFee) return;
    startExhibition(property.mint.mint, new PublicKey(exhibitor), renterFee);
  }, [property, renterFee, exhibitor, startExhibition]);

  return (
    <Flex direction="column" w="100%" align="center" p="10px">
      {userExhibitions.length > 0 && (
        <Box justifyContent="center">
          <Heading>Your exhibitions</Heading>
          <Wrap justify="center" mt="5">
            {userExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.property.toString()} exhibition={exhibition} />
            ))}
          </Wrap>
        </Box>
      )}
      <Box justify="center" align="center" maxW="500px" my="40px">
        <FormControl
          border="solid 1px"
          borderRadius="10px"
          borderColor="gray.200"
          p="5"
        >
          <Heading>Start an exhibition</Heading>
          <Box m="2">
            {property ? (
              <Image
                src={property.imageUri}
                rounded="lg"
                w="280px"
                maxH="400px"
              />
            ) : (
              <Skeleton w="280px" maxH="400px" />
            )}
          </Box>
          <FormLabel>Choose the stead you want to rent</FormLabel>
          <Select onChange={(e) => setSelectedStead(e.target.value)}>
            <option></option>
            {owned.map((mint) => (
              <option
                key={mint.mint.mint.toString()}
                value={mint.mint.mint.toString()}
              >
                {shortAddress(mint.mint.mint.toString())}
              </option>
            ))}
          </Select>
          {property && (
            <>
              <FormLabel mt="5">
                Choose a fee (in %) you will take on each sale
              </FormLabel>
              <Input
                type="number"
                placeholder="e.g. 1%"
                onChange={(e) =>
                  setRenterFee(
                    Math.min(Math.max(Number(e.target.value), 0), 100) * 100
                  )
                }
              />
              <FormHelperText>
                An additionnal {(state?.feeAmount || 0) / 100}% fee is added and
                paid to the Neighbor DAO
              </FormHelperText>
              <FormLabel mt="5">Input the address of the exhibitor</FormLabel>
              <Input
                placeholder={"e.g. " + shortAddress(selectedStead)}
                onChange={(e) => setExhibitor(e.target.value)}
              />
              <Button
                mt="5"
                isFullWidth
                disabled={!exhibitor || !renterFee}
                onClick={handleStartExhibition}
                colorScheme="green"
              >
                Start the exhibition
              </Button>
            </>
          )}
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Rent;
