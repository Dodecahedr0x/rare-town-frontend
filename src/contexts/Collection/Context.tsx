import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    mints: [],
    createAccount: () => new Promise(() => {}),
    claimToken: () => new Promise(() => {}),
    spendTokens: () => new Promise(() => {})
});

export default Context;
