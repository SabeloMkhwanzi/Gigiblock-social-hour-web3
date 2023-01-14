import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useDisclosure,
  Stack,
  IconButton,
  Button,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Login from "../Login/index";

//Components Imports
import Colormode from "../Colormode/index";
import ConnectUnstoppable from "../ConnectUnstoppable";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const BodyBgColor = useColorModeValue("white", "gray.800");
  const TextColor = useColorModeValue("black", "white");
  const ButtonBgColor = useColorModeValue("#CBD6E1", "gray.600");

  return (
    <>
      <Box
        bg={BodyBgColor}
        justify-content="space-between"
        alignItems="center"
        width="full"
        padding="20px 60px"
        rounded="lg"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            color="purple.600"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <a href={"/"}>
            <Image
              src="/gigiblock-logo.png"
              alt="gigiblock-logo"
              width="8vw"
              height="calc(13vw*0.3)"
              display={{ base: "none", md: "flex" }}
            />
          </a>

          <HStack spacing={5} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Stack
                direction={"row"}
                spacing={5}
                justify={"center"}
                align={"center"}
              >
                <Button
                  borderRadius="full"
                  ml={1}
                  minW="100"
                  minH="10"
                  bgColor={ButtonBgColor}
                  shadow="xl"
                >
                  <Link
                    py={3}
                    fontSize="md"
                    fontFamily="heading"
                    fontWeight="normal"
                    letterSpacing={1}
                    color="white"
                    href={"gigiList"}
                  >
                    <Text
                      fontSize={{ base: "xs", md: "md" }}
                      textColor={TextColor}
                    >
                      Find Work
                    </Text>
                  </Link>
                </Button>
                <Button
                  borderRadius="full"
                  ml={1}
                  minW="100"
                  minH="10"
                  bgColor={ButtonBgColor}
                  shadow="xl"
                >
                  <Link
                    py={3}
                    fontSize="md"
                    fontFamily="heading"
                    fontWeight="normal"
                    letterSpacing={1}
                    color="white"
                    href={"talentList"}
                  >
                    <Text textColor={TextColor}>Find Talent</Text>
                  </Link>
                </Button>
                <Button
                  borderRadius="full"
                  ml={1}
                  minW="100"
                  minH="10"
                  bgColor={ButtonBgColor}
                  shadow="xl"
                >
                  <Link
                    py={3}
                    fontSize="md"
                    fontFamily="heading"
                    fontWeight="normal"
                    letterSpacing={1}
                    color="white"
                    href={"gigiListing"}
                  >
                    <Text textColor={TextColor}>Post Work</Text>
                  </Link>
                </Button>
                <Button
                  mr={2}
                  minW="100"
                  minH="10"
                  bgColor={ButtonBgColor}
                  borderRadius="full"
                  shadow="xl"
                >
                  <Link
                    fontSize={{ base: "ms", md: "md" }}
                    py={3}
                    fontFamily="heading"
                    fontWeight="normal"
                    letterSpacing={1}
                    href={"talentSkill"}
                  >
                    <Text textColor={TextColor}>ShareSkills</Text>
                  </Link>
                </Button>
              </Stack>
            </HStack>
          </HStack>

          <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
            <Login />
            <ConnectUnstoppable />
            <Colormode />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button
                mr={2}
                minW="100"
                minH="10"
                bgColor={ButtonBgColor}
                borderRadius="full"
                shadow="xl"
              >
                <Link
                  px={2}
                  py={1}
                  fontSize="md"
                  textTransform="uppercase"
                  fontWeight="normal"
                  letterSpacing={2}
                  bgColor={ButtonBgColor}
                  href="/"
                >
                  Home
                </Link>
              </Button>
              <Button
                mr={2}
                minW="100"
                minH="10"
                bgColor={ButtonBgColor}
                borderRadius="full"
                shadow="xl"
              >
                <Link
                  px={2}
                  py={1}
                  fontSize="md"
                  textTransform="uppercase"
                  fontWeight="normal"
                  letterSpacing={2}
                  bgColor={ButtonBgColor}
                  href="gigiList"
                >
                  Find Work
                </Link>
              </Button>
              <Button
                mr={2}
                minW="100"
                minH="10"
                bgColor={ButtonBgColor}
                borderRadius="full"
                shadow="xl"
              >
                <Link
                  px={2}
                  py={1}
                  fontSize="md"
                  textTransform="uppercase"
                  fontWeight="normal"
                  letterSpacing={2}
                  bgColor={ButtonBgColor}
                  href={"gigiListing"}
                >
                  Find Talent
                </Link>
              </Button>
              <Button bgColor={ButtonBgColor} borderRadius="full" shadow="xl">
                <Link
                  fontSize="md"
                  fontFamily="monospace"
                  fontWeight="semibold"
                  letterSpacing={1}
                  bgColor={ButtonBgColor}
                  href={"talentSkill"}
                >
                  <Text textColor={TextColor}>SkillShare</Text>
                </Link>
              </Button>
              <Flex alignItems="center">
                <Login />
                <ConnectUnstoppable />
              </Flex>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
