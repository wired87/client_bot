

import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import { BotConfig, ChatSenderObjectTypes, Conversation, InfoDataTypes } from "../interface/SessionObjectInterfaces";
import {getBotIdProcess, getTime} from "../message_functions/getter";
import {conversationActions} from "../redux/slice";
import {getFromSessionStorage, saveToSessionStorage} from "../message_functions/save_and_get";



const BASE_URL: string = "https://wired66.pythonanywhere.com/client/";
const CHAT_URL: string = "chat/";
const INIT_CHAT_URL: string = "init/";

const chatUrl: string = `${BASE_URL + CHAT_URL}`;
const initUrl: string = `${BASE_URL + INIT_CHAT_URL}`;

interface UseChatRequestTypes {
  updateLoading: (b:boolean) => void;
  updateError: (value: string) => void;
  updateRetryInput: (value: string) => void;
}

interface UseInitTypes {
  updateSysLoading: (b:boolean) => void;
  updateSystemError: (value: string) => void;
  systemError: string;
}

interface UseChatReturnTypes {
  handleChatRequest: (postObject: ChatSenderObjectTypes) => Promise<void>;
}

interface UseInitReturnTypes {
  init: () => Promise<void>;

}

export const useChatRequest = (
  {
    updateLoading,
    updateError,
    updateRetryInput
  }: UseChatRequestTypes
): UseChatReturnTypes  => {
  console.log("useChatRequest gets created...");
  const dispatch = useDispatch();

  const handleChatRequest = async (postObject: ChatSenderObjectTypes) => {

    updateError("");
    updateLoading(true);
    try {

      const res = await axios.post(chatUrl, postObject);
      console.log("Auth Response:", res);
      if (res.data?.status_code === 200) {
        console.log("DATA:", res.data)

        // prepare data
        const responseObject = {
          text: res.data.response,
          time: getTime(),
          publisher: "AI"
        }

        dispatch(conversationActions.AddMessage({ newMessage: responseObject }));
        updateRetryInput("");
      } else {
        updateError(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      updateError("Something Went wrong");
    } finally {
      console.log("Auth process finished...");

    }
    updateLoading(false);
  };



  return {
    handleChatRequest,
  }
}

/*
const messageList: Conversation[] = getFromSessionStorage("conversation");
        if ( messageList && messageList.length > 0 ) {
          messageList.push(responseObject);
          saveToSessionStorage(messageList, "conversation");
        } else {
          const newMessageList: Conversation[] = [responseObject];
          saveToSessionStorage(newMessageList, "conversation");
        }
 */



export const useInit = (
  {
    updateLoading,
    updateSystemError,
    systemError
  }: UseInitTypes
): UseInitReturnTypes  => {
  console.log("useInit gets created...");
  const dispatch = useDispatch();
  const conversation: Conversation[] = useSelector((state: any) => state.conversationSlice.conversation);

  const getInitMessageOject = (text: string): Conversation => {
    return {
      text: text,
      time: String(getTime()),
      publisher: "AI"
    }
  }


  const init = async () => {
    console.log("Init chat...");
    updateLoading(true);

    const infoData: InfoDataTypes | null = getFromSessionStorage("infoData");
    const botId = getBotIdProcess(infoData);
    if ( !botId ) {
      console.log("No Bot id could be set...");
      updateSystemError("There was an authentication error. Please try again later.");
      updateLoading(false);
    } else {
      if ( !infoData || !infoData.chatsLeft || !infoData.clientId || !infoData.config?.welcomeMessage ) {
        console.log("Data missing, init the request...");
        try {
          const res = await axios.post(
            initUrl,
            {data: botId}
          );
          console.log("Auth Response:", res);

          if (res.data?.status_code === 200) {
            console.log("DATA:", res.data);
            updateSystemError("")

            const config: BotConfig = res.data.config

            const initMessage: Conversation = getInitMessageOject(config.welcomeMessage);
            console.log("INIT MESSAGE:", initMessage);

            if ( !conversation || conversation.length === 0 ) {
              dispatch(conversationActions.AddMessage({newMessage: initMessage}));
            }

            // prepare data
            const responseObject: InfoDataTypes = {
              chatsLeft: res.data.chats_left || 0,
              clientId: res.data.client_id,
              botId: botId,
              config: config
            }

            saveToSessionStorage(responseObject, "infoData");

          } else {
            updateSystemError(res.data.message);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error during client bot init:", error);
            updateSystemError("Something Went wrong!");
          }
        } finally {
          console.log("Auth process finished...");
          updateLoading(false);
        }
      } else {
        console.log("ALL DATA COLLECTED...")
        updateLoading(false);
        console.log("INFO DATA EXIST:", infoData);
        const initMessage: Conversation = getInitMessageOject(infoData.config?.welcomeMessage);
        console.log("INIT MESSAGE:", initMessage);

        if ( !conversation || conversation.length === 0 && systemError.length === 0 ) {
          dispatch(conversationActions.AddMessage({newMessage: initMessage}));
        }
      }
    }
  };

  return {
    init
  }
}