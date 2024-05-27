import React, { memo, ReactNode } from "react";
interface StatusMessage {
  children: ReactNode;
  pubName: string;
  imgUrl?: string;
  dataUrl?: string;
}

const StatusMessage: React.FC<StatusMessage> = ({ children, pubName, imgUrl, dataUrl }) => {

  function getFirstLetter(url?: string): string | null {
    if ( url ) {
      const pattern = /^https:\/\/(www\.)?/;
      const match = url.match(pattern);
      if (match) {
        return url.charAt(match[0].length).toUpperCase();
      }
    }
    return null; // Return null if the URL does not start with the expected prefixes
  }


  const getFirstLetterUppercase = (): string | ReactNode => {
    if ( !imgUrl ) {
      if ( pubName.length > 0) {
        return pubName[0].toUpperCase();
      } else {
        return getFirstLetter(dataUrl)
      }

    }
    return <img src={imgUrl} alt="_w.png" style={{}} />;
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
      }} >
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "2.2rem",
            height: "2.2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            backgroundColor: "black",
            borderRadius: 50,
          }}
        >
          <h4
            style={{
              color: "white",
              fontFamily: "Roboto, sans-serif",
              fontStyle: "normal",
            }}
          >
            {
              getFirstLetterUppercase()
            }
          </h4>
        </div>
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
              borderRadius: "0.375rem",
              backgroundColor: "#f8f4fc",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 20px",
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
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(StatusMessage);


