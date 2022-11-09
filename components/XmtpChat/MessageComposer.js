import React from "react";
import Input from "./Input";
import { Button } from "@chakra-ui/react";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <div className="flex" bg="#BDE1E5">
      <Input
        setNewValue={setMsgTxt}
        placeholder="Write a message"
        value={msgTxt}
      />
      <Button
        textColor="white"
        borderRadius="lg"
        bgColor="#116EBE"
        shadow="lg"
        fontSize="m"
        textTransform="uppercase"
        fontWeight="normal"
        as="kbd"
        letterSpacing={2}
        textDecoration="none"
        onClick={sendNewMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default MessageComposer;
