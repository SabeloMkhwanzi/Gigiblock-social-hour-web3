/* eslint-disable no-use-before-define */

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { StarIcon } from "@chakra-ui/icons";
import Waste from "../../utils/Waste.json";
import { wastemarketplaceAddress2 } from "../../config";

import {
  Box,
  Text,
  Flex,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Link,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function TalentUploads() {
  const HeaderTextColor = useColorModeValue("black", "#00A4BD");

  //  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadWaste();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  async function loadWaste() {
    /* create a generic provider and query for Wastes */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://matic-mumbai.chainstacklabs.com"
    );
    const contract = new ethers.Contract(
      wastemarketplaceAddress2,
      Waste.abi,
      provider
    );
    const data = await contract.fetchMarketItems();
    // console.log("Waste data fetched from contract", data);
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    // eslint-disable-next-line arrow-parens
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        // console.log("token Uri is ", tokenUri);
        const httpUri = getIPFSGatewayURL(tokenUri);
        // console.log("Http Uri is ", httpUri);
        const meta = await axios.get(httpUri);
        const price = ethers.utils.formatUnits(i.price.toString(), "ether");

        const item = {
          price,
          tokenId: i.tokenId.toNumber(),
          image: getIPFSGatewayURL(meta.data.image),
          name: meta.data.name,
          description: meta.data.description,
          country: meta.data.properties.country,
          collectionPoint: meta.data.properties.collectionPoint,
          weight: meta.data.properties.weight,
        };
        // console.log("item returned is ", item);
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  // eslint-disable-next-line no-unused-vars
  async function recycle(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    // console.log("item id clicked is", nft.tokenId);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      wastemarketplaceAddress2,
      Waste.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    console.log("waste transaction completed");
    const token = nft.tokenId;
    // console.log("token id is ", token);
    loadWaste();
    // navigate("/view", { state: token });
  }
  if (loadingState === "loaded" && !nfts.length) {
    return (
      <Box>
        <Text className="px-20 py-10 text-3xl">No Entries yet</Text>
      </Box>
    );
  }

  //Random number for date using npm = random-number
  var rn = require("random-number");
  var options = {
    min: 2,
    max: 10,
    integer: true,
  };

  return (
    <>
      <Text
        mb={1}
        pl={2}
        ml={5}
        fontSize="3xl"
        fontWeight="bold"
        color="#00A4BD"
      >
        Find Talent
      </Text>
      <Text
        mb={1}
        pl={2}
        ml={5}
        fontSize="xl"
        fontFamily="heading"
        color={HeaderTextColor}
      >
        `Connecting the world, bring talent, Working together, Changing the
        world - Web3 decentralized storage`
      </Text>
      <SimpleGrid
        columns={[1, null, 3]}
        justifyContent="center"
        alignItems="center"
      >
        {nfts.map((nft, i) => (
          <Flex p={30} key={i}>
            <Box
              maxW="500"
              height="300"
              bg="#BDE1E5"
              _dark={{ bg: "gray.800" }}
              borderWidth="xl"
              rounded="lg"
              shadow="xl"
            >
              <HStack>
                <Avatar
                  px={1}
                  size="2xl"
                  alt="image"
                  src={`${nft.image}#toolbar=0`}
                />
                <VStack>
                  {/* <Badge rounded="full" px="2" mt="2" colorScheme="blue">
                    Feature
                  </Badge> */}
                  <Link
                    mt="2"
                    mb={1}
                    fontSize="xl"
                    fontWeight="bold"
                    fontFamily="heading"
                  >
                    {nft.name}
                  </Link>
                  <Text
                    mb={1}
                    fontSize="lg"
                    fontWeight="semibold"
                    fontFamily="body"
                  >
                    {nft.weight}
                  </Text>

                  <HStack>
                    <Text fontSize="smaller" fontWeight="normal">
                      🌍{nft.country}
                    </Text>
                    <Text fontSize="smaller" fontWeight="normal">
                      📅 Posted {rn(options)} days ago
                    </Text>
                  </HStack>
                  <Text mb={1} fontSize="smaller" fontWeight="normal">
                    💸 bid : $
                    {nft.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    /hr
                  </Text>
                  <HStack spacing={1} display="flex" alignItems="center" mt={2}>
                    <StarIcon
                      color="gray.700"
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                    <StarIcon
                      color="gray.700"
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                    <StarIcon
                      color="gray.700"
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                    <StarIcon
                      color="gray.700"
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                    <StarIcon color="gray.500" />
                  </HStack>
                  <ReactReadMoreReadLess
                    fontSize="smaller"
                    fontWeight="normal"
                    charLimit={80}
                    readMoreText={"Read more"}
                    readLessText={"Read less"}
                    as="button"
                  >
                    {nft.description}
                  </ReactReadMoreReadLess>

                  <Button
                    cursor="pointer"
                    textAlign="center"
                    bgColor="#CBD6E1"
                    borderColor="#CBD6E1"
                    borderRadius="full"
                    width={100}
                    minH={10}
                    mx="10"
                    mt="0.5%"
                    onClick={() => recycle(nft)}
                  >
                    <Link
                      fontSize={{ base: "ms", md: "md" }}
                      py={3}
                      fontFamily="monospace"
                      fontWeight="semibold"
                      letterSpacing={1}
                      href={"https://xmtp-quickstart-react.vercel.app/"}
                    >
                      <Text fontFamily="heading">Connect</Text>
                    </Link>
                  </Button>
                </VStack>
              </HStack>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
