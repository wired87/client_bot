import React, { memo, useCallback, useEffect, useRef } from "react";

import ResponseMessage from "./ResponseMessage";
import UserMessage from "./UserMessage";

import {Conversation} from "../../interface/SessionObjectInterfaces";
import {scrollToBottom} from "../../message_functions/helper";
import {useSelector} from "react-redux";
import { Spinner } from "react-activity";
import { Alert } from "@mui/material";
import StatusMessage from "./StatusMessage";
import MessageLoadingAnimation from "../coponents/MessageLoading";
import ErrorMessageContent from "../coponents/ErrorMessageContent";


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

  const getErrorMessage = () => {
    console.log("getErrorMessage  gets rendered");
    if ( error.length > 0 ) {
      return(
        <Alert severity="error">{ error }</Alert>
      )
    }
    return <></>
  }

  const getSystemErrorMessage = () => {
    console.log("getErrorMessage  gets rendered");
    if ( systemError.length > 0 ) {
      return(
        <Alert severity="error" >{ systemError }</Alert>
      )
    }
    return <></>
  }

  const sysLoadingComp = () => {
    console.log("systemErrorContent  gets rendered");
    if ( sysLoading ) {
      return(
        <Spinner color={"black"} animating={sysLoading} size={30} />
      )
    }
    return <></>
  }

  console.log("MAIN RETURN Messages   gets rendered");

  return(
      <div
        ref={scrollContainerRef}
        style={{
          overflowY: 'auto',
          alignSelf: 'stretch',
          flexGrow: 1,
          position: 'relative',
          backgroundColor: 'white',
          overflow: 'hidden',
          textAlign: 'left',
          fontSize: 'mini',
          color: 'operator-message-text',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '383px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          gap: '16px'
        }}>
          <div style={{
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'end'
          }}>
            {getMessageList()}
            {getLoadingMessage()}
            {getErrorMessage()}
            {sysLoadingComp()}
            {getSystemErrorMessage()}
          </div>
        </div>
      </div>
  );
}
console.log("FINISHED   MAIN RETURN Messages   gets rendered");
export default memo(Messages);

