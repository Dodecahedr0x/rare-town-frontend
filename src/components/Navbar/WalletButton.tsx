import { Button, Tag, TagLabel } from "@chakra-ui/react";
import { shortAddress } from "utils";

import useCollection from "../../hooks/useCollection";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

const WalletButton: React.FC = () => {
  const { connect } = useWalletKit();
  const wallet = useConnectedWallet();
  const { userAccount } = useCollection();

  return wallet ? (
    <>
      {userAccount && (
        <Tag size="lg" variant="subtle" colorScheme="cyan">
          <TagLabel>{userAccount.amount.toNumber() / 10 ** 9} $TOWN</TagLabel>
        </Tag>
      )}
      <Button onClick={wallet.disconnect}>
        {shortAddress(wallet.publicKey.toString())}
      </Button>
    </>
  ) : (
    <Button onClick={connect}>Connect</Button>
  );
};

export default WalletButton;
