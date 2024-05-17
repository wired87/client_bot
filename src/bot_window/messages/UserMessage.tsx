import React, {memo} from "react";

interface UserMessageTypes {
  text: string;
  time: string;
  primary: string;
  primaryText: string;
}

const UserMessage: React.FC<UserMessageTypes> = (
  {
    text,
    time,
    primary,
    primaryText
  }
) => {

  return(
    <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      justifyContent: 'end',
      alignSelf: "stretch",
      padding: "0 10px"
    }}>
      <div  style={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: '0.375rem',
        borderTopLeftRadius: '0.375rem',
        borderBottomLeftRadius: '0.375rem',
        backgroundColor: primary,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: "8px 17px",
        boxSizing: 'border-box',
        maxWidth: '300px'
      }}>
        <div
          style={{
          color: "black", fontSize: 15,
          position: 'relative',
          maxWidth: '260px',
          wordWrap: 'break-word',
        }}>
          <p
            style={
            {
              fontSize: 14,
              color: primaryText,
              fontFamily: "Roboto, sans-serif",
              fontStyle: "normal",
            }}>
            {text}
          </p>


        </div>
      </div>
      <div
        style={{
        position: 'relative',
        fontSize: 14,
        color: 'black',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }}>
        <p
          style={
          {
            position: "relative",
            fontSize: 14,
            color:"black",
            fontFamily: "Roboto, sans-serif",
            fontStyle: "normal",
          }}>
          {time}
        </p>

      </div>
    </div>
  );
}

export default memo(UserMessage);