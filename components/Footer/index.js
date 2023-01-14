import React from "react";
import { Flex, Image, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Flex mx="40%" display="flex" alignItems="center">
      <Text fontWeight="semibold" fontSize="md">
        Powered by
      </Text>
      <HStack>
        <Link href="https://filecoin.io/" target="_blank">
          <Image
            target="_blank"
            alt="filecoin"
            width="5vw"
            height="calc(11vw*0.3)"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/filecoin-5224421-4365139.png"
          />
        </Link>
        <Link href="https://ipfs.tech/" target="_blank">
          <Image
            target="_blank"
            alt="ipfs"
            width="5vw"
            height="calc(11vw*0.3)"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/600px-Ipfs-logo-1024-ice-text.png?20180220024806"
          />
        </Link>
        <Link href="https://nft.storage/" target="_blank">
          <Image
            alt="nft.storage"
            width="5vw"
            height="calc(11vw*0.3)"
            src="https://nft.storage/images/logo-nft.storage.svg"
          />
        </Link>
        <Link href="https://unstoppabledomains.com/" target="_blank">
          <Image
            target="_blank"
            alt="Unstoppable Domains"
            width="5vw"
            height="calc(11vw*0.3)"
            src="/ud-logo.svg"
          />
        </Link>
      </HStack>
    </Flex>
  );
}
