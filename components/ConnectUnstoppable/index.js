import { useState, useEffect } from "react";
import UAuth from "@uauth/js";
import { Button, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const uauth = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLEDOMAIN_CLIENT_ID,
  redirectUri: "https://gigiblock-social-hour-web3.vercel.app/",
  scope: "openid wallet",
});

export default function ConnectUnstoppable() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [authorization, setAuthorization] = useState();

  // Check to see if the user is inside the cache
  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Login with a popup and save the user
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(setAuthorization)
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Logout and delete user
  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="md"
        mx={5}
      />
    );
  }

  if (error) {
    console.error(error);
    return <>{String(error.stack)}</>;
  }

  const getEllipsisTxt = (str, n = 4) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (user && authorization) {
    return (
      <>
        <Button
          ml={2}
          bg="#0D67FE"
          fontSize={{ base: "ms", md: "md" }}
          cursor="pointer"
          borderRadius="xl"
          onClick={handleLogout}
          shadow="2xl"
        >
          {/* {getEllipsisTxt(user.wallet_address)}
          {user.name} */}
          <Image alt="ud-logo" src="/ud-logo.svg" px={1} />
          <Text fontSize={["sm", "md", "lg"]}>{user.sub}</Text>
        </Button>
      </>
    );
  }

  return (
    <Button
      ml={2}
      bg="#0D67FE"
      radius="md"
      fontSize={{ base: "ms", md: "md" }}
      cursor="pointer"
      borderRadius="xl"
      onClick={handleLogin}
      shadow="xl"
    >
      <Image alt="ud-logo" src="/ud-logo.svg" px={1} />
      <Text fontSize={["xs", "md"]}>Login UNS Domain</Text>
    </Button>
  );
}
