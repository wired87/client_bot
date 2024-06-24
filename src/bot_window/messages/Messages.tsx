import React, { memo, RefObject, useCallback, useEffect, useRef, useState } from "react";

import ResponseMessage from "./ResponseMessage";
import UserMessage from "./UserMessage";

import {Conversation} from "../../interface/SessionObjectInterfaces";
import {scrollToBottom} from "../../message_functions/helper";
import {useSelector} from "react-redux";
import StatusMessage from "./StatusMessage";
import MessageLoadingAnimation from "../coponents/MessageLoading";
import ErrorMessageContent from "../coponents/ErrorMessageContent";
import { useWindow } from "../../hooks/useWindow";

interface MessagesTypes {
  error: string;
  loading: boolean;
  chatRequestProcess: () => Promise<void>;
  pubName: string;
  primary: string;
  primaryText: string;
  inputContainerRef: any
  headingContainerRef: any;
  frameRef: RefObject<HTMLIFrameElement>;
  dataUrl?: string;
  welcomeMessage: string;
}

const Messages: React.FC<MessagesTypes> = (

  {
    error,
    loading,
    chatRequestProcess,
    pubName,
    dataUrl,
    primary,
    primaryText,
    inputContainerRef,
    frameRef,
    headingContainerRef,
    welcomeMessage
}

) => {
  const conversation: Conversation[] = useSelector((state: any) => state.conversationSlice.conversation);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(550);
  const { wHeight, wWidth } = useWindow();

  useEffect(() => {
    console.log("SCROLL...")
    scrollToBottom(scrollContainerRef);
  }, [conversation, loading]);


  const getMessageList = useCallback(() => {
    console.log("error messages", error)
    if ( conversation &&
      conversation.length > 0 &&
      conversation.some(item => item !== undefined &&
        conversation.some(item => item !== null
        ))) {
      return conversation.map((item: Conversation, index: number) => {
        if (item.publisher === "AI") {
          return <ResponseMessage key={index} text={item.text} pubName={pubName} dataUrl={dataUrl}/>;
        } else if (item.publisher === "USER") {
          return <UserMessage key={index} text={item.text} time={item.time} primary={primary} primaryText={primaryText}/>;
        }
        return(
          <>
          </>
        )
      });
    }
  }, [
    conversation,
    pubName,
    primary,
    primaryText,
    dataUrl
    ]
  );

  const errorMsg = () => {
    if (error.length > 0) {
      console.log("error len > o")
      return (
        <StatusMessage
          children={
            <ErrorMessageContent retry={chatRequestProcess} error={error} />
          }
          pubName={pubName}
          error={true}
          dataUrl={dataUrl}
          primary={primary}
        />
      );
    }
  }
  const getLoadingMessage =() => {
    if ( loading ) {
      console.log("getLoadingMessage  gets rendered true");
      return (
        <StatusMessage
          children={
            <MessageLoadingAnimation />
          }
          pubName={pubName}
          dataUrl={dataUrl}
          primary={primary}
        />
      );
    }
    return <></>
  }



  useEffect(() => {

    if ( ( frameRef?.current?.offsetHeight &&
      inputContainerRef?.current?.offsetHeight &&
      headingContainerRef?.current?.offsetHeight &&
      frameRef?.current?.offsetHeight <= (wHeight / 10 * 8) ) ||
      wWidth <= 640
    ) {
      setHeight( // @ts-ignore
        frameRef?.current?.offsetHeight - (inputContainerRef?.current?.offsetHeight + headingContainerRef?.current?.offsetHeight)
      )
    }
  }, [
    frameRef?.current?.offsetHeight,
    headingContainerRef?.current?.offsetHeight,
    inputContainerRef?.current?.offsetHeight,
    wWidth
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
        scrollbarWidth: "thin",  // for Firefox
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
          <ResponseMessage primary={primary} text={"Hallo, wie kann ich Ihnen helfen?"} pubName={pubName} dataUrl={dataUrl}/>

          {getMessageList()}
          {errorMsg()}
          {getLoadingMessage()}
        </div>
      </div>
  );
};

export default memo(Messages);
