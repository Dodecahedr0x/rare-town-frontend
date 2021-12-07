import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Exhibition, ExhibitionItem } from "contexts/SteadRent";
import { PublicKey } from "@solana/web3.js";
import { findDataByOwner, shortAddress } from "utils";
import { MetadataData } from "@metaplex/js/lib/programs/metadata";
import axios from "axios";
import { MdStreetview } from "react-icons/md";
import { BiDollarCircle } from "react-icons/bi";
import { AiFillFormatPainter } from "react-icons/ai";

import constants from "../../constants";
import useSteadRent from "../../hooks/useSteadRent";
import DepositTokenCard from "./DepositTokenCard";
import StatsCard from "components/StatsCard";
import ExhibitedTokenCard from "./ExhibitedTokenCard";
import { CollectionMint } from "contexts/Collection";

interface ExhibitionModalProps {
  exhibition: Exhibition;
  property: CollectionMint;
  isOpen: boolean;
  onClose: () => void;
}

export interface AugmentedExhibitionItem {
  metadata: MetadataData;
  uri: string;
  item?: ExhibitionItem;
}

const ExhibitionModal: React.FC<ExhibitionModalProps> = ({
  exhibition,
  property,
  isOpen,
  onClose,
}) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { fetchExhibitionItem } = useSteadRent();

  const [exhibitedTokens, setExhibitedTokens] = useState<
    AugmentedExhibitionItem[]
  >([]);
  const [ownedTokens, setOwnedTokens] = useState<AugmentedExhibitionItem[]>([]);

  const checkOwnedPieces = useCallback(async () => {
    if (!(wallet.publicKey && exhibition.exhibitor.equals(wallet.publicKey)))
      return;

    try {
      const owned = await findDataByOwner(connection, wallet.publicKey);
      setOwnedTokens(
        await Promise.all(
          owned.map(async (metadata) => {
            const response = await axios.get(metadata.data.uri);
            return { metadata: metadata, uri: response.data.image };
          })
        )
      );
    } catch (err) {
      console.log("Failed fetching owned tokens", err);
    }
  }, [connection, exhibition, wallet]);

  useEffect(() => {
    checkOwnedPieces();
  }, [checkOwnedPieces]);

  const checkExhibitedPieces = useCallback(async () => {
    const [escrow] = await PublicKey.findProgramAddress(
      [Buffer.from("escrow"), exhibition.property.toBuffer()],
      constants.steadRent
    );

    const owned = await findDataByOwner(connection, escrow);
    setExhibitedTokens(
      await Promise.all(
        owned
          .filter((e) => e.mint !== property.mint.mint.toString())
          .map(async (metadata) => {
            const response = await axios.get(metadata.data.uri);
            let item;

            try {
              item = await fetchExhibitionItem(
                exhibition,
                new PublicKey(metadata.mint)
              );
            } catch (err) {
              console.log(err);
            }
            return {
              metadata: metadata,
              uri: response.data.image,
              item,
            };
          })
      )
    );
  }, [connection, exhibition, property, fetchExhibitionItem]);

  useEffect(() => {
    checkExhibitedPieces();
  }, [checkExhibitedPieces]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Exhibition at{" "}
          {property.metadata?.name ||
            shortAddress(property.mint.mint.toString())}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box my="2">
            {property.imageUri && (
              <Image
                src={property.imageUri}
                rounded="lg"
                maxW="250px"
                maxH="250px"
                mx="auto"
              />
            )}
            <Wrap my="5">
              <StatsCard
                title={"Exposed pieces"}
                stat={String(exhibition.nPieces.toNumber())}
                icon={<MdStreetview size="40px" />}
              />
              <StatsCard
                title={"Total Volume"}
                stat={String(exhibition.totalVolume.toNumber() / 10 ** 9)}
                icon={<BiDollarCircle size="40px" />}
              />
              <StatsCard
                title={"Exhibitor"}
                stat={shortAddress(exhibition.exhibitor.toString())}
                icon={<AiFillFormatPainter size="40px" />}
              />
            </Wrap>
            {exhibitedTokens.length > 0 ? (
              <Box align="center">
                <Heading>Exhibited NFTs</Heading>
                <Wrap spacing="8px" my={2} justify="center">
                  {exhibitedTokens.map((metadata) => (
                    <ExhibitedTokenCard
                      key={metadata.uri}
                      exhibition={exhibition}
                      metadata={metadata}
                    />
                  ))}
                </Wrap>
              </Box>
            ) : (
              <Heading fontSize="2xl" textAlign="center">
                This exhibition is still empty...
              </Heading>
            )}
          </Box>
          {wallet.publicKey?.equals(exhibition.exhibitor) && (
            <>
              <Divider my="5" />
              <Box my="2" align="center">
                <Heading>Your NFTs</Heading>
                <Text>Tokens you can transfer to the exhibition</Text>
                {ownedTokens.length > 0 ? (
                  <Wrap justify="center" m="2">
                    {ownedTokens
                      .filter(
                        (e) =>
                          e.metadata.mint !== exhibition.property.toString()
                      )
                      .map((metadata) => (
                        <DepositTokenCard
                          key={metadata.metadata.mint.toString()}
                          exhibition={exhibition}
                          metadata={metadata}
                        />
                      ))}
                  </Wrap>
                ) : (
                  <Text fontSize="xl" textAlign="center" my="5">
                    You have no token to add to your exhibition
                  </Text>
                )}
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExhibitionModal;
