import React from "react";

import Navbar from "../components/Navbar/index";
import PillPity from "pill-pity";
import { useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import TalentSkillshare from "../components/TalentMinter/TalentSkillshare";
import Footer from "../components/Footer/index";

export default function TalentSkill() {
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
        <title> SkillShare - GigiBlock</title>
        <meta
          name="GigiBlock - A web3 freelance marketplace"
          content="A web3 freelance marketplace. Accelerating the use
              of decentralized storage."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <TalentSkillshare />
      <Footer />
    </PillPity>
  );
}
