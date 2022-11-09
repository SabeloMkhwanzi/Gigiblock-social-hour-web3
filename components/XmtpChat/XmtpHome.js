import React, { useContext, useState } from "react";
import { XmtpContext } from "../../contexts/XmtpContext";
import useSendMessage from "../../hooks/useSendMessage";
import Header from "./Header";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../../hooks/useStreamConversations";

import { useColorModeValue } from "@chakra-ui/react";
import PillPity from "pill-pity";
import Footer from "../Footer";

const XmtpHome = () => {
  const patterFill = useColorModeValue("#00A4BD", "#BDE1E5");

  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvo(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress);
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvo(newAddress);
        setErrorMsg("");
      }
    }
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  return (
    <PillPity
      pattern="bubbles"
      patternFill={patterFill}
      bgColor="choc.secondary"
      patternOpacity={0.1}
      padding="0, 2rem"
      minH="100vh"
      className="flex align-center flex-dir-col home"
    >
      <Header />
      {client && (
        <div className="card">
          {!selectedConvo && !isNewMsg ? (
            <>
              <CardHeader setIsNewMsg={setIsNewMsg} />
              <div className="conversation-list">
                <ConversationList
                  convoMessages={convoMessages}
                  setSelectedConvo={setSelectedConvo}
                />
              </div>
            </>
          ) : (
            <>
              <div className="conversation-header align-center flex justify-start">
                <BackButton reset={reset} />
                <div className="identicon"></div>
                <AddressInput
                  isNewMsg={isNewMsg}
                  onInputBlur={onInputBlur}
                  errorMsg={errorMsg}
                  selectedConvo={selectedConvo}
                />
              </div>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvo) ?? []}
                selectedConvo={selectedConvo}
              />
              <hr />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
              />
            </>
          )}
        </div>
      )}
      <Footer />
    </PillPity>
  );
};

export default XmtpHome;
