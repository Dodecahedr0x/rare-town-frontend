import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Select,
  Spinner,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";

import useCollection from "../../hooks/useCollection";
import TokenCard from "../../components/TokenCard";
import usePaginatedCollection, {
  SteadFilter,
} from "hooks/usePaginatedCollection";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getAllAttributes } from "utils";

const allAttributes = getAllAttributes();

const Leaderboard: React.FC = () => {
  const [filters, setFilters] = useState<SteadFilter>({});
  const [, updateState] = React.useState<Object>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const { collection } = useCollection();
  const {
    mints,
    currentPage,
    pageSize,
    isLastPage,
    previousPage,
    nextPage,
    setPageSize,
  } = usePaginatedCollection(filters);

  const handleSetFilter = useCallback(
    (attributeType: string, value?: string) => {
      setFilters((old) => {
        // TODO: allow multiple filters
        if (!value) delete old[attributeType];
        else old[attributeType] = [value];
        return old;
      });
      forceUpdate()
    },
    [forceUpdate]
  );

  return (
    <Flex direction="column" w="100%" align="center" p="10px">
      <Wrap direction="row" justify="center" mb="10px">
        {Object.keys(allAttributes).map((attributeType) => (
          <Box key={attributeType}>
            <Text>{attributeType}</Text>
            <Select
              onChange={(e) => handleSetFilter(attributeType, e.target.value)}
            >
              <option value={undefined}></option>
              {allAttributes[attributeType].values.map((attribute) => (
                <option key={attribute} value={attribute}>{attribute}</option>
              ))}
            </Select>
          </Box>
        ))}
      </Wrap>
      {collection ? (
        <Box justify="center" align="center" w="full">
          <Wrap
            align="center"
            justify="center"
            w="95%"
            direction="row"
            margin="auto"
          >
            {mints.map((item, i) => (
              <TokenCard
                key={item.mint.mint.toString() + item.rank}
                token={item}
              />
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
            <Select
              onChange={(e) => setPageSize(Number(e.target.value))}
              value={pageSize}
            >
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
      <Tag my="10px" color="teal">
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/Dodecahedr0x"
          target="_blank"
          rel="noreferrer"
        >
          @Dodecahedr0x
        </a>
        . Donate to UuGEwN9aeh676ufphbavfssWVxH7BJCqacq1RYhco8e
      </Tag>
    </Flex>
  );
};

export default Leaderboard;
