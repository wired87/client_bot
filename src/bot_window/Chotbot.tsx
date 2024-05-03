

import React, {useRef} from "react";

import Messages from "./messages/Messages";
import {useChatRequest} from "../hooks/requests";
import {useError, useInput, useLoading} from "../hooks/universalHooks";
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

const ChatBot: React.FC<ChotbotType> = ({updateOpen, systemError, init, sysLoading}) => {

  const {error, updateError} = useError();
  const { input, updateInput } = useInput();
  const { loading, updateLoading } = useLoading();

  const chatArgs = {updateError, updateLoading};

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


  const chatRequestProcess = async () => {
    console.log("chatRequestProcess gets called...");
    if ( !loading && input.trim().length > 0 ) {
      const userMessage = getUserMessage();
      console.log("ADD SER MESSAGE TO STORE:", userMessage);
      dispatch(conversationActions.AddMessage({ newMessage: userMessage }));

      console.log("CLEAR INPUT")
      updateInput("");

      const sessionData = getFromSessionStorage("infoData");
      console.log("GETTING DATA:", sessionData)
      if (sessionData && sessionData.botId && sessionData.clientId && sessionData.chatsLeft > 0) {
        const senderObject: ChatSenderObjectTypes = {
          question: input,
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
      className="w-[420px] rounded-[18px] shadow-[10px_10px_40px_rgba(0,_0,_0,_0.08),_5px_14px_80px_rgba(26,_26,_26,_0.12)]
      h-[660px] overflow-hidden flex flex-col items-start justify-start max-w-full max-h-full text-center text-lg
      text-header-body-text font-body-regular-paragraph-small">
      <ChaBotHeading updateOpen={updateOpen} init={init}/>
      <Messages
        error={error}
        systemError={systemError}
        loading={loading}
        sysLoading={sysLoading}
      />
      <div className="self-stretch bg-whitesmoke-300 h-[1.2px]"/>
      <InputField
        sysLoading={sysLoading}
        error={systemError}
        input={input}
        chatRequestProcess={chatRequestProcess}
        updateInput={updateInput}
        textareaRef={textareaRef}
      />
    </div>
  );
};
console.log("Finished loading ChatBot...")
export default ChatBot;
