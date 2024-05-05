

import React, {useRef} from "react";

import Messages from "./messages/Messages";
import {useChatRequest} from "../hooks/requests";
import { useError, useInput, useLoading, useRetryInput } from "../hooks/universalHooks";
import {ChatSenderObjectTypes, Conversation} from "../interface/SessionObjectInterfaces";
import {getTime} from "../message_functions/getter";
import {conversationActions} from "../redux/slice";
import {getFromSessionStorage} from "../message_functions/save_and_get";
import ChaBotHeading from "./ChaBotHeading";
import InputField from "./InputField";
import {useDispatch} from "react-redux";


interface ChotbotType {
  updateOpen: () => void;
  systemError: string;
  init: () => Promise<void>;
  sysLoading: boolean;
}

const poweredByUrl: string = "https://www.botworld.cloud";

const ChatBot: React.FC<ChotbotType> = ({updateOpen, systemError, init, sysLoading}) => {

  const { error, updateError } = useError();
  const { input, updateInput } = useInput();
  const { loading, updateLoading } = useLoading();
  const { retryInput, updateRetryInput } = useRetryInput();

  const chatArgs = { updateError, updateLoading, updateRetryInput };

  const { handleChatRequest } = useChatRequest(chatArgs);

  const dispatch = useDispatch();

  const getUserMessage = (): Conversation => {
    console.log("getUserMessage gets rendered...");
    return {
      text: input,
      time: getTime(),
      publisher: "USER"
    }
  }

  const getInput = () => {
    if (input.length > 0) {
      return input;
    } else {
      return retryInput;
    }
  }

  const getInputLenBool = () => {
    return input.trim().length > 0 ||
      retryInput.trim().length > 0 ||
      systemError.trim().length === 0;
  }

  const chatRequestProcess = async () => {
    console.log("chatRequestProcess gets called...");
    if ( !loading && getInputLenBool()) {
      const userMessage = getUserMessage();
      console.log("ADD SER MESSAGE TO STORE:", userMessage);
      dispatch(conversationActions.AddMessage({ newMessage: userMessage }));

      console.log("CLEAR INPUT");

      if (retryInput.trim().length === 0) {
        updateRetryInput(input);
      }

      updateInput("");

      const sessionData = getFromSessionStorage("infoData");
      console.log("GETTING DATA:", sessionData)
      if (sessionData && sessionData.botId && sessionData.clientId && sessionData.chatsLeft > 0) {
        const senderObject: ChatSenderObjectTypes = {
          question: getInput(),
          data: sessionData.botId,
          client_id: sessionData.clientId
        }

        await handleChatRequest(senderObject);

      } else {
        console.log("No data stored")
        updateError("Error");
      }
    }
  }

  console.log("START TEXT AREA WILL BE RENDERED");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  console.log("ref defined");

  return (
    <div
      style={{
        width: "400px",
        position: "fixed",
        bottom: 110,
        right: 30,
        zIndex: 10002,
        borderRadius: "18px",
        boxShadow:
          "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
        height: "700px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        maxWidth: "100%",
        maxHeight: "100%",
        textAlign: "center",
        fontSize: "1.125rem",
        color: "#333333",
        fontFamily: "Inter",
        pointerEvents: "all",
      }}
    >
      <ChaBotHeading updateOpen={updateOpen} init={init} />
      <Messages
        error={error}
        systemError={systemError}
        loading={loading}
        sysLoading={sysLoading}
        chatRequestProcess={chatRequestProcess}
      />
      <div style={{ height: "1.2px", backgroundColor: "#F3F4F6" }} />
      <InputField
        sysLoading={sysLoading}
        error={systemError}
        input={input}
        chatRequestProcess={chatRequestProcess}
        updateInput={updateInput}
        textareaRef={textareaRef}
      />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          paddingBottom: 10,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <a
          color={"black"}
          style={{ fontSize: 12, color: "black" }}
          href={poweredByUrl}
          target="_blank"
          rel="noopener noreferrer">
          Powered by BotWorld.cloud
        </a>
      </div>
    </div>
  );
};
console.log("Finished loading ChatBot...")
export default ChatBot;
