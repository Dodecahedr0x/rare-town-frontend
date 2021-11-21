import { Button, Tag, TagLabel } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletModal from "../../components/WalletModal";
import { useEffect } from "react";
import { shortAddress } from "utils";

import useCollection from "../../hooks/useCollection";

const WalletButton: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const wallet = useWallet();
  const { userAccount } = useCollection();

  useEffect(() => {
    if (wallet.connected) {
      onClose();
    }
  }, [wallet, onClose]);

  return (
    <>
      <WalletModal isOpen={isOpen} onClose={onClose} />
      {wallet.connected ? (
        <>
          {userAccount && (
            <Tag size="lg" variant="subtle" colorScheme="cyan">
              <TagLabel>{userAccount.amount.toNumber() / 10 ** 9} $TOWN</TagLabel>
            </Tag>
          )}
          <Button onClick={wallet.disconnect}>
            {shortAddress(wallet.publicKey?.toString())}
          </Button>
        </>
      ) : (
        <Button onClick={onOpen}>Connect</Button>
      )}
    </>
  );
};

export default WalletButton;
