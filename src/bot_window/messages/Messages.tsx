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

  const getSystemErrorMessage = useCallback(() => {
    if ( systemError.length > 0 ) {
      return <SysErrorContainer sysErrorMessage={systemError}/>
    }
    return <></>
  }, [systemError]);

  const sysLoadingComp = () => {
    if ( sysLoading ) {
      return(
        <SysLoadingSpinner />
      )
    }
    return <></>
  }


  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        alignSelf: "stretch",
        flexGrow: 1,
        height: 500,
        backgroundColor: "white",
        position: "relative",
        textAlign: "left",
        fontSize: "mini",
        color: "operator-message-text",
        scrollbarWidth: "thin",  // Für Firefox
        scrollbarColor: "#888 #f0f0f0"
      }}
    >
      <style>
        {`
        ::-webkit-scrollbar {
          width: 8px;  // Breite des Scrollbars
        }
        ::-webkit-scrollbar-track {
          background: #f0f0f0;  // Hintergrund des Tracks
        }
        ::-webkit-scrollbar-thumb {
          background: #888;  // Farbe des Scrollbar "Thumb"
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;  // Farbe beim Hover
        }
      `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "end",
          alignSelf: "stretch",
          overflowY: "auto",
        }} >
        <div
          style={{
            alignSelf: "stretch",
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto",
            position: "relative"
          }} >
          {getMessageList()}
          {getLoadingMessage()}
          {sysLoadingComp()}

          <SysErrorContainer sysErrorMessage={systemError}/>
          <ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
          <UserMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} time={"now"} />;
          <ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
          <UserMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} time={"now"}/>;
          <ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
        </div>
      </div>
    </div>
  );
};

console.log("FINISHED   MAIN RETURN Messages   gets rendered");
export default memo(Messages);

/*
<ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
          <UserMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} time={"now"} />;
          <ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
          <UserMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} time={"now"}/>;
          <ResponseMessage key={33} text={"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"} />;
 */