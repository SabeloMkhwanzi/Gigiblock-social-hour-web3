import React, { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { shortAddress } from "../../utils/utils";
import { Box, Button } from "@chakra-ui/react";
import { XmtpContext } from "../../contexts/XmtpContext";

const Header = () => {
  const { connectWallet, walletAddress, signer } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);

  return (
    <Box className="header flex align-center justify-between">
      <a href={"/"}>
        <img className="logo" alt="XMTP Logo" src="gigiblock-logo.png" />
      </a>
      {walletAddress ? (
        <Box as="nav" className="flex align-center header-mobile">
          <h3>{shortAddress(walletAddress)}</h3>
          {!providerState.client && (
            <Button
              textColor="white"
              borderRadius="lg"
              bgColor="#116EBE"
              shadow="lg"
              fontSize="m"
              textTransform="uppercase"
              fontWeight="normal"
              as="kbd"
              letterSpacing={2}
              textDecoration="none"
              onClick={() => providerState.initClient(signer)}
            >
              Connect to XMTP
            </Button>
          )}
        </Box>
      ) : (
        <Button
          textColor="white"
          borderRadius="lg"
          bgColor="#116EBE"
          shadow="lg"
          fontSize="m"
          textTransform="uppercase"
          fontWeight="normal"
          as="kbd"
          letterSpacing={2}
          textDecoration="none"
          onClick={connectWallet}
        >
          {!window.ethereum || !window.ethereum.isMetaMask
            ? "Install MetaMask"
            : "Connect wallet"}
        </Button>
      )}
    </Box>
  );
};

export default Header;
