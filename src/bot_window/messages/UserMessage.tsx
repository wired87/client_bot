import React, {memo} from "react";

interface UserMessageTypes {
  text: string;
  time: string;
}

const UserMessage: React.FC<UserMessageTypes> = (
  {
    text,
    time
  }
) => {
  console.log("Render the Response message...");
  return(
    <>
      <link rel="stylesheet" href="../../index.css" />
      <div
        className={"bwClientBotFont999666"}
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: '6px',
      }}>
        <div  style={{
          borderRadius: '0.375rem',
          backgroundColor: "#f8f4fc",
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: "8px 17px",
          boxSizing: 'border-box',
          maxWidth: '300px'
        }}>
          <div         className={"bwClientBotFont999666"}
                       style={{
            color: "black", fontSize: 15,
            position: 'relative',
            maxWidth: '260px',
                         wordWrap: 'break-word',
          }}>

              {text}

          </div>
        </div>
        <div
          className={"bwClientBotFont999666"}
          style={{
          position: 'relative',
          fontSize: '16px',
          lineHeight: '120%',
          color: 'black'
        }}>
          {time}
        </div>
      </div>
    </>

  );
}

export default memo(UserMessage);