

import axios from "axios";

import {useDispatch} from "react-redux";
import { BotConfig, ChatSenderObjectTypes, InfoDataTypes } from "../interface/SessionObjectInterfaces";
import {getTime} from "../message_functions/getter";
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
const defaultError: string= "Something went wrong. Please try again...";
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

  const dispatch = useDispatch();

  const handleChatRequest = async (postObject: ChatSenderObjectTypes) => {

    updateError("");
    updateLoading(true);
    try {
      const res = await axios.post(chatUrl, postObject);
      console.log("Chat Response:", res);
      if (res.data?.status_code && res.data?.status_code === 200) {
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
        const textRes: string | undefined | null = res.data.response
        if ( textRes && textRes.length > 0 ) {
          updateError(res.data.response || defaultError);
        } else {
          updateError(defaultError)
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      updateError(defaultError);
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
    updateSysLoading,
    updateSystemError,
    systemError
  }: UseInitTypes
): UseInitReturnTypes  => {
  console.log("useInit gets created...");

  const sessionData = getFromSessionStorage("infoDataDataI");

  const getClientId = () => {
    if (sessionData && sessionData.clientId) {
      console.log("Existing client id in session...")
      return sessionData.clientId
    } else {
      console.log("No existing client ID found...")
    }
  }
  /*
  const addInitMessage = useCallback((initMessage: any) => {
    if ( !conversation || conversation.length === 0 || systemError.length === 0 && !initMessage) {
      console.log("Add init message...");
      dispatch(conversationActions.AddMessage({newMessage: initMessage}));
      setInitMessage(true);
    }
  }, [conversation,initMessage])
  */

  const init = async () => {
    let index = 0
    console.log("Start Init process...");
    updateSysLoading(true);

    const infoData: InfoDataTypes | null = getFromSessionStorage("infoDataDataI");

    const botId = "12MsGpLXYg-bprmgsxhqa" // getBotIdProcess(infoData);

    if ( !botId ) {
      console.log("No Bot id could be set...");
      updateSystemError("There was an authentication error. Please try again later.");
      updateSysLoading(false);
    } else {
      if ( !infoData || !infoData.chatsLeft || !infoData.clientId || !infoData.config?.welcomeMessage ) {
        console.log("Data missing, init the request...");
        while (!(index === 10) || !infoData || !infoData.chatsLeft || !infoData.clientId || !infoData.config?.welcomeMessage) {
          console.log(`init... (Try: ${index})`);
          const success = await fetchBotConfig(botId);
          if ( success == "FAILED" ) {
            if ( index === 9) {
              updateSystemError("Something went wrong");
              break;
            }
            index ++;
          } else break
        }
      } else {
        console.log("ALL DATA COLLECTED...")
        updateSysLoading(false);
        await fetchBotConfig(botId)
        console.log("INFO DATA EXIST:", infoData);
        // const initMessage: Conversation = getInitMessageOject(infoData.config?.welcomeMessage);
        // console.log("INIT MESSAGE:", initMessage);
        // addInitMessage(initMessage);

      }
    }
  };

  const fetchBotConfig = async (
    botId: string
  ) => {
    try {
      const res = await axios.post(
        initUrl,
        {
          data: botId,
          clientId: getClientId()
        }
      );
      console.log("Auth Response:", res);

      if (res.data?.status_code === 200) {
        console.log("DATA:", res.data);
        updateSystemError("")

        const config: BotConfig = res.data.config

        //const initMessage: Conversation = getInitMessageOject(config.welcomeMessage);
        // console.log("INIT MESSAGE:", initMessage);

        // addInitMessage(initMessage);

        // prepare data
        const responseObject: InfoDataTypes = {
          chatsLeft: res.data.chats_left || 0,
          clientId: res.data.client_id,
          dataUrl: res.data.data_url || "",
          userPlanInfo: res.data.plan_name,
          botId: botId,
          config: config
        }

        saveToSessionStorage(responseObject, "infoDataDataI");
      } else {
        return "FAILED"
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during client bot init:", error);
        return "FAILED"
      }
    } finally {
      console.log("Auth process finished...");
      updateSysLoading(false);
    }
    return "SUCCESS"
  }



  return {
    init
  }
}