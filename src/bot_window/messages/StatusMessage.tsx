import React, { memo, ReactNode, useCallback } from "react";
interface StatusMessage {
  children: ReactNode;
  pubName: string;
  imgUrl?: string;

}
const StatusMessage: React.FC<StatusMessage> = ({ children, pubName, imgUrl }) => {


  const getFirstLetterUppercase = useCallback((): string | ReactNode => {
    if (!imgUrl) {
      return pubName[0].toUpperCase();
    }
    return <img src={imgUrl} alt="_w.png" style={{}} />;
  }, [pubName, pubName.length]);

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
          {
            getFirstLetterUppercase()
          }
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


