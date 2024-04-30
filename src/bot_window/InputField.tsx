import React, {memo, useRef} from "react";
import {IoSend} from "react-icons/io5";
import Input from 'antd/es/input';
import {ChatSenderObjectTypes, Conversation} from "../interface/SessionObjectInterfaces";
import {getTime} from "../message_functions/getter";
import {conversationActions} from "../redux/app/slices/authSlice";
import {getFromSessionStorage} from "../message_functions/save_and_get";
import {useInput, useLoading} from "../hooks/universalHooks";
import {useDispatch} from "react-redux";
import {useChatRequest} from "../hooks/requests";

const { TextArea } = Input;
interface FieldProps {
  loading: boolean;
  updateError: (value: string) => void;
  handleChatRequest: (value: ChatSenderObjectTypes) => Promise<void>
}


const InputField: React.FC<FieldProps> = (
  {
    loading,
    updateError,
    handleChatRequest
  }
) => {
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
        updateError("111");

      }
    }
  }


  console.log("START TEXT AREA WILL BE RENDERED");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  console.log("ref defined");

  return(
    <div className="self-stretch bg-reply-bg h-[66px] flex flex-col items-start justify-start p-5 box-border" >
      <div className="relative self-stretch flex flex-row items-start justify-between pt-0 px-0 pb-1" >

        <TextArea
          placeholder="Deine Frage..."
          className="[border:none] [outline:none]
             bg-[transparent] h-auto max-h-[120px] flex-1 overflow-y-visible  flex flex-row items-center text-start
             font-chat-operator-quick-reply
             justify-center py-2 px-4 outline-none text-stamp-text resize-none absolute bottom-[-30px] w-[340px] bg-white z-30"
          autoSize
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateInput(e.target.value, textareaRef)}
        />
        <button
          className="cursor-pointer absolute right-1 [border:none] p-0 bg-[transparent] flex flex-row items-center justify-start gap-[12px]"
          onClick={() => chatRequestProcess}
        >
          <div className="overflow-hidden flex flex-row items-center justify-start relative gap-[10px]">
            <IoSend size={24}/>
          </div>
        </button>
      </div>
    </div>
  )
}

console.log("FINISHED AREA WILL BE RENDERED");

export default memo(InputField);


/*
 <Textarea

          placeholder={}
          maxRows={4}
          value={input}
          variant={"plain"}


        />
 */