import React, { memo } from "react";
import { IoMdRefresh } from "react-icons/io";
interface ErrorContent {
  retry: () => Promise<void>;
  error: string;
}
const ErrorMessageContent: React.FC<ErrorContent> = ({ retry, error }) => {
  return(
    <>
      <p style={{color: "black"}}>Es gab einen Fehler bei der Verarbeitung: { error } Bitte versuch es
        nochmal ich gebe mein bestes deine Frage zu beantworten.
      </p>
      <button
        style={{
          cursor: 'pointer',
          borderRadius: '50%',
          border: 'none',
          padding: '1px',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={retry}
        title="Start over" >
        <IoMdRefresh color="white" size={25} />
      </button>
    </>
  )
}

export default memo(ErrorMessageContent);