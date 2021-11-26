import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Container,
  Image,
  Stack,
  Text,
  SkeletonCircle,
} from "@chakra-ui/react";

import allMetadata from "../../assets/all_metadata.json";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => {
      const keys = Object.keys(allMetadata);
      const randomIndex = Math.round(Math.random() * keys.length);
      const image = (allMetadata as any)[keys[randomIndex]].properties.files[1]
        .uri;
      setCurrentImage(image);
    }, 500);
    return () => clearTimeout(interval);
  }, []);

  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          A new way to explore{" "}
          <Text as={"span"} color={"blue.400"}>
            Solsteads
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Owners of Solsteads can claim a <b>$TOWN</b> token daily. This token
          can then be spent on any stead to increase its visibility. Help your
          favorite project's stead gain visibility, show some love to a neighbor
          with a great gallery or just push your stead up the leaderboard!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as={Link}
            to="leaderboard"
            rounded={"full"}
            px={6}
            colorScheme={"blue"}
            bg={"blue.400"}
            _hover={{ bg: "blue.500" }}
          >
            Get started
          </Button>
        </Stack>
        <Flex w={"full"} justify="center">
          {currentImage ? (
            <Image src={currentImage} maxW="300px" rounded="full" />
          ) : (
            <SkeletonCircle size="300px" />
          )}
        </Flex>
        <Flex direction="column">
          <Heading>How-to use:</Heading>
          <Stack direction="column" justify="start" align="start">
            <Text>1. Connect your wallet holding the Solstead in the top right corner.</Text>
            <Text>2. Go to the <b><Link to="mysteads">My Steads</Link></b> tab.</Text>
            <Text>3. Create a <b>$TOWN</b> token account by clicking the initialize button</Text>
            <Text>4. Claim tokens for each of your steads. You can only do this once a day.</Text>
            <Text>5. Spend your <b>$TOWN</b> tokens any way you'd like!</Text>
          </Stack>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
