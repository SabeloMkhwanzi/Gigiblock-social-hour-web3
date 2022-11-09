import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Colormode() {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("light", "dark");
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);

  return (
    <IconButton
      size="md"
      borderRadius="full"
      fontSize="lg"
      variant="ghost"
      color="#116EBE"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
    />
  );
}
