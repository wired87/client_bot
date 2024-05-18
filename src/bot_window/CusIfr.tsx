import React, { CSSProperties, ReactNode, RefObject, useEffect, useState } from "react";
import Frame from "react-frame-component";
import "./iFrame/styles.css";
import { getLoadingDotsStyles, getStyles } from "./iFrame/styles";
import { useWindow } from "../hooks/useWindow";


interface A {
  children: ReactNode
  frameRef: RefObject<HTMLIFrameElement>;
}

export const CusIfr: React.FC<A> = (
  {
    children,
    frameRef
  }
) => {
  const [height, setHeight]  = useState<number>(700);
  const [width, setWidth]  = useState<number>(400);
  const [frameStyle, setFrameStyle]  = useState<CSSProperties>(
    {
      width: 400,
      position: "fixed",
      bottom: 90,
      right: 30,
      zIndex: 2000002,
      borderRadius: "18px",
      transform: "translateZ(0)",
      boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
      height: height,
      maxHeight: "80vh",
      minHeight: 80,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "start",
      maxWidth: width,
      textAlign: "center",
      fontSize: "1.125rem",
      color: "#333333",
      fontFamily: "Inter",
      pointerEvents: "all",
      border: "none",

    }
  );

  const { wWidth } = useWindow();

  useEffect(() => {
    if (frameRef.current) {
      const actualHeight = frameRef.current.clientHeight;
      setHeight(Math.min(actualHeight, 800)); // Set height (respecting maxHeight)
      setWidth(height * 0.5714285714285714);
      console.log("SetWidth to:", width);
    }
  }, [frameRef?.current]);

  useEffect(() => {
    handleFrameWH();
    console.log("windowWidth CHANGED:", wWidth)
  }, [wWidth, frameRef.current]);



  const handleFrameWH = () => {
    if ( wWidth <= 640 ) {
      setFrameStyle(
        {
          width: wWidth,
          maxWidth: wWidth,
          height: "100vh",
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 2000002,
          borderRadius: 0,
          transform: "translateZ(0)",
          boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",

          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",

          textAlign: "center",
          fontSize: "1.125rem",
          color: "#333333",
          fontFamily: "Inter",
          pointerEvents: "all",
          border: "none"
        }
      )
    } else if (wWidth >= 640) {
      setFrameStyle(
        {
          width: width,
          position: "fixed",
          bottom: 90,
          right: 30,
          zIndex: 2000002,
          borderRadius: "18px",
          transform: "translateZ(0)",
          boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
          height: height,
          maxHeight: "80vh",
          minHeight: 80,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          maxWidth: width,
          textAlign: "center",
          fontSize: "1.125rem",
          color: "#333333",
          fontFamily: "Inter",
          pointerEvents: "all",
          border: "none"
        }
      )
    }
  }

  const getIframeHead = () => {
    return(
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

        {getStyles()}
        {getLoadingDotsStyles()}
      </>
    )
  }


  return (
    <Frame
      ref={frameRef}
      head={

        getIframeHead()
      }
      style={frameStyle}>
      {
        children
      }
    </Frame>
  )
}

/*



width: "400px",
        position: "relative",
        zIndex: 2000002,
        borderRadius: "18px",
        transform: "translateZ(0)",
        boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)",
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
        pointerEvents: "all",
        border: "none",
        padding:0,

  const { document } = useFrame();

  const createAssets = ( ) => {
    FONT_LINK_SRC.map((item: ElementTypes) => {
      const newElement = document?.createElement(item.type) as HTMLLinkElement;
      if ( newElement ) {
        newElement.href = item.href;
        newElement.rel = item.rel;
        if ( item.crossOrigin ) {
          newElement.crossOrigin = "anonymous";
        }
        document?.head.appendChild(newElement);
      }
    })};


  useEffect(() => {
    if ( document ) {
      createAssets();
    }
  }, [document]);
 */