import React, { memo, RefObject, useCallback, useEffect, useRef, useState } from "react";

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
import { useWindow } from "../../hooks/useWindow";

interface MessagesTypes {
  error: string;
  systemError: string;
  loading: boolean;
  sysLoading: boolean;
  chatRequestProcess: () => Promise<void>;
  pubName: string;
  primary: string;
  primaryText: string;
  inputContainerRef: any
  headingContainerRef: any;
  frameRef: RefObject<HTMLIFrameElement>;

}

const Messages: React.FC<MessagesTypes> = (

  {
    error,
    systemError,
    loading,
    sysLoading,
    chatRequestProcess,
    pubName,
    primary,
    primaryText,
    inputContainerRef,
    frameRef,
    headingContainerRef
}

) => {
  const conversation: Conversation[] = useSelector((state: any) => state.conversationSlice.conversation);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(550);
  const { wHeight } = useWindow();

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
          return <ResponseMessage key={index} text={item.text} pubName={pubName}/>;
        } else if (item.publisher === "USER") {
          return <UserMessage key={index} text={item.text} time={item.time} primary={primary} primaryText={primaryText}/>;
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
        return(
          <>
          </>
        )
      });
    }
  }, [error, error.length, conversation]);


  const getLoadingMessage = () => {
    console.log("getLoadingMessage  gets rendered");
    if ( loading ) {
      console.log("getLoadingMessage  gets rendered true");
      return(
        <StatusMessage
          children={
          <MessageLoadingAnimation />
        }
      />
      )
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

  useEffect(() => {
    if ( frameRef?.current?.offsetHeight &&
      inputContainerRef?.current?.offsetHeight &&
      headingContainerRef?.current?.offsetHeight &&

      frameRef?.current?.offsetHeight <= wHeight / 10 * 8 ) {
      setHeight(
        frameRef?.current?.offsetHeight - (inputContainerRef?.current?.offsetHeight + headingContainerRef?.current?.offsetHeight)
      )
    }
  }, [
    frameRef?.current?.offsetHeight,
    headingContainerRef?.current?.offsetHeight,
    inputContainerRef?.current?.offsetHeight
  ]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        flexGrow: 1,

        backgroundColor: "white",
        position: "relative",
        height: height,
        textAlign: "left",
        fontSize: "mini",
        scrollbarWidth: "thin",  // Für Firefox
        scrollbarColor: "#888 #f0f0f0"
      } } >
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
          {getSystemErrorMessage()}
          <StatusMessage
            children={
              <ErrorMessageContent
                retry={chatRequestProcess}
                error={ "error" }
              />
            }
          />
        </div>
      </div>
  );
};

export default memo(Messages);
