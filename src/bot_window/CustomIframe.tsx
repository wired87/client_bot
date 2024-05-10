import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface CustomIframeProps {
  children: ReactNode;
}

export const CustomIframe: React.FC<CustomIframeProps> = ({ children }) => {
  const [ref, setRef] = useState<any>();
  const container = ref?.contentWindow?.document?.body;

  return (
    <iframe ref={setRef} style={{
      width: "400px",
      position: "fixed",
      bottom: 110,
      right: 30,
      zIndex: 2000002,
      borderRadius: "18px",
      transform: "translateZ(0)",
      boxShadow:
        "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
      maxHeight: "700px",
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
      {container && createPortal(children, container)}
    </iframe>
  );
};