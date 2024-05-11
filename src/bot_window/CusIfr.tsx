import React, { ReactNode} from "react";
import Frame from "react-frame-component";
import "./iFrame/styles.css";
import { getLoadingDotsStyles, getStyles } from "./iFrame/styles";

interface ElementTypes {
  type: string;
  href: string;
  rel: string;
  crossOrigin?: boolean
}

// ROBOTO FONT SRC
const FONT_LINK_SRC: ElementTypes[] = [
  {
    type: "link",
    href: "https://fonts.googleapis.com",
    rel: "preconnect" ,
  },
  {
    type: "link",
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
    crossOrigin: true,
  },
  {
    type: "link",
    href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    rel: "stylesheet",
  }
];


interface A {
  children: ReactNode

}


export const CusIfr: React.FC<A> = (
  {
    children,

  }
  ) => {
  //const [contentRef, setContentRef] = useState(null);

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
      head={
        getIframeHead()
      }
      style={{
      width: "400px",
      position: "fixed",
      bottom: 110,
      right: 30,
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
    }}>
      {
        children
      }
    </Frame>
  )
}

/*
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