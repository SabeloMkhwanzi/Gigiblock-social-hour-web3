/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import { useState } from "react";
import { NFTStorage } from "nft.storage";
//import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Waste from "../../utils/Waste.json";
import { wastemarketplaceAddress2 } from "../../config";
import {
  Text,
  Box,
  Button,
  Input,
  Textarea,
  Select,
  VStack,
} from "@chakra-ui/react";

// eslint-disable-next-line max-len
const APIKEY = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY;

const TalentSkillshare = () => {
  //const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({
    name: "Experience",
    description: "",
    country: "",
  });

  const handleFileUpload = (event) => {
    console.log("file for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description, country, weight, collectionPoint, price } =
      formInput;
    if (
      !name ||
      !description ||
      !country ||
      !weight ||
      !collectionPoint ||
      !inputFile
    )
      return;
    const nftStorage = new NFTStorage({ token: APIKEY });
    try {
      console.log("Trying to upload asset to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name,
        description,
        image: inputFile,
        properties: {
          country,
          collectionPoint,
          weight,
          price,
        },
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save to NFT.Storage - Aborted minting Waste.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const price = ethers.utils.parseUnits(formInput.price, "ether");
      const connectedContract = new ethers.Contract(
        wastemarketplaceAddress2,
        Waste.abi,
        provider.getSigner()
      );
      console.log("Connected to contract", wastemarketplaceAddress2);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createToken(
        metadata.url,
        price
      );
      console.log("profile successfully created and sent to Blockchain");
      // await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("registration was successfully!");
    console.log("Preview details completed");
  };

  const mintNFTToken = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);

    // eslint-disable-next-line no-undef
    navigate("/explore");
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  return (
    <>
      <Box
        bg="#BDE1E5"
        _dark={{ bg: "gray.800" }}
        maxWidth="700"
        maxH="800"
        borderRadius="lg"
        rounded="lg"
        shadow="xl"
        px="5"
        py="5"
        mx="auto"
        my={16}
      >
        <Text textTransform="uppercase" pb="1" pt="1" textAlign="center">
          Share Talent
        </Text>
        <Box>
          <VStack direction="vertical">
            <Select
              textTransform="uppercase"
              maxWidth="400"
              textAlign="center"
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            >
              <option value="Marketing Technologist">
                MARKETING TECHNOLOGIST
              </option>
              <option value="SEO Consultant">SEO CONSULTANT</option>
              <option value="WEB Analytics Developer">
                WEB ANALYTICS DEVELOPER
              </option>
              <option value="Digital marketing manages ">
                Digital marketing manages
              </option>
              <option value="social media manager">social media manager</option>
              <option value="Content Manager">CONTENT MANAGER</option>
              <option value="Content Strategist">CONTENT STRATEGIST</option>
              <option value="Solidity Developer">Solidity Developer</option>
              <option value="Blockchain Game Developer">
                Blockchain Game Developer
              </option>
              Senior Backend Engineer
              <option value="Senior Backend Engineer">
                Senior Backend Engineer
              </option>
              <option value="Project Manager">Project Manager</option>
              <option value="Web3 Tech Lead">Web3 Tech Lead</option>
              <option value="Blockchain Game Designer">
                Blockchain Game Designer
              </option>
              <option value="UX Designer">UX DESIGNER</option>
              <option value="UI Designer">UI DESIGNER</option>
              <option value="Software developers">Software developers</option>
              <option value="System Egineer">SYSTEMS ENGINEER</option>
              <option value="Database Administrator">
                DATABASE ADMINISTRATOR
              </option>
              <option value="Data Analyst">DATA ANALYST</option>
              <option valuel="Cloud Architect">CLOUD ARCHITECT</option>
              <option value="Technical Lead">TECHNICAL LEAD</option>
              <option value="Devops Manager">DEVOPS MANAGER</option>
              <option value="Product Manager">PRODUCT MANAGER</option>
              <option value="Technical Account Manager">
                TECHNICAL ACCOUNT MANAGER
              </option>
              <option value="Mobile APP Developer">MOBILE APP DEVELOPER</option>
            </Select>
            <Input
              maxW="400"
              placeholder="Full Name"
              className="mt-5 border rounded p-4 text-xl"
              onChange={(e) =>
                updateFormInput({ ...formInput, weight: e.target.value })
              }
            />

            <Input
              maxW="400"
              placeholder="Location"
              onChange={(e) =>
                updateFormInput({ ...formInput, country: e.target.value })
              }
            />

            <Textarea
              mt="2"
              maxWidth="400"
              minH="200"
              placeholder="Work Experience plus your address to you contact eg. 0xf7"
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
              rows={2}
            />

            <Input
              maxWidth="400"
              placeholder="Hourly Rate"
              mt="2"
              onChange={(e) =>
                updateFormInput({ ...formInput, price: e.target.value })
              }
            />
            <Input
              maxWidth="400"
              placeholder="Enter Polygon Address to mint your Skills"
              mt="2"
              onChange={(e) =>
                updateFormInput({
                  ...formInput,
                  collectionPoint: e.target.value,
                })
              }
            />

            <Box maxWidth="400">
              <Text textAlign="center">Upload Photo/Avatar</Text>
              <form>
                <Input
                  maxWidth="400"
                  mt={2}
                  type="file"
                  onChange={handleFileUpload}
                />
              </form>
              {txStatus && <Text>{txStatus}</Text>}

              {metaDataURL && (
                <Text className="text-blue">
                  <a href={metaDataURL} className="text-blue">
                    Metadata on IPFS
                  </a>
                </Text>
              )}

              {txURL && (
                <Text>
                  <a href={txURL} className="text-blue">
                    mint transaction
                  </a>
                </Text>
              )}

              {errorMessage}

              {imageView && (
                <iframe
                  className="mb-10"
                  title="Joblisting"
                  src={imageView}
                  alt="Company logo"
                  frameBorder="0"
                  scrolling="auto"
                  height="50%"
                  width="100%"
                />
              )}
            </Box>
          </VStack>
          <Button
            mt="2"
            color="black"
            fontSize={{ base: "ms", md: "md" }}
            cursor="pointer"
            textAlign="center"
            bgColor="#CBD6E1"
            _dark={{ bg: "#CBD6E1" }}
            borderRadius="full"
            maxW="100%"
            shadow="xl"
            onClick={(e) => mintNFTToken(e, uploadedFile)}
          >
            Share
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default TalentSkillshare;
