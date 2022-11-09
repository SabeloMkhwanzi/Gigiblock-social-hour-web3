import React from "react";
import { Flex, Image, Text, HStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex mx="40%" display="flex" alignItems="center">
      <Text fontSize="xs">Powered by</Text>
      <HStack>
        <Image
          alt="filecoin"
          width="5vw"
          height="calc(11vw*0.3)"
          src="https://cdn3d.iconscout.com/3d/premium/thumb/filecoin-5224421-4365139.png"
        />
        <Image
          alt="ipfs"
          width="5vw"
          height="calc(11vw*0.3)"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/600px-Ipfs-logo-1024-ice-text.png?20180220024806"
        />
        <Image
          alt="nft.storage"
          width="5vw"
          height="calc(11vw*0.3)"
          src="https://nft.storage/images/logo-nft.storage.svg"
        />
      </HStack>
    </Flex>
  );
}
