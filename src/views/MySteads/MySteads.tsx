import React, { useMemo } from "react";
import {
  Box,
  Link,
  Flex,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";

import useCollection from "../../hooks/useCollection";
import { TokenCard } from "./components";

const MySteads: React.FC = () => {
  const { collection, mints: allMints } = useCollection();

  const mints = useMemo(() => {
    return allMints.filter((e) => e.owned);
  }, [allMints]);

  return (
    <Flex direction="column" w="100%" align="center" p="10px">
      {collection ? (
        <Box justify="center" align="center" w="full">
          {mints.length === 0 ? (
            <Box my="20px">
              <Text fontSize="4xl">You don't own any Solstead...</Text>
              <Link fontSize="2xl" href="https://solsteads.com/marketplaces" target="_blank">Find one here</Link>
            </Box>
          ) : (
            <Box>
              <Wrap
                align="center"
                justify="center"
                w="100%"
                direction="row"
                margin="auto"
              >
                {mints.map((item, i) => (
                  <TokenCard key={item.imageUri + item.rank} token={item} />
                ))}
              </Wrap>
            </Box>
          )}
        </Box>
      ) : (
        <Box justify="center" align="center" width="100%" my="40px">
          <Text fontSize="xl" align="center">
            <b>Loading steads...</b>
          </Text>
          <Spinner size="xl" thickness={"8px"} />
        </Box>
      )}
    </Flex>
  );
};

export default MySteads;
