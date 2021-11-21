import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Select,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";

import useCollection from "../../hooks/useCollection";
import { TokenCard } from "./components";
import usePaginatedCollection from "hooks/usePaginatedCollection";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Home: React.FC = () => {
  const { collection } = useCollection();
  const {
    mints,
    currentPage,
    isLastPage,
    previousPage,
    nextPage,
    setPageSize,
  } = usePaginatedCollection();

  return (
    <Flex direction="column" w="100%" align="center" p="10px">
      {collection ? (
        <Box justify="center" align="center" w="full">
          <Wrap
            align="center"
            justify="center"
            w="80%"
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
              leftIcon={<ChevronLeftIcon />}
            >
              Previous
            </Button>
            <Button as={Box}>{currentPage + 1}</Button>
            <Button
              w="100px"
              colorScheme="blue"
              onClick={nextPage}
              disabled={isLastPage}
              rightIcon={<ChevronRightIcon />}
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
      ) : (
        <Box justify="center" align="center" width="100%" my="40px">
          <Text fontSize="xl" align="center">
            <b>Loading tokens...</b>
          </Text>
          <Spinner size="xl" thickness={"8px"} />
        </Box>
      )}
    </Flex>
  );
};

export default Home;
