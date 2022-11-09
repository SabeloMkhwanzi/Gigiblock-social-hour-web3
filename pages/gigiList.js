import React from "react";
import JobPost from "../components/Minter/JobPost";
import { useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar/index";
import Head from "next/head";

import PillPity from "pill-pity";
import Footer from "../components/Footer/index";

export default function GigiList() {
  const patterFill = useColorModeValue("#00A4BD", "#BDE1E5");
  return (
    <PillPity
      pattern="bubbles"
      patternFill={patterFill}
      bgColor="choc.secondary"
      patternOpacity={0.1}
      padding="0, 2rem"
      minH="100vh"
    >
      <Head>
        <title>Find Work - GigiBlock</title>
        <meta
          name="GigiBlock - A web3 freelance marketplace"
          content="A web3 freelance marketplace. Accelerating the use
              of decentralized storage."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <JobPost />
      <Footer />
    </PillPity>
  );
}
