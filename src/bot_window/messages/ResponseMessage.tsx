
import React, {memo} from "react";

interface ResponseMessageTypes {
  text: string;
}

const ResponseMessage: React.FC<ResponseMessageTypes> = (
  {
    text,
  }
) => {
  console.log("Render the Response message...");
  return(
    <div style={{
      marginBottom: '1.75rem',
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',


    }}>
      <div style={{

        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 15

      }}>

        <div style={{
          width: '2.2rem',
          height: '2.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          backgroundColor: "black",
          borderRadius: 50,
          marginRight: 10
           }}>
          <h4 style={{color: "white"}}>
            BW
          </h4>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          gap: '6px'
        }}>
          <div style={{
            borderTopRightRadius: '0.375rem',
            borderBottomRightRadius: '0.375rem',
            borderTopLeftRadius: '0.375rem',
            borderBottomLeftRadius: 0,

            backgroundColor: "#f8f4fc",
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: "8px 17px",
            boxSizing: 'border-box',
            maxWidth: '300px'
          }}>
            <div style={{
              fontSize: 15,
              height:"auto",
              position: 'relative',
              lineHeight: '140%',
              maxWidth: '260px',
              wordWrap: 'break-word',
            }}>
              <p style={{
                margin: '0'
              }}>
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