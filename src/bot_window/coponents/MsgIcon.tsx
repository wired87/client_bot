import React, { ReactNode } from "react";


interface MsgIconProps {
  pubName?: string;
  dataUrl?: string;
  imgUrl?: string;
  primary?: string;
}



export const MsgIcon: React.FC<MsgIconProps> = (
  {
    primary,
    pubName,
    dataUrl,
    imgUrl
  }
) => {

  function getFirstLetter(url: string): string | null {
    const pattern = /^https:\/\/(www\.)?/;
    const match = url.match(pattern);
    if (match) {
      const firstLetter = url.charAt(match[0].length).toUpperCase()
      console.log("First letter:", firstLetter)
      return firstLetter;
    }
    return "";
  }


  const getFirstLetterUppercase = (): string | ReactNode => {
    if (pubName && pubName.length > 0) {
      return pubName[0].toUpperCase();
    } else if (dataUrl && dataUrl.length > 0) {
      return getFirstLetter(dataUrl)
    } else {
      return ""
    }
  }

  const profileIconContent = () => {
    if (imgUrl) {
      return <img src={imgUrl} alt="_w.png" style={{}} />;
    } else {
      return (
        <h4
          style={{
            color: "white",
            fontFamily: "Roboto, sans-serif",
            fontStyle: "normal",
          } } >
          {
            getFirstLetterUppercase()
          }
        </h4>
      );
    }
  }

  return(
    <div
      style={{
        width: "2.2rem",
        height: "2.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        borderRadius: 50,
        backgroundColor: "black"
      }}
    >
      {
        profileIconContent()
      }

    </div>
  )

}