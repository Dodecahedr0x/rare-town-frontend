import { CollectionMint } from "contexts/Collection";
import { useCallback, useMemo, useState } from "react";

import useCollection from "./useCollection"

export default function usePaginatedCollection() {
  const { mints: allMints } = useCollection()

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(50)
  
  const sortedMints = useMemo(() => {
    return allMints.sort((a, b) => b.mint.received.toNumber() - a.mint.received.toNumber())
  }, [allMints])

  const mints: CollectionMint[] = useMemo(() => {
    return sortedMints.slice(pageSize * currentPage, pageSize * (currentPage + 1))
  }, [sortedMints, currentPage, pageSize])

  const isLastPage = useMemo(() => {
    return pageSize * (currentPage + 1) > allMints.length
  }, [pageSize, currentPage, allMints])

  const nextPage = useCallback(() => {
    if(!isLastPage) {
      setCurrentPage(old => old + 1)
    }
  }, [isLastPage])

  const previousPage = useCallback(() => {
    if(currentPage !== 0) {
      setCurrentPage(old => old - 1)
    }
  }, [currentPage])

  return { mints, pageSize, currentPage, isLastPage, setPageSize, nextPage, previousPage };
}