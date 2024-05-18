import React, { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import useGlobals from "./hooks/useGlobals";
import ChatBot from "./bot_window/Chotbot";
import { CusIfr } from "./bot_window/CusIfr";



export default function App() {

  const {init, updateOpen, open, loading, updateLoading, systemError, sysLoading} = useGlobals();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const buttonIcon = () => {
    if (open) {
      return <IoCloseSharp color={"white"} style={{ cursor: "pointer" }} size={30} />;
    } else  {
      return <IoChatbubbleOutline style={{ cursor: "pointer" }} color={"white"} size={30} />;
    }
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
      console.log("Open...")
      return(
        <CusIfr frameRef={frameRef}>
          <ChatBot
            frameRef={frameRef}
            init={init}
            updateLoading={ updateLoading}
            loading={loading}
            sysLoading={sysLoading}
            systemError={systemError}
            updateOpen={updateOpen}
          />
        </CusIfr>
      )
    }
  }

  return (
    <>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20001,
          bottom: "20px",
          right: "20px",
          position: "fixed",
          backgroundColor: "#000000",
          borderWidth: 0,
          borderRadius: 50,
          padding: 14,
          pointerEvents: "auto",
          cursor: "pointer",
          border: "none",
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

/*

PREVIEW
AL SCRRENS FOR PREV CHANGES: APP INDEX GETTER




import React, { useEffect } from "react";

import useGlobals from "./hooks/useGlobals";
import ChatBot from "./bot_window/Chotbot";
import { CusIfr } from "./bot_window/CusIfr";


export default function App() {

  const {
    init,
    updateOpen, open,
    loading, updateLoading,
    sysLoading, updateSysLoading,
    systemError
  } = useGlobals();




  useEffect(() => {
    init()
      .then(() => console.log("Init..."))
      .catch((e: unknown) => console.log("Init failed cause error:", e))
  }, []);



  return (
    <>
      <CusIfr >
        <ChatBot
          init={init}
          updateLoading={ updateLoading}
          loading={loading}
          sysLoading={sysLoading}
          systemError={systemError}
          updateOpen={() => {}}
        />
      </CusIfr>
    </>
  );
}
 */
