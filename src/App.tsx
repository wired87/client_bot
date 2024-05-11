import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
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
        <CusIfr >
          <ChatBot
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
          bottom: "35px",
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

import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import useGlobals from "./hooks/useGlobals";
import ChatBot from "./bot_window/Chotbot";
import { CusIfr } from "./bot_window/CusIfr";
import { EmotionCache } from "@emotion/react/dist/emotion-react.cjs";
import createCache from "@emotion/cache";



export default function App() {

  const {init, updateOpen, open, loading, updateLoading, systemError} = useGlobals();

  const [cache, setCache] = useState<EmotionCache | null>(null);

  const contentRef = useRef<any>(null);

  const buttonIcon = () => {
    if (open) {
      return <IoCloseSharp color={"white"} style={{ cursor: "pointer" }} size={30} />;
    } else  {
      return <IoChatbubbleOutline style={{ cursor: "pointer" }} color={"white"} size={30} />;
    }

  };

  useEffect(() => {
    createCacheEmo();
  }, [contentRef]);

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

  const createCacheEmo = () => {
    if (contentRef.current) {
      // Create a cache that targets the iframe's document head
      const iframeCache = createCache({
        key: 'my-prefix-key',
        prepend: true,
        container: contentRef.current.contentDocument.head
      });
      setCache(iframeCache);
    }
  }

  const BotContent = () =>  {
    if ( open ) {
      console.log("Open...")
      return(
        <CusIfr
          cache={cache}
          ref={contentRef}
        >
          <ChatBot
            init={init}
            updateLoading={ updateLoading}
            loading={loading}
            sysLoading={loading}
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
          bottom: "35px",
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

 */