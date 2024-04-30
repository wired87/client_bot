import React, {useState, useRef} from "react";

import ChotBot from "./bot_window/Chotbot";

import PortalPopup from "./bot_window/PortalPopup";

import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import {useInit} from "./hooks/requests";
import {useLoading, useSystemError} from "./hooks/universalHooks";

import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const updateOpen = () => setOpen(prev => !prev);

  const intercomRef = useRef<HTMLButtonElement>(null);

  // HOOKS
  const { loading, updateLoading } = useLoading();

  const { systemError, updateSystemError } = useSystemError();

  const chatRequestArgs = { updateLoading, updateSystemError, systemError };

  const { init } = useInit(chatRequestArgs);


  const buttonIcon = () => {
    console.log("Set open to", open)
    if ( open ) {
      return <IoCloseSharp color={"white"} style={{cursor: "pointer"}} size={30}/>
    }else if ( !open ) {
      return <IoChatbubbleOutline style={{cursor: "pointer"}} color={"white"} size={30} />
    } else if ( loading ) {
      return <Spinner style={{cursor: "pointer"}} color={"white"} animating={loading} size={30}/>
    }
  }

  const handleOpenClick = async () => {
    updateOpen();
    if (!open) {
      await init();
    }
  }

  const chatBot = () => {
    if ( open ) {
      return(
        <PortalPopup
          placement="Bottom right"
          relativeLayerRef={intercomRef}
          onOutsideClick={handleOpenClick}
          bottom={300} >
          <ChotBot updateOpen={updateOpen} systemError={systemError} init={init} loading={loading}/>
        </PortalPopup>
      )
    }
  }

  return (
    <>
      <button
        className="cursor-pointer [border:none] p-3 bg-main-colour rounded-81xl flex flex-row items-center justify-center"
        style={{ zIndex: "1000", bottom: "60px", right:"20px", position: "fixed"}}
        onClick={handleOpenClick} >
        {
          buttonIcon()
        }

      </button>
      {
        chatBot()
      }
    </>
  );
}
export default App;
