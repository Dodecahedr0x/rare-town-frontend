import React, { useMemo } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Flex,
  Select,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";

import useCollection from "../../hooks/useCollection";
import { TokenCard } from "./components";
import usePaginatedCollection from "hooks/usePaginatedCollection";

const MySteads: React.FC = () => {
  const { collection } = useCollection();
  const {
    mints: allMints,
    currentPage,
    isLastPage,
    previousPage,
    nextPage,
    setPageSize,
  } = usePaginatedCollection();

  const mints = useMemo(() => {
    return allMints.filter((e) => e.owned);
  }, [allMints]);

  console.log(allMints, mints);

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
              <ButtonGroup variant="outline" isAttached spacing="6" m="10px">
                <Button
                  w="100px"
                  colorScheme="blue"
                  onClick={previousPage}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <Button disabled>{currentPage + 1}</Button>
                <Button
                  w="100px"
                  colorScheme="blue"
                  onClick={nextPage}
                  disabled={isLastPage}
                >
                  Next
                </Button>
              </ButtonGroup>
              <Box w="100px">
                <Text>Page Size</Text>
                <Select onChange={(e) => setPageSize(Number(e.target.value))}>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Select>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box justify="center" align="center" width="100%" my="40px">
          <Text fontSize="xl" align="center">
            <b>Loading adventurers...</b>
          </Text>
          <Spinner size="xl" color="pink.400" thickness={"8px"} />
        </Box>
      )}
    </Flex>
  );
};

export default MySteads;
