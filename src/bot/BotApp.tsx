import React from "react";
import ChatBot from "../bot_window/Chotbot";
import useGlobals from "../hooks/useGlobals";

const BotApp: React.FC = () => {

  const { init, updateOpen, loading, systemError } = useGlobals();

  return(
    <ChatBot init={init} sysLoading={loading} systemError={systemError} updateOpen={updateOpen}/>
  )
}


export default BotApp;