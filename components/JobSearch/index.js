import {
  Box,
  Text,
  Link,
  Select,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
//import Link from "next/link";

export default function JobSeach() {
  // Color Mode
  const InputColor = useColorModeValue("black", "black");

  return (
    <>
      {/* JOB SEARCH SECTION */}
      <Box width="100%" display="flex" justifyContent="center" mt="5%">
        <Stack
          spacing="auto"
          direction="row"
          width="900px"
          bgColor="#5F9DF7"
          height="100px"
          borderRadius="md"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          padding="40px"
          shadow="xl"
        >
          {/* Job Category INPUT SECTION */}
          <Box color="black" fontSize="13" fontWeight="normal" width="160px">
            <Select
              color={InputColor}
              fontSize={{ base: "ms", md: "md" }}
              cursor="pointer"
              textAlign="center"
              borderColor="gray.700"
              borderRadius="2xl"
              minW={300}
              minH={55}
              placeholder="Category:"
              textTransform="uppercase"
              fontWeight="bold"
            >
              <option id="ny" label="MARKETING TECHNOLOGIST">
                MARKETING TECHNOLOGIST
              </option>
              <option id="lon" label="SEO CONSULTANT">
                SEO CONSULTANT
              </option>
              <option id="db" label="WEB ANALYTICS DEVELOPER">
                WEB ANALYTICS DEVELOPER
              </option>
              <option id="db" label="Digital marketing manages ">
                Digital marketing manages
              </option>
              <option id="db" label="social media manager">
                social media manager
              </option>
              <option id="db" label="CONTENT MANAGER">
                CONTENT MANAGER
              </option>
              <option id="db" label="CONTENT STRATEGIST">
                CONTENT STRATEGIST
              </option>
              <option id="db" label="UX DESIGNER">
                UX DESIGNER
              </option>
              <option id="db" label="UI DESIGNER">
                UI DESIGNER
              </option>
              <option id="db" label="Software developers">
                Software developers
              </option>
              <option id="db" label="SYSTEMS ENGINEER">
                SYSTEMS ENGINEER
              </option>
              <option id="db" label="DATABASE ADMINISTRATOR">
                DATABASE ADMINISTRATOR
              </option>
              <option id="db" label="DATA ANALYST">
                DATA ANALYST
              </option>
              <option id="db" label="CLOUD ARCHITECT">
                CLOUD ARCHITECT
              </option>
              <option id="db" label="TECHNICAL LEAD">
                TECHNICAL LEAD
              </option>
              <option id="db" label="DEVOPS MANAGER">
                DEVOPS MANAGER
              </option>
              <option id="db" label="PRODUCT MANAGER">
                PRODUCT MANAGER
              </option>
              <option id="db" label="TECHNICAL ACCOUNT MANAGER">
                TECHNICAL ACCOUNT MANAGER
              </option>
              <option id="db" label="MOBILE APP DEVELOPER">
                MOBILE APP DEVELOPER
              </option>
            </Select>
          </Box>

          {/* Job location INPUT SECTION */}
          <Box color="black" fontSize="13" fontWeight="normal" width="160px">
            <Select
              color={InputColor}
              fontSize={{ base: "ms", md: "md" }}
              cursor="pointer"
              textAlign="center"
              borderColor="gray.700"
              borderRadius="2xl"
              minW={300}
              minH={55}
              placeholder="Location:"
              textTransform="uppercase"
              fontWeight="bold"
            >
              <option id="ny" label="New York">
                New York
              </option>
              <option id="lon" label="London">
                London
              </option>
              <option id="db" label="Dubai">
                Dubai
              </option>
              <option id="db" label="Sydney ">
                Sydney
              </option>
              <option id="db" label="Toronto">
                Toronto
              </option>
              <option id="db" label="Paris">
                Paris
              </option>
              <option id="db" label="Cape Town">
                Cape Town
              </option>
              <option id="db" label="Turkey">
                Turkey
              </option>
              <option id="db" label="Spain">
                Spain
              </option>
              <option id="db" label="Netherlands">
                Netherlands
              </option>
            </Select>
          </Box>

          <Button
            py="6"
            minW="100"
            minH={50}
            borderRadius="lg"
            bgColor="green.300"
            shadow="xl"
          >
            <Link
              textTransform="uppercase"
              fontSize="md"
              fontFamily="monospace"
              fontWeight="semibold"
              letterSpacing={1}
              color="green.300"
              href={"listjobs"}
              rounded="lg"
            >
              <Text textColor="black">Search</Text>
            </Link>
          </Button>
        </Stack>
      </Box>
    </>
  );
}
