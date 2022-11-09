import React from "react";
import { Button } from "@chakra-ui/react";

const CardHeader = ({ setIsNewMsg }) => {
  return (
    <div className="flex justify-between align-center">
      <div>
        <h4>Conversations</h4>
      </div>
      <div>
        <Button
          textColor="black"
          borderRadius="lg"
          bgColor="#116EBE"
          shadow="lg"
          fontSize="m"
          textTransform="uppercase"
          fontWeight="normal"
          as="kbd"
          letterSpacing={1}
          textDecoration="none"
          onClick={() => setIsNewMsg(true)}
        >
          + New message
        </Button>
      </div>
    </div>
  );
};

export default CardHeader;
