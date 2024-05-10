import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import useGlobals from "./hooks/useGlobals";
import Iframe from "react-iframe";
import { CustomIframe } from "./bot_window/CustomIframe";
import ChatBot from "./bot_window/Chotbot";

export default function App() {

  const {init, updateOpen, open, loading, systemError} = useGlobals();

  const buttonIcon = () => {
    if (open) {
      return <IoCloseSharp color={"white"} style={{ cursor: "pointer" }} size={30} />;
    } else if (!open) {
      return <IoChatbubbleOutline style={{ cursor: "pointer" }} color={"white"} size={30} />;
    }
    return <></>
  };

  useEffect(() => {
    init()
      .then(() => console.log("Init..."))
      .catch((e: unknown) => console.log("Init failed cause error:", e))
  }, []);


  const handleOpenClick = async () => {
    updateOpen();
    if (!open) {
      await init();
    }
  };


    const BotContent = () =>  {
      if ( open ) {
        return(
          <CustomIframe >
            <ChatBot init={init} sysLoading={loading} systemError={systemError} updateOpen={updateOpen} />
          </CustomIframe>
        )
      }
    }


  return (
    <>
      <button
        style={
          { display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 20001,
            bottom: "35px",
            right: "20px", position: "fixed",
            backgroundColor: "#000000", borderWidth: 0,
            borderRadius: 50, padding: 14, pointerEvents: 'auto',
            cursor: "pointer", border: "none",
          }}
        onClick={handleOpenClick}
      >
        {buttonIcon()}
      </button>
      {
        BotContent()
      }
    </>
  );
}
