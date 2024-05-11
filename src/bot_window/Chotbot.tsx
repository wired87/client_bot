

import React, { useCallback, useRef } from "react";

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
  updateLoading: (value: boolean) => void;
  loading: boolean;
}

const poweredByUrl: string = "https://www.botworld.cloud";

const ChatBot: React.FC<ChotbotType> = (
  {
    updateOpen,
    systemError,
    init,
    sysLoading,
    updateLoading,
    loading
  }
) => {

  const { error, updateError } = useError();
  const { input, updateInput } = useInput();

  const { retryInput, updateRetryInput } = useRetryInput();

  const sessionData = getFromSessionStorage("infoData");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const getColor = useCallback(() => {
    return sessionData?.config?.primaryText || "white"
  }, [sessionData?.config?.primaryText]);

  const getBackgroundColor = useCallback(() => {
    return sessionData?.config.primary || "black"
  }, [sessionData?.config?.primary]);

  const getName = useCallback(() => {
    return sessionData?.config?.name || "BW"
  }, [sessionData?.config?.name])

  return (
    <div
      style={{
        width: 400, height: 700, backgroundColor: "blue", margin: 0, position: "absolute", left: 0, top: 0
      }} >

      <ChaBotHeading
        updateOpen={updateOpen}
        init={init}
        background={getBackgroundColor()}
        color={getColor()}
        name={getName()}
      />

      <Messages
        error={error}
        systemError={systemError}
        loading={loading}
        sysLoading={sysLoading}
        chatRequestProcess={chatRequestProcess}
      />

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
          position:"absolute",
          bottom: 0
        }} >
        <a
          color={"black"}
          style={
          {
            fontSize: 12,
            color: "black",
            fontFamily: "Roboto, sans-serif",
            fontStyle: "normal",
          }}
          href={poweredByUrl}
          target="_blank"
          rel="noopener noreferrer">
          Powered by BotWorld.cloud
        </a>
      </div>
    </div>
  );
};

export default ChatBot;
