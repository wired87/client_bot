import React, {memo, useCallback, useEffect, useRef} from "react";
import ResponseMessage from "./ResponseMessage";
import UserMessage from "./UserMessage";
import LoadingMessage from "./LoadingMessage";
import {Alert} from "@mui/material";
import {useSelector} from "react-redux";
import {scrollToBottom} from "../../message_functions/helper";
import {Conversation} from "../../interface/SessionObjectInterfaces";

interface MessagesTypes {
  error: string;
  systemError: string;
  loading: boolean;
}

const Messages: React.FC<MessagesTypes> = (

  {
    error,
    systemError,
    loading,
  }

) => {
  console.log("Messages gets rendered");
  const conversation: Conversation[] = useSelector((state: any) => state.conversationSlice.conversation);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("SCROLL...")
    scrollToBottom(scrollContainerRef);
  }, [conversation, loading]);


  const getMessageList = useCallback(() => {
    console.log("getMessageList gets rendered");
    if ( conversation &&
      conversation.length > 0 &&
      conversation.some(item => item !== undefined &&
        conversation.some(item => item !== null
        ))) {
      return conversation.map((item: Conversation, index: number) => {
        if (item.publisher === "AI") {
          return <ResponseMessage key={index} text={item.text} time={item.time} />;
        } else if (item.publisher === "USER") {
          return <UserMessage key={index} text={item.text} time={item.time} />;
        }
        return null;
      });
    }
  }, [conversation]);


  const getLoadingMessage = () => {
    console.log("getLoadingMessage  gets rendered");
    if ( loading ) {
      console.log("getLoadingMessage  gets rendered true");
      return(
        <LoadingMessage />
      )
    }
  }

  const getErrorMessage = () => {
    if ( error.length > 0 ) {
      return(
        <Alert severity="error">{ error }</Alert>
      )
    }
  }

  const getSystemErrorMessage = () => {
    if ( systemError.length > 0 ) {
      return(
        <Alert severity="error" className={"w-full"}>{ systemError }</Alert>
      )
    }
  }


  return(
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto  self-stretch flex-1 relative bg-reply-bg overflow-hidden text-left text-mini
      text-operator-message-text font-chat-operator-quick-reply">
      <div className="absolute top-[20px] left-[20px] w-[383px] flex flex-col items-end justify-end gap-[16px]">
        <div
             className="self-stretch flex flex-col items-end justify-end">
          {
            getSystemErrorMessage()
          }
          {
            getMessageList()
          }
          {
            getLoadingMessage()
          }
          {
            getErrorMessage()
          }
        </div>
      </div>
    </div>
  );
}

export default memo(Messages);