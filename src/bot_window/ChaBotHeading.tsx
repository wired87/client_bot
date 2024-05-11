import React, { memo } from "react";
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
  background?: string;
  color?: string;
  name?: string;
}

const refreshUrl: string = "https://wired66.pythonanywhere.com/client/start-over/";


const ChaBotHeading: React.FC<ChatBotHeadingTypes> = (

  {
    updateOpen,
    init,
    background,
    color,
    name
  }
) => {
  console.log("ChaBotHeading gets renderd...")
  const dispatch = useDispatch();

  const deleteMessages = async () => {
    console.log("deleteMessages gets renderd...");
    dispatch(conversationActions.ClearMessages());
    init;
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
    <>
      <div style={{
        alignSelf: 'stretch',
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 20px',
        gap: '30px',
        maxHeight: 60
      }} >
        <div style={{
          width: '2px',
          position: 'relative',
          lineHeight: '18px',
          fontWeight: '900',
          display: 'none'
        }}>
          
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '14px',
          textAlign: 'left',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              width: '46px',
              borderRadius: '125px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end'
            }} >
              <p style={
                {
                  color: color,
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto, sans-serif",
                  fontStyle: "normal",
                }
              }>
                {
                  name
                }
              </p>
            </div>
          </div>
        </div>
        <div style={{
          flexGrow: 1,
          display: 'flex',
          gap: '3px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <button
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              border: 'none',
              padding: '1px',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={deleteMessages}
            title="Start over"
          >
            <IoMdRefresh color="white" size={25} />
          </button>
          <button
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              border: 'none',
              padding: '1px',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={updateOpen}
          >
            <IoCloseSharp color="white" size={25} />
          </button>
        </div>
      </div>
    </>

  )
}

export default memo(ChaBotHeading);


/*
  IconComponent={() => <BsThreeDotsVertical color="white" size={50} />
        <button
        className="cursor-pointer [border:none] p-px bg-[transparent] flex items-center justify-center"
        onClick={updateOpen}>
 */