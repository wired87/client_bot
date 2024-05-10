import React, { LegacyRef, ReactNode, RefObject, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Frame from 'react-frame-component';

interface A {
  children: ReactNode
}
export const CusIfr: React.FC<A> = ({children}) => {
  const [contentRef, setContentRef] = useState(null)
  // @ts-ignore
  const mountNode = contentRef?.contentWindow?.document?.body


  const getChatBotWidgetContent = () => {
    return `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Title</title>
          </head>
          <body>
            <p></p>
          </body>
          </html>
        `
  }

 //srcDoc={getChatBotWidgetContent()}
  return (
    <Frame ref={contentRef} style={{
      width: "400px",
      position: "fixed",
      bottom: 110,
      right: 30,
      zIndex: 2000002,
      borderRadius: "18px",
      transform: "translateZ(0)",
      boxShadow:
        "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
      height: "700px",
      minHeight: 80,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "start",
      maxWidth: "100%",
      textAlign: "center",
      fontSize: "1.125rem",
      color: "#333333",
      fontFamily: "Inter",
      pointerEvents: "all",
      border: "none"
    }}>
      {children}
    </Frame>
  )
}