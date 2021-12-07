import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  isFetching: false,
  exhibitions: [],
  fetchExhibitionItem: () => new Promise(() => {}),
  startExhibition: () => new Promise(() => {}),
  cancelExhibition: () => new Promise(() => {}),
  closeExhibition: () => new Promise(() => {}),
  depositToken: () => new Promise(() => {}),
  buyToken: () => new Promise(() => {}),
  withdrawToken: () => new Promise(() => {}),
});

export default Context;
