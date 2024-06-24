

import React, { ReactNode, RefObject, useCallback, useRef } from "react";

import Messages from "./messages/Messages";
import {useChatRequest} from "../hooks/requests";
import { useError, useInput, useRetryInput } from "../hooks/universalHooks";
import { ChatSenderObjectTypes, Conversation, InfoDataTypes } from "../interface/SessionObjectInterfaces";
import { getBotIdProcess, getTime } from "../message_functions/getter";
import {conversationActions} from "../redux/slice";
import {getFromSessionStorage} from "../message_functions/save_and_get";
import ChaBotHeading from "./ChaBotHeading";
import InputField from "./InputField";
import {useDispatch} from "react-redux";
import SysLoadingSpinner from "./coponents/SysLoadingIndicator";
import SysErrorContainer from "./coponents/SysErrorContainer";


interface ChotbotType {
  updateOpen: () => void;
  systemError: string;
  sysLoading: boolean;
  updateLoading: (value: boolean) => void;
  loading: boolean;
  frameRef: RefObject<HTMLIFrameElement>;

}


const ChatBot: React.FC<ChotbotType> = (
  {
    updateOpen,
    systemError,
    sysLoading,
    updateLoading,
    loading,
    frameRef
  }
) => {

  const { error, updateError } = useError();
  const { input, updateInput } = useInput();

  const { retryInput, updateRetryInput } = useRetryInput();

  const sessionData: InfoDataTypes | null = getFromSessionStorage("infoDataDataI");

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
    if ( !loading /*&& getInputLenBool()*/ ) {
      const userMessage = getUserMessage();
      console.log("ADD SER MESSAGE TO STORE:", userMessage);
      dispatch(conversationActions.AddMessage({ newMessage: userMessage }));
      console.log("CLEAR INPUT");

      if (retryInput.trim().length === 0) {
        updateRetryInput(input);
      }

      updateInput("");

      const senderObject: ChatSenderObjectTypes = {
        question: getInput(),
        data: sessionData?.botId ? sessionData.botId : getBotIdProcess(null)!,
        //client_id: sessionData.clientId
      }
      console.log("Sending chat request:", senderObject);
      updateError("");
      const error = await handleChatRequest(senderObject);
      if (error) {
        updateLoading(false);
        updateError(error);
      }


    } else {
      console.log("Action restricted...")
    }
  }

  const getColor = useCallback(() => {
    return "white" // sessionData?.config?.primaryText || "white"
  }, [sessionData?.config?.primaryText]);

  const getBackgroundColor = useCallback(() => {
    return "black" // sessionData?.config?.primary || "black"
  }, [sessionData?.config?.primary]);

  const getName = useCallback(() => {
    return "" // sessionData?.config?.pubName || ""
  }, [sessionData?.config?.pubName])

  const getDataUrl = useCallback(() => {
    return sessionData?.dataUrl
  }, [sessionData?.dataUrl])


  const getWelcome = useCallback(() => {
    return sessionData?.config?.welcomeMessage || ""
  }, [sessionData?.config?.welcomeMessage])


  const getPlanName = useCallback(() => {
    return sessionData?.userPlanInfo || ""
  }, [sessionData?.userPlanInfo])


  const mainContent = (): ReactNode  => {
    if (sysLoading) {
      return <SysLoadingSpinner />
    } else if ( systemError ) {
      return <SysErrorContainer
        sysErrorMessage={systemError}
        updateOpen={updateOpen}
      />
    }
    return(
      <>
        <ChaBotHeading
          headingContainerRef={headingContainerRef}
          updateOpen={updateOpen}
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
          loading={loading}
          dataUrl={getDataUrl()}
          pubName={getName()}
          chatRequestProcess={chatRequestProcess}
          welcomeMessage={getWelcome()}
        />

        <InputField
          inputContainerRef={inputContainerRef}
          sysLoading={sysLoading}
          error={systemError}
          input={input}
          chatRequestProcess={chatRequestProcess}
          updateInput={updateInput}
          textareaRef={textareaRef}
          planName={getPlanName()}
        />
      </>
    )
  }

  const getBgColor = () => {
    return sysLoading || systemError ? "sysLodingContainer" : "";
  }

  return (
    <div
      className={getBgColor()}
      style={{
        width: "100%", height: "100%", margin: 0, position: "absolute", left: 0, top: 0, overflow: "hidden", // backgroundColor: "white"
      }} >
      {
        mainContent()
      }
    </div>
  );
};

export default ChatBot;

