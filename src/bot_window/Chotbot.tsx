

import React, { ReactNode, RefObject, useCallback, useRef } from "react";

import Messages from "./messages/Messages";
import {useChatRequest} from "../hooks/requests";
import { useError, useInput, useRetryInput } from "../hooks/universalHooks";
import {ChatSenderObjectTypes, Conversation} from "../interface/SessionObjectInterfaces";
import {getTime} from "../message_functions/getter";
import {conversationActions} from "../redux/slice";
import {getFromSessionStorage} from "../message_functions/save_and_get";
import ChaBotHeading from "./ChaBotHeading";
import InputField from "./InputField";
import {useDispatch} from "react-redux";
import SysLoadingSpinner from "./coponents/SysLoadingIndicator";


interface ChotbotType {
  updateOpen: () => void;
  systemError: string;
  init: () => Promise<void>;
  sysLoading: boolean;
  updateLoading: (value: boolean) => void;
  loading: boolean;
  frameRef: RefObject<HTMLIFrameElement>;

}


const ChatBot: React.FC<ChotbotType> = (
  {
    updateOpen,
    systemError,
    init,
    sysLoading,
    updateLoading,
    loading,
    frameRef
  }
) => {

  const { error, updateError } = useError();
  const { input, updateInput } = useInput();

  const { retryInput, updateRetryInput } = useRetryInput();

  const sessionData = getFromSessionStorage("infoData");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatArgs = { updateLoading, updateError, updateRetryInput };

  const { handleChatRequest } = useChatRequest(chatArgs);

  const inputContainerRef = useRef(null);
  const headingContainerRef = useRef(null);


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
      // retryInput.trim().length > 0 ||
      systemError.trim().length === 0;
  }

  const chatRequestProcess = async () => {
    console.log("chatRequestProcess gets called...");
    if ( !loading && getInputLenBool() ) {
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
    } else {
      console.log("Action restricted...")
    }
  }

  const getColor = useCallback(() => {
    return sessionData?.config?.primaryText || "white"
  }, [sessionData?.config?.primaryText]);

  const getBackgroundColor = useCallback(() => {
    return sessionData?.config.primary || "black"
  }, [sessionData?.config?.primary]);

  const getName = useCallback(() => {
    const pubName = sessionData?.config?.pubName
    console.log("PUBNAME SRC:", pubName);
    return pubName
  }, [sessionData?.config?.pubName])

  const getDataUrl = useCallback(() => {
    return sessionData?.dataUrl
  }, [sessionData?.dataUrl])


  const mainContent = (): ReactNode  => {
    if (sysLoading) {
      return <SysLoadingSpinner />
    }
    return(
      <>
        <ChaBotHeading
          headingContainerRef={headingContainerRef}
          updateOpen={updateOpen}
          init={init}
          background={getBackgroundColor()}
          color={getColor()}
          name={getName()}
        />

        <Messages
          frameRef={frameRef}
          inputContainerRef={inputContainerRef}
          headingContainerRef={headingContainerRef}
          error={error}
          primary={getBackgroundColor()}
          primaryText={getColor()}
          systemError={systemError}
          loading={loading}
          dataUrl={getDataUrl()}
          sysLoading={sysLoading}
          pubName={getName()}
          chatRequestProcess={chatRequestProcess}
        />

        <InputField
          inputContainerRef={inputContainerRef}
          sysLoading={sysLoading}
          error={systemError}
          input={input}
          chatRequestProcess={chatRequestProcess}
          updateInput={updateInput}
          textareaRef={textareaRef}
        />
      </>
    )
  }

  const getBgColor = () => {
    return sysLoading ? "sysLodingContainer" : "";
  }

  return (
    <div
      className={getBgColor()}
      style={{
        width: "100%", height: "100%", margin: 0, position: "absolute", left: 0, top: 0, overflow: "hidden", //backgroundColor: "white"
      }} >
      {
        mainContent()
      }
    </div>
  );
};

export default ChatBot;

