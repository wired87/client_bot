import React, { memo, ReactNode } from "react";
//import { MsgIcon } from "../coponents/MsgIcon";
interface StatusMessage {
  children: ReactNode;
  pubName?: string;
  imgUrl?: string;
  dataUrl?: string;
  primary?: string;
  error?: boolean;
}

const StatusMessage: React.FC<StatusMessage> = (
  { children, error/*pubName, imgUrl, dataUrl, primary*/ }
) => {


  return (
    <div
      style={{
        marginBottom: "1.75rem",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}>
        <div
          style={{
            borderRadius: "0.375rem",
            backgroundColor: error? "#fdadad" : "#f8f4fc",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            boxSizing: "border-box",
            maxWidth: "300px",
          }}
        >
          <div
            style={{
              fontSize: 15,
              height: "auto",
              position: "relative",
              maxWidth: "260px",
              wordWrap: "break-word",
            }}
          >
            {children}
          </div>
        </div>
      </div>

  );
};

export default memo(StatusMessage);


