import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Spinner } from "react-activity";
import {useLoading, useSystemError} from "./hooks/universalHooks";
import {useInit} from "./hooks/requests";
import ChatBot from "./bot_window/Chotbot";


export default function App() {
  const [open, setOpen] = useState<boolean>(false);
  const updateOpen = () => setOpen((prevState) => !prevState);

  // HOOKS
  const { loading, updateLoading } = useLoading();
  const { systemError, updateSystemError } = useSystemError();
  const chatRequestArgs = { updateLoading, updateSystemError, systemError };
  const { init } = useInit(chatRequestArgs);

  const buttonIcon = () => {
    if (open) {
      return <IoCloseSharp color={"white"} style={{ cursor: "pointer" }} size={30} />;
    } else if (!open) {
      return <IoChatbubbleOutline style={{ cursor: "pointer" }} color={"white"} size={30} />;
    } else if (loading) {
      return <Spinner style={{ cursor: "pointer" }} color={"white"} animating={loading} size={30} />;
    }
    return <></>
  };

  const handleOpenClick = async () => {
    updateOpen();
    if (!open) {
      await init();
    }
  };


  const chatBot = ( ) => {
    if ( open ) {
      return(
        <ChatBot init={init} sysLoading={loading} systemError={systemError} updateOpen={updateOpen}/>
      )
    }
    return <></>
  }

  return (
    <>
      <button
        style={
          { display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 10001,
            bottom: "50px",
            right: "20px", position: "fixed",
            backgroundColor: "#000000", borderWidth: 0,
            borderRadius: 50, padding: 10, pointerEvents: 'auto',
            cursor: "pointer", border: "none",
          }}
        onClick={handleOpenClick}
      >
        {buttonIcon()}
      </button>
        {
          chatBot()
        }
    </>
  );
}


/*
    <PortalPopup open={open} placement="Bottom right" relativeLayerRef={intercomRef} onOutsideClick={handleOpenClick} bottom={300}>
    </PortalPopup>

 */