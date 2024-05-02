



import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import {useLoading, useSystemError} from "./hooks/universalHooks";
import {useInit} from "./hooks/requests";
import ChatBot from "./bot_window/Chotbot";
import PortalPopup from "./bot_window/PortalPopup";




export default function App() {
  const [open, setOpen] = useState(false);
  const updateOpen = () => setOpen(prev => !prev);
  const intercomRef = useRef<HTMLButtonElement>(null);

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
  };

  const handleOpenClick = async () => {
    setOpen((prev) => !prev);
    if (!open) {
      await init();
    }
  };

  useEffect(() => {
    console.log("Loading:", loading);
  }, [loading]);

  const chatBot = () => {
    if (open) {
      return (
        <PortalPopup placement="Bottom right" relativeLayerRef={intercomRef} onOutsideClick={handleOpenClick} bottom={300}>
          <ChatBot init={init} sysLoading={loading} systemError={systemError} updateOpen={updateOpen}/>
        </PortalPopup>
      );
    }
  };

  return (
    <>
      <button
        className="cursor-pointer border-none p-4 bg-main-colour rounded-81xl flex  items-center justify-center"
        style={
        { zIndex: "10001", bottom: "60px",
          right: "20px", position: "fixed",
          backgroundColor: "#09165f", borderWidth: 0,
          borderRadius: 50, padding: 10
        }}
        onClick={handleOpenClick}
      >
        {buttonIcon()}
      </button>
      {chatBot()}
    </>
  );
}
