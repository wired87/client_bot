
import React, { memo, ReactNode } from "react";
import { MsgIcon } from "../coponents/MsgIcon";

interface ResponseMessageTypes {
  text: string;
  pubName: string;
  imgUrl?: string;
  dataUrl?: string;
  primary?: string;
}

const ResponseMessage: React.FC<ResponseMessageTypes> = (
  {
    text,
    pubName,
    imgUrl,
    dataUrl,
    primary
  }
) => {

  function getFirstLetter(url: string): string | null {
    const pattern = /^https:\/\/(www\.)?/;
    const match = url.match(pattern);
    if (match) {
      const firstLetter = url.charAt(match[0].length).toUpperCase()
      console.log("FIRST LETTER RES_M:", firstLetter);
      return firstLetter;
    }
    return null;
  }

  const getFirstLetterUppercase = (): string | ReactNode => {
    if (pubName.length > 0) {
      return pubName[0].toUpperCase();
    } else if (dataUrl && dataUrl.length > 0) {
      return getFirstLetter(dataUrl)
    } else {
      return ""
    }
  }

  return (
    <div
      style={{
        marginBottom: "1.75rem",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          marginTop: 15,
        }}
      >
        <MsgIcon
          pubName={pubName}
          dataUrl={dataUrl}
          imgUrl={imgUrl}
          primary={primary}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            gap: "6px",
          }}
        >
          <div
            style={{
              borderTopRightRadius: "0.375rem",
              borderBottomRightRadius: "0.375rem",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: 0,

              backgroundColor: "#f8f4fc",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 17px",
              boxSizing: "border-box",
              maxWidth: "300px",
            }}
          >
            <div
              style={{
                fontSize: 15,
                height: "auto",
                position: "relative",
                lineHeight: "140%",
                maxWidth: "260px",
                wordWrap: "break-word",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontFamily: "Roboto, sans-serif",
                  fontStyle: "normal",
                }}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResponseMessage);