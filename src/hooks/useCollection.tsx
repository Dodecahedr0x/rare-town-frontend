import { useContext } from "react";

import { CollectionContext } from "../contexts/Collection";

const useBalances = () => {
  return {
    ...useContext(CollectionContext),
  };
};

export default useBalances;
