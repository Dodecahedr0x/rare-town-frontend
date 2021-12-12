import { CollectionMint } from "contexts/Collection";
import { useCallback, useMemo, useState } from "react";

import useCollection from "./useCollection";
import constants from "../constants";

export type SteadFilter = { [traitType: string]: string[] };

export default function usePaginatedCollection(filters: SteadFilter = {}) {
  const { mints: allMints } = useCollection();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const filteredMints = (() => {
    let filterKeys = Object.keys(filters);

    return filterKeys.length === 0
      ? allMints
      : allMints.filter((mint) => {
          let matches = 0;

          for (const attribute of constants.metadata[mint.mint.mint.toString()]
            .attributes) {
            if (
              filterKeys.includes(attribute.trait_type) &&
              filters[attribute.trait_type].includes(attribute.value)
            ) {
              matches += 1;
            }
          }

          return matches === filterKeys.length;
        });
  })();

  const sortedMints = useMemo(() => {
    return filteredMints.sort(
      (a, b) => b.mint.received.toNumber() - a.mint.received.toNumber()
    );
  }, [filteredMints]);

  const mints: CollectionMint[] = useMemo(() => {
    return sortedMints.slice(
      pageSize * currentPage,
      pageSize * (currentPage + 1)
    );
  }, [sortedMints, currentPage, pageSize]);

  const isLastPage = useMemo(() => {
    return pageSize * (currentPage + 1) > allMints.length;
  }, [pageSize, currentPage, allMints]);

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage((old) => old + 1);
    }
  }, [isLastPage]);

  const previousPage = useCallback(() => {
    if (currentPage !== 0) {
      setCurrentPage((old) => old - 1);
    }
  }, [currentPage]);

  return {
    mints,
    pageSize,
    currentPage,
    isLastPage,
    setPageSize,
    nextPage,
    previousPage,
  };
}
