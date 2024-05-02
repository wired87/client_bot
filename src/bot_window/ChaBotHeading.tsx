
import React, {memo} from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import {useDispatch} from "react-redux";
import axios from "axios";
import {conversationActions} from "../redux/slice";
import {InfoDataTypes} from "../interface/SessionObjectInterfaces";
import {getFromSessionStorage} from "../message_functions/save_and_get";


interface ChatBotHeadingTypes {
  updateOpen: () => void;
  init: () => Promise<void>;
}

const BASE_URL: string = "http://wired66.pythonanywhere.com/";

const START_OVER: string = "start-over/";

const refreshUrl: string = `${BASE_URL + START_OVER}`;

const ChaBotHeading: React.FC<ChatBotHeadingTypes> = (

  {
    updateOpen,
    init
  }
) => {
  console.log("ChaBotHeading gets renderd...")
  const dispatch = useDispatch();

  const deleteMessages = async () => {
    console.log("deleteMessages gets renderd...");
    dispatch(conversationActions.ClearMessages());
    await init;
    const infoData: InfoDataTypes | null = getFromSessionStorage("infoData");
    if ( infoData && infoData.clientId)
      try {
        const response = await axios.post(
          refreshUrl,
          {
            client_id: infoData.clientId
          }
        )
        if (response.data.status_code === 200) {
          console.log("Data successfully deleted...")
        } else {
          console.log("Could not delete the conv...")
        }
      } catch ( e:unknown ) {
        if ( e instanceof Error) {
          console.log("Error occurred...")
        }
      } finally {
      console.log("Process finished...")
      }
    }

  return(
    <div className="self-stretch bg-main-colour flex flex-row items-center justify-start max-h-[70px] p-5 gap-[30px]">
      <div className="w-2 relative leading-[18px] font-black hidden"></div>
      <div className="flex flex-row items-center justify-start gap-[14px] text-left font-chat-operator-quick-reply">
        <div className="flex flex-row items-center justify-start">
          <div className="w-[46px] rounded-[125px] box-border flex flex-col items-start justify-end ">
            <h4>
              BW
            </h4>
          </div>
        </div>
      </div>
      <div className="flex-1 flex gap-3 flex-row items-center justify-end">
        <button
          className="cursor-pointer rounded-full [border:none] hover:bg-gray-100 p-px bg-[transparent] flex items-center justify-center"
          onClick={deleteMessages}
          title={"Start over"} >
          <IoMdRefresh color={"white"} size={25} />
        </button>
        <button
          className="cursor-pointer rounded-full  [border:none] p-px bg-[transparent] flex items-center justify-center"
          onClick={updateOpen}>
          <IoCloseSharp color={"white"} size={25}/>
        </button>
      </div>
    </div>
  )
}

export default memo(ChaBotHeading);


/*
  IconComponent={() => <BsThreeDotsVertical color="white" size={50} />
        <button
        className="cursor-pointer [border:none] p-px bg-[transparent] flex items-center justify-center"
        onClick={updateOpen}>
 */