import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {ChatSenderObjectTypes, Conversation, InfoDataTypes} from "../interface/SessionObjectInterfaces";
import {getBotIdProcess, getTime} from "../message_functions/getter";
import {conversationActions} from "../redux/app/slices/authSlice";
import {getFromSessionStorage, saveToSessionStorage} from "../message_functions/save_and_get";


const BASE_URL: string = process.env.REACT_APP_BASE_EDNPOINT!;
const CHAT_URL: string = process.env.REACT_APP_CHAT_URL!;
const INIT_CHAT_URL: string = process.env.REACT_APP_INIT_CHAT_URL!;

const chatUrl: string = `${BASE_URL + CHAT_URL}`;
const initUrl: string = `${BASE_URL + INIT_CHAT_URL}`;

interface UseChatRequestTypes {
  updateLoading: (b:boolean) => void;
  updateError: (value: string) => void;
}

interface UseInitTypes {
  updateLoading: (b:boolean) => void;
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

  const getInitMessageOject = (): Conversation => {
    return {
      text: "Hallo, wie kann ich Ihnen helfen?",
      time: getTime(),
      publisher: "AI"
    }
  }


  const init = async () => {
    console.log("Init chat...");

    const initMessage = getInitMessageOject();
    console.log("INIT MESSAGE:", initMessage);

    updateLoading(true);
    // dispatch(conversationActions.ClearMessages());
    const infoData: InfoDataTypes | null = getFromSessionStorage("infoData");
    const botId = getBotIdProcess(infoData); // "EkHijDnTwC-sattt" //
    if ( !botId ) {
      console.log("No Bot id could be set...");
      updateSystemError("There was an authentication error. Please try again.");
    } else {
      if ( !infoData || !infoData.chatsLeft || !infoData.clientId ) {
        console.log("Data missing, init the request...");
        try {
          const res = await axios.post(
            initUrl,
            {data: botId}
          );
          console.log("Auth Response:", res);

          if (res.data?.status_code === 200) {
            console.log("DATA:", res.data);

            if ( !conversation || conversation.length === 0 ) {
              dispatch(conversationActions.AddMessage({newMessage: initMessage}));
            }

            // prepare data
            const responseObject: InfoDataTypes = {
              chatsLeft: res.data.chats_left || 0,
              clientId: res.data.client_id,
              botId: botId
            }

            saveToSessionStorage(responseObject, "infoData");
          } else {
            updateSystemError(res.data.message);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error during registration:", error);
            updateSystemError("Something Went wrong!");
          }
        } finally {
          console.log("Auth process finished...");
          updateLoading(false);
        }
      } else {
        console.log("ALL DATA COLLECTED...")
        updateLoading(false);
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