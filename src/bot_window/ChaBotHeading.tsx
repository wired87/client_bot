import React, { memo } from "react";
import { IoMdRefresh } from "react-icons/io";
import {useDispatch} from "react-redux";
import axios from "axios";
import {conversationActions} from "../redux/slice";
import {InfoDataTypes} from "../interface/SessionObjectInterfaces";
import {getFromSessionStorage} from "../message_functions/save_and_get";
import { IoIosArrowDown } from "react-icons/io";

interface ChatBotHeadingTypes {
  updateOpen: () => void;
  background?: string;
  color?: string;
  name?: string;
  headingContainerRef: any;

}

const refreshUrl: string = "https://wired66.pythonanywhere.com/client/start-over/";


const ChaBotHeading: React.FC<ChatBotHeadingTypes> = (

  {
    updateOpen,
    background,
    color,
    name,
    headingContainerRef
  }

) => {
  console.log("ChaBotHeading gets renderd...")
  const dispatch = useDispatch();

  const deleteMessages = async () => {
    console.log("deleteMessages gets renderd...");
    dispatch(conversationActions.ClearMessages());
    // init;
    const infoData: InfoDataTypes | null = getFromSessionStorage("infoDataDataI");
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


  return (
    <>
      <div
        ref={headingContainerRef}
        style={{
          alignSelf: "stretch",
          backgroundColor: background,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 45,
          paddingRight: 15,
          paddingLeft: 10,
          gap: "30px",
          maxHeight: 60,
          zIndex: 200009,

        }} >
        <div
          style={{
            borderRadius: "125px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              color: color,
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              fontStyle: "normal",
            }}
          >
            {name}
          </p>
        </div>

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            gap: "10px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              border: "none",
              padding: "1px",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={updateOpen}
          >
            <IoIosArrowDown color={color} size={22} />
          </button>
        </div>
      </div>
    </>
  );
}

export default memo(ChaBotHeading);


/*
<button
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              border: "none",
              padding: "1px",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

            }}
            onClick={deleteMessages}
            title="Start over"
          >
            <IoMdRefresh color={color} size={22} />
          </button>
  IconComponent={() => <BsThreeDotsVertical color="white" size={50} />
        <button
        className="cursor-pointer [border:none] p-px bg-[transparent] flex items-center justify-center"
        onClick={updateOpen}>
 */