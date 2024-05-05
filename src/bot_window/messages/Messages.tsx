import React, { memo, useCallback, useEffect, useRef } from "react";

import ResponseMessage from "./ResponseMessage";
import UserMessage from "./UserMessage";

import {Conversation} from "../../interface/SessionObjectInterfaces";
import {scrollToBottom} from "../../message_functions/helper";
import {useSelector} from "react-redux";
import StatusMessage from "./StatusMessage";
import MessageLoadingAnimation from "../coponents/MessageLoading";
import ErrorMessageContent from "../coponents/ErrorMessageContent";
import SysLoadingSpinner from "../coponents/SysLoadingIndicator";
import SysErrorContainer from "../coponents/SysErrorContainer";


interface MessagesTypes {
  error: string;
  systemError: string;
  loading: boolean;
  sysLoading: boolean;
  chatRequestProcess: () => Promise<void>;
}

const Messages: React.FC<MessagesTypes> = (

  {
    error,
    systemError,
    loading,
    sysLoading,
    chatRequestProcess
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
          return <ResponseMessage key={index} text={item.text} />;
        } else if (item.publisher === "USER") {
          return <UserMessage key={index} text={item.text} time={item.time} />;
        } else if ( error.length > 0 ) {
          return (
            <StatusMessage
              children={
                <ErrorMessageContent
                  retry={chatRequestProcess}
                  error={ error }
                />
              }
            />
          );
        }
        return <></>
      });
    }
  }, [error, conversation]);


  const getLoadingMessage = () => {
    console.log("getLoadingMessage  gets rendered");
    if ( loading ) {
      console.log("getLoadingMessage  gets rendered true");
      return <StatusMessage children={<MessageLoadingAnimation />} />;
    }
    return <></>
  }

  const getSystemErrorMessage = () => {
    console.log("getErrorMessage  gets rendered");
    if ( systemError.length > 0 ) {
      return(
        <div style={{
          justifyContent: "flex-start",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
           }}>
          <SysErrorContainer sysErrorMessage={systemError}/>
        </div>

      )
    }
    return <></>
  }

  const sysLoadingComp = () => {
    console.log("systemErrorContent  gets rendered");
    if ( sysLoading ) {
      return(
        <SysLoadingSpinner />
      )
    }
    return <></>
  }

  console.log("MAIN RETURN Messages   gets rendered");

  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowY: "auto",
        alignSelf: "stretch",
        flexGrow: 1,
        position: "relative",
        backgroundColor: "white",
        overflow: "hidden",
        textAlign: "left",
        fontSize: "mini",
        color: "operator-message-text",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "383px",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "end",
          gap: "16px",
        }} >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "end",
          }} >
          {getMessageList()}
          {getLoadingMessage()}
          {sysLoadingComp()}
          {getSystemErrorMessage()}

        </div>
      </div>
    </div>
  );
};

console.log("FINISHED   MAIN RETURN Messages   gets rendered");
export default memo(Messages);

/*

 */