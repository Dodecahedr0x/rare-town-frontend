import { useContext } from "react";

import { SteadRentContext } from "../contexts/SteadRent";

const useBalances = () => {
  return {
    ...useContext(SteadRentContext),
  };
};

export default useBalances;
